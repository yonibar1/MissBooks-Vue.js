import { eventBus } from '../services/event-bus.services.js'
export default {
    props: [],
    template: `
    <div>
        <h2>Rate this book!</h2>
      <form @submit.prevent="saveReview" class="rate-container" action="">
          <input v-model="readerName" placeholder="Name" type="text">
        <select v-model="rate">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <input type="date">
        <textarea v-model="txt" cols="10" rows="10"></textarea>
        <button class="review-submit">Submit!</button>
      </form>
    </div>`,
    data() {
        return {
            book: null,
            readerName: 'Reader name',
            rate: 1,
            date: new Date(),
            txt: 'Free text'
        }
    },
    methods: {
        saveReview() {
            const review = {
                readerName: this.readerName,
                rate: this.rate,
                date: this.date,
                txt: this.txt
            }
            this.$emit('saveReview', review)
            const msg = {
                txt: `Review pubilshed succesfully`,
                type: 'success'
            }
            eventBus.$emit('show-msg', msg)
        }
    },
    components: {
        eventBus
    },
    computed: {},
    created() {
    },
}