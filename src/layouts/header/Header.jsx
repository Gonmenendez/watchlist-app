// React
import { useCallback } from 'react'

// Assets
import movieWlLogo from '../../assets/Movie watchlist.png'

// Hooks
import { useSearch } from '../../hooks/useSearch'
import { useMovies } from '../../hooks/useMovies'

// Debounce
import debounce from 'just-debounce-it'

// Styles
import styles from "./style.module.css"

const Header = () => {
    const { search, setSearch, error } = useSearch()
    const { getMovies } = useMovies({ search })

    const handleSubmit = (e) => {
        e.preventDefault()
        getMovies({ search })
    }

    const debouncedGetMovies = useCallback(
        debounce(search => {
            getMovies({ search })
        }, 300)
    , [getMovies])


    const handleChange = (e) => {
        const inputValue = e.target.value
        if (inputValue.startsWith(' ')) return
        setSearch(inputValue)
        debouncedGetMovies(inputValue)
    }


    return (
        <header>
            <div className={styles.motto}>
                <img src={movieWlLogo} alt="Movie watchlist logo" />
                {/* <button>a</button> */}
            </div>
            <form className={styles.movieSearch} onSubmit={handleSubmit}>
                <h2>Search movie...</h2>
                <div className={styles.searchContainer}>
                    <input style={{border: '1px solid transparent',
                        borderColor: error && 'red' 
                    }} onChange={handleChange} value={search} placeholder='Avengers, Star Wars, The Matrix...' type="text" />
                    <button type='submit'>Search</button>
                </div>
            </form>
        </header>
    )
}

export default Header
