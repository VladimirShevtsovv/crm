import React, {useEffect, useState} from 'react';
import styles from './tableContainer.module.css'
import Table from "./table/table";
import ButtonNewClient from "./ButtonNewClient/buttonNewClient";
import PopUpContainer from "./popUpContainer/popUpContainer";
import {useFetching} from "../../useFetching/useFetching";


const TableContainer = (props) => {

    const [popUpVisibility, setPopUpVisibility] = useState(false)
    const [selectedFormInPopUp, setSelectedFormInPopUp] = useState('')

    const [clientsFromServer, setClientsFromServer] = useState([])
    const [clientsFromServerCopyForSort, setClientsFromServerCopyForSort] = useState([])
    const [fetchToServ, visibilityOfLoader, errorMessange] = useFetching(getInfoFromSreev)
    const [idClientsToMoves, setIdClientsToMoves] = useState()


    async function getInfoFromSreev() {
        const response = await fetch('http://localhost:8000/api/clients');
        const request = await response.json()
        setClientsFromServer(request)
    }

    useEffect(() => {
        fetchToServ()
    }, [])


    function sortClinetInTableAfterInpet() {
        let copy = clientsFromServer.slice()
        let filteredArray = copy.filter(item => {
            let fullName = `${item.name} ${item.surname} ${item.lastName}`
            return fullName.includes(props.inputForSearhValue)
        });
        setClientsFromServerCopyForSort(filteredArray)
    }

    useEffect(() => {
        sortClinetInTableAfterInpet()
    }, [props.inputForSearhValue])


    const [infoAboutChangeCLient, setInfoAboutChangeCLient] = useState({})
    console.log(infoAboutChangeCLient)


    return (
        <div className={styles.table__container}>
            <h1>Клиенты</h1>
            <Table clientsFromServer={clientsFromServer} setSelectedFormInPopUp={setSelectedFormInPopUp}
                   setPopUpVisibility={setPopUpVisibility} setIdClientsToMoves={setIdClientsToMoves}
                   setClientsFromServer={setClientsFromServer} inputForSearhValue={props.inputForSearhValue}
                   clientsFromServerCopyForSort={clientsFromServerCopyForSort}
                   setInfoAboutChangeCLient={setInfoAboutChangeCLient}
                   visibilityOfLoader={visibilityOfLoader}
            />
            {visibilityOfLoader === true ? null : <ButtonNewClient setPopUpVisibility={setPopUpVisibility}
                                                                   setSelectedFormInPopUp={setSelectedFormInPopUp}/>}
            <PopUpContainer popUpVisibility={popUpVisibility} setPopUpVisibility={setPopUpVisibility}
                            selectedFormInPopUp={selectedFormInPopUp} setSelectedFormInPopUp={setSelectedFormInPopUp}
                            setClientsFromServer={setClientsFromServer} clientsFromServer={clientsFromServer}
                            idClientsToMoves={idClientsToMoves} infoAboutChangeCLient={infoAboutChangeCLient}
                            popUpVisibility={popUpVisibility}
            />
        </div>
    );
};

export default TableContainer;