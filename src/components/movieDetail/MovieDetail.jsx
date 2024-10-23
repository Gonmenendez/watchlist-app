// React
import { useEffect } from 'react'

// Hooks
import { useMovie } from '../../hooks/useMovie'

// Endponits
import { ENDPOINTS } from '../../utils/endpoints'

// Styles
import styles from './style.module.css'

// Bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useOutClickClose } from '../../hooks/useOutClickClose';

const MovieDetail = () => {
    const { loading, displayMovie, setDisplayMovie, shownMovie, setShownMovie, error, getMovie } = useMovie()
    const { cart, addToCart, removeFromCart } = useWatchlist()
    const { menuRef } = useOutClickClose(() => setDisplayMovie())
    
    const checkMovieInWatchlist = movie => {
        return cart.some(item => item.id === movie.id)
    }

    useEffect(() => {
        getMovie()

        return () =>{
            setShownMovie()
        }
    }, [displayMovie])

    const closeMovie = () => {
        setDisplayMovie()
    }

    return (
        <>
            {loading ?
            <p>Loading...</p>
            :
            shownMovie ?
                <div className={styles.movieContainer}>
                    <div className={styles.movie} ref={menuRef}>
                        <div className={styles.movieMotto}>
                            <button className={styles.closeTagContainer} onClick={closeMovie}>
                                <i className={`${styles.closeTag} bi bi-x`}/>
                            </button>
                            <img src={`${ENDPOINTS.MOVIE_IMG_PATH}${shownMovie.backdropImg}`} alt={`${shownMovie.title} - image source failed`} />
                            <h2>{shownMovie.title}</h2>
                        </div>
                        <div className={styles.movieData}>
                            <div className={styles.movieDetails}>
                                <p>{shownMovie.overview}</p>
                                {
                                    checkMovieInWatchlist(shownMovie) ?
                                    <button onClick={() => removeFromCart(shownMovie)}>Remove from watchlist</button>
                                    :
                                    <button onClick={() => addToCart(shownMovie)}>Add to watchlist</button>
                                }
                            </div>
                            <div className={styles.movieSpecifics}>
                                <p>{shownMovie.adult ? '+18' : 'ATP'}</p>
                                <p>{shownMovie.releaseDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                error && (<p>{error}</p>)} 
        </>
    )
}

export default MovieDetail
