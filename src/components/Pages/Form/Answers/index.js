import React from 'react';


const getYesOrNo = val => val === '0' ? 'Nie' : 'Tak';


const Answers = props => {

    if(!Array.isArray(props.answers)){
        return null;
    }

    if(props.question._option === 'HIDDEN'){
        return null;
    }

    const answers = props.answers.filter(a => a.question == props.question.id);
    const employeeAnswer = answers.find(a => a.of_employee === '1');
    const managerAnswer = answers.find(a => a.of_employee === '0');

    return(
        <div>
            <div>
                <b>Pracownik:&nbsp;&nbsp;</b>
                {employeeAnswer &&
                    <React.Fragment>
                        {props.question.input_type != 3 && <span>{employeeAnswer.content}</span>}
                        {props.question.input_type == 3 && <span>{getYesOrNo(employeeAnswer.content)}</span>}
                    </React.Fragment>
                }
            </div>
            <div>
                <b>Kierownik:&nbsp;&nbsp;</b>
                {managerAnswer &&
                    <React.Fragment>
                        {props.question.input_type != 3 && <span>{managerAnswer.content}</span>}
                        {props.question.input_type == 3 && <span>{getYesOrNo(managerAnswer.content)}</span>}
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default Answers