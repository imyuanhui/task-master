import { useState, useEffect, useMemo } from "react";
import "./TodoView.css";
import { removeItem } from "../../functions/removeItem";
import { MdTaskAlt } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdTrash } from "react-icons/io";
import { FiSave } from "react-icons/fi";

const TodoView = ({ selectedTodo, setSelectedTodo, isTodoEditable, setIsTodoEditable, currData, setCurrData }) => {
    // Retrieve todo data and initialize state variables
    let data = currData;
    let todo = data.todos.find(todo => todo.id === selectedTodo);

    const today = useMemo(() => new Date(), []);

    const [currTitle, setCurrTitle] = useState(todo?.title || "");
    const [currDate, setCurrDate] = useState(todo?.date || "");
    const [currDescription, setCurrDescription] = useState(todo?.description ||
        `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`);

    // Update state when selectedTodo or todo data changes
    useEffect(() => {
        
        if (selectedTodo !== -1) {
            let todo = data.todos.find(todo => todo.id === selectedTodo);
            setCurrTitle(todo?.title);
            setCurrDate(todo?.date);
            setCurrDescription(todo?.description);
        } else {
            setCurrTitle("");
            setCurrDescription("");
            setCurrDate(`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`);
        }
        
    }, [selectedTodo, currData, data.todos, today]);

    // Function to confirm edit mode and save changes
    const confirmEdit = () => {
        if (window.confirm("确认保存更改？")) {
            todo.title = currTitle;
            todo.date = currDate;
            todo.description = currDescription;

            // Update todos array
            const updatedTodos = data.todos.map(item => (item.id === selectedTodo ? todo : item));
            setCurrData({...data, todos: updatedTodos}); // Ensure immutability of state

            setIsTodoEditable(false);
        }
    }

    // Function to handle todo removal
    const handleRmvTodo = (id) => {
        if (id === 0 || id === -1) {
            alert("请选择一个任务！")
        } else if (window.confirm("确认删除此任务？")) {
            removeItem("todos", id, currData, setCurrData);
            setSelectedTodo(-1);
        }
    }

    // Function to set todo status as completed
    const checkTodo = () => {
        if (selectedTodo !== 0 && window.confirm("确认完成任务？")) {
            const updatedTodo = { ...todo, status: "completed" }; // Update the status directly
            const updatedTodos = data.todos.map(item => (item.id === selectedTodo ? updatedTodo : item));
            setCurrData({ ...data, todos: updatedTodos }); // Ensure immutability of state
        } else {
            alert("请选择一个任务！");
        }
    }


    // Function to render icons based on todo state
    const renderIcons = () => {
        return (
            <>
                <MdTaskAlt className="TodoView-header-btn" onClick={() => checkTodo()} />
                <HiOutlinePencilSquare onClick={() => {selectedTodo !== -1 && selectedTodo !== 0 && setIsTodoEditable(true)}} className="TodoView-header-btn" />
                <IoMdTrash onClick={() => handleRmvTodo(selectedTodo)} className="TodoView-header-btn" />
            </>
        );
    }

    // Render the TodoView component
    return (
        <div className="TodoView">
            <div className="TodoView-header">
                {/* Input field for editing todo title */}
                <input type="text" onChange={(e) => setCurrTitle(e.target.value)} className="TodoView-header-title" value={currTitle}/>
                {/* Container for buttons */}
                <div className="TodoView-header-btn_container">
                    {/* Render icons based on todo state */}
                    {renderIcons()}
                    {/* Save button visible only in edit mode */}
                    {isTodoEditable && <FiSave className="TodoView-header-btn" onClick={confirmEdit} />}
                </div>
            </div>
            {/* Body section containing date input and description textarea */}
            <div className="TodoView-body">
                <input type="date" onChange={(e) => setCurrDate(e.target.value)} className="TodoView-body-date" value={currDate}/>
                <textarea onChange={(e) => setCurrDescription(e.target.value)} className="TodoView-body-detail" value={currDescription} />
            </div>
        </div>
    );
}

export default TodoView;
