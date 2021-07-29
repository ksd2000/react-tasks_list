import React  from 'react';
import TaskBackValid from './TaskBackValid';
import TaskBackDone from './TaskBackDone';

function TaskBackFull(props) {

    if (props.change===true) {
        return <TaskBackDone idx={props.idx} reward={props.task.reward} jobDone={props.jobDone}/>
    } else {
        return <TaskBackValid idx={props.idx} id={props.task.id} title={props.task.title} 
                                        reward={props.task.reward} setCardFace={props.setCardFace} 
                                                        changeRealizedState={props.changeRealizedState} />
    }
}

export default TaskBackFull;