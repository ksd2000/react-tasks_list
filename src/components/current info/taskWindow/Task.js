import React, { useContext } from 'react';
import TaskBackFull from './TaskBackFull';
import { ContextSetting } from '../../../App';

function Task(props) {

  const [status] = useContext(ContextSetting);

  let reward = props.task.reward;
  let rew;
  let colorCard = {                       // Цветовая гамма выполненной (realized='true') и невыполненной карточки
    false: [
      ['#FFB966' , '#eb9461'],                    // [ цвет карты, цвет числа ] - формат массива
      ['#FE8368' , '#f35b20'],
      ['#FF5F5F' , '#e30c3d'],
      ['#FF467D' , '#d82568']
    ],
    true: [
      ['#DCDCDC' , '#C0C0C0'],
      ['#C0C0C0' , '#A9A9A9'],
      ['#A9A9A9' , '#808080'],
      ['#808080' , '#696969']
    ]
  };

  if (reward >= 0 && reward <= 74) {       // индекс colorCard.false - rew=0- 10-74, rew=1- 75-99, rew=2- 100-124, rew=3- 125...
    rew = 0;
  } else {
    if (reward >= 75 && reward <= 99) {
      rew = 1;
    } else {
      if (reward >= 100 && reward <= 124) {
        rew = 2;
      }  else {
        if (reward >= 125) {
          rew = 3;
        }
      }
    }
  };

  const clickCardBack = () => {                                      //перевернуть карту на др сторону по клику

    if (status[0].menuItem==='Today’s housework' && props.task.realized===false && props.change===false) {
        props.setCardFace(props.idx)
    } 
  }

  if (status[0].user==='Jack' && status[0].menuItem==='Today’s housework' && props.task.title==='') {
    let colorCardFace = {background: 'rgba(255, 232, 219, 0.25)'};                                  // фон
    return(                                                                                         // карта для записи новой задачи
      <div className={`scene ${(props.idx!==props.cardFace) ? "" : "sceneNew"}`}>
        <div className={`card ${(props.idx!==props.cardFace) ? "" : "is-flipped cardNew"}`}>
          <div className="card__face card__face_front" style={colorCardFace} onClick={clickCardBack}>
            <div className="taskNew"></div>
          </div>
          <TaskBackFull task={props.task} idx={props.idx } setCardFace={props.setCardFace}
                changeRealizedState={props.changeRealizedState} change={props.change} jobDone={props.jobDone}/>
        </div>
      </div>
    )
  } else {
    let colorCardFace = {backgroundColor : colorCard[props.task.realized][rew][0]};         //цвет фона задач (выполнено/не выполнено)
    let colorReward = {backgroundColor : colorCard[props.task.realized][rew][1]};
    return (
      <div className={`scene ${(props.idx===props.cardFace && status[0].user==='Jack' && status[0].menuItem==='Today’s housework') ? "sceneNewDel" : ""}`}>
        <div className={`card ${(props.idx!==props.cardFace) ? "" : (status[0].user==='Jack' && status[0].menuItem==='Today’s housework') ? "is-flipped cardDel" : "is-flipped"}`} >
          <div className="card__face card__face_front" style={colorCardFace} onClick={clickCardBack}>
            <div className="task_position">
              <div className="task__name">{(status[0].menuItem==='history' && status[0].name==='all') ? props.task.name : null }</div>
              <div className="task__reward" style={colorReward}>{props.task.reward}</div>
            </div>
            <div className="task__title">{props.task.title}</div>
          </div>
          <TaskBackFull task={props.task} idx={props.idx } setCardFace={props.setCardFace}
                changeRealizedState={props.changeRealizedState} change={props.change} jobDone={props.jobDone}/>
        </div>
      </div>
    );
  }
}

export default Task;