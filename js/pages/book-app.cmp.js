import { bookService } from '../services/book.service.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookDetails from './book-details.cmp.js'

export default {
    template: `
    <div>
    <book-filter  @filtered="setFilter"></book-filter>
    <book-list  :books="booksToShow" @selected="selectBook"></book-list> 
</div>
    `,
    data() {
        return {
            books: '',
            filterBy: null,
            selectedBook: null
        }
    },
    methods: {
        setFilter(filterBy) {
            if (!filterBy) return
            this.filterBy = filterBy
        },
        selectBook(selectedBookId) {
            // console.log(this.books.map(({ id }) => id));
            this.selectedBook = this.books.find(book => {
                return book.id === selectedBookId
            })
        },
        closeModal() {
            this.selectedBook = null
        }
    },
    components: {
        bookService,
        bookFilter,
        bookList,
        bookDetails
    }
    ,
    created() {
        bookService.query()
            .then(res => {
                this.books = res
            })
    },
    computed: {
        booksToShow() {
            let filterdBooks;
            if (!this.filterBy) return this.books
            filterdBooks = this.books

            if (this.filterBy.byName) {
                let filterStr = this.filterBy.byName.toLowerCase()
                console.log(filterStr, 'filterStr');
                filterdBooks = this.books.filter(book => {
                    return book.title.toLowerCase().includes(filterStr)
                })
            }
            if (this.filterBy.fromPrice || this.filterBy.toPrice) {
                filterdBooks = filterdBooks.filter(book => {
                    return book.listPrice.amount >= +this.filterBy.fromPrice && book.listPrice.amount <= +this.filterBy.toPrice
                })

            }
            console.log(this.filterBy, 'FILTERBY');
            console.log(filterdBooks, 'FILTERD BOOKS');
            return filterdBooks

        }

    }
}


