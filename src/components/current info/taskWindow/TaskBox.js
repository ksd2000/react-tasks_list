import React, { useState, useContext} from 'react';
import {ContextData} from '../../../ContextData';
import { ContextSetting } from '../../../App';
import { format } from '../../../../node_modules/date-fns';
import firebase from '../../../Firebase';
import Task from './Task';

function User(props) {
                                          
    const [taskDetails, setTaskDetails] = useContext(ContextData);
    const [status] = useContext(ContextSetting);
    const [cardFace, setCardFace] = useState(null);          // cardFace - id перевернутой карты: =null - все с лицевой стороной карты, cardFace="число" - индекс перевернутой карты
    const [change, setChange] = useState(false);            //change=true - задание выполнено
    let taskComponents;
  
    const changeRealizedState = (idx, title, reward) => {           // отметить задачу выполненной (записать в ContextData значение realized=true)
      let copytaskDetails = Object.assign([], taskDetails);         // запись новой задачи
      let itemNew = {                                                              //новая карта
        id: '',
        date: format(new Date(), 'yyyy MM dd'),
        name: status[0].name,
        title: '',
        reward: 0,
        realized: false
      };
      
      const db = firebase.firestore().collection('tasksData');  

      if ( status[0].user==='Jack' && status[0].menuItem==='Today’s housework') {     //запись новой задачи в БД
        let copyStat = Object.assign([], status);
        if (props.item[idx].id === copyStat[0].idNew) {
          db.doc(`${copyStat[0].idNew}`)                                  //записываем новую карту в БД        
            .set({
              id: props.item[idx].id,
              date: new Date(props.item[idx].date),
              name: props.item[idx].name,
              title: title,
              reward: reward,
              realized: false
            })
            .then((docRef) => {
  //               console.log("Document written with ID: ", docRef);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
          db.doc('indexEnd')                                                  //запишем id последней записанной карты в БД
            .set({ idEnd: props.item[idx].id })
            .catch((error) => { console.error("Error adding document: ", error) });
                                            //обновим контекст и добавим в него следующую новую карту для очередной задачи
          copytaskDetails[0][idx].title = title;
          copytaskDetails[0][idx].reward = reward;
          copyStat[0].idNew = copyStat[0].idNew + 1;            //id новой карты
          itemNew.id = copyStat[0].idNew;
          copytaskDetails[0].push(itemNew);                    //создаем новую task в контексте
        } else {
          db.doc(`${props.item[idx].id}`)                        //перезаписываем карту в БД                  
          .set({
            id: props.item[idx].id,
            date: new Date(props.item[idx].date),
            name: props.item[idx].name,
            title: title,
            reward: reward,
            realized: false
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
          copytaskDetails[0][idx].title = title;
          copytaskDetails[0][idx].reward = reward
        };
        setCardFace(null);                                      //перевернем карту обратно
      } else {
        setChange(true);                                      // запись в карточку отметки "выполнено"
        db.doc(`${props.item[idx].id}`)                                          
          .set({
            id: props.item[idx].id,
            date: new Date(props.item[idx].date),
            name: props.item[idx].name,
            title: props.item[idx].title,
            reward: props.item[idx].reward,
            realized: true
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });

        copytaskDetails[props.id] = taskDetails[props.id].map((task, keyTask) =>
                                        keyTask === idx ? { ...task, realized: true } : task);
      }
      setTaskDetails(copytaskDetails)
    };

    const jobDone = () => {                                   //подтвердить, что работа выполнена, запись состояний в исходное состояние
      setCardFace(null);
      setTimeout( () => setChange(false), 300);
    };

    taskComponents = taskDetails[props.id].map( (task, idx) => 
        <Task key={idx} idx={idx} task={task} cardFace={cardFace} setCardFace={setCardFace}
                    changeRealizedState={changeRealizedState} change={change} jobDone={jobDone}/>
    );

    return (
        <div className="taskBox">
             {taskComponents}
        </div>
    );
}

export default User;