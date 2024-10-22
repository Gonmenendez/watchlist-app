// Axios
import axios from 'axios'

// Endpoints
import { ENDPOINTS } from '../utils/endpoints'

export const movies = async ({search}) => {
    const searchType = search ? "search" : "discover"
    try{
        const result = await axios.get(`${ENDPOINTS.TMBDL_URL}/${searchType}/movie`, {
            params: {
                api_key : ENDPOINTS.API_KEY,
                query: search
            }
        })

        const movies = result.data.results

        return movies?.map(movie => ({
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            mainImg: `${ENDPOINTS.MOVIE_IMG_PATH}${movie.poster_path}`
        }))
    } catch {
        throw new Error("There's been an error uploading movies")
    }
}