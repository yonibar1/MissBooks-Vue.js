export default {
    props: ['book'],
    template: `
        <section class="book-preview-container">
            <h4>Title: {{book.title}}</h4>
            <p>Author: {{displayAuthor}}
            <p>Price: <span class="expensive" :class="{cheap: isCheap}">{{displayBookPrice}}</span></p>
            <img v-bind:title='book.title' v-bind:src='book.thumbnail'/>
        </section>

    `,
    data() {
        return {
            currBook: null,
            isCheap: false
        }
    },
    methods: {
    },
    created() {
        this.currBook = this.book
        if (this.currBook.listPrice.amount < 20) this.isCheap = true

    },
    computed: {
        displayBookPrice() {
            let currencyCode = this.currBook.listPrice.currencyCode
            if (currencyCode === 'EUR') return this.currBook.listPrice.amount + '€'
            if (currencyCode === 'ILS') return this.currBook.listPrice.amount + '₪'
            if (currencyCode === 'USD') return this.currBook.listPrice.amount + '$'
        },
        displayAuthor() {
            return this.currBook.authors.join('')
        }
    }
}
