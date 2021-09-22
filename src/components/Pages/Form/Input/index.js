import { prototype } from 'form-data';
import React from 'react';

const Input = props => {
    const required = props.required === false ? props.required : true;
    const q = props.question;
    if(q._option === 'HIDDEN'){
        return null;
    }
    const { answers, updateAnswer } = props;
    switch(parseInt(q.input_type)){
        case 1: return <div>
            <label>
                <input
                    type="radio"
                    name={"__" + q.id + "__"}
                    value="1"
                    className="form-control ml-2 mr-1"
                    onChange={updateAnswer}
                    defaultChecked={answers[`__${q.id}__`] == '1'}
                    required={Boolean(required)}
                />
                1
            </label>
            <label>
                <input
                    type="radio"
                    name={"__" + q.id + "__"}
                    value="2"
                    className="form-control ml-2 mr-1"
                    onChange={updateAnswer}
                    defaultChecked={answers[`__${q.id}__`] == '2'}
                    required={Boolean(required)}
                />
                2
            </label>
            <label>
                <input
                    type="radio"
                    name={"__" + q.id + "__"}
                    value="3"
                    className="form-control ml-2 mr-1"
                    onChange={updateAnswer}
                    defaultChecked={answers[`__${q.id}__`] == '3'}
                    required={Boolean(required)}
                />
                3
            </label>
            <label>
                <input
                    type="radio"
                    name={"__" + q.id + "__"}
                    value="4"
                    className="form-control ml-2 mr-1"
                    onChange={updateAnswer}
                    defaultChecked={answers[`__${q.id}__`] == '4'}
                    required={Boolean(required)}
                />
                4
            </label>
            <label>
                <input
                    type="radio"
                    name={"__" + q.id + "__"}
                    value="5"
                    className="form-control ml-2 mr-1"
                    onChange={updateAnswer}
                    defaultChecked={answers[`__${q.id}__`] == '4'}
                    required={Boolean(required)}
                />
                5
            </label>
        </div>;
        case 2: return <div>
            <label>
                <textarea
                    name={"__" + q.id + "__"}
                    placeholder={q.placeholder}
                    onChange={updateAnswer}
                    className="form-control mt-2"
                    value={answers[`__${q.id}__`]}
                    required={Boolean(required)}
                >
                </textarea>
            </label>
        </div>;
        case 3: return <div>
            <label>
                <input
                    type="radio"
                    name={"__" + q.id + "__"}
                    value="1"
                    defaultChecked={answers[`__${q.id}__`] == '1'}
                    onChange={updateAnswer}
                    className="form-control ml-2 mr-1"
                    required={Boolean(required)}
                />
                Tak
            </label>
            <label>
                <input
                    type="radio"
                    name={"__" + q.id + "__"}
                    value="0"
                    defaultChecked={answers[`__${q.id}__`] == '0'}
                    onChange={updateAnswer}
                    className="form-control ml-2 mr-1"
                    required={Boolean(required)}
                />
                Nie
            </label>
        </div>;
        case 4: return <div>
            <label>
                <input
                    type="number"
                    name={"__" + q.id + "__"}
                    value={answers[`__${q.id}__`] ? answers[`__${q.id}__`] : props.dVal}
                    className="form-control"
                    min={props.min}
                    max={props.max}
                    onChange={updateAnswer}
                    required={Boolean(required)}
                />
            </label>
        </div>;
        default: return null;
    }
}

export default Input;