export default {
    props: ['txt'],
    template: `
    <div>
        <div class="book-description">
            <p>{{showDesc}}</p>
        </div>
        <button @click="toggleShow" v-if="isShowMore">Show More</button>
        <button @click="toggleShow" v-if="isLongTxt && !isShowMore">Show Less</button>
    </div>
    `,
    data() {
        return {
            isShowMore: false,
            isLongTxt: true
        }
    },
    methods: {
        toggleShow() {
            this.isShowMore = !this.isShowMore
        }
    },
    components: {

    },
    created() {
        if (this.txt.length < 100) this.isLongTxt = false
        else this.isShowMore = true
    },
    computed: {
        showDesc() {
            if (this.txt.length > 100 && this.isShowMore) return this.txt.substring(0, 100) + '...'
            else return this.txt
        }
    }
}


