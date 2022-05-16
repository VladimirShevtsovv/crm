import React, {useEffect, useState} from 'react';
import styles from './formNewClient.module.css'
import NewContact from "../../../newContact/newContact";
import {useFetching} from "../../../../useFetching/useFetching";
import { Transition } from 'react-transition-group';

function createNewContact(arrayWithContacts, setNewArray, change, contactsFromServ) {
    if (change) {
        let copyArray = [];
        for (let i = 0; i < contactsFromServ.length; i++) {
            let type = {};
            let id = i + 1;
            switch (contactsFromServ[i].type) {
                case 'Tel' :
                    type = {content: 'Телфон', type: 'Tel'}
                    break;
                case 'facebook' :
                    type = {content: 'Facebook', type: 'facebook'}
                    break;
                case 'additionalTel' :
                    type = {content: 'Доп. телефон', type: 'additionalTel'}
                    break;
                case 'email' :
                    type = {content: 'Email', type: 'email'}
                    break;
                case 'vk' :
                    type = {content: 'Vk', type: 'vk'}
                    break;
                default:
                    ;
            }
            let obj = {id: id, inputValue: contactsFromServ[i].value, selectedType: type, errorMessange: ''}
            copyArray.push(obj)
        }
        setNewArray(copyArray)
    } else {
        let copyArray = arrayWithContacts.slice()
        let id;
        if (copyArray.length > 0) {
            id = copyArray[copyArray.length - 1].id + 1
        } else {
            id = 1
        }
        let obj = {id: id, inputValue: '', selectedType: {content: 'Телфон', type: 'Tel'}, errorMessange: ''}
        copyArray.push(obj)
        setNewArray(copyArray)
    }

}

function createObjToServ(arrayWithContacts, name, surname, patronomic) {
    let obj = {
        name: name,
        surname: surname,
        lastName: patronomic
    }
    let arrayWithContactstoServ = [];
    for (let i = 0; i < arrayWithContacts.length; i++) {
        let objWithCOntacts = {
            type: arrayWithContacts[i].selectedType.type,
            value: arrayWithContacts[i].inputValue
        }
        arrayWithContactstoServ.push(objWithCOntacts)
    }
    obj['contacts'] = arrayWithContactstoServ
    console.log(obj)
    return obj
}


const FormNewClient = (props) => {
    console.log(props)
    const [surnameInputValue, setSurnameInputValue] = useState('')
    const [nameInputValue, setNameInputValue] = useState('')
    const [patronomicInputValue, setPatronomicInputValue] = useState('')
    const [contacts, setConatacts] = useState([])
    const [arrayWithContacts, setArrayWithContacts] = useState([])

    const [fetchToServ, visibilityOfLoader, errorMessange] = useFetching(addNewClient)

    const [errorMessangesOfINputs, setErrorMessangesOfINputs] = useState({
        surnameCreateContactForm: '',
        nameCreateContactForm: '',
        patronomicCreateContactForm: '',
    })


    async function addNewClient() {
        const objWithInfoToServ = createObjToServ(contacts, nameInputValue, surnameInputValue, patronomicInputValue)
        console.log(objWithInfoToServ)
        if (props.selectedFormInPopUp === 'Change') {
            const responce = await fetch(`http://localhost:8000/api/clients/${props.idClientsToMoves}`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(objWithInfoToServ)
            })
            const request = await responce.json()
            console.log(request)
            let arrayWithAllClients = [...props.clientsFromServer];
            console.log(arrayWithAllClients, request)
            for (let i = 0; i < arrayWithAllClients.length; i++) {
                if (arrayWithAllClients[i].id === request.id) {
                    arrayWithAllClients[i] = request
                }
            }
            console.log(arrayWithAllClients)
            props.setClientsFromServer(arrayWithAllClients)
            props.setPopUpVisibility(false)
            props.setSelectedFormInPopUp('')
        } else {
            console.log(123)
            const responce = await fetch('http://localhost:8000/api/clients', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(objWithInfoToServ)
            })
            const request = await responce.json()
            let arrayWithAllClients = [...props.clientsFromServer];
            arrayWithAllClients.push(request)
            props.setClientsFromServer(arrayWithAllClients)
            props.setPopUpVisibility(false)
            props.setSelectedFormInPopUp('')
        }
    }


    useEffect(() => {
        setArrayWithContacts([])
        if (contacts.length > 0) {
            let array = contacts.map(item => {
                return <NewContact id={item.id} inputValue={item.inputValue} selectedType={item.selectedType}
                                   contacts={contacts} setConatacts={setConatacts} errorMessange={item.errorMessange}
                                   validdation={validdation}/>
            })
            setArrayWithContacts(array)
        } else {

        }
    }, [contacts])

    function validationOnSaveClick() {
        let copyArray = [...contacts];
        let copyObj = {...errorMessangesOfINputs}
        let colError = 0;

        if (copyArray.length > 0) {
            for (let i = 0; i < copyArray.length; i++) {
                if (copyArray[i].inputValue === '') {
                    copyArray[i].errorMessange = 'Данное поле обязаетльно для заполнения'
                }
            }
        }

        if (surnameInputValue === '') {
            copyObj.surnameCreateContactForm = 'Данное поле обязаетльно для заполнения';
        }
        if (nameInputValue === '') {
            copyObj.nameCreateContactForm = 'Данное поле обязаетльно для заполнения';
        }

        for (let i = 0; i < copyArray.length; i++) {
            if (copyArray[i].errorMessange !== '') {
                colError = colError + 1;
            }
        }
        if (copyObj.surnameCreateContactForm !== '') {
            colError = colError + 1;
        }
        if (copyObj.nameCreateContactForm !== '') {
            colError = colError + 1;
        }

        setErrorMessangesOfINputs(copyObj)
        setConatacts(copyArray)
        return colError
    }


    function validdation(input, on, type, contacts, setContacts) {
        if (type === 'fullname') {
            let obj = {...errorMessangesOfINputs}
            if (input.value.trim() === '') {
                if (on === 'onBlur') {
                    obj[input.id] = 'Данное поле обязательно для заполнения'
                } else {
                    obj[input.id] = ''
                }
            } else {
                if (on === 'onChange') {
                    obj[input.id] = ''
                    for (let i = 0; i < input.value.length; i++) {
                        let codeOfSymbol = input.value.charCodeAt(i)
                        if ((codeOfSymbol < 65 || codeOfSymbol > 122) && (codeOfSymbol < 1040 || codeOfSymbol > 1103)) {
                            obj[input.id] = 'Данное поле заполняеся только буквами'
                        }
                    }
                }

            }
            setErrorMessangesOfINputs(obj)
        }
        if (type === 'contacts') {
            let copyArrayWithContacts = [...contacts]
            for (let i = 0; i < copyArrayWithContacts.length; i++) {
                let codeOfSymbol = input.value.charCodeAt(i)
                if (input.id.slice(-1) == copyArrayWithContacts[i].id) {
                    if (on === 'onBlur') {
                        if (input.value.trim() === '') {
                            copyArrayWithContacts[i].errorMessange = 'Данное поле обязательно для заполнения'
                        }
                    }
                    if (on === 'onChange') {
                        copyArrayWithContacts[i].errorMessange = ''
                        if (input.id.includes('Tel')) {
                            if (input.value.trim() !== '') {
                                for (let j = 0; j < input.value.length; j++) {
                                    let codeOfSymbol = input.value.charCodeAt(j)
                                    console.log(input.value[j], codeOfSymbol)
                                    if (codeOfSymbol < 48 || codeOfSymbol > 57) {
                                        copyArrayWithContacts[i].errorMessange = 'Данное поле заполняется только цифрами'
                                    } else {
                                        copyArrayWithContacts[i].errorMessange = ''
                                    }
                                }
                            }
                        }
                    }
                }
            }
            setContacts(copyArrayWithContacts)
        }
    }


    useEffect(() => {
        if (props.infoAboutChangeCLient) {
            if (props.infoAboutChangeCLient.name) {
                setSurnameInputValue(props.infoAboutChangeCLient.surname)
                setNameInputValue(props.infoAboutChangeCLient.name)
                setPatronomicInputValue(props.infoAboutChangeCLient.lastName)
                createNewContact(contacts, setConatacts, 'change', props.infoAboutChangeCLient.contacts)
            }

        }
    }, [props.infoAboutChangeCLient])

    return (

       <form onMouseDown={(e) => {
                e.stopPropagation()
            }} className={`${styles.newClient__form}`}>
                <div className={styles.newClient__formTopContainer}>
                    <h2 className={styles.newClient__formTopContainerHeading}>{props.infoAboutChangeCLient ? `Изменить данные` : `Новый клиент`}</h2>
                    <span className={styles.newClient__formTopContainerID}>{props.infoAboutChangeCLient ? `ID:${props.infoAboutChangeCLient.id.slice(7)}` : null}</span>
                    <button onClick={(e) => {
                        e.preventDefault()
                        props.setPopUpVisibility(false)
                        props.setSelectedFormInPopUp('')
                    }} className={styles.newClient__formTopContainerButton}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z"
                                  fill="#B0B0B0"/>
                        </svg>
                    </button>
                </div>

                <div style={{position: 'relative'}}>
                <span className={styles.newClient__inputErrorMessange}>
                    {errorMessangesOfINputs.surnameCreateContactForm === '' ? null : errorMessangesOfINputs.surnameCreateContactForm}
                </span>
                    <input placeholder={'Фамилия'} id={'surnameCreateContactForm'} value={surnameInputValue}
                           onChange={(e) => {
                               setSurnameInputValue(e.target.value)
                               validdation(e.target, 'onChange', 'fullname')
                           }} onBlur={(e) => {
                        validdation(e.target, 'onBlur', 'fullname')
                    }} style={errorMessangesOfINputs.surnameCreateContactForm === '' ? {} : {borderColor: '#F06A4D'}}
                           className={styles.newClient__formInput}/>
                </div>
                <div style={{position: 'relative'}}>
                <span className={styles.newClient__inputErrorMessange}>
                    {errorMessangesOfINputs.nameCreateContactForm === '' ? null : errorMessangesOfINputs.nameCreateContactForm}
                </span>
                    <input placeholder={'Имя'} id={'nameCreateContactForm'} value={nameInputValue} onChange={(e) => {
                        setNameInputValue(e.target.value)
                        validdation(e.target, 'onChange', 'fullname')
                    }} onBlur={(e) => {
                        validdation(e.target, 'onBlur', 'fullname')
                    }} style={errorMessangesOfINputs.nameCreateContactForm === '' ? {} : {borderColor: '#F06A4D'}}
                           className={styles.newClient__formInput}/>
                </div>
                <div style={{position: 'relative'}}>
                       <span className={styles.newClient__inputErrorMessange}>
                         {errorMessangesOfINputs.patronomicCreateContactForm === '' ? null : errorMessangesOfINputs.patronomicCreateContactForm}
                       </span>
                    <input placeholder={'Отчество'} id={'patronomicCreateContactForm'} value={patronomicInputValue}
                           onChange={(e) => {
                               setPatronomicInputValue(e.target.value)
                               validdation(e.target, 'onChange', 'fullname')
                           }}
                           style={errorMessangesOfINputs.patronomicCreateContactForm === '' ? {} : {borderColor: '#F06A4D'}}
                           className={styles.newClient__formInput}/>
                </div>


                <div className={styles.newClient__newContactButtonContainer}
                     style={arrayWithContacts.length > 0 ? {padding: '25px 0'} : {}}>
                    {arrayWithContacts.length > 0 ? arrayWithContacts : null}


                    <button className={styles.newClient__newContactButton} type={'button'} onClick={() => {
                        createNewContact(contacts, setConatacts)
                    }} style={arrayWithContacts.length === 10 ? {display: 'none'} : {}}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00001 4.66665C7.63334 4.66665 7.33334 4.96665 7.33334 5.33331V7.33331H5.33334C4.96668 7.33331 4.66668 7.63331 4.66668 7.99998C4.66668 8.36665 4.96668 8.66665 5.33334 8.66665H7.33334V10.6666C7.33334 11.0333 7.63334 11.3333 8.00001 11.3333C8.36668 11.3333 8.66668 11.0333 8.66668 10.6666V8.66665H10.6667C11.0333 8.66665 11.3333 8.36665 11.3333 7.99998C11.3333 7.63331 11.0333 7.33331 10.6667 7.33331H8.66668V5.33331C8.66668 4.96665 8.36668 4.66665 8.00001 4.66665ZM8.00001 1.33331C4.32001 1.33331 1.33334 4.31998 1.33334 7.99998C1.33334 11.68 4.32001 14.6666 8.00001 14.6666C11.68 14.6666 14.6667 11.68 14.6667 7.99998C14.6667 4.31998 11.68 1.33331 8.00001 1.33331ZM8.00001 13.3333C5.06001 13.3333 2.66668 10.94 2.66668 7.99998C2.66668 5.05998 5.06001 2.66665 8.00001 2.66665C10.94 2.66665 13.3333 5.05998 13.3333 7.99998C13.3333 10.94 10.94 13.3333 8.00001 13.3333Z" fill="#9873FF"/>
                        </svg>Добавить контакт
                    </button>
                </div>


                <button className={styles.newClient__saveButton} onClick={(e) => {
                    e.preventDefault()
                    console.log(props.infoAboutChangeCLient)
                    let colErrors = validationOnSaveClick()
                    if (colErrors === 0) {
                        fetchToServ()
                    }
                }} disabled={visibilityOfLoader === true ? true : false} style={visibilityOfLoader === true ? {background:'#C8C5D1', border:'none'}:{}}>Сохранить
                    {visibilityOfLoader === true ? <svg className={styles.spinner} viewBox="0 0 50 50">
                        <circle className={styles.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg> : null}
                    {errorMessange !== '' ? <span className={styles.confirmDelete__errorMessange}>Ошибка сервера!</span> : null}
                </button>

                {props.infoAboutChangeCLient ? <button onClick={(e) => {
                    e.preventDefault()
                    props.setSelectedFormInPopUp('Delete')
                    props.setPopUpVisibility(true)
                }} className={styles.newClient__cancelButton}>Удалить
                </button> : <button onClick={(e) => {
                    e.preventDefault()
                    props.setPopUpVisibility(false)
                    props.setSelectedFormInPopUp('')
                }} className={styles.newClient__cancelButton}>Отмена
                </button>}

            </form>

    );
};

export default FormNewClient;