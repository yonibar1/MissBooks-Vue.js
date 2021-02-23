export default {
    props: ['books'],
    template: `
    <div>
      <ul class="searched-books-list">
          <li v-for="book in books">{{book.volumeInfo.title}} <button title="Add Book" @click="addSearchedBook(book)">+</button></li>
      </ul>
    </div>`,
    data() {
        return {}
    },
    methods: {
        addSearchedBook(book) {
            this.$emit('addSearchedBook', book)
        }
    },
    components: {},
    computed: {},
    created() { },
}