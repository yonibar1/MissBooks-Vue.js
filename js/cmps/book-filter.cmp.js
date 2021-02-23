export default {
    template: `
    <section class="book-filter">
        <label> Search a book: </label>    
        <form @submit.prevent="setFilter">
            <input type="text" placeholder="Search By Name" v-model="filterBy.byName">
            <input type="number" placeholder="Min price" v-model="filterBy.fromPrice">
            <input type="number" placeholder="Max price" v-model="filterBy.toPrice">
            <button>Find</button>
        </form>
    </section>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: 0,
                toPrice: Infinity
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy })
        }
    }
}
