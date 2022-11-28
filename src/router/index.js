import { createRouter, createWebHistory } from 'vue-router'
import Base from '../pages/Base.vue'
import Welcome from '../pages/Welcome.vue'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import store from '../store/index.js'
import Music from '../pages/Music.vue'

const routes = [
    {
        path: '/',
        // name: 'Base',
        component: Base,
        children: [
            {
                path: '/',
                name: 'Welcome',
                component: Welcome
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/analysis',
                name: 'Home',
                component: Home
            },
            {
                path: '/music',
                name: 'Music',
                component: Music
            },
            {
                path: '/about',
                name: 'About',
                component: About,
                beforeEnter(to, from, next) {
                    window.open('https://www.ai-amct.com/www.html', '_blank')
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


router.beforeEach(async (to, from) => {
    if (to.name !== 'Welcome' && to.name !== 'Login' && !store.getters.isAuthenticated) {
        return { name: 'Login', meta: { to: { to } } }
    }
})

export default router
