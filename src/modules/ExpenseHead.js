
import ApiService from "../services/ApiService";
import { reject } from "q";
export default {
    strict: true,
    state: {
        expenseHead: [],
        endpoint: 'expense_head',
        inactiveExpenseHead: [],
        endpointinactive: 'expense_head/inactive',
    },
    mutations: {
        setAllExpenseHeads: (state, value) => {
            state.expenseHead = value
        },
        setAllInactiveExpenseHeads: (state, value) => {
            state.inactiveExpenseHead = value
        },
        addNewExpenseHead: (state, value) => {
            state.expenseHead.push(value)
        },
        updateExpenseHeadData: (state, { id, newValue }) => {
            for (let i = 0; i < state.expenseHead.length; i++) {
                //console.log(index)
                if (state.expenseHead[i].id === id) {
                    state.expenseHead.splice(i, 1, newValue)
                    break;
                }
            }

        },
        deleteExpenseHeadData: (state, index) => {
            state.expenseHead.splice(index, 1)
        },
    },
    actions: {
        getAllExpenseHeads({ state, commit }) {
            return new Promise((resolve) => {

                ApiService.getAll(state.endpoint)
                    .then(response => {
                        let data = response.data
                        commit('setAllExpenseHeads', data)
                        resolve(state.expenseHead)
                    })
                    .catch(_error => {
                        reject(_error)
                    })

            })

        },
        getAllInactiveExpenseHeads({ state, commit }) {
            return new Promise((resolve) => {

                ApiService.getAll(state.endpointinactive)
                    .then(response => {
                        let data = response.data
                        commit('setAllInactiveExpenseHeads', data)
                        resolve(state.inactiveExpenseHead)
                    })
                    .catch(_error => {
                        reject(_error)
                    })

            })

        },

        getexpenseHeadById: (state, value) => {
            for (let index in state.expenseHead) {
                if (state.expenseHead[index].id === value.id) {
                    // resolve(data)
                    break;
                }
            }
        },
        addNewExpenseHead({ state, commit }, value) {
            return new Promise(function (resolve) {

                ApiService.save(state.endpoint, value)
                    .then(response => {
                        commit('addNewExpenseHead', response.data)
                        resolve(response.data)
                    })
                    .catch(_error => {

                        reject(_error)
                    })

            })
        },
        updateExpenseHeadData({ state, dispatch }, { value }) {

            return new Promise(function (reject) {

                ApiService.customUpdate(state.endpoint + "/" + value.id, value)
                    .then(dispatch('getAllExpenseHeads'))
                    .catch(_error => {

                        reject(_error)
                    })
            })
        },
        deleteExpenseHeadData({ commit }, index) {
            return new Promise(function (resolve) {
                commit('deleteExpenseHeadData', index)
                resolve(index)
            })
        },

    }
}
