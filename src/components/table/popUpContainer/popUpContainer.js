import React from 'react';
import styles from './popUpContainer.module.css'
import FormNewClient from "./formNewClient/formNewClient";
import ConfirmDeleteClient from "./confirmDeleteClient/confirmDeleteClient";


const PopUpContainer = (props) => {

    return (
        <div
            className={props.popUpVisibility === true ? styles.popUp__containerVisible : styles.popUp__containerHidden}
            onMouseDown={() => {
                props.setPopUpVisibility(false)
                props.setSelectedFormInPopUp('')
            }}>{props.selectedFormInPopUp === 'NewClient' ? <FormNewClient setPopUpVisibility={props.setPopUpVisibility}
                                                                           setSelectedFormInPopUp={props.setSelectedFormInPopUp}
                                                                           setClientsFromServer={props.setClientsFromServer}
                                                                           clientsFromServer={props.clientsFromServer}
                                                                           selectedFormInPopUp={props.selectedFormInPopUp}
                                                                           popUpVisibility={props.popUpVisibility}/> : null}
            {props.selectedFormInPopUp === 'Delete' ? <ConfirmDeleteClient setPopUpVisibility={props.setPopUpVisibility}
                                                                           idClientsToMoves={props.idClientsToMoves}
                                                                           clientsFromServer={props.clientsFromServer}
                                                                           setClientsFromServer={props.setClientsFromServer}/> : null}
            {props.selectedFormInPopUp === 'Change' ? <FormNewClient setPopUpVisibility={props.setPopUpVisibility}
                                                                     setSelectedFormInPopUp={props.setSelectedFormInPopUp}
                                                                     setClientsFromServer={props.setClientsFromServer}
                                                                     clientsFromServer={props.clientsFromServer}
                                                                     infoAboutChangeCLient={props.infoAboutChangeCLient}
                                                                     idClientsToMoves={props.idClientsToMoves}
                                                                     selectedFormInPopUp={props.selectedFormInPopUp}
                                                                     popUpVisibility={props.popUpVisibility}/> : null}


        </div>
    );
};

export default PopUpContainer;