import React  from 'react';
import iconYes from '../../../images/yes.png';

function TaskBackDone(props) {

  return (

    <div className="card__face card__face_back">
      <div className="task__change_done">
        <img className="task__change_done_img" src= {iconYes} alt="Yes" onClick={ () => props.jobDone()}/>
      </div>
      <div className="task__txt">Well done!</div>
      <div className="task__txtInf">You earned {props.reward} Help Coins! </div>
    </div>
  );
}

export default TaskBackDone;