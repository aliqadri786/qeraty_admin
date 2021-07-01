import ApiService from "../services/ApiService";
import { reject } from "q";

export default {
    strict: true,
    state: {
        users: [],       
        endpoint: 'users'
    },
    mutations: {
        setUsers: (state, value) => {
            state.users = value
        },

        setRoles: (state, value) => {
            state.role = value
        },
        addNewUser: (state, value) => {
            state.users.push(value)
        },
        updateUserData: (state, { id, newValue }) => {
            for (let i = 0; i < state.users.length; i++) {
                //console.log(index)
                if (state.users[i].id === id) {
                    state.users.splice(i, 1, newValue)
                    break;
                }
            }

        },
        deleteUserData: (state, index) => {
            state.users.splice(index, 1)
        },

    },
    actions: {
        getUsers({ state, commit },path) {
            return new Promise((resolve) => {
                ApiService.getAll(path)
                    .then(response => {
                        let data = response.data
                        commit('setUsers', data)
                        resolve(state.users)
                    })
                    .catch(_error => {
                        reject(_error)
                    })
            })
        },

        getUserById: (state, value) => {
            for (let index in state.user) {
                if (state.user[index].id === value.id) {
                    // resolve(data)
                    break;
                }
            }
        },
        
        updateUserData({ state, dispatch }, { value }) {

            return new Promise(function (reject) {

                ApiService.customUpdate(state.endpoint + "/" + value.id, value)
                    .then(dispatch('getUsers'))
                    .catch(_error => {

                        reject(_error)
                    })
            })
        },


        deleteUserData({ commit }, index) {
            return new Promise(function (resolve) {
                commit('deleteUserData', index)
                resolve(index)
            })
        },

    }
}
