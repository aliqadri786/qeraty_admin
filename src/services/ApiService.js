import Api from '@/services/Api'

export default {

  getAll(endpoint) {
    return Api().get(endpoint)
  },
  save(endpoint, data) {
    return Api().post(endpoint, data)
  },
  update(endpoint, data) {
    return Api().put(endpoint + '/' + data.id, data)
  },
  patch(endpoint, data) {
    return Api().patch(endpoint, data)
  },
  customUpdate(endpoint, data) {
    return Api().put(endpoint, data)
  },
  delete(endpoint) {
    return Api().delete(endpoint)
  }
}
