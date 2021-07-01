import ApiService from "../services/ApiService";
import { reject } from "q";

export default {
  strict: true,
  state: {
    dashboard: [],
    saleData: [],
    saleSchema: [],
    endpoint: "dashboard",
    end: "dashboard/graph",
    data: "data_fetch",
    schema: "schema_fetch"
  },
  mutations: {
    setAllDashboards: (state, value) => {
      state.dashboard = value;
    },
    setSaleData: (state, value) => {
      state.saleData = value;
    },
    setSaleSchema: (state, value) => {
      state.saleSchema = value;
    },
    addNewDashboard: (state, value) => {
      state.dashboard.push(value);
    },
    updateDashboardData: (state, { id, newValue }) => {
      for (let i = 0; i < state.dashboard.length; i++) {
        //console.log(index)
        if (state.dashboard[i].id === id) {
          state.dashboard.splice(i, 1, newValue);
          break;
        }
      }
    },
    deleteDashboardData: (state, index) => {
      state.dashboard.splice(index, 1);
    }
  },
  actions: {
    getAllDashboards({ state, commit }) {
      return new Promise(resolve => {
        ApiService.getAll(state.endpoint)
          .then(response => {
            let data = response.data;
            commit("setAllDashboards", data);
            resolve(state.dashboard);
          })
          .catch(_error => {
            reject(_error);
          });
      });
    },

    getDashboardTopCards({ state }) {
      return new Promise(resolve => {
        ApiService.getAll(state.endpoint + "/cards")
          .then(response => {
            let data = response.data;
            resolve(data);
          })
          .catch(_error => {
            reject(_error);
          });
      });
    },

    getDashboardLineGraph({ state }, value) {
      return new Promise(resolve => {
        ApiService.getAll(state.endpoint + "/graph/sale?check=" + value)
          .then(response => {
            let data = response.data;
            resolve(data);
          })
          .catch(_error => {
            reject(_error);
          });
      });
    },

    getSaleByProducts({ state }, dates) {
      return new Promise(resolve => {
        ApiService.getAll(
          state.endpoint +
            "/sales?start_date=" +
            dates.start_date +
            "&end_date=" +
            dates.end_date
        )
          .then(response => {
            let data = response.data;

            resolve(data);
          })
          .catch(_error => {
            reject(_error);
          });
      });
    },

    getSaleData({ state, commit }) {
      return new Promise(resolve => {
        ApiService.getAll(state.end + "/sale/" + state.data)
          .then(response => {
            let data = response.data;
            commit("setSaleData", data);
            resolve(state.saleData);
          })
          .catch(_error => {
            reject(_error);
          });
      });
    },
    getSaleSchema({ state, commit }) {
      return new Promise(resolve => {
        ApiService.getAll(state.end + "/sale/" + state.schema)
          .then(response => {
            let data = response.data;
            commit("setSaleSchema", data);
            resolve(state.saleSchema);
          })
          .catch(_error => {
            reject(_error);
          });
      });
    },

    getDashboardById: (state, value) => {
      for (let index in state.dashboard) {
        if (state.dashboard[index].id === value.id) {
          // resolve(data)
          break;
        }
      }
    },
    addNewDashboard({ state, commit }, value) {
      return new Promise(function(resolve) {
        ApiService.save(state.endpoint, value)
          .then(response => {
            commit("addNewDashboard", response.data);
            resolve(response.data);
          })
          .catch(_error => {
            reject(_error);
          });
      });
    },

    updateDashboardData({ state, commit }, { value }) {
      return new Promise(function(resolve, reject) {
        ApiService.customUpdate(state.endpoint + "/" + value.id, value)
          .then(response => {
            commit("updateDashboardData", {
              id: value.id,
              newValue: response.data
            });
            resolve(response.data);
          })
          .catch(_error => {
            reject(_error);
          });
      });
    },

    deleteDashboardData({ commit }, index) {
      return new Promise(function(resolve) {
        commit("deleteDashboardData", index);
        resolve(index);
      });
    }
  }
};
