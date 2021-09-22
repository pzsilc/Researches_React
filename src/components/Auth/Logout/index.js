import { useEffect } from 'react';
import { logout } from '../../../api';
import { connect } from 'react-redux';
import authActions from '../../../redux/auth/actions';
import { createNotification } from '../../../functions';

const Logout = props => {
    useEffect(() => {
        logout(props.token)
        .then(res => {
            console.log(res);
            props.removeToken();
            window.location.replace('/research/login');
        })
        .catch(err => {
            console.log(err);
            createNotification('error', 'Coś poszło nie tak. Nie udało się wylogować');
        })
    }, [props.token])
    return null;
}

const mapStateToProps = state => ({ token: state.auth.token })
const mapDispatchToProps = dispatch => ({ removeToken: () => dispatch(authActions.remToken()) })
export const LogoutContainer = connect(mapStateToProps, mapDispatchToProps)(Logout)
