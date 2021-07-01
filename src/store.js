import Vue from 'vue'
import Vuex from 'vuex'
import ExpenseHead from './modules/ExpenseHead'
import Expense from './modules/Expense'
import Dashboard from './modules/Dashboard'
import User from './modules/User'
import Role from './modules/Role'
import Profile from './modules/Profile'
import Book from './modules/Book'
import Genre from './modules/Genre'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    isLoggedIn: !!localStorage.getItem('loginObj'),
    appName: "QERATY"
  },
  modules: {   
    ExpenseHead,
    Expense,
    Dashboard,   
    User,
    Role,
    Profile,
    Book,
    Genre

  }
})
