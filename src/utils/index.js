// call api .
import useSWR from 'swr'
export const fetcher = (url) => fetch(url).then((res) => res.json());


export const AnimalsByName = (search, pageSize, page) => {
    const { data, error, loading } = useSWR(`https://${search}.snapapps.online/api/v1/${search}/list?limit=${pageSize}&page=${page ?? 1}`
        , fetcher);
    
    return {
        data,
        IsError:error,
        loading
    }
}