import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const apiUrl = `${url}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortCont.signal,
    })
    .then(response => {
      if (!response.ok) {
        throw Error('Could not fetch the data for that resource.');
      }
      return response.json();
    })
    .then(data => {
      setData(data);
      setIsLoading(false);
      setError(null);
    })
    .catch(error => {
      if (error.name === "AbortError") {
        console.log('Fetch aborted');
      } else {
        setError(error.message);
        setIsLoading(false);
      }
    });

    return () => abortCont.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
