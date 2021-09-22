import axios from 'axios';
import { toFormData } from '../functions';
import packageJson from '../../package.json';
const API = packageJson.backendUrl + '/api';



const login = (email, token) => new Promise((resolve, reject) => {
    axios.post(API + '/auth/login/', toFormData({ email, token }), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data))
    .catch(reject)
})



const logout = token => new Promise((resolve, reject) => {
    axios.post(API + '/auth/logout/', {}, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data))
    .catch(reject)
})



const getUserInfo = token => new Promise((resolve, reject) => {
    axios.get(API + '/user/get-user/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data))
    .catch(reject)
})



const getUserEmployees = token => new Promise((resolve, reject) => {
    axios.get(API + '/user/get-employees/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data.data))
    .catch(reject)
})



const getUserOutcomes = token => new Promise((resolve, reject) => {
    axios.get(API + '/user/get-outcomes/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data.data))
    .catch(reject)
})



const getAllUsers = (token, search) => new Promise((resolve, reject) => {
    axios.get(API + '/admin/get-users/?search=' + search, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data.data))
    .catch(err => {
        console.log(err.response);
        reject(err)
    })
})



const getAllOutcomes = token => new Promise((resolve, reject) => {
    axios.get(API + '/admin/get-outcomes/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data.data))
    .catch(reject)
})



const generateNewRe = (token, employeeId) => new Promise((resolve, reject) => {
    axios.post(API + '/admin/researches/generate/', toFormData({ employeeId }), {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data))
    .catch(reject)
})



const getUserResearches = token => new Promise((resolve, reject) => {
    axios.get(API + '/user/get-active-researches/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => {
        resolve(res.data.data)
    })
    .catch(reject)
})



const getAnswers = (token, id) => new Promise((resolve, reject) => {
    axios.get(API + '/researches/' + id + '/answers/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data.data))
    .catch(err => {
        console.log(err.response.data)
        reject(err)
    })
})



const getQuestions = () => new Promise((resolve, reject) => {
    axios.get(API + '/researches/questions/')
    .then(res => resolve(res.data.data))
    .catch(reject)
})



const getReasons = () => new Promise((resolve, reject) => {
    axios.get(API + '/researches/reasons/')
    .then(res => resolve(res.data.data))
    .catch(reject)
})



const updateResearch = (token, id, data) => new Promise((resolve, reject) => {
    axios.patch(API + `/researches/${id}/`, data, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data))
    .catch(reject)
})



const getOutcomeBase64 = (token, outcomeId) => new Promise((resolve, reject) => {
    axios.post(API + '/admin/get-pdf', toFormData({ outcomeId }), {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data.data))
    .catch(reject)
})




export {
    login,
    logout,
    getUserInfo,
    getUserEmployees,
    getUserOutcomes,
    getQuestions,
    getReasons,
    getUserResearches,
    updateResearch,
    getAnswers,
    getAllUsers,
    getAllOutcomes,
    generateNewRe,
    getOutcomeBase64
}
