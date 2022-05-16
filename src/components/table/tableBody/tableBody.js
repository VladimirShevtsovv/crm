import React, {useEffect, useState} from 'react';
import imgPhone from './phone.png'
import imgFb from './fb.png'
import imgVk from './vk.png'
import imgMail from './mail.png'
import imgAddPhone from './addPhone.png'
import ButtonCahngeClient from "./buttonCahngeClient/buttonCahngeClient";
import ButtonDeleteClient from "./buttonDeleteClient/buttonDeleteClient";
import styles from './tableBody.module.css'


const TableBody = (props) => {
    const [clientsInTable, setClientsInTable] = useState([])

    function createDateAndTime(str) {
        let date = `${str.slice(8, 10)}.${str.slice(5, 7)}.${str.slice(0, 4)}`
        let time = `${str.slice(11, 16)}`
        return [
            date,
            time
        ]
    }

    function createListWithContacts(contact) {

        let img;
        switch (contact.type) {
            case 'Tel':
                img = `${imgPhone}`
                break;
            case 'facebook':
                img = `${imgFb}`
                break;
            case 'vk':
                img = `${imgVk}`
                break;
            case 'email':
                img = `${imgMail}`
                break;
            case 'additionalTel':
                img = `${imgAddPhone}`
                break;
            default:
        }
        return <img src={img}/>;
    }

    function createAddContactsInTable(contacts, id) {
        if (contacts.length === 0) {
            return null
        }


        let array = contacts.map((item, i) => {
            let img = createListWithContacts(item)
            return <li type={item.type} className={styles.tableBody__contactsImg} key={`${i}-${id}`}>
                {img}
                <div className={styles.tableBody__listWithContactsToolTip}>
                    {item.value}
                    <div className={styles.tableBody__listWithContactsToolTipRectangele}></div>
                </div>
            </li>
        })

        return <ul className={styles.tableBody__listWithContacts}> {array}</ul>
    }


    function addNewClientInTable(arrayWithClients, contactsAfterSearch = props.clientsFromServerCopyForSort, valuyOfSearchInput = props.inputForSearhValue) {
        let contactsForSort = arrayWithClients;

        if (contactsAfterSearch.length > 0 && valuyOfSearchInput !== '') {
            contactsForSort = contactsAfterSearch;
        }
        if (valuyOfSearchInput !== '' && contactsAfterSearch.length === 0) {
            let messange = <div>Нет результатов</div>
            setClientsInTable([messange])
            return
        }
        if (arrayWithClients.length === 0) {
            let messange = <div>пока нет клиентов в таблице</div>
            setClientsInTable([messange])
            return
        }

        let array = contactsForSort.map(item => {
            const [dateCreated, timeCreated] = createDateAndTime(item.createdAt)
            const [dateChanged, timedateChanged] = createDateAndTime(item.updatedAt)
            const arrayWithContacts = createAddContactsInTable(item.contacts, item.id)
            return <tr id={item.id} className={styles.tableBody__row} key={`row-${item.id}`}>
                <td style={{width: '7%'}} className={styles.tableBody__id}>{item.id.slice(7)}</td>
                <td style={{width: '25%'}}>{`${item.surname} ${item.name} ${item.lastName}`}</td>
                <td style={{width: '16%'}} className={styles.tableBody__cotnainerWithDate}>{dateCreated}
                    <span className={styles.tableBody__time}>{timeCreated}</span>
                </td>
                <td style={{width: '15%'}} className={styles.tableBody__cotnainerWithDate}>{dateChanged}
                    <span className={styles.tableBody__time}>{timedateChanged}</span>
                </td>
                <td style={{width: '16%', minWidth:'115px'}} className={styles.tableBody__cotnainerWithContacts}>{arrayWithContacts}</td>
                <td  className={styles.tableBody__cotnainerWithButoonForMove}>
                        <ButtonCahngeClient id={item.id} setSelectedFormInPopUp={props.setSelectedFormInPopUp}
                                            setPopUpVisibility={props.setPopUpVisibility}
                                            setIdClientsToMoves={props.setIdClientsToMoves}
                                            setInfoAboutChangeCLient={props.setInfoAboutChangeCLient}
                        />
                        <ButtonDeleteClient id={item.id} setSelectedFormInPopUp={props.setSelectedFormInPopUp}
                                            setPopUpVisibility={props.setPopUpVisibility}
                                            setIdClientsToMoves={props.setIdClientsToMoves}/>
                </td>
            </tr>
        })
        setClientsInTable(array)
    }

    useEffect(() => {
        addNewClientInTable(props.clientsFromServer)
    }, [props.clientsFromServer, props.clientsFromServerCopyForSort,])

    return (
        <React.Fragment>
            {props.visibilityOfLoader === true ? <div className={styles.tableBody__firstLoadCOntainer}><svg className={styles.spinner} viewBox="0 0 50 50">
                <circle className={styles.path} cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
            </svg></div> : clientsInTable}
        </React.Fragment>
    );
};

export default TableBody;