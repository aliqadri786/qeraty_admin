import ApiService from "../services/ApiService";
import { reject } from "q";


export default {
    strict: true,
    state: {
        genre: [],
        endpoint: 'genres'
    },
    mutations: {
        setGenres: (state, value) => {
            state.genre = value
        },
        addNewGenre: (state, value) => {
            state.genre.push(value)
        },
        updateGenreData: (state, { id, newValue }) => {
            for (let i = 0; i < state.genre.length; i++) {
                //console.log(index)
                if (state.genre[i].id === id) {
                    state.genre.splice(i, 1, newValue)
                    break;
                }
            }
        },
        deleteGenreData: (state, id) => {
            for (let i = 0; i < state.genre.length; i++) {
                //console.log(index)
                if (state.genre[i].id === id) {
                    state.genre.splice(i, 1)
                    break;
                }
            }

        },
    },
    actions: {
        getGenres({ state, commit },path) {
            return new Promise((resolve) => {
                ApiService.getAll(path)
                .then(response => {
                    let data = response.data
                    commit('setGenres', data)
                    resolve(state.genre)
                })
                .catch(_error => {
                    reject(_error)
                })
            })
        },

        getGenreById: (state, value) => {
            for (let index in state.genre) {
                if (state.genre[index].id === value.id) {
                    // resolve(data)
                    break;
                }
            }
        },
        addNewGenre({ state, commit }, value) {
            return new Promise(function (resolve) {
                ApiService.save(state.endpoint, value)
                .then(response => {
                    commit('addNewGenre', response.data)
                    resolve(response.data)
                })
                .catch(_error => {
                    reject(_error)
                })
            })
        },

        updateGenreData({ state, commit }, { value }) {
            return new Promise(function (resolve, reject) {
                ApiService.customUpdate(state.endpoint + "/" + value.id, value)
                .then(response => {
                    commit('updateGenreData', { id: value.id, newValue: response.data })
                    resolve(response.data)
                })
                .catch(_error => {
                    reject(_error)
                })
            })
        },
        approveGenre({ state }, { id,status}) {
            return new Promise(function (resolve, reject) {
                ApiService.patch(state.endpoint + "/" + id,status)
                .then(response => {
                    // commit('updateGenreData', { id: value.id, newValue: response.data })
                    resolve(response.data)
                })
                .catch(_error => {
                    reject(_error)
                })
            })
        },
        deleteGenreData({ state, commit }, id) {
            return new Promise(function (resolve) {
                ApiService.delete(state.endpoint + "/" + id)
                .then(response => {
                    commit('deleteGenreData', id)
                    resolve(response.data)
                })
                .catch(_error => {

                    reject(_error)
                })
            })
        },

    }
}
