import React, {useEffect, useRef, useState} from 'react';
import styles from './selsctContacts.module.css'
import dropDownArrow from './Vector.png'


function changeTypeContacts(arrayWithAllContacts, id, setNewContacts, item){
    let array = arrayWithAllContacts.slice();
    let index = null;
    for (let i = 0; i < array.length; ++i) {
        if (array[i].id === id) {
            index = i ;
            break
        }
    }
    array[index].selectedType = item
    setNewContacts(array)
}

const SelsctContacts = (props) => {
    const [vivsibilityDropDownList, setVivsibilityDropDownList] = useState(false)
    let choicesListArray = [{content: 'Телфон', type: 'Tel'},
        {content: 'Доп. телефон', type: 'additionalTel'},
        {content: 'Email', type: 'email'},
        {content: 'Vk', type: 'vk'},
        {content: 'Facebook', type: 'facebook'}]


    let choicesListItem = choicesListArray.map((item) => {
        return <li  key={item.type} style={props.selectedCOntacts.type === item.type ? {display: 'none'} : {}}
                   onClick={(e) => {

                       changeTypeContacts(props.contacts, props.id,  props.setConatacts,item)

                   }
                   } className={styles.selectContacts__listItem}>
            {item.content}
        </li>
    })
    const selectedContacts = useRef(null);

    useEffect(() => {
        const onClick = e => selectedContacts.current.contains(e.target) || setVivsibilityDropDownList(false)
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <div className={styles.selectContacts__container}>
            <div id={props.selectedCOntacts.id} onClick={(e) => {
                setVivsibilityDropDownList(!vivsibilityDropDownList)

            }}
                 ref={selectedContacts}
                 className={styles.selectContacts__selectedItem}>{props.selectedCOntacts.content}
            <img src={dropDownArrow} className={vivsibilityDropDownList === false ? `${styles.selectContacts__dropDownArrow}` : `${styles.selectContacts__dropDownArrowOpen}`} />
            </div>
            <ul className={vivsibilityDropDownList === true ? `${styles.selectContacts__list}` : `${styles.selectContacts__listHidden}`}>
                {choicesListItem}
            </ul>
        </div>

    );
};

export default SelsctContacts;