import React, { useContext} from 'react';
//import FormUser from '../formUser/FormUser';
import User from './User';
import List from './List';
import Interval from './Interval';
import { ContextSetting } from '../../App';
import {ContextData} from '../../ContextData';

function Sidebar(props) {

  const [taskDetails] = useContext(ContextData);
  const [status] = useContext(ContextSetting);

  let interval;
  let options;
  let formUser;
  let user;
  let copyStat = Object.assign([], status); 

  copyStat[2].forEach(users => users.sum = 0);                    //нач установка  sum = 0
  
  const sum = (item, index) => {                                  //подсчет баллов выполненных задач
    if (item.name !== 'Jack') {
      taskDetails.forEach((date, idx) => {
             date.filter(task => task.realized === true ? true : false)
                .forEach(task => 
                    task.name === item.name ? copyStat[2][index].sum = copyStat[2][index].sum + task.reward : null)
      })
    }
  }
  
  const userName = copyStat[2].map((item, index) => {
    sum(item, index)                                              //сумма баллов выполненных задач
    return <User key={index} item={item} id={index} />
  });
  user = userName;
  if (status[0].user === 'Jack') {
    options = <List />;
    if (status[0].menuItem === 'history') {
      interval = <Interval />
    }
  } else {
    if (status[0].menuItem === 'history') {
      interval = <Interval />
    }
  };

  return (
    <div className="sidebar">
      {formUser}
      {user}
      <div className="selection">
        {options}
        {interval}
      </div>
    </div>
  );
}

export default Sidebar;