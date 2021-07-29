import React, { useState, useContext } from 'react';
import { ContextSetting } from '../../App';
import {ContextData} from '../../ContextData';
//import taskData from '../../tasksData';
import {isWithinInterval, eachDayOfInterval, format, startOfDay} from '../../../node_modules/date-fns/';
import firebase from '../../Firebase';

function Interval(props) {

  const [taskDetails, setTaskDetails] = useContext(ContextData);
  const [status, setStatus] = useContext(ContextSetting);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const handleQuery = () => {                                     //подтверждение выбора интервала и фильтрация
    if (endDate<startDate || startDate==='' || startDate==='') {
      setTaskDetails([[]])
    } else {
      let copyStat = Object.assign([], status);
      copyStat[0].startDate = startDate;
      copyStat[0].endDate = endDate;
      
      setStatus(copyStat);

      let taskDataInterval= [];
      let start = new Date(copyStat[0].startDate);
      start.setHours(0,0,0,0);
      let end = new Date(copyStat[0].endDate);
      end.setHours(23,59,59,999);

      const db = firebase.firestore().collection('tasksData');
      if (status[0].name !== 'all') {
        db.where('date', '>=', start)                                           // фильтр по интервалу дат
          .where('date', '<=', end)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
              let d = doc.data();
              if (d.name === copyStat[0].name) {                                //фильтр задач по имени
                d.date = format(d.date.toDate(), 'yyyy MM dd');
                taskDataInterval.push(d)
              }
            });
            let taskDataInt = eachDayOfInterval({                               //формируем массив всех дат из интервала        
                    start: new Date(copyStat[0].startDate),
                    end: new Date(copyStat[0].endDate)})
                .map(x => format(x, "yyyy MM dd"))
                .reverse()
                .map(date => (taskDataInterval.filter(item => item.date===date ? true : false)
                //.sort((a, b) => b.reward-a.reward)
                ));
              setTaskDetails(taskDataInt)
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });
      } else {
        db.where('date', '>=', start)                                           // фильтр по интервалу дат
          .where('date', '<=', end)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
              let d = doc.data();
              d.date = format(d.date.toDate(), 'yyyy MM dd');
              taskDataInterval.push(d)
            });
            let taskDataInt = eachDayOfInterval({                               //формируем массив всех дат из интервала        
                    start: new Date(copyStat[0].startDate),
                    end: new Date(copyStat[0].endDate)})
                .map(x => format(x, "yyyy MM dd"))
                .reverse()
                .map(date => (taskDataInterval.filter(item => item.date===date ? true : false)
               // .sort((a, b) => b.reward-a.reward)
                ));
              setTaskDetails(taskDataInt)
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });
      }     
                //    let taskDataInterval = taskData.filter( task => {             // фильтр задач по интервалу дат
                //      let a = new Date(task.date).toLocaleDateString();
                //      let b = new Date(copyStat[0].startDate).toLocaleDateString();
                //      let c = new Date(copyStat[0].endDate).toLocaleDateString();
                //      if (c>=a && a>=b) {
                //      return true
                //      } else {
                //        return false
                //      }
                //    });
                //    
                //    if (status[0].name !== 'all') {  
                //      taskDataInterval = taskDataInterval.filter( task =>         //фильтр задач по имени
                //        task.name === status[0].name ? true : false
                //      )
                //    };
                //                                                              //сортировка посуточная
                //    taskDataInterval = eachDayOfInterval({                    //формируем массив всех дат из интервала        
                //          start: new Date(copyStat[0].startDate),
                //          end: new Date(copyStat[0].endDate)})
                //      .map(x => format(x, "yyyy MM dd"))
                //      .reverse()
                //      .map(date => (taskDataInterval.filter(item => item.date===date ? true : false).sort((a, b) => b.reward-a.reward)));
                //      
                //    setTaskDetails(taskDataInterval)
    }
  }

  return (
    <div className="interval">
      <label className= "interval__txt" htmlFor="start">Start date:</label>
      <input type="date" id="start" name="trip-start"
          min="2021-07-01" onChange={event => setStartDate(event.target.value)} >
      </input>
      <label className= "interval__txt" htmlFor="end">End date:</label>
      <input type="date" id="end" name="trip-start"
          min="2020-07-01" onChange={event => setEndDate(event.target.value)} >
      </input>
      <button className= "interval__btn" type="submit" value="button" onClick={handleQuery}>Query</button>
    </div>
  );
}

export default Interval;