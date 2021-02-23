import bookPreview from '../pages/book-preview.cmp.js'
export default {
    props: ['books'],
    template: `
    <ul class="book-list">
        <li v-for="book in books" :key="book.id" >
            <router-link :to="'/book/'+book.id">
            <book-preview :book="book" @click.native="selectBook(book.id)" />
            <!-- <div class="btns-container">
                <button @click="remove(book.id)">X</button>
                <button @click="select(book)">Details</button>
            </div> -->
        </router-link>
        </li>
    </ul>
    `,
    data() {
        return {
        }
    },
    methods: {
        selectBook(bookId) {
            this.$emit('selected', bookId)
        }
    },
    components: {
        bookPreview
    },
    created() {
    }
}

