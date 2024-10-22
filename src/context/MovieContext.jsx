// React
import { createContext, useRef, useState } from "react";

// Prop-types
import PropTypes from "prop-types";

// Context creator
export const MovieContext = createContext()

// Provider
export function MovieProvider({children}){
    const [ loading, setLoading ] = useState(false)
    const [ displayMovie, setDisplayMovie ] = useState()
    const [ shownMovie, setShownMovie ] = useState()
    const [ error, setError ] = useState()
    const previousSearch = useRef()

    return(
        <MovieContext.Provider value={{loading, setLoading, error, setError, displayMovie, setDisplayMovie, shownMovie, setShownMovie, previousSearch}}>
            {children}
        </MovieContext.Provider>
    )
}

MovieProvider.propTypes = {
    children: PropTypes.node.isRequired,
};