import { useCallback, useState } from "react";

const useHttp=()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);

    const sendRequest= useCallback(async (url,transformData)=>{
        setIsLoading(true);
        setError(null);

        try{
            const response=await fetch(url);
            
            if(!response.ok){
                throw new Error('Error');
            }

            const data=await response.json();
            //console.log(`${data}here`);
            transformData(data);
        }
        catch(err){
            setError(err.message || 'Something went wrong!');
            console.error(err);
        }
        setIsLoading(false);
    },[]);
  
    return(
        {
            isLoading,
            sendRequest,
            error
        }
    )
}

export default useHttp;