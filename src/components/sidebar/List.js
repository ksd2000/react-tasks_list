import React, { useContext } from 'react';
import { ContextSetting } from '../../App';
import {ContextData} from '../../ContextData';
import userData from '../../usersDate';
import { format } from '../../../node_modules/date-fns';
import firebase from '../../Firebase';

function List(props) {

  const [taskDetails, setTaskDetails] = useContext(ContextData);
  const [status, setStatus] = useContext(ContextSetting);

  const dateToday = (copyStat) => {                                     //отбор задач для меню 'Today’s housework'

      let itemNew = {                                                   //новая карта
      id: '',
      date: format(new Date(), 'yyyy MM dd'),
      name: status[0].name,
      title: '',
      reward: 0,
      realized: false
    };

    let taskDataInterval= [];
    let start = new Date();
    start.setHours(0,0,0,0);                                              //приведем дату к времени 0ч

    const db = firebase.firestore().collection('tasksData'); 
    db.doc('indexEnd')                                                    //прочитаем id последней записанной карты (хранится в док 'indexEnd')
      .get()
      .then(snap => {
        let a = snap.data().idEnd;
        copyStat[0].idNew = a + 1;                                        //id новой карты
        itemNew.id = a + 1;                                                   
      });
    db.where('date', '==', start)                                           // фильтр по датe
      .where('name', '==', status[0].name)                                  //фильтр задач по имени
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          let d = doc.data();
          d.date = format(d.date.toDate(), 'yyyy MM dd');
          taskDataInterval.push(d)
        });
        taskDataInterval.push(itemNew);                                     //создаем последнюю task для (если в этот день задачи уже были)
        setTaskDetails([taskDataInterval])
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  }

  const handleChang = (event) => {
    let copyStat = Object.assign([], status);
    copyStat[0].name= event.target.value;
    copyStat[1] = copyStat[1].filter( item => item !== 'select name' ? true : false); // в списке для list оставляем только имена+all

    setTaskDetails([[]])

    if (copyStat[0].user === 'Jack') {                                //алгоритм отображения user в sidebar
      userData.forEach(userInf => {                                   //начальная установка массива user
        return userInf.name === copyStat[0].user ? copyStat[2]=[userInf] : null;
      });
      if (copyStat[0].name === 'all') {
          copyStat[1].forEach(name => {
              userData.forEach(userInf => {
                return userInf.name === name ? copyStat[2].push(userInf) : null;
              })
          }) 
      } else {
        userData.forEach(userInf => {
          return userInf.name === copyStat[0].name ? copyStat[2].push(userInf) : null;
        })
      };
      if (status[0].menuItem === 'Today’s housework') {
        dateToday(copyStat)
      }
    };
    setStatus(copyStat);
  }

  const options = status[1].map((text, index) => {
      return <option className="list__item" key={index}>{text}</option>;
  });

  return (
      <div className="list">
          <select className="list__select" value={status[0].name} onChange={handleChang}>
		          {options}
	        </select>
      </div>
  );
}

export default List;