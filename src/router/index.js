import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import ExpenseHead from '@/components/ExpenseHead'
import Expense from '@/components/Expense'
import User from '@/components/User'
import Profile from '@/components/Profile'
import Book from '@/components/Book'
import Genre from '@/components/Genre'
import Role from '@/components/Role'


Vue.use(Router)
const routes = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            hideNav: true,
            requiresAuth: false
        },
        component: Login
    }, 
    {
        path: '/',
        name: 'Dashboard',
        meta: {
            hideNav: false,
            requiresAuth: true
        },
        component: Dashboard
    },    
    {
        path: '/expense/head',
        name: 'ExpenseHead',
        meta: {
            hideNav: false,
            requiresAuth: true
        },
        component: ExpenseHead
    },
    {
        path: '/expense',
        name: 'Expense',
        meta: {
            hideNav: false,
            requiresAuth: true
        },
        component: Expense
    },
    {
        path: '/users',
        name: 'User',
        meta: {
            hideNav: false,
            requiresAuth: true
        },
        component: User
    },
    {
        path: '/roles',
        name: 'Role',
        meta: {
            hideNav: false,
            requiresAuth: true
        },
        component: Role
    },
    {
        path: '/books',
        name: 'Book',
        meta: {
            hideNav: false,
            requiresAuth: true
        },
        component: Book
    },
    {
        path: '/genres',
        name: 'Genre',
        meta: {
            hideNav: false,
            requiresAuth: true
        },
        component: Genre
    },
    {
        path: '/profile',
        name: 'Profile',
        meta: {
            hideNav: false,
            requiresAuth: true
        },
        component: Profile
    },
    {
        path: '/*',
        name: 'Dashboard',
        meta: {
            hideNav: false,
            requiresAuth: true
        },
        component: Dashboard
    },

]

const router = new Router({ routes, mode: 'history' })
router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth) {
        const token = window.localStorage.getItem('token')
        if (!token) {
            next('/login')
        }        
        else
            next()
    }
    else {
        next()
    }
})

export default router;