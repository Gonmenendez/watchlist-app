// Prop-types
import PropTypes from "prop-types";

// React
import { createContext, useState } from "react";

// Context creator
export const MoviesHandler = createContext()

// Provider
export function MoviesProvider ({ children }) {
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const [allMovies, setAllMovies] = useState()
    const [loading, setLoading] = useState(false)
    
    
    return(
        <MoviesHandler.Provider value={{allMovies, setAllMovies, loading, setLoading, search, setSearch, error, setError}}>
            {children}
        </MoviesHandler.Provider>
    )
}

MoviesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};