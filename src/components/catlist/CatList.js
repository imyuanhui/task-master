import CatItem from "./CatItem";
import TaskList from "../tasklist/TaskList";
import { removeItem } from "../../functions/removeItem";
import "./CatList.css";
import ListRmvBtn from "../buttons/ListRmvBtn";

const CatList = ({ selectedCat, setSelectedCat, selectedTask, setSelectedTask, currData, setCurrData }) => {
    // Initialize data from the database.
    const cats = currData.cats;
    const tasks = currData.tasks;

    // Calculate the total amount of tasks in a category.
    const calTaskAmount = (catId) => {
        return tasks.filter(task => task.catId === catId).length;
    }

    const handleRmvCat = (id) => {
        if (window.confirm("确定要删除该分类吗？")) {
            removeItem("cats", id, currData, setCurrData);
            setSelectedCat(-1);
        }
    }
    
    return (
        <div>
            
            {/* Build CatItem for each category and pass in the required props. */}
            {cats.map((cat, index) => (
                <div className="CatList-item" key={`cat-${cat.id}`}>
                    <div className="CatList-item-cat"  id={`cat-${cat.id}`}>
                        <CatItem
                        key={cat.title+index}
                        id = {cat.id}
                        title = {cat.title}
                        taskCount = {calTaskAmount(cat.id)}
                        selectedCat = {selectedCat}
                        setSelectedCat={setSelectedCat}
                        setSelectedTask={setSelectedTask}
                        />
                        <ListRmvBtn onClick={() => handleRmvCat(cat.id)}/>
                    </div>
                    {/* Show the tasks in the selected category. */}
                    {selectedCat === cat.id &&
                        <TaskList
                            selectedCat={selectedCat}
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                            currData={currData}
                            setCurrData={setCurrData}
                        />}
                </div>
                ))}
        </div>
    );
}

export default CatList;