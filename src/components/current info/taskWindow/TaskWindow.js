import React, { useContext } from 'react';
import {ContextData} from '../../../ContextData';
import TaskBox from './TaskBox';
import { format } from '../../../../node_modules/date-fns';

function TaskWindow(props) {

  const [taskDetails] = useContext(ContextData);
  let dateToday = format(new Date(), 'yyyy MM dd');

  const box = taskDetails.map( (item, id) => {                          
      if (taskDetails[id].length === 0) {
        return (<div key={id}></div>)
      };
      if (item[0].date === dateToday) {
        return (
          <div className="taskWindow__box" key={id}>
            <div className="taskWindow_size"><span className="taskWindow_color">Today</span> {format(new Date(item[0].date), 'EEEE, MMMM dd')}</div>
            <TaskBox key={id} id={id} item={item} />
          </div>
        )
      } else {
        return (
          <div className="taskWindow__box" key={id}>
            <div className="taskWindow_size">{format(new Date(item[0].date), 'EEEE, MMMM dd')}</div>
            <TaskBox key={id} id={id} item={item} />
          </div>
        )
      }
  })

  return (
    <div className="taskWindow taskWindow_scroll">
      {box}
    </div>
  );
}

export default TaskWindow;