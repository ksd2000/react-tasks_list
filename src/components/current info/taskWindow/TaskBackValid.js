import React, { useState, useContext }  from 'react';
import iconNo from '../../../images/no.png';
import iconYes from '../../../images/yes.png';
import { ContextSetting } from '../../../App';
import {ContextData} from '../../../ContextData';
import firebase from '../../../Firebase';

function TaskBackValid(props) {

  const [status] = useContext(ContextSetting);
  const [taskDetails, setTaskDetails] = useContext(ContextData);
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState('');

  const clickCreate = () => {                                                     //запись новых или замена старых значений
    if ((title && reward) || (props.title && props.reward) ) {
      let rewardNew;
      let titleNew;
      title ? titleNew = title : titleNew = props.title
      reward ? rewardNew = parseInt(reward, 10) : rewardNew = props.reward;       //parseInt(reward, 10) - преобраз. из строки в число
      props.changeRealizedState(props.idx, titleNew, rewardNew)
    }
  }

  const clickDelete = () => {                                       //удаление карты
    let copytaskDetails = Object.assign([], taskDetails);

    const db = firebase.firestore().collection('tasksData');
    db.doc(`${props.id}`).delete();
    copytaskDetails[0].splice(props.idx, 1);                        //удалим по индексу документа
    setTaskDetails(copytaskDetails)
    props.setCardFace(null);                                      //перевернем карту обратно
  }

  if (status[0].user==='Jack') {
    if (props.title==='') {
      return (
        <div className="card__face card__face_back card__face_taskNew">
          <div className="task__titleBack taskNew_size">New housework task</div>
          <div className="taskNew_color">Title</div>
          <textarea className="taskNew__title" value={title} onChange={event => setTitle(event.target.value)} />
          <div className="taskNew_color">Reward</div>
          <input className="taskNew__reward" value={reward}  onChange={event => setReward(event.target.value)} ></input>
          <div className="taskNew__change" >
            <button className="taskNew__cansel" type="submit" value="button" onClick={ () => props.setCardFace(null)}>Cansel</button>
            <button className="taskNew__create" type="submit" value="button" onClick={ clickCreate }>Create</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card__face card__face_back card__face_taskNew">
          <div className="task__titleBack taskNew_size">New housework task</div>
          <div className="taskNew_color">Title</div>
          <textarea className="taskNew__title" placeholder={props.title} value={title} onChange={event => setTitle(event.target.value)} />
          <div className="taskNew_color">Reward</div>
          <input className="taskNew__reward" placeholder={props.reward} value={reward}  onChange={event => setReward(event.target.value)} ></input>
          <div className="taskNew__change" >
            <button className="taskNew__cansel" type="submit" value="button" onClick={ () => props.setCardFace(null)}>Cansel</button>
            <button className="taskNew__create" type="submit" value="button" onClick={ clickCreate }>Create</button>
            <button className="taskNew__delete" type="submit" value="button" onClick={ clickDelete }>Delete</button>
          </div>
        </div>
      );
    }
  } else {
    return (
    <div className="card__face card__face_back">
      <div className="task__titleBack">Did you {props.title}?</div>
      <div className="task__change">
        <div className="task__img_hover">
          <img className="task__imgNo" src= {iconNo} alt="No" onClick={ () => props.setCardFace(null)}/>
        </div>
        <p>No, maybe later</p>
      </div>
      <div className="task__change">
        <div className="task__img_hover">
          <img className="task__imgYes" src= {iconYes} alt="Yes" onClick={ () => props.changeRealizedState(props.idx)}/> 
        </div>
        <p className="task__change_color">Yes, I did!</p>
      </div>  
    </div>
    );
  }
}

export default TaskBackValid;