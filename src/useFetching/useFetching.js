import {useState} from "react";

export const useFetching=(callback)=>{

    const [error, setError]= useState('')
    const [isLoading, setisLoading]= useState(false)


    const  fetching = async function(){
        let result
        try {
            setisLoading(true)
           await callback()

        }catch(e){
            setError(e)
        }finally {
            setisLoading(false)
        }
        return result ;
    }
    return[fetching, isLoading, error]
}