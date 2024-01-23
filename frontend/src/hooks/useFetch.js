import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Could not fetch data from server");
        }
        const data = await response.json();
        setData(data);
        setIsPending(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted!");
        } else {
          setError(error.message);
          setIsPending(false);
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [url, options]);

  return { data, isPending, error };
};

export default useFetch;