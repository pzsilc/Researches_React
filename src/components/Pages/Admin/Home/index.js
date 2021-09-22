import React, { useEffect, useState } from 'react';
import { getAllOutcomes } from '../../../../api';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';



const AdminHome = props => {
    const history = useHistory();
    var [outcomes, setOutcomes] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getAllOutcomes(props.token).then(setOutcomes).catch(console.log);
    }, [])

    const searchChanged = e => {
        const { value } = e.target;
        setSearch(value);
    }

    if(search.length){
        outcomes = outcomes.filter(o => {
            if(o.employee){
                if(o.employee.first_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || o.employee.last_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                    return true;
                }
            }
            if(o.manager){
                if(o.manager.first_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || o.manager.last_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                    return true;
                }
            }
        })
    }

    return(
        <div>
            <button 
                className="text-lg"
                onClick={history.goBack}
            >
                <i className="fa fa-arrow-left mr-3"></i>
                Wróć
            </button>
            <br/>
            <br/>
            <Link to="/research/admin/generate/">Wygeneruj ankiety</Link>
            <br/>
            <a href="http://192.168.0.234/employees-management" target="_blank">Podpinanie pracowników (hasło: P@$$w0rd)</a>
            <h1 className="text-2xl my-6">Wyniki</h1>
            <label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Szukaj"
                    onChange={searchChanged}
                    value={search}
                />
            </label>
            <table className="table-auto w-full text-center mt-5">
                <thead className="bg-blue-500">
                    <tr>
                        <th>ID</th>
                        <th>Pracownik</th>
                        <th>Kierownik</th>
                        <th>Czas wypełnienia pracownika</th>
                        <th>Czas wypełnienia kierownika</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {outcomes.map((outcome, key) => 
                        <tr key={key} className={`bg-blue-${key % 2 ? '200' : '300'}`}>
                            <td>{outcome.id}</td>
                            <td>{outcome.employee && <span>{outcome.employee.first_name} {outcome.employee.last_name}</span>}</td>
                            <td>{outcome.manager && <span>{outcome.manager.first_name} {outcome.manager.last_name}</span>}</td>
                            <td>{outcome.employee_dt}</td>
                            <td>{outcome.manager_dt}</td>
                            <td><Link to={`/research/outcomes/${outcome.id}/`}>Zobacz</Link></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}



const mapStateToProps = state => ({ token: state.auth.token })
export const AdminHomeContainer = connect(mapStateToProps, null)(AdminHome)