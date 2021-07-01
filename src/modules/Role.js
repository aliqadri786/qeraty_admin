import ApiService from "../services/ApiService";
import { reject } from "q";

export default {
    strict: true,
    state: {
        roles: [],       
        endpoint: 'roles'
    },
    mutations: {
        setRoles: (state, value) => {
            state.roles = value
        },
        addNewRole: (state, value) => {
            state.roles.push(value)
        },
        updateRoleData: (state, { id, newValue }) => {
            for (let i = 0; i < state.roles.length; i++) {
                //console.log(index)
                if (state.roles[i].id === id) {
                    state.roles.splice(i, 1, newValue)
                    break;
                }
            }

        },
        deleteRoleData: (state, index) => {
            state.roles.splice(index, 1)
        },

    },
    actions: {
        getRoles({ state, commit }) {
            return new Promise((resolve) => {
                ApiService.getAll('roles?language=عربى')
                    .then(response => {
                        let data = response.data
                        commit('setRoles', data)
                        resolve(state.roles)
                    })
                    .catch(_error => {
                        reject(_error)
                    })
            })
        },

        getRoleById: (state, value) => {
            for (let index in state.Role) {
                if (state.Role[index].id === value.id) {
                    // resolve(data)
                    break;
                }
            }
        },
        
        updateRoleData({ state, dispatch }, { value }) {

            return new Promise(function (reject) {

                ApiService.customUpdate(state.endpoint + "/" + value.id, value)
                    .then(dispatch('getroles'))
                    .catch(_error => {

                        reject(_error)
                    })
            })
        },


        deleteRoleData({ commit }, index) {
            return new Promise(function (resolve) {
                commit('deleteRoleData', index)
                resolve(index)
            })
        },

    }
}
