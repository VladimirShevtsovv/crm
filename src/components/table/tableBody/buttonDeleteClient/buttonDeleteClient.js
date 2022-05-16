import React from 'react';
import imgDeleteClient from './cancel.png'

import styles from './buttonDeleteClient.module.css'

const ButtonDeleteClient = (props) => {

    return (
        <button type={"button"} id={`ButtonDelete-${props.id}`} className={styles.buttonDeleteClient} onClick={() => {
            props.setIdClientsToMoves(props.id)
            props.setSelectedFormInPopUp('Delete')
            props.setPopUpVisibility(true)
        }}>
            <img src={imgDeleteClient}/>
            Удалить
        </button>
    );
};

export default ButtonDeleteClient;


