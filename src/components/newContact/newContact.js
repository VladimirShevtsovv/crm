import React, {useEffect, useState} from 'react';
import styles from './newContact.module.css'
import SelsctContacts from "./selectContacts/selsctContacts";


function removeContact(arrayWithAllContacts, id, setNewContacts) {
    let array = arrayWithAllContacts.slice();
    let index = null;
    for (let i = 0; i < array.length; ++i) {
        if (array[i].id === id) {
            index = i;
            console.log(array[i])
            break
        }
    }
    array.splice(index, 1)
    setNewContacts(array)
}

function changeInputValueInContacts(arrayWithAllContacts, id, inputValue, setNewContacts) {
    let array = arrayWithAllContacts.slice();
    let index = null;
    for (let i = 0; i < array.length; ++i) {
        if (array[i].id === id) {
            index = i;
            break
        }
    }
    array[index].inputValue = inputValue;
    setNewContacts(array)
}


const NewContact = (props) => {

    return (
        <li className={styles.newContact__containerItem} id={`NewContact-${props.id}`}>

            <div className={styles.newContact__container}>
                <SelsctContacts selectedCOntacts={props.selectedType}
                                contacts={props.contacts} setConatacts={props.setConatacts} id={props.id}/>
                <div className={styles.newContact__inputContainer}>
                    <input value={props.inputValue} onChange={(e) => {
                        changeInputValueInContacts(props.contacts, props.id, e.target.value, props.setConatacts)
                        props.validdation(e.target, 'onChange', 'contacts', props.contacts, props.setConatacts)
                    }} className={styles.newContact__input} type={props.selectedType.id}
                           onBlur={(e) => {
                               props.validdation(e.target, 'onBlur', 'contacts', props.contacts, props.setConatacts)
                           }} id={`${props.selectedType.type}-${props.id}`}
                           style={props.errorMessange !==''? {borderColor:'#F06A4D'}:{}}/>
                    <span
                        className={styles.newContact__inputError}>{props.errorMessange !== '' ? props.errorMessange : null}</span>
                </div>

                <button className={styles.newContact__buttonDelete} onClick={(e) => {
                    e.preventDefault()
                    removeContact(props.contacts, props.id, props.setConatacts)
                }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"
                            fill="#B0B0B0"/>
                    </svg>
                </button>
            </div>

        </li>
    );
};

export default NewContact;