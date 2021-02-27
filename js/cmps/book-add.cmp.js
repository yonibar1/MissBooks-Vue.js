export default {
    props: [],
    template: `
    <div class="book-add-container">
        <form @submit.prevent="search">
            <label for="search-input">Add new book</label>
                <input id="search-input" type="text" placeholder="Search" v-model="searchStr">
                <button>Search</button>
        </form>
    </div>`,
    data() {
        return {
            searchStr: ''
        }
    },
    methods: {
        search() {
            if (!this.searchStr) return
            this.$emit('searchBook', this.searchStr)
        }
    },
    components: {},
    computed: {},
    created() { },
}