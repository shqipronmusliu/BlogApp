import {useState, useEffect} from 'react';

function useFetch<T>(url: string){
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);

    // Get request on mount
    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((result) => {
            setData(result);
            setLoading(false);
        })
        .catch((err: unknown) => {
            const message = err instanceof Error ? err.message : "Gabim i panjohur";
            setError(message);
            setLoading(false);
        });
    }, [url]);
    //POST
    async function post<D>(payload: D) {
        setLoading(true);
        setError(null);
        try{
            const res = await fetch(url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
                credentials: "include",
            });
            const result = await res.json();
            setData(result);
            return result;
        }catch (err:unknown) {
            const message = err instanceof Error ? err.message : "POST failed";
            setError(message);
        }finally{
            setLoading(false);
        }
    }
    // PUT
    async function put<D>(payload: D) {
        setLoading(true);
        setError(null);
        try{
            const res = await fetch(url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
                credentials: "include",
            });
            const result = await res.json();
            setData(result);
            return result;
        }catch (err:unknown) {
            const message = err instanceof Error ? err.message : "PUT failed";
            setError(message);
        }finally{
            setLoading(false);
        }
    }

    // DELETE
    async function remove(customUrl?: string) {
        setLoading(true);
        setError(null);
        try{
            const res = await fetch(customUrl || url, {
                method: 'DELETE',
                credentials: "include",

            });
            const result = await res.json();
            setData(result);
            return result;
        }catch (err:unknown) {
            const message = err instanceof Error ? err.message : "DELETE failed";
            setError(message);
        }finally{
            setLoading(false);
        }
    }

    return {data, loading, error, post, put, remove};
}

export default useFetch;