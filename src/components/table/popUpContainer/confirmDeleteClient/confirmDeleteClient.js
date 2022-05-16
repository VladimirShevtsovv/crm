import React from 'react';
import styles from './confirmDeleteClient.module.css'
import style from './../formNewClient/formNewClient.module.css'
import {useFetching} from "../../../../useFetching/useFetching";

const ConfirmDeleteClient = (props) => {

    const [fetchToServ, visibilityOfLoader, errorMessange] = useFetching(deleteClient)
    async function deleteClient() {
        const responce = await fetch(`http://localhost:8000/api/clients/${props.idClientsToMoves}`, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'},
        })

        let copyArray = props.clientsFromServer.slice();
        for (let i = 0; i < copyArray.length; i++) {
            if (props.idClientsToMoves === copyArray[i].id) {
                copyArray.splice(i, 1)
            }
        }
        props.setClientsFromServer(copyArray)
        props.setPopUpVisibility(false)
    }


    return (

        <div className={styles.confirmDelete__container} onMouseDown={(e) => {
            e.stopPropagation()

        }}>

            <h2>Удалить клиента</h2>
            <button
                className={`${style.newClient__formTopContainerButton} ${styles.confirmDelete__containerButtonCancel}`}
                onClick={() => {
                    props.setPopUpVisibility(false)
                }}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z"
                          fill="#B0B0B0"/>
                </svg>
            </button>

            <span className={styles.confirmDelete__discription}>Вы действительно хотите удалить данного клиента?</span>


            <button className={style.newClient__saveButton} onClick={() => {
                fetchToServ()
            }} disabled={visibilityOfLoader === true ? true:false} style={visibilityOfLoader === true ? {background:'#C8C5D1', border:'none'}:{}}>Удалить
                {visibilityOfLoader === true ? <svg className={styles.spinner} viewBox="0 0 50 50">
                    <circle className={styles.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg> : null}
                {errorMessange !== '' ? <span className={styles.confirmDelete__errorMessange}>Ошибка сервера!</span> : null}
            </button>
            <button className={style.newClient__cancelButton} onClick={() => {
                props.setPopUpVisibility(false)
            }}>Отмена
            </button>
        </div>


    );
};

export default ConfirmDeleteClient;