import { bookService } from '../services/book.service.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookDetails from './book-details.cmp.js'
import bookAdd from '../cmps/book-add.cmp.js'
import bookSearch from '../cmps/book-search.cmp.js'
import { googleService } from '../services/google.service.js'

export default {
    template: `
    <div>
    <book-filter  @filtered="setFilter"></book-filter>
    <section>
        <book-add @searchBook="searchBook"></book-add>
        <book-search @addSearchedBook="addBook" v-if="newBooks.length" :books="newBooks"></book-search>
    </section>
    <book-list  :books="booksToShow" @selected="selectBook"></book-list> 
</div>
    `,
    data() {
        return {
            books: '',
            filterBy: null,
            selectedBook: null,
            newBooks: []
        }
    },
    methods: {
        addBook(book) {
            this.newBooks = []
            bookService.addBook(book)
                .then(updatedBooks => this.books = updatedBooks)

        }

        ,
        searchBook(searchStr) {
            googleService.find(searchStr)
                .then(data => {
                    this.newBooks = data.items
                    console.log(this.newBooks);

                })
        }

        ,
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
        bookDetails,
        bookAdd,
        bookSearch
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


