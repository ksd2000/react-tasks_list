import React, { useState } from 'react';
import './App.css';
import FormUser from './components/formUser/FormUser';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/current info/header/Header';
import TaskWindow from './components/current info/taskWindow/TaskWindow';
import {ContextData} from './ContextData';

export const ContextSetting = React.createContext(null);

function App() {

  const [setting, setSetting] = useState([                            //состояние - контекст  ContextSetting
              {
              menuItem: 'Today’s housework',                          //true - меню = history
              startDate: new Date(),                                //начальная дата интервала (см input)
              endDate: new Date(),                                  //конечная дата интервала (см input)
              user: '',                                     //пользователь
              name: '',                                    //селектор, all - выбраны все пользователи
              sum: 0,                                       //сумма баллов за выполненные задачи в интервале
              idNew: '',                                    //id последней записанной задачи
              parole: ''                                    //пароль Jack
              },
              ['select name'],                              //рабочий "список"
              []                                            //массив данных user и выбранных name - для отображения их в Sidebar
  ]);
  const [taskDetails, setTaskDetails] = useState(() => [[]]);           //контекст  ContextData - выбранные задачи
  let page;

  if (setting[0].user) {
    page = 
            <div className="App">
                <Sidebar />
              <div className="info">
                <Header />
                <TaskWindow />
              </div>
            </div>
  } else {
    page = 
            <div className="form">
              <FormUser />
            </div>
  }

  return (
    <ContextSetting.Provider value={[setting, setSetting]}>
      <ContextData.Provider value={[taskDetails, setTaskDetails]}>

       {page}

     </ContextData.Provider>
    </ContextSetting.Provider>
  )
}

export default App;
