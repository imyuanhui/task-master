import { useState, useMemo } from "react";
import "./Prompt.css";
import { addItem } from "../../functions/addItem";

const Prompt = ({ level, setShowPrompt, selectedCat, selectedTask, currData, setCurrData }) => {
    let actualLevel = level;
    if (level === "tasks" && selectedCat < 0) {
        actualLevel = "cats";
    }

    const today = useMemo(() => new Date(), []);

    const [inputTitle, setInputTitle] = useState("");
    const [inputDate, setInputDate] =
        useState(`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`);
    const [inputDetail, setInputDetail] = useState("");

    // create new item
    const createItem = (level) => {
        let newItem;
        const data = { ...currData }; // Create a shallow copy of the current data

        // Find the maximum ID for the given level
        const maxId = data[level].length > 0 ? Math.max(...data[level].map(item => item.id)) : 0;
        const id = maxId + 1;

        if (level === "todos") {
            newItem = {
                id: id,
                title: inputTitle,
                date: inputDate,
                description: inputDetail,
                taskId: selectedTask,
                status: "incompleted"
            }
        }

        if (level === "tasks") {
            newItem = {
                id: id,
                title: inputTitle,
                catId: selectedCat
            }
        }

        if (level === "cats") {
            newItem = {
                id: id,
                title: inputTitle
            }
        }

        return newItem;
    }

    // when click confirm, create a new obj and add it to data
    const handleConfirm = () => {
        const item = createItem(actualLevel);
        if (item.title === "") {
            alert("请输入标题！");
            return;
        }
        addItem(item, actualLevel, currData, setCurrData);
        setShowPrompt(false);
    }

    // when click cancel, reset all the state
    const handleCancel = () => {
        setInputTitle("");
        setInputDate("");
        setInputDetail("");
        setShowPrompt(false);
    }
    
    return (
        <div className="prompt">
            {level === "todos" ?
                <div className="prompt-input">
                    <input id="input-title" type="text" placeholder="请输入标题" onChange={(e) => setInputTitle(e.target.value)}/>
                    <input id="input-date" type="date" onChange={(e) => setInputDate(e.target.value)}/>
                    <textarea id="input-description" placeholder="请输入待办事项描述" onChange={(e) => setInputDetail(e.target.value)}/>
                </div>
                :
                <div className="prompt-input">
                    <input id="input-title" placeholder="请输入标题" onChange={(e) => setInputTitle(e.target.value)} />
                </div>
            }
               
            <div className="btn-container">
                <button onClick={() => handleConfirm()}>确认</button>
                <button onClick={() => handleCancel()}>取消</button>
            </div>
        </div>
    );       
}

export default Prompt;