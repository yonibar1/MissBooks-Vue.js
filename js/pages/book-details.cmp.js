import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import { bookService } from '../services/book.service.js'
export default {

    template: `
    <section v-if="book" class="book-details-container">
        <div class="details-content">
            
            <h1>Title: {{book.title}}</h1>
            <p>Sub Title: {{book.subtitle}}</p>
            <h3>Author: {{displayAuthor}}</h3>
            <div class="price-container">
                <h4>Price:{{displayBookPrice}}</h4>
                <img v-if="book.listPrice.isOnSale" class="sale" src="img/sale.png" />
            </div>
            <long-text v-bind:txt="book.description"></long-text>
            <p>{{displayPublishedDate}}</p>
            <p>{{displayPagesCount}}</p>
            <div class="review-and-image">
                <img v-bind:title='book.title' v-bind:src='book.thumbnail'/>
                <review-add @saveReview="addReview"></review-add>
            </div>
            <router-link class="back" to="/book">Back</router-link>
            <div class="book-nav">
                <button @click="changeBook(1)">Next Book</button>
                <button @click="changeBook(-1)">Prev Book</button>
            </div>
        </div>
        <article class="reviews-container"> 
        <h2>Reviews!</h2>
        <div v-for="(review,idx) in book.reviews" v-if="review" class="review-content">
            <h4>Review num: {{idx+1}}</h4>
            <p>Reader: <span class="text-muted">{{review.readerName}}</span></p>
            <p>Rate: <span class="text-muted">{{review.rate}}</span></p>
            <p>Date: <span class="text-muted"> {{review.date}}</span></p>
            <p>Text: <span class="text-muted">{{review.txt}}</span> </p>
            <button @click="deleteReview(idx)">x</button>
        </div>
        <h3 v-else>No reviews Yet...</h3>
        </article>
    </section>
    `,
    data() {
        return {
            book: null,
            review: null,
            nextBookId: 'OXeMG8wNskc',


        }
    },
    methods: {
        loadBook() {
            const id = this.$route.params.bookId
            bookService.getBookById(id)
                .then(book => {
                    this.book = book
                })
        },
        changeBook(diff) {
            const { id } = this.book
            let nextBookId = bookService.setBookId(id, diff)
            this.$router.push('/book/' + nextBookId)

        },

        addReview(review) {
            bookService.saveReview(this.book.id, review)
                .then(book => this.book = book)
        },
        deleteReview(idx) {
            bookService.removeReview(this.book.id, idx)
                .then(book => this.book = book)
        }
    },
    created() {
        this.loadBook()

        if (this.review) {
            const reviews = this.book.reviews
            if (reviews.length === 1) {
                this.review = reviews[0]
            }
            reviews.forEach(review => {
                this.review = review
            });
        }
    },
    computed: {
        nextBookLink() {
            return '/book/' + this.nextBookId
        },
        displayBookPrice() {
            let currencyCode = this.book.listPrice.currencyCode
            if (currencyCode === 'EUR') return this.book.listPrice.amount + '€'
            if (currencyCode === 'ILS') return this.book.listPrice.amount + '₪'
            if (currencyCode === 'USD') return this.book.listPrice.amount + '$'
        },
        displayAuthor() {
            return this.book.authors.join('')
        },
        displayPagesCount() {
            let pages = this.book.pageCount
            if (pages > 500) return 'Long Reading'
            if (pages > 200) return 'Decent Reading'
            if (pages < 100) return 'Light Reading'
        },
        displayPublishedDate() {
            let pubDate = this.book.publishedDate
            if (2021 - pubDate > 10) return 'Veteran Book'
            if (2021 - pubDate > 1) return 'New!'
        },
    },
    components: {
        longText,
        reviewAdd
    },
    watch: {
        '$route.params.bookId'(id) {
            console.log(id)
            this.loadBook()
        },

    }

}
