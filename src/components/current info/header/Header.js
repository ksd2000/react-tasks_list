import React, { useContext } from 'react';
import { ContextSetting } from '../../../App';
import {ContextData} from '../../../ContextData';
import userData from '../../../usersDate';
import firebase from '../../../Firebase';
import { format } from '../../../../node_modules/date-fns';

function Header(props) {

  const [taskDetails, setTaskDetails] = useContext(ContextData);
  const [status, setStatus] = useContext(ContextSetting);

  const initial = (copyStat) => {                                      //начальная установка рабочего списка
    if (copyStat[0].user === 'Jack') {                                  
      copyStat[1] = ['select name'];
      userData.forEach((item) => copyStat[1].push(item.name));    
      copyStat[1] = copyStat[1].filter( item => item !== 'Jack' ? true : false);
      copyStat[2] = userData.filter(item => copyStat[0].user===item.name ? true : false); 
      copyStat[0].name = '';
    }
  }

  const handleWork = () => {
    let copyStat = Object.assign([], status);
    copyStat[0].menuItem = 'Today’s housework';                         //начальная установка
   // let date = new Date().toLocaleDateString();                                 //даты Today
    initial(copyStat);                                                          //рабочего списка
    setStatus(copyStat);

    let taskDataInterval= [];
    let start = new Date();
    start.setHours(0,0,0,0);
    
    const db = firebase.firestore().collection('tasksData');
    db.where('date', '==', start)                                           // фильтр по датe
      .where('name', '==', status[0].name)                                  //фильтр задач по имени
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          let d = doc.data();
          d.date = format(d.date.toDate(), 'yyyy MM dd');
          taskDataInterval.push(d)
        });
      //  taskDataInterval.sort((a, b) => b.reward-a.reward );                // сортировка по убыванию баллов
        setTaskDetails([taskDataInterval])
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  }

  const handleHistory = () => {
    let copyStat = Object.assign([], status);                            //начальная установка
    copyStat[0].menuItem = 'history';
    initial(copyStat);                                                          //рабочего списка
    copyStat[1].push('all');
    setStatus(copyStat);
    setTaskDetails([[]])
  }

  return (
    <div className="header">
        <ul className="menu">
            <li className="menu__nav" onClick={handleWork} 
                  style={(status[0].menuItem==='Today’s housework') ? {color: '#CACACA'} : {color: 'black'}} >
              Today’s housework
            </li>
            <li className="menu__nav" onClick={handleHistory} 
                  style={(status[0].menuItem==='history') ? {color: '#CACACA'} : {color: 'black'}}>
              History
            </li>
        </ul>
    </div>
  );
}

export default Header;