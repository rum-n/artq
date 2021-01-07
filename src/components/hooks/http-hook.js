import { useState, useCallback, useRef, useEffect } from 'react';
import {Redirect } from 'react-router-dom';
export const useHttpClient = () => {
    const[redirect,setRedirect] = useState(false)

  const [error, setError] = useState();
  const [theresponse, settheresponse] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
    
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });
        settheresponse(response)

        const responseData = await response.json();
        

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);

        }
        else{
          
        }
       

       
        return responseData;
      } catch (err) {
        setError(err.message);
       
     
        throw err;
      }

    },
    []
  );
  const shouldRedirect = redirect =>{
    if (redirect){
        return <Redirect to = "/"/>
    }
}

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);
  
  return { error, sendRequest, clearError,theresponse };
};
