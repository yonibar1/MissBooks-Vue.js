export default {
    props: [],
    template: `
    <div class="page-size">
        <div class="about-hero">
            <img src="img/about-hero.jpg" alt="">
        </div>
        <h2>About!</h2>
        <nav>
            <router-link to="/about/me">About Me</router-link> |
            <router-link to="/about/shop">About My Shop</router-link>
        </nav>
        <router-view />
    </div>`,
    data() {
        return {
            interval: null
        }
    },
    methods: {
    },
    components: {},
    computed: {},
    created() {
        this.interval = setInterval(() => {
            console.log('Logging something');
        }, 1000);
    },
    destroyed() {
        clearInterval(this.interval)
        this.interval = null
    }
}