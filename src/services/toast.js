import 'izitoast/dist/css/iziToast.min.css'
import iZtoast from 'izitoast'

export default {
  // The install method will be called with the Vue constructor as
  // the first argument, along with possible options
  install(Vue) {
    Vue.prototype.$error = () => {
      iZtoast.error({
            title: 'Error',
            message: 'Something went wrong, try again.',
            position: 'topCenter'
          })
    }
///////////////////////////////////////////////////////
    Vue.prototype.$error = (message) => {
      iZtoast.error({
            title: 'Error',
            message: message,
            position: 'topCenter'
          })
    }
    ///////////////////////////Error///////////////////////

    Vue.prototype.$success = (message) => {
      iZtoast.success({
        title: 'Success',
        message: message,
        position: 'topCenter'
      })
    }
    ///////////////////////////Success///////////////////////

    Vue.prototype.$missingDataToast = (message = 'Please fill all mandatory Fields') => {
      iZtoast.error({
        title: 'Error',
        message: message,
        position: 'topCenter'
      })
    }
    ///////////////////////////Mandatory///////////////////////

  }
}
// const toast = {
//   error: (title = 'Error', message) => {
//     return iZtoast.error({
//       title: title,
//       message: message,
//       position: 'topCenter'
//     })
//   },
//   success: (title = 'Success', message) => {
//     return iZtoast.success({
//       title: title,
//       message: message,
//       position: 'topCenter'
//     })
//   }
// }

// export default toast
