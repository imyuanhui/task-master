// Remove an object from the data.
export const removeItem = (level, itemId, currData, setCurrData) => {

    const updateData = () => {
        const data = { ...currData };

        if (level === "todos") {
            data.todos = data.todos.filter((todo) => todo.id !== itemId);
        }

        if (level === "tasks") {
            data.todos = data.todos.filter((todo) => todo.taskId !== itemId);
            data.tasks = data.tasks.filter((task) => task.id !== itemId)
        }

        if (level === "cats") {
            const taskIdArr = data.tasks.filter((task) => task.catId === itemId);
            data.todos = data.todos.filter((todo) => !taskIdArr.includes(todo.taskId));
            data.tasks = data.tasks.filter((task) => task.catId !== itemId);
            data.cats = data.cats.filter((cat) => cat.id !== itemId)
        }

        setCurrData(data);
        console.log(data);
    }

    
    itemId === 0 ?
        alert("不能删除默认任务")
        :
        updateData()
};
