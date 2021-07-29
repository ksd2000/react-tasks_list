import React, {useState, useContext } from 'react';
import { ContextSetting } from '../../App';
import {ContextData} from '../../ContextData';
import userData from '../../usersDate';
import firebase from '../../Firebase';
import { format } from '../../../node_modules/date-fns';
//import taskData from '../../tasksData';

function FormUser(props) {
                                                                // вход пользователя
    const [status, setStatus] = useContext(ContextSetting);
    const [taskDetails, setTaskDetails] = useContext(ContextData);
    const [userName, setUserName] = useState('');
    const [userParole, setUserParole] = useState('');

    const dateToday = () => {                                     //фмльтрация задач для меню 'Today’s housework'
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
            //taskDataInterval.sort(function(a, b){ return b.reward-a.reward });  // сортировка по убыванию баллов
            setTaskDetails([taskDataInterval])
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });
            // taskDataInterval = taskData.filter( task => task.date === copyStat[0].startDate ? true : false);          // фильтр по датe
            // taskDataInterval = taskDataInterval.filter( task => task.name === status[0].name ? true : false);       //фильтр задач по имени
            // taskDataInterval.sort(function(a, b){ return b.reward-a.reward });                                      // сортировка по убыванию баллов
            // setTaskDetails([taskDataInterval])
    };

    const handleQuery = () => {                                       //проверка имени и пароля user + коррекия "списка" для sidebar, добавим в него all
        let copyStat = Object.assign([], status);
        const db = firebase.firestore().collection('tasksData');

        db.doc('parol')                                          
          .get()
          .then(snap => {
            let parole = snap.data().parol;
            if (userParole === parole) {
                copyStat[0].user = userName;
                copyStat[0].parole = parole;
                userData.forEach(item =>                                                //готовим список user
                            item.name !== 'Jack' ? copyStat[1].push(item.name) : null);
                copyStat[2] = [userData[0]];                                            //данные для <User />
                setStatus(copyStat)
            } else {
                setUserParole('')
            }
        })
    };

    let jack = Math.floor((new Date() - new Date(userData[0].birthday))/31536000000);
    let lily = Math.floor((new Date() - new Date(userData[1].birthday))/31536000000);
    let mary = Math.floor((new Date() - new Date(userData[2].birthday))/31536000000);

    if (userName === 'Jack') {

        return (
            <div className="formJack">
                <div className="formUser__user formUser__user_size">
                    <img className="formUser_img" src= {userData[0].img} alt="avatar" />
                    <div className="formUser_size1">{userData[0].name}</div>
                    <div className="formUser_size2">{jack} years old</div>
                    <div className="formUser_size3">
                        <input className="formUser__input_size" type="password" value={userParole} id="parol" onChange={event => setUserParole(event.target.value)} ></input>
                        <button className="formUser__btn" type="submit" value="button" onClick={handleQuery}>Sign in</button>
                    </div>
                </div>
            </div>    
        )
    } else {
        let copyStat = Object.assign([], status);
        userData.forEach(item => {
            if (userName === item.name) {
                copyStat[0].user = userName;
                copyStat[0].name = userName;
                if (status[0].menuItem === 'Today’s housework') {
                    dateToday()
                }
                copyStat[2] = [item];
                setStatus(copyStat)
            }
        })

        return (
            <div className="formUser">
                <div className="formUser__user">
                    <img className="formUser_img" src= {userData[1].img} alt="avatar" onClick={() => setUserName(userData[1].name)} />
                    <div className="formUser_size1">{userData[1].name}</div>
                    <div className="formUser_size2">{lily} years old</div>
                </div>
                <div className="formUser__user">
                    <img className="formUser_img" src= {userData[0].img} alt="avatar" onClick={() => setUserName(userData[0].name)} />
                    <div className="formUser_size1">{userData[0].name}</div>
                    <div className="formUser_size2">{jack} years old</div>
                </div>
                <div className="formUser__user">
                    <img className="formUser_img" src= {userData[2].img} alt="avatar" onClick={() => setUserName(userData[2].name)} />
                    <div className="formUser_size1">{userData[2].name}</div>
                    <div className="formUser_size2">{mary} years old</div>
                </div>
            </div>
        );
    }
}

export default FormUser;