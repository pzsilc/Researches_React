import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserOutcomes, getAnswers, getOutcomeBase64, getAllOutcomes } from '../../../api';
import { createNotification } from '../../../functions';
import { Link, useHistory } from 'react-router-dom';
import Form from '../Form';


const Outcome = props => {

    let history = useHistory();
    const [outcome, setOutcome] = useState(null);
    const [loading, setLoading] = useState(null);
    const [answers, setAnswers] = useState([]);
    
    useEffect(() => {
        if(!props.user.is_admin){
            getUserOutcomes(props.token)
            .then(res => {
                let outcome = res.find(r => r.id === props.match.params.id);
                if(outcome){
                    setOutcome(outcome);
                    setLoading(false);
                } else {
                    props.history.push('/research');
                }
            })
            .catch(err => {
                console.log(err);
            })
        } else {
        getAllOutcomes(props.token)
            .then(res => {
                let outcome = res.find(r => r.id === props.match.params.id);
                if(outcome){
                    setOutcome(outcome);
                    setLoading(false);
                } else {
                    props.history.push('/research');
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, []);

    useEffect(() => {
        if(outcome){
            getAnswers(props.token, outcome.id)
            .then(setAnswers)
            .catch(err => {
                console.log(err);
                createNotification('error', 'Nie udało się wczytać odpowiedzi');
            })
        }
    }, [outcome]);

    const print = () => {
        getOutcomeBase64(props.token, outcome.id)
        .then(base64 => {
            var a = document.createElement("a");
            a.href = "data:image/png;base64," + base64;
            a.download = "Image.png";
            a.click();
        })
        .catch(err => {
            console.log(err);
            createNotification('error', 'Coś poszło nie tak');
        })
    }

    if(loading || !answers.length || !outcome)
        return <div className="text-center mt-5">
            <i className="fa fa-cogs"></i>
        </div>;
    return(
        <div>
            <div className="flex justify-between">
                <button 
                    className="text-lg"
                    onClick={history.goBack}
                >
                    <i className="fa fa-arrow-left mr-3"></i>
                    Wróć
                </button>
                <button
                    type="button"
                    className="p-3 shadow border cursor-pointer hover:bg-blue-500 hover:text-white"
                    onClick={print}
                >
                    <i className="fa fa-print mr-3"></i>
                    Drukuj PDF
                </button>
            </div>
            <div className="p-5">
                <h1 className="text-2xl text-center pb-5">Wyniki badania oceny pracowniczej</h1>
                <hr/>
                <Form
                    type="result"
                    reAnswers={answers}
                    onSubmit={null}
                    employee={outcome.employee}
                    research={outcome}
                />
            </div>
        </div>
    )
}


const mapStateToProps = state => ({ 
    user: state.auth.user,
    token: state.auth.token 
});
export const OutcomeContainer = connect(mapStateToProps, null)(Outcome);