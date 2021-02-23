import appHeader from '../js/cmps/app-header.cmp.js'
import { myRouter } from './routes.js'
import userMsg from './cmps/user-msg.cmp.js'
const options = {
    el: '#app',
    router: myRouter,
    template: `
        <section> 
            <app-header />
            <user-msg />
            <router-view></router-view>
            <footer><p> &copy; Coffeerights 2021</p></footer>
        </section>
    `,
    components: {
        appHeader,
        userMsg
    }
}

const app = new Vue(options)

