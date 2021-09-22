import React, { useState, useEffect } from 'react';
import { getQuestions, getReasons } from '../../../api';
import { createNotification } from '../../../functions';
import Input from './Input';
import Answers from './Answers';
import pj from '../../../../package.json';
const initAnswers = JSON.parse(window.localStorage.getItem(pj.answers));

const Form = props => {

    const [questions, setQuestions] = useState([]);
    const [reasons, setReasons] = useState([]);
    const [answers, setAnswers] = useState(initAnswers ? initAnswers : {});

    useEffect(() => {
        getQuestions().then(res => {
            res = [...res.slice(1, 6), res[0], ...res.slice(6)];
            setQuestions(res)
        }).catch(err => {
            console.log(err);
            createNotification('error', 'Nie udało się pobrać pytań');
        })
        getReasons().then(res => setReasons(res)).catch(err => {
            console.log(err);
            createNotification('error', 'Nie udało się pobrać powodów badania');
        })
    }, []);

    useEffect(() => {
        window.localStorage.setItem(pj.answers, JSON.stringify(answers));
    }, [answers]);

    const updateAnswer = e => {
        const { name, value } = e.target;
        setAnswers({
            ...answers,
            [name]: value
        });
    }

    const skills = questions.find(question => question._option === 'SKILLS');
    const courses = questions.find(question => question._option === 'COURSES');

    return(
        <form onSubmit={props.onSubmit}>
            {props.type !== 'result' &&
                <div>
                    <h1>System Okresowej Oceny Pracowników, {new Date().getFullYear()}</h1>
                    <br/>
                    {props.employee.first_name} {props.employee.last_name}, nr. {props.research.number},
                    <label>
                        Podaj datę rozpoczęcia pracy na obecnym stanowisku:
                        <input
                            type="text"
                            name="start_date"
                            onChange={updateAnswer}
                            className="ml-5 form-control"
                            value={answers[`start_date`]}
                            required
                        />
                    </label>
                    <br/>
                    <label>
                        Stanowisko:
                        <input
                            type="text"
                            name="position"
                            onChange={updateAnswer}
                            className="ml-5 form-control"
                            value={answers[`position`]}
                            required
                        />
                    </label>
                    <br/>
                    <label>
                        Powód badania:
                        <select
                            name="reason"
                            className="ml-5 mt-1 form-control"
                            onChange={updateAnswer}
                            required
                        >
                            {reasons.map((reason, key) =>
                                <option 
                                    key={key} 
                                    value={reason.id}
                                    selected={reason.id == answers['reason']}
                                >{reason.name}</option>
                            )}
                        </select>
                    </label>
                    <hr className="mt-5"/>
                    <div className="m-5">
                        Zaznacz odpowiedź w skali od 1 do 5, gdzie:<br/>
                        5 – ocena zdecydowanie powyżej standardowej, pracownik wyraźnie wyróżnia się spośród innych, przewyższa oczekiwania,<br/>
                        4 – ocena powyżej standardowej, pracownik osiąga dobre rezultaty pracy, całkowicie spełnia oczekiwania,<br/>
                        3 – ocena standardowa, pracownik spełnia oczekiwania zadowalająco,<br/>
                        2 – ocena poniżej standardowej, pracownik spełnia niektóre oczekiwania,<br/>
                        1 – ocena zdecydowanie poniżej standardowej, pracownik nie spełnia oczekiwań<br/>
                        <b>* Wszystkie pola są wymagane</b>
                    </div>
                </div>
            }
            {props.type === 'result' &&
                <div>
                    <h1 className="text-lg my-2"><b>{props.employee.first_name} {props.employee.last_name}</b></h1>
                    <p>Rozpoczęcie pracy: {props.reAnswers[0].content}</p>
                    <p>Stanowisko: {props.reAnswers[1].content}</p>
                </div>
            }
            {questions.map((question, key) => 
                <React.Fragment key={key}>
                    {(question._option !== 'HR_RES' && question._option !== 'EXCEPT_VAL' && question._option !== 'COMPET_PROFILE' &&
                      question._option !== 'SKILLS' && question._option !== 'COURSES') &&
                        <div>
                            <h1 className="text-2xl mt-10">
                                {!props.forEmployee ? question.for_manager : question.for_employee}
                            </h1>
                            <small className="text-gray-400">{question.info}</small>
                            {props.type !== 'result' &&
                                <Input 
                                    question={question} 
                                    answers={answers}
                                    updateAnswer={updateAnswer}
                                />
                            }
                            {props.type === 'result' &&
                                <Answers
                                    question={question}
                                    answers={props.reAnswers}
                                />
                            }
                            {question.subquestions.map((subquestion, key2) =>
                                <div 
                                    key={key2}
                                    className="ml-3"
                                >
                                    <h3 className="text-lg">
                                        {!props.forEmployee ? subquestion.for_manager : subquestion.for_employee}
                                    </h3>
                                    {props.type !== 'result' &&
                                        <Input 
                                            question={subquestion} 
                                            answers={answers}
                                            updateAnswer={updateAnswer}
                                        />
                                    }
                                    {props.type === 'result' &&
                                        <Answers
                                            question={subquestion}
                                            answers={props.reAnswers}
                                        />
                                    }
                                </div>
                            )}
                        </div>
                    }
                </React.Fragment>
            )}
            <div>
                <div>
                    <img
                        src="/agenda.png"
                        alt="Agenda"
                        className="mx-auto my-10"
                    />
                </div>
                <h1 className="text-xl"><b>Skala 0 - 3, gdzie 3 jest wartością oczekiwaną</b></h1>
                <br/>
                <br/>
                <table className="table table mx-auto text-left">
                    <thead>
                        <tr>
                            <th>Kompetencja</th>
                            <th>Poziom oczekiwany</th>
                            <th>Poziom obecny</th>
                            <th>Opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, key) => 
                            <React.Fragment key={key}>
                                {question._option === 'EXCEPT_VAL' &&
                                    <tr>
                                        <td className="text-2xl mt-10">
                                            <p className="text-lg">{!props.forEmployee ? question.for_manager : question.for_employee}</p>
                                        </td>
                                        {question.subquestions.map((subquestion, key2) =>
                                            <td 
                                                key={key2}
                                                className="ml-3"
                                            >
                                                {props.type !== 'result' &&
                                                    <Input 
                                                        question={subquestion} 
                                                        answers={answers}
                                                        updateAnswer={updateAnswer}
                                                        min="0"
                                                        max="3"
                                                        dVal="0"
                                                    />
                                                }
                                                {props.type === 'result' &&
                                                    <Answers
                                                        question={subquestion}
                                                        answers={props.reAnswers}
                                                    />
                                                }
                                            </td>
                                        )}
                                    </tr>
                                }
                            </React.Fragment>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-20">
                <h1 className="text-xl"><b>Profil kompetencji - skala od 1 do 3, gdzie 3 jest wartością oczekiwaną</b></h1>
                <table className="table table mx-auto my-10">
                    <thead>
                        <tr>
                            <th>Kompetencja</th>
                            <th>Poziom oczekiwany</th>
                            <th>Poziom obecny</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, key) => 
                            <React.Fragment key={key}>
                                {question._option === 'COMPET_PROFILE' &&
                                    <tr>
                                        <td className="text-2xl mt-10">
                                            <p className="text-lg">{!props.forEmployee ? question.for_manager : question.for_employee}</p>
                                        </td>
                                        {question.subquestions.map((subquestion, key2) =>
                                            <td 
                                                key={key2}
                                                className="ml-3"
                                            >
                                                {props.type !== 'result' &&
                                                    <Input 
                                                        question={subquestion} 
                                                        answers={answers}
                                                        updateAnswer={updateAnswer}
                                                        min="1"
                                                        max="3"
                                                        dVal="3"
                                                    />
                                                }
                                                {props.type === 'result' &&
                                                    <Answers
                                                        question={subquestion}
                                                        answers={props.reAnswers}
                                                    />
                                                }
                                            </td>
                                        )}
                                    </tr>
                                }
                            </React.Fragment>
                        )}
                    </tbody>
                </table>
            </div>
            {skills &&
                <div className="mt-20 text-center">
                    <h3 className="text-xl">{!props.forEmployee ? skills.for_manager : skills.for_employee}</h3>
                    <table className="table table mx-auto mt-5">
                        <tbody>
                            {skills.subquestions.slice(0, 4).map((sq, key) => 
                                <React.Fragment key={key}>
                                    <tr>
                                        <td>
                                            {props.type !== 'result' &&
                                                <Input 
                                                    question={sq}
                                                    answers={answers}
                                                    updateAnswer={updateAnswer}
                                                    required={false}
                                                />
                                            }
                                            {props.type === 'result' &&
                                                <Answers
                                                    question={sq}
                                                    answers={props.reAnswers}
                                                />
                                            }
                                        </td>
                                        <td>
                                            {props.type !== 'result' &&
                                                <Input 
                                                    question={skills.subquestions[key + 4]}
                                                    answers={answers}
                                                    updateAnswer={updateAnswer}
                                                    required={false}
                                                />
                                            }
                                            {props.type === 'result' &&
                                                <Answers
                                                    question={skills.subquestions[key + 4]}
                                                    answers={props.reAnswers}
                                                />
                                            }
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )}
                        </tbody>
                    </table>
                </div>
            }
            {courses &&
                <div>
                    <h1 className="text-2xl mt-10">
                        {!props.forEmployee ? courses.for_manager : courses.for_employee}
                    </h1>
                    <small className="text-gray-400">{courses.info}</small>
                    {props.type !== 'result' &&
                        <Input 
                            question={courses} 
                            answers={answers}
                            updateAnswer={updateAnswer}
                        />
                    }
                    {props.type === 'result' &&
                        <Answers
                            question={courses}
                            answers={props.reAnswers}
                        />
                    }
                    {courses.subquestions.map((subquestion, key2) =>
                        <div 
                            key={key2}
                            className="ml-3"
                        >
                            <h3 className="text-lg">
                                {!props.forEmployee ? subquestion.for_manager : subquestion.for_employee}
                            </h3>
                            {props.type !== 'result' &&
                                <Input 
                                    question={subquestion} 
                                    answers={answers}
                                    updateAnswer={updateAnswer}
                                />
                            }
                            {props.type === 'result' &&
                                <Answers
                                    question={subquestion}
                                    answers={props.reAnswers}
                                />
                            }
                        </div>
                    )}
                </div>
            }
            <div className="mt-20">
                <h1 className="text-xl"><b>Wnioski kadrowe</b> * wypełnia przełożony</h1>
                {questions.map((question, key) => 
                    <React.Fragment key={key}>
                        {question._option === 'HR_RES' &&
                            <div>
                                <h1 className="text-2xl mt-10">
                                    {!props.forEmployee ? question.for_manager : question.for_employee}
                                </h1>
                                <small className="text-gray-400">{question.info}</small>
                                {props.type !== 'result' &&
                                    <Input 
                                        question={question} 
                                        answers={answers}
                                        updateAnswer={updateAnswer}
                                        required={props.type === 'ofEmployee'}
                                    />
                                }
                                {props.type === 'result' &&
                                    <Answers
                                        question={question}
                                        answers={props.reAnswers}
                                    />
                                }
                                {question.subquestions.map((subquestion, key2) =>
                                    <div 
                                        key={key2}
                                        className="ml-3"
                                    >
                                        <h3 className="text-lg">
                                            {!props.forEmployee ? subquestion.for_manager : subquestion.for_employee}
                                        </h3>
                                        {props.type !== 'result' &&
                                            <Input 
                                                question={subquestion} 
                                                answers={answers}
                                                updateAnswer={updateAnswer}
                                                required={props.type === 'ofEmployee'}
                                            />
                                        }
                                        {props.type === 'result' &&
                                            <Answers
                                                question={subquestion}
                                                answers={props.reAnswers}
                                            />
                                        }
                                    </div>
                                )}
                            </div>
                        }
                    </React.Fragment>
                )}
            </div>
            {props.type !== 'result' &&
                <button
                    type="submit"
                    className="border border-blue-500 rounded shadow bg-blue-500 m-5 p-3 text-white hover:bg-blue-600"
                >
                    Zapisz
                </button>
            }
        </form>
    )
}

export default Form;