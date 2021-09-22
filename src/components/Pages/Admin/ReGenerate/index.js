import React, { useEffect, useState } from 'react';
import { getAllUsers, generateNewRe } from '../../../../api';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNotification } from '../../../../functions';


const AdminReGenerate = props => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers()
    }, [search])

    const fetchUsers = () => {
        getAllUsers(props.token, search).then(setUsers).catch(err => {
            console.log(err)
            createNotification('error', 'Nie udało się pobrać pracowników.');
        })
    }

    const searchChange = e => {
        const { value } = e.target;
        setSearch(value)
    }

    const generate = employeeId => {
        generateNewRe(props.token, employeeId)
        .then(res => {
            console.log(res);
            createNotification('success', 'Wygenerowano badanie');
        })
        .catch(err => {
            console.log(err.response);
            createNotification('error', 'Nie udało się wygenerować badania');
        })
    }

    return(
        <div>
            <Link to="/research/admin/">
                <i className="fa fa-arrow-left mr-3"></i>
                Wróć
            </Link>
            <h1 className="my-6 text-2xl">Pracownicy:</h1>
            <label>
                <input 
                    type="text"
                    placeholder="Szukaj"
                    onChange={searchChange}
                    value={search}
                    className="form-control"
                />
            </label>
            <ul className="mt-5">
                {users.map((user, key) => 
                    <React.Fragment key={key}>
                        {user.manager &&
                            <li>
                                <div>
                                    {user.first_name} {user.last_name}
                                    <span>(kierownik: {user.manager.first_name} {user.manager.last_name})</span>
                                    <button
                                        type="button"
                                        onClick={() => generate(user.id)}
                                    >
                                        <i className="text-blue-500 ml-3">Wygeneruj badanie</i>
                                    </button>
                                </div>
                            </li>
                        }
                    </React.Fragment>
                )}
            </ul>
        </div>
    )
}


const mapStateToProps = state => ({ token: state.auth.token })
export const AdminReGenerateContainer = connect(mapStateToProps, null)(AdminReGenerate)








