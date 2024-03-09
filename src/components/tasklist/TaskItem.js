import { useEffect } from "react";
import { changeColor } from "../../functions/changeColor";
import { removeOldColor } from "../../functions/removeOldColor";
import { PiNoteBlank } from "react-icons/pi";

const TaskItem = ({ id, title, todoCount, selectedTask, setSelectedTask }) => {

    const handleClickTaskItem = () => {
        removeOldColor(`task-${selectedTask}`, "white");
        setSelectedTask(id);
    }

    useEffect(() => {changeColor(`task-${selectedTask}`, "white")},[selectedTask]);
    
    return (
        <div className="item TaskItem">
            {/* Set the selected task to the task clicked latest. */}
            <p onClick={() => handleClickTaskItem()}>
                <PiNoteBlank />
                <span style={{marginLeft:".5rem"}}>{title}</span>
                {/* Show the total amount of tasks in the category. */}
                <span>{`(${todoCount})`}</span> 
            </p>
        </div>
    );
}

export default TaskItem;