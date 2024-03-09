import { useEffect } from "react";
import { removeItem } from "../../functions/removeItem";
import ListRmvBtn from "../buttons/ListRmvBtn";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = ({ selectedCat, selectedTask, setSelectedTask, currData, setCurrData }) => {

    // Initialize data.
    const tasks = currData.tasks.filter(task => task.catId === selectedCat);
    const todos = currData.todos;

    // Calculate the total amount of todos in a task.
    const calTodoAmount = (taskId) => {
        return todos.filter(todo=> todo.taskId === taskId).length;
    }

    const handleRmvTask = (id) => {
        if (window.confirm("确定要删除该任务吗？")) {
            removeItem("tasks", id, currData, setCurrData);
            setSelectedTask(currData.tasks.filter((task) => task.catId === selectedCat)[0].id);
        }
    }

    useEffect(() => {
        let tasks = currData.tasks.filter((task) => task.catId === selectedCat);
        if (tasks.length > 0) {
            setSelectedTask(tasks[0].id)
        } else {
            setSelectedTask(0);
        }
    },
        [selectedCat, currData, setSelectedTask]);

    return (
        <div>
            
            {/* Build TaskItem for each task and pass in the required props. */}
            {tasks.map((task, index) => (
                <div className="TaskList-item" key={`task-${task.id}`} id={`task-${task.id}`}>
                    <TaskItem
                        key={task.title+index}
                        id = {task.id}
                        title = {task.title}
                        todoCount = {calTodoAmount(task.id)}
                        selectedTask = {selectedTask}
                        setSelectedTask={setSelectedTask}
                        />
                    <ListRmvBtn onClick={() => handleRmvTask(task.id)}/>
                </div>
            ))}
        </div>
    );
}

export default TaskList;