import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserEmployees, getUserOutcomes, getUserResearches } from '../../../api';
import { createNotification } from '../../../functions';
import { Link } from 'react-router-dom';


const Account = props => {

    const [employees, setEmployees] = useState([]);
    const [outcomes, setOutcomes] = useState([]);
    const [researches, setResearches] = useState([]);

    useEffect(() => {
        getUserEmployees(props.token).then(res => setEmployees(res)).catch(err => {
            console.log(err);
            createNotification('error', 'Nie udało się wczytać pracowników');
        });
        getUserOutcomes(props.token).then(res => setOutcomes(res)).catch(err => {
            console.log(err);
            createNotification('error', 'Nie udało się wczytać wyników');
        });
        getUserResearches(props.token).then(res => setResearches(res)).catch(err => {
            console.log(err);
            createNotification('error', 'Nie udało się wczytać badań');
        });
    }, []);

    if(researches.rest){
        employees.forEach(e => {
            e.research = researches.rest.find(r => r.employee === e.id);
        })
    }

    return(
        <div>
            <h1 className="text-center text-2xl">{props.user.first_name} {props.user.last_name}</h1>
            <div className="flex mt-20">
                <div className="w-1/3 m-5">
                    <b>Pracownicy</b>
                    <ul>
                        {employees.map((employee, key) =>
                            <li key={key}>
                                <br/>
                                {employee.first_name} {employee.last_name}
                                {researches.rest &&
                                    <p className="text-gray-500">(aktywne badanie: {
                                        employee.research ? 
                                        <Link 
                                            className="text-red-500"
                                            to={`/research/researches/${employee.research.id}/`}
                                        >
                                            <b>{employee.research.number}</b>
                                        </Link> : 
                                        <b>BRAK</b>
                                    })</p>
                                }
                            </li>
                        )}
                    </ul>
                    {employees.length === 0 &&
                        <p className="text-gray-300 text-center mt-3">Brak pracowników</p>
                    }
                </div>
                <div className="w-1/3 border-l border-r p-5">
                    <b>Wyniki</b>
                    <ul>
                        {outcomes.map((outcome, key) =>
                            <li key={key}>
                                <br/>
                                <Link 
                                    to={`/research/outcomes/${outcome.id}/`}
                                    className="border p-3 m-1 cursor-pointer hover:bg-blue-500"
                                >
                                    {outcome.number}
                                </Link>
                            </li>
                        )}
                    </ul>
                    {outcomes.length === 0 &&
                        <p className="text-gray-300 text-center mt-3">Brak wyników</p>
                    }
                </div>
                <div className="w-1/3 p-5">
                    {researches.own &&
                        <React.Fragment>
                            <Link to={`/research/researches/own/${researches.own.id}/`}>
                                <b className="text-red-500">
                                    <i className="fa fa-info mr-3"></i>
                                    Twoje badanie
                                </b>
                            </Link>
                            <br/>
                            <br/>
                        </React.Fragment>
                    }
                    <Link to="/research/logout">
                        <i className="fa fa-sign-out-alt mr-3"></i>
                        Wyloguj się
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token
});
export const AccountContainer = connect(mapStateToProps, null)(Account);
