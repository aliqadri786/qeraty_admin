// import Api from '@/services/Api'


// export default {
//     // The install method will be called with the Vue constructor as
//     // the first argument, along with possible options
//     install(Vue, options) {
//         Vue.prototype.$validate = (obj, validations) => {
//             var keys = Object.keys(validations);
//             for (var i = 0; i < keys.length; i++) {
//                 let key = keys[i];
//                 if (obj[key] === '') {
//                     validations[key] = true;
//                     return false;
//                 }
//                 else {
//                     validations[key] = false;
//                 }
//             }
//             return true;
//         }
//         Vue.prototype.$notify = (phone, msg) => {

//             // db.collection('Users')
//             //     .doc(phone)
//             //     .get()
//             //     .then(snapshot => {
//             //         console.log(snapshot.data().messageToken);

//             //         var notifyObject = {
//             //             to: snapshot.data().messageToken,
//             //             collapse_key: 'type_a',
//             //             data: msg
//             //         }
//             //         Api().post("", notifyObject).then(data => {
//             //             // firebase.database().ref('User/' + phone + "/Notification").push().set(notifyObject.data);
//             //             console.log(data.data);
//             //         })
//             //     });

//         }
//         Vue.prototype.$currentDate = () => {
//             // var today = new Date();
//             // var dd = String(today.getDate()).padStart(2, '0');
//             // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//             // var yyyy = today.getFullYear();

//             // today = dd + '-' + mm + '-' + yyyy;
//             return new Date().toISOString().slice(0, 10);
//         }
//         Vue.prototype.$findIndex = (array, id) => {
//             // var today = new Date();
//             // var dd = String(today.getDate()).padStart(2, '0');
//             // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//             // var yyyy = today.getFullYear();

//             // today = dd + '-' + mm + '-' + yyyy;
//             for (item in array) {
//                 console.log(item);

//                 if (array[item].id === id)
//                     return item
//             }
//             return -1;
//         }
//         ///////////////////////////Validate///////////////////////

//     }
// }
// // const utility = {}

// // utility.install = function (Vue, options) {
// // }