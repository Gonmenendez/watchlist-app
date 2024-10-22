// Axios
import axios from "axios";

// Endpoints
import { ENDPOINTS } from "../utils/endpoints";

export const movie = async({ displayMovie }) => {
    if (!displayMovie) return
    try{
        const result = await axios.get(`${ENDPOINTS.TMBDL_URL}/movie/${displayMovie}`,{
            params: {
                api_key: ENDPOINTS.API_KEY
            }
        })

        const movie = result.data

        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            releaseDate: movie.release_date,
            mainImg:  `${ENDPOINTS.MOVIE_IMG_PATH}${movie.poster_path}`,
            backdropImg: `${ENDPOINTS.MOVIE_IMG_PATH}${movie.backdrop_path}`
        }
    } catch {
        throw new Error("There's been an error uploading this movie")
    }
}