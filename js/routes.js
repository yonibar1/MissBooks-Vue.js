import bookApp from './pages/book-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
import bookDetails from './pages/book-details.cmp.js'
import aboutMe from './cmps/about-me.cmp.js'
import aboutShop from './cmps/about-shop.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/book',
        component: bookApp
    }
    ,
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'me',
                component: aboutMe
            },
            {
                path: 'shop',
                component: aboutShop
            }
        ]
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    }
]

export const myRouter = new VueRouter({ routes })