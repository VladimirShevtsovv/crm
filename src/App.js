import './App.css';
import InputForSearch from "./components/inputForSearch/inputForSearch";
import TableContainer from "./components/table/tableContainer";
import {useState} from "react";


function App() {

    const [inputForSearhValue, setInputForSearhValue] =useState('')




    return (
        <div className="App">
            <InputForSearch inputForSearhValue={inputForSearhValue} setInputForSearhValue={setInputForSearhValue}/>
            <TableContainer inputForSearhValue={inputForSearhValue} />

        </div>
    );
}

export default App;
