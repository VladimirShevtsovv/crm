import React, {useEffect} from 'react';
import TableHeadings from "../tableHeadings/tableHeadings";
import TableBody from "../tableBody/tableBody";
import styles from './table.module.css'

const Table = (props) => {


    return (
        <table className={styles.table}>
            <TableHeadings clientsFromServer={props.clientsFromServer}
                           setClientsFromServer={props.setClientsFromServer}/>
            <TableBody clientsFromServer={props.clientsFromServer} setSelectedFormInPopUp={props.setSelectedFormInPopUp}
                       setPopUpVisibility={props.setPopUpVisibility}
                       setIdClientsToMoves={props.setIdClientsToMoves} inputForSearhValue={props.inputForSearhValue}
                       clientsFromServerCopyForSort={props.clientsFromServerCopyForSort} setInfoAboutChangeCLient={props.setInfoAboutChangeCLient}
                       visibilityOfLoader={props.visibilityOfLoader}
            />
        </table>
    );
};

export default Table;