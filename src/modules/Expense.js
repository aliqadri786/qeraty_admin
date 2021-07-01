import ApiService from "../services/ApiService";
import { reject } from "q";


export default {
    strict: true,
    state: {
        expense: [],
        endpoint: 'expense'
    },
    mutations: {
        setAllExpenses: (state, value) => {
            state.expense = value
        },
        addNewExpense: (state, value) => {
            state.expense.push(value)
        },
        updateExpenseData: (state, { id, newValue }) => {
            for (let i = 0; i < state.expense.length; i++) {
                //console.log(index)
                if (state.expense[i].id === id) {
                    state.expense.splice(i, 1, newValue)
                    break;
                }
            }

        },
        deleteExpenseData: (state, id) => {
            for (let i = 0; i < state.expense.length; i++) {
                //console.log(index)
                if (state.expense[i].id === id) {
                    state.expense.splice(i, 1)
                    break;
                }
            }

        },
    },
    actions: {
        getAllExpenses({ state, commit }) {
            return new Promise((resolve) => {

                ApiService.getAll(state.endpoint)
                    .then(response => {
                        let data = response.data
                        commit('setAllExpenses', data)
                        resolve(state.expense)
                    })
                    .catch(_error => {
                        reject(_error)
                    })

            })


        },

        getExpenseById: (state, value) => {
            for (let index in state.expense) {
                if (state.expense[index].id === value.id) {
                    // resolve(data)
                    break;
                }
            }
        },
        addNewExpense({ state, commit }, value) {
            return new Promise(function (resolve) {
                ApiService.save(state.endpoint, value)
                    .then(response => {
                        commit('addNewExpense', response.data)
                        resolve(response.data)
                    })
                    .catch(_error => {

                        reject(_error)
                    })

            })
        },

        updateExpenseData({ state, commit }, { value }) {

            return new Promise(function (resolve, reject) {

                ApiService.customUpdate(state.endpoint + "/" + value.id, value)
                    .then(response => {
                        commit('updateExpenseData', { id: value.id, newValue: response.data })
                        resolve(response.data)
                    })
                    .catch(_error => {

                        reject(_error)
                    })
            })
        },
        deleteExpenseData({ state, commit }, id) {
            return new Promise(function (resolve) {
                ApiService.delete(state.endpoint + "/" + id)
                    .then(response => {
                        commit('deleteExpenseData', id)
                        resolve(response.data)
                    })
                    .catch(_error => {

                        reject(_error)
                    })

            })
        },

    }
}
