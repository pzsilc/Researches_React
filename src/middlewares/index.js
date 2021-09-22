import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserInfo } from '../api';
import pj from '../../package.json';



const GuestRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);
    useEffect(() => {
        getUserInfo(window.localStorage.getItem(pj.tokenKey))
        .then(res => setLogged(Boolean(res)))
        .catch(() => setLogged(false))
    }, [])
    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Redirect to={{ pathname: '/research/', state: { from: props.location } }} />
              ) : (
                <Component {...props} />
              )
            }
        />
    )
}


const LoggedRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);

    useEffect(() => {
        getUserInfo(window.localStorage.getItem(pj.tokenKey))
        .then(res => {
          setLogged(Boolean(res.data))
        })
        .catch(() => setLogged(false))
    }, [])

    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/research/login', state: { from: props.location } }} />
            )
            }
        />
    )
}


const AdminRoute = ({ component: Component, ...rest }) => {
    const [ logged, setLogged ] = useState(null);

    useEffect(() => {
        getUserInfo(window.localStorage.getItem(pj.tokenKey))
        .then(res => {
            setLogged(Boolean(res.data && res.data.is_admin))
        })
        .catch(() => setLogged(false))
    }, [])

    if(logged === null)
        return null;
    return(
        <Route {...rest} render={props => logged ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/research/', state: { from: props.location } }} />
            )
            }
        />
    )
}


export {
    GuestRoute,
    LoggedRoute,
    AdminRoute
}
