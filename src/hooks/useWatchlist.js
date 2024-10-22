// React
import { useContext } from 'react'

// Context
import { WatchlistContext } from '../context/WatchlistContext'

export function useWatchlist (){
    const cart = useContext( WatchlistContext)

    if(cart === undefined){
        throw new Error('useCart must be user within a WatchList.Provider')
    }

    return cart 
}
