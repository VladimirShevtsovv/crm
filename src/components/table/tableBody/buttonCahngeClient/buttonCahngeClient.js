import React from 'react';
import imgChangeClient from './edit.png'
import styles from './buttonCahngeClient.module.css'
import {useFetching} from "../../../../useFetching/useFetching";

const ButtonChangeClient = (props) => {

    const [fetchToServChangeClient, visibilityOfLoaderChangeClient, errorMessangeChangeClient] = useFetching(getClientFromServToPatch)

    async function getClientFromServToPatch() {
        const response = await fetch(`http://localhost:8000/api/clients/${props.id}`)
        const request = await response.json()
        props.setInfoAboutChangeCLient(request)
        if (errorMessangeChangeClient === '') {
            props.setPopUpVisibility(true)
            props.setSelectedFormInPopUp('Change')
        }
    }


    return (
        <button type={"button"} id={`ButtonChange-${props.id}`} className={styles.buttonCahngeClient} onClick={() => {
            props.setIdClientsToMoves(props.id)
            fetchToServChangeClient()
        }} disabled={visibilityOfLoaderChangeClient === true ? true : false}
                style={visibilityOfLoaderChangeClient === true ? {color: '#9873FF'} : {}}>
            {visibilityOfLoaderChangeClient === true ? <svg className={styles.spinner} viewBox="0 0 50 50">
                <circle className={styles.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg> : <img src={imgChangeClient}/>}
            {errorMessangeChangeClient !== '' ?
                <span className={styles.confirmDelete__errorMessange}>Ошибка сервера!</span> : null}
            Изменить
        </button>
    );
};

export default ButtonChangeClient;