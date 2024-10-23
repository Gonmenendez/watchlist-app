// React
import { useCallback, useContext, useEffect, useRef } from "react"

// Services
import { movies } from "../services/movies"

// Hooks
import { useSearch } from "./useSearch"

// Context
import { MoviesHandler } from "../context/MoviesHandler"

export function useMovies ({search}) {
    const allMoviesRef = useRef()
    const previousSearch = useRef(search)
    const { allMovies, setAllMovies, loading, setLoading } = useContext(MoviesHandler)
    const { setError } = useSearch()
    
    useEffect(() => {
        if (allMoviesRef.current === undefined || allMoviesRef.current.length == 0){
            allMoviesRef.current = allMovies
        }
    }, [allMovies])
    
    const getMovies = useCallback(async ({search}) => {
        if(allMoviesRef.current !== undefined && search === previousSearch.current) return

        try{
            if(allMoviesRef.current && search === ''){
                setAllMovies(allMoviesRef.current)
            } else {
                setLoading(true)
                const newMovies = await movies({search})
                setAllMovies(newMovies)
                setLoading(false)
                setError(null)
                previousSearch.current = search
            }
        } catch (e){
            setError(e.message)
        } finally {
            setLoading(false)
        }

    }, [])

    return { allMovies, loading, getMovies }
}