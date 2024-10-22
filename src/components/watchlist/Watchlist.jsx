// Endpoints
import { ENDPOINTS } from '../../utils/endpoints'

// Hooks
import { useSlider } from "../../hooks/useSlider"
import { useWatchlist } from "../../hooks/useWatchlist"
import { useMovie } from '../../hooks/useMovie'

// Components
import MovieDetail from '../movieDetail/MovieDetail'

// Styles
import styles from './style.module.css'

const Watchlist = () => {
    const { cart } = useWatchlist()
    const { translateX, sliderMove, elementRef, elementWidth, rightArrow, leftArrow } = useSlider()
    const { displayMovie, handleClick } = useMovie()

    return (
        <section className={styles.watchlistSection}>
            <h2>Movie Watchlist</h2>
            <div className={styles.watchlistContainer}>
                {leftArrow && <div className={`${styles.arrowContainer} ${styles.left}`} onClick={() => sliderMove(false)}><i className={`${styles.arrowLeft} bi bi-chevron-left`}/></div>}
                <div className={styles.watchlist} style={{transform: translateX, width: elementWidth}} ref={elementRef}>
                {cart.map(movie =>
                    <img src={`${ENDPOINTS.MOVIE_IMG_PATH}${movie.mainImg}`} alt={`${movie.title} - image source failed`} onClick={() => handleClick(movie.id)} key={movie.id}/>
                )}
                {displayMovie && <MovieDetail/>}
                </div>
                {rightArrow && <div className={`${styles.arrowContainer} ${styles.right}`} onClick={() => sliderMove(true)}><i className={`${styles.arrowRight} bi bi-chevron-right`}/></div>}
            </div>
        </section>
    )
}

export default Watchlist
