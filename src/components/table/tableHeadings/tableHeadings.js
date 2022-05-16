import React, {useEffect, useState} from 'react';
import styles from './tableHeadings.module.css'
import arraySort from './Vector.png'


const TableHeadings = (props) => {

    const [sortParam, setSortParam] = useState({})

    let arrayWithHeadings = [
        {id: 'ID', content: 'ID'},
        {id: 'fullname', content: 'Фамилия Имя Отчество'},
        {id: 'timeOfCreation', content: 'Дата и время создания'},
        {id: 'timeOfChange', content: 'Последние изменения'},
        {id: 'contacts', content: 'Контакты'},
        {id: 'moves', content: 'Действия'}]

    function calcWidthOfItem(item) {
        let width;
        switch (item.id) {
            case 'ID':
                width = 7;
                break;
            case 'fullname':
                width = 25;
                break;
            case 'timeOfCreation':
                width = 16;
                break;
            case 'timeOfChange':
                width = 15;
                break;
            case 'contacts':
                width = 16;
                break;
            case 'moves':
                width = 21;
                break;

            default:
        }
        width = `${width}%`
        return width
    }

    function createDateAndTime(str) {
        let day = (Number(str.slice(8, 10))) * 1 + (Number(str.slice(5, 7))) * 31 + (Number(str.slice(0, 4))) * 365 + ((Number(str.slice(11, 13) / 24 + (Number(str.slice(14, 16)))) / 60))
        return day
    }

    function sortClientsInTable(id) {
        let copyArrayWithClients = props.clientsFromServer.slice()
        switch (id) {
            case  'ID' :
                if (sortParam.reversed === false) {
                    copyArrayWithClients = (copyArrayWithClients.sort((prev, next) => prev.id.slice(7) - next.id.slice(7))).reverse();

                } else {
                    copyArrayWithClients = copyArrayWithClients.sort((prev, next) => prev.id.slice(7) - next.id.slice(7));
                }
                props.setClientsFromServer(copyArrayWithClients)
                break;
            case  'fullname' :
                if (sortParam.reversed === false) {
                    copyArrayWithClients = copyArrayWithClients.sort((prev, next) => {
                        if ((prev.name + prev.surname + prev.lastName) < (next.name + next.surname + next.lastName)) return -1;
                        if ((prev.name + prev.surname + prev.lastName) > (next.name + next.surname + next.lastName)) return 1;
                    });
                } else {
                    copyArrayWithClients = (copyArrayWithClients.sort((prev, next) => {
                        if ((prev.name + prev.surname + prev.lastName) < (next.name + next.surname + next.lastName)) return -1;
                        if ((prev.name + prev.surname + prev.lastName) > (next.name + next.surname + next.lastName)) return 1;
                    })).reverse();
                }
                props.setClientsFromServer(copyArrayWithClients)
                break;
            case  'timeOfCreation' :
                if (sortParam.reversed === false) {
                    copyArrayWithClients = (copyArrayWithClients.sort((prev, next) => createDateAndTime(prev.createdAt) - createDateAndTime(next.createdAt))).reverse();

                } else {
                    copyArrayWithClients = copyArrayWithClients.sort((prev, next) => createDateAndTime(prev.createdAt) - createDateAndTime(next.createdAt))
                }
                props.setClientsFromServer(copyArrayWithClients)
                break;
            case  'timeOfChange' :
                if (sortParam.reversed === false) {
                    copyArrayWithClients = (copyArrayWithClients.sort((prev, next) => createDateAndTime(prev.updatedAt) - createDateAndTime(next.updatedAt))).reverse();

                } else {
                    copyArrayWithClients = copyArrayWithClients.sort((prev, next) => createDateAndTime(prev.updatedAt) - createDateAndTime(next.updatedAt))
                }
                props.setClientsFromServer(copyArrayWithClients)
                break;

            default:
        }

    }

    if (!sortParam.id && props.clientsFromServer.length > 0) {
        setSortParam({id: 'ID', reversed: false})
        sortClientsInTable(sortParam.id)
    }

    useEffect(() => {
        sortClientsInTable(sortParam.id)
    }, [sortParam])


    let listWithHeadings = arrayWithHeadings.map(item => {
        const width = calcWidthOfItem(item)
        return <th id={item.id} key={item.id} style={{width: `${width}`}} className={item.id === 'moves' ? `${styles.tableHeadings__heading} ${styles.tableHeadings__moves}`:`${styles.tableHeadings__heading}`} >
            <button className={styles.tableHeadings__button} onClick={(e) => {
                setSortParam({id: item.id, reversed: sortParam.id === item.id ? !sortParam.reversed : false})
            }
            } disabled={item.id === 'contacts' || item.id === 'moves' ? true : false}
                    style={sortParam.id === item.id ? {opacity: 1, color :'#9873FF'} : {}}
           >
                <div className={item.id.includes('time') ? `${styles.tableHeadings__headingContainer}` : `${''}`}>
                    {item.content}
                    {item.id === 'contacts' || item.id === 'moves' ? null :
                        <img src={arraySort} className={styles.tableHeadings__headingImg}
                             style={sortParam.id === item.id && sortParam.reversed === true ? {transform: 'rotate(180deg'} : {}}/>}
                </div>
            </button>

        </th>
    })

    return (
        <tr className={styles.tableHeadings__container}>
            {listWithHeadings}
        </tr>
    );
};

export default TableHeadings;