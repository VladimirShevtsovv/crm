import React from 'react';
import headerLogo from './headerLogo.png'
import styles from './inputForSearch.module.css'

const InputForSearch = (props) => {
    return (

            <div className={styles.header__container}>
                <img src={headerLogo}/>
                <input className={styles.header__inputForSearch} placeholder={'Введите запрос'}
                       value={props.inputForSearhValue} onChange={(e) => {
                    props.setInputForSearhValue(e.target.value)
                }}/>

            </div>


    );
};

export default InputForSearch;
