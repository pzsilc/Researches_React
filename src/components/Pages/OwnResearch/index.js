import React, { useState, useEffect } from 'react';
import Form from '../Form';
import { connect } from 'react-redux';
import { getUserResearches, updateResearch } from '../../../api';
import { createNotification } from '../../../functions';
import pj from '../../../../package.json';


const OwnResearch = props => {

    const [loading, setLoading] = useState(true);
    const [research, setResearch] = useState({});

    useEffect(() => {
        getUserResearches(props.token)
        .then(res => {
            if(res.own.id != props.match.params.id){
                props.history.push('/research/');
            }
            setResearch(res.own);
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
            props.history.push('/research/');
        })
    }, [])
    
    const onSubmit = e => {
        e.preventDefault();
        var data = {};
        for(const [name, value] of Object.entries(e.target)){
            data[value.name] = value.value;
        }
        updateResearch(props.token, research.id, data)
        .then(res => {
            createNotification('success', 'Odpowiedzi zostały zapisane');
            window.localStorage.removeItem(pj.answers);
            props.history.push('/research');
        })
        .catch(err => {
            console.log(err);
            createNotification('error', 'Coś poszło nie tak');
        })
    }

    if(loading){
        return(
            <div className="text-center mt-5">
                <i className="fa fa-cogs"></i>
            </div>
        )
    }
    return(
        <div>
            <Form
                onSubmit={onSubmit}
                employee={props.user}
                research={research}
                type="own"
            />
        </div>
    )
}

const mapStateToProps = state => ({ 
    user: state.auth.user,
    token: state.auth.token
});
export const OwnResearchContainer = connect(mapStateToProps, null)(OwnResearch);







