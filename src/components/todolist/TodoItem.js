import { useEffect } from "react";
import { removeOldColor } from "../../functions/removeOldColor";
import { changeColor } from "../../functions/changeColor";

const TodoItem = ({ id, title, selectedTodo, setSelectedTodo }) => {
    
    const handleClickTodoItem = () => {
        removeOldColor(`todo-${selectedTodo}`, "green", "todo");
        setSelectedTodo(id);
    }

    useEffect(() => {changeColor(`todo-${selectedTodo}`, "green", "todo")},[selectedTodo]);


    return (
        <div className="item TodoItem" id={`todo-${id}`} style={{paddingLeft: "2rem", cursor:"pointer"}}>
            {/* Set the selected todo to the todo clicked latest. */}
            <p onClick={() => handleClickTodoItem()}>{title}</p>
        </div>
    );
}

export default TodoItem;