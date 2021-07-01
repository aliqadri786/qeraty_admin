import ApiService from "../services/ApiService";
import { reject } from "q";


export default {
    strict: true,
    state: {
        profile: {},
        endpoint: 'user/logged_in_user',
    },
    mutations: {
        setProfile: (state, value) => {
            state.profile = value
        },

    },
    actions: {
        getProfile({ state, commit }) {


            return new Promise((resolve) => {

                ApiService.getAll(state.endpoint)
                    .then(response => {
                        let data = response.data
                        commit('setProfile', data)
                        resolve(state.profile)
                    })
                    .catch(_error => {
                        reject(_error)
                    })

            })
        },

        updatePassword({ dispatch }, value) {

            return new Promise(function (resolve) {

                ApiService.customUpdate('user/change_password', value)
                    .then(r => {
                        let data = r.data
                        dispatch('getProfile')
                        resolve(data)
                    })
                    .catch(_error => {
                        reject(_error)
                    })
            })
        },


    }
}
