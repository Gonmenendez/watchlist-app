// Components and layouts
import Header from './layouts/header/Header'
import Movies from './components/movies/Movies'
import Watchlist from './components/watchlist/Watchlist'
import Footer from './layouts/footer/Footer'

// Context provider
import { MoviesProvider } from './context/MoviesHandler'
import { MovieProvider } from './context/MovieContext'
import { WatchlistProvider } from './context/WatchlistContext'

function App() {
  return (
    <MoviesProvider>
      <Header/>
      <WatchlistProvider>
        <MovieProvider>
          <Watchlist/>
          <Movies/>
        </MovieProvider>
      </WatchlistProvider>
      <Footer/>
    </MoviesProvider>
  )
}

export default App
