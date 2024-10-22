// React
import { useContext } from 'react'

// Movie
import { movie } from '../services/movie'

// Context
import { MovieContext } from '../context/MovieContext'

export function useMovie () {
    const { loading, setLoading, displayMovie, setDisplayMovie, shownMovie, setShownMovie, error, setError, previousSearch} = useContext(MovieContext)

    const getMovie = async() => {
        if(displayMovie === previousSearch.current?.id){
            setShownMovie(previousSearch.current)
            return
        }

        try {
            setLoading(true)
            const result = await movie({displayMovie})
            setShownMovie(result)
            setLoading(false)
            setError(false)
            previousSearch.current = result
        } catch(e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    const handleClick = (id) => {
        const movieToShow = id
        setDisplayMovie(movieToShow)
    }

    return { loading, displayMovie, setDisplayMovie, shownMovie, setShownMovie, error, getMovie, handleClick}
}