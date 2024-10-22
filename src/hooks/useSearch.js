// React
import { useEffect, useContext} from "react"
import { MoviesHandler } from "../context/MoviesHandler"

export function useSearch () {
    const { search, setSearch, error, setError } = useContext(MoviesHandler)

    useEffect(() => {
        if(!/[a-zA-Z0-9]/.test(search) && search !== ''){
            setError('Input must contain at least one alphanumeric character')
            return
        }
        setError(null)
    }, [search])

    return {search, setSearch, error, setError}
}