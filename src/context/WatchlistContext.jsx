// React
import { createContext, useState } from "react";

// Prop-types
import PropTypes from "prop-types";

// Context
export const WatchlistContext = createContext()


export function WatchlistProvider({ children }){
    const [ cart, setCart ] = useState([])

    const addToCart = movie => {
    setCart(prevState => ([
        ...prevState, movie 
    ]))
    }

    const removeFromCart = movie => {
        setCart(prevState => prevState.filter(item => item.id !== movie.id))
    }

    const clearCart = () => setCart([])

    return(
        <WatchlistContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </WatchlistContext.Provider>
    )
}

WatchlistProvider.propTypes = {
    children: PropTypes.node.isRequired,
};