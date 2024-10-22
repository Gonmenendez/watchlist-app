// React
import { useEffect } from "react"

// Hooks
import { useMovies } from "../../hooks/useMovies"
import { useSearch } from "../../hooks/useSearch"
import { useMovie } from "../../hooks/useMovie"

// Prop-types
import PropTypes from "prop-types"

// Styles
import styles from "./style.module.css"

// Component
import MovieDetail from "../movieDetail/MovieDetail"

const FoundMovies = ({ allMovies }) => {
    const { handleClick } = useMovie()
    
    return (
        <ul className={styles.movies}>
            {allMovies?.map(movie => 
                <li key={movie.id} className={styles.movieContainer} onClick={() => handleClick(movie.id)}>
                    <h3>{movie.title}</h3> 
                    <p>{movie.releaseDate.slice(0, 4)}</p>
                    <img src={movie.mainImg} alt={movie.title + ' - image source failed'}></img>
                </li>
            )}
        </ul>
    )
}

FoundMovies.propTypes = {
    allMovies: PropTypes.array.isRequired,
    setDisplayMovie: PropTypes.func
};

const NoMoviesFound = () => {
    return(
        <p>No movies found</p>
    )
}

const Movies = () => {
    const { search, error, } = useSearch()
    const { allMovies, loading, getMovies } = useMovies({ search })
    const { displayMovie } = useMovie()


    useEffect(() => {
        getMovies({search})
    }, [])

    const hasMovies = allMovies?.length > 0

    return(
        loading ?
        <p>Loading...</p>
        : hasMovies ?
            (
            <>
                <h2 className={styles.moviesSection}>Movies</h2>
                <FoundMovies allMovies={allMovies}/>
                {displayMovie && <MovieDetail/>}
            </>
            )
            :
            error ? (<p>{error}</p>) : (<NoMoviesFound/>)
    )
}

export default Movies
