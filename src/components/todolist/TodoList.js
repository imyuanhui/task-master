import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import { changeColor } from "../../functions/changeColor";
import { removeOldColor } from "../../functions/removeOldColor";

const TodoList = ({ selectedTask, selectedTodo, setSelectedTodo, currData }) => {

    // Track the selected status for filtering todos
    const [selectedStatus, setSelectedStatus] = useState("all");
    
    // Function to filter todos based on task ID and status
    const filterTodos = (todos, selectedTask, selectedStatus) => {
        let filteredTodos = todos.filter(todo => todo.taskId === selectedTask);
        if (selectedStatus !== "all") {
            filteredTodos = filteredTodos.filter(todo => todo.status === selectedStatus);
        }
        return filteredTodos;
    }

    // Filter todos based on selected task and status
    let todos = filterTodos(currData.todos, selectedTask, selectedStatus);

    // Cluster todos by date
    const clusterTodos = (todos) => {
        let dateArr = Array.from(new Set(todos.map(todo => todo.date))).sort();
        return dateArr.map(date => {
            const todoArr = todos.filter(todo => todo.date === date);
            return todoArr.length > 0 ? { date, todoArr } : null;
        }).filter(cluster => cluster !== null);
    }

    // Initialize clusters
    const [clusters, setClusters] = useState(clusterTodos(todos));

    // Update clusters when data or selected task changes
    useEffect(() => {
        let todos = filterTodos(currData.todos, selectedTask, selectedStatus);
        setClusters(clusterTodos(todos));
    }, [currData, selectedTask, selectedStatus]);

    // Handle status filter click
    const handleStatusFilter = (status) => {
        removeOldColor(selectedStatus, "white");
        setSelectedStatus(status);
        changeColor(status, "white");
    }

    return (
        <div className="TodoList">
            <div className="TodoList-header">
                <span onClick={() => handleStatusFilter("all")} className="TodoList-filter" id="all">全部</span>
                <span onClick={() => handleStatusFilter("incompleted")} className="TodoList-filter" id="incompleted">未完成</span>
                <span onClick={() => handleStatusFilter("completed")} className="TodoList-filter" id="completed">已完成</span>
            </div>
            {/* Display each cluster */}
            {clusters.map((cluster) => {
                return (
                    <div className="TodoList-item" key={`todo-${selectedTodo.id}`}>
                        <p className="TodoList-item-date">{cluster.date}</p>
                        {cluster.todoArr.filter((todo) => todo.status === selectedStatus || selectedStatus === "all").map((todo, index) => (
                            <TodoItem
                            key={todo.title+index}
                            id={todo.id}
                            title={todo.title}
                            selectedTodo={selectedTodo}
                            setSelectedTodo={setSelectedTodo}
                            />
                        ))}
                    </div>);
            })}
        </div>
    );
        
}

export default TodoList;