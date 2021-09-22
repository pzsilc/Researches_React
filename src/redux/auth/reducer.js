import types from './types';
import pj from '../../../package.json';

const initState = {
    token: window.localStorage.getItem(pj.tokenKey),
    user: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case types.SET_TOKEN: {
            window.localStorage.setItem(pj.tokenKey, action.token);
            return {
                ...state,
                token: action.token
            }
        }
        case types.REM_TOKEN: {
            window.localStorage.removeItem(pj.tokenKey);
            return {
                ...state,
                token: null
            }
        }
        case types.FETCH_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        default:
            return state
    }
}

export default authReducer;