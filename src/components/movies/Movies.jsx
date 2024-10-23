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

// Assets
import notFoundImg from '../../assets/notFound.png'

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
        <>
        <h2 className={styles.moviesSection}>Movies</h2>
        <div className={styles.notFound}>
            <img src={notFoundImg} alt="No movies found..." />
            <p>No movies found</p>
        </div>
        </>
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
        <p className={styles.loadingMovies}>Loading...</p>
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
