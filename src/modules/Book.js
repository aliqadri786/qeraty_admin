import ApiService from "../services/ApiService";
import { reject } from "q";


export default {
    strict: true,
    state: {
        book: [],
        endpoint: 'books'
    },
    mutations: {
        setBooks: (state, value) => {
            state.book = value
        },
        addNewBook: (state, value) => {
            state.book.push(value)
        },
        updateBookData: (state, { id, newValue }) => {
            for (let i = 0; i < state.book.length; i++) {
                //console.log(index)
                if (state.book[i].id === id) {
                    state.book.splice(i, 1, newValue)
                    break;
                }
            }
        },
        deleteBookData: (state, id) => {
            for (let i = 0; i < state.book.length; i++) {
                //console.log(index)
                if (state.book[i].id === id) {
                    state.book.splice(i, 1)
                    break;
                }
            }

        },
    },
    actions: {
        getBooks({ state, commit },path) {
            return new Promise((resolve) => {
                ApiService.getAll(path)
                .then(response => {
                    let data = response.data
                    commit('setBooks', data)
                    resolve(state.book)
                })
                .catch(_error => {
                    reject(_error)
                })
            })
        },

        getBookById: (state, value) => {
            for (let index in state.book) {
                if (state.book[index].id === value.id) {
                    // resolve(data)
                    break;
                }
            }
        },
        addNewBook({ state, commit }, value) {
            return new Promise(function (resolve) {
                ApiService.save(state.endpoint, value)
                .then(response => {
                    commit('addNewbook', response.data)
                    resolve(response.data)
                })
                .catch(_error => {
                    reject(_error)
                })
            })
        },

        updateBookData({ state, commit }, { value }) {
            return new Promise(function (resolve, reject) {
                ApiService.customUpdate(state.endpoint + "/" + value.id, value)
                .then(response => {
                    commit('updatebookData', { id: value.id, newValue: response.data })
                    resolve(response.data)
                })
                .catch(_error => {
                    reject(_error)
                })
            })
        },
        deletebookData({ state, commit }, id) {
            return new Promise(function (resolve) {
                ApiService.delete(state.endpoint + "/" + id)
                .then(response => {
                    commit('deletebookData', id)
                    resolve(response.data)
                })
                .catch(_error => {

                    reject(_error)
                })
            })
        },

    }
}
