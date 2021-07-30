import React, { useState, useContext} from 'react';
import exit from '../../images/exit.png';
import {ContextData} from '../../ContextData';
import { ContextSetting } from '../../App';
import firebase from '../../Firebase';

function User(props) {

  const [status, setStatus] = useContext(ContextSetting);
  const [taskDetails, setTaskDetails] = useContext(ContextData);
  const [userPass, setUserPass] = useState(false);
  const [newParol, setNewParol] = useState('');

  const clickExit = () => {
    setStatus([
      {
        menuItem: 'Today’s housework',
        startDate: new Date(),
        endDate: new Date(),
        user: '',
        name: '',
        sum: 0,
        idNew: '',
        parole: ''
        },
        ['select name'],
        []                   
    ]);
  setTaskDetails([[]]);
  }

  const db = firebase.firestore().collection('tasksData');

  const newPasSave = () => {                                  // изменить пароль 
    let copyStat = Object.assign([], status);
    if (copyStat[0].parole !== newParol && newParol) {
      db.doc('parol')                                          
        .set({ parol: newParol })
        .catch((error) => {console.error("Error adding document: ", error);
        });
      copyStat[0].parole = newParol;
      setUserPass(false);
      setStatus(copyStat);
    }
  }

  return (
    <div>
      <div className="user" style={{marginBottom: props.item.name==='Jack' ? '8%' : ''}}>
        <div className={`user__avatar ${(props.item.name==='Jack') ? "user_pointer" : ""}`} onClick={() => (props.item.name==='Jack') ? setUserPass(!userPass) : null}>
          <div className="user__avatar_size">
            <img className="user__avatar_img" src= {props.item.img} alt="avatar" />
          </div>
        </div>
        <div className={`user__exit ${(props.id!==0) ? "displNo" : ""}`}>
          <p>Leave</p>
          <img className="user__exit_img" src= {exit} alt="exit" onClick={clickExit}/>
        </div>
        <div className="user__name">Hello, {props.item.name}</div>
        <div className={`user__sum ${(props.item.name==='Jack') ? "displNo" : ""}`}>{props.item.sum}HC</div>
      </div>
      <div className={`${userPass ? "user__newPass" : "displNo"}`}>
        <label className= "user__newPass_txt" htmlFor="end">New password</label>
        <input  className="user__newPass_inp" type="password" name="password"
                                      onChange={event => setNewParol(event.target.value)} >
        </input>
        <button className= "user__cansel" type="submit" value="button" onClick={() => {setUserPass(false); setNewParol('')}}>Cansel</button>
        <button className= "user__save" type="submit" value="button" onClick={newPasSave}>Save</button>
      </div>
    </div>
  );
}

export default User;