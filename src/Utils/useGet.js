import { useState, useEffect } from "react";


function useGet(url) {

    const [ getData, setGetData] = useState(null);
    const [ getError, setGetError] = useState(null);
    const [getLoading, setGetLoading] = useState(true);

    useEffect(()=> {

        const fetchData = async () => {
            
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }

                });
                const result = await response.json();
                setGetData(result);
            }
            catch (error) {
                setGetError(error);
            }
            finally {
                setGetLoading(false);
            }
            
        }

        fetchData();

    }, [url])

    return { getData, getError, getLoading };
}

export default useGet;
