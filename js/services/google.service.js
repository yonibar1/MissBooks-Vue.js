// API https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchStr}&maxResults=5
import { bookService } from '../services/book.service.js'
const GOOGLE_RES = 'Google Results'
export const googleService = {
    find
}
function find(str) {
    let data = bookService.getDemoData(GOOGLE_RES)
    if (data) return Promise.resolve(data)
    else {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${str}&maxResults=5`)
            .then(res => {
                bookService.saveGoogleRes(res.data, GOOGLE_RES)
                return res.data
            }
            )
    }

}