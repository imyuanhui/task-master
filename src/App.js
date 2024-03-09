import './App.css';
import TodoList from './components/todolist/TodoList';
import CatList from './components/catlist/CatList';
import TodoView from './components/todoview/TodoView';
import { useEffect, useState } from 'react';
import FooterBtn from './components/buttons/FooterBtn';
import Prompt from './components/prompt/Prompt';
import { removeOldColor } from './functions/removeOldColor';
import { data as initialData } from './constants/data';

function App() {


  // Track the states that need to pass between components.
  const [selectedCat, setSelectedCat] = useState(0);
  const [selectedTask, setSelectedTask] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [currData, setCurrData] = useState(() => {
    const savedData = localStorage.getItem('todoData');
    return savedData ? JSON.parse(savedData) : initialData;
  });
  const [showPrompt, setShowPrompt] = useState(false);
  const [propmtLevel, setPromptLevel] = useState("tasks");
  
  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(currData));
  }, [currData]);

  // handle the prompt
  const handlePrompt = (level) => {
    setShowPrompt(true);
    setPromptLevel(level);
  }

  // handle click the header of cat list
  const handleClicCatListHeader = () => {
    removeOldColor(`cat-${selectedCat}`, "grey");
    setSelectedCat(-1);
    setSelectedTask(0);
    setSelectedTodo(0);
  }
    
  return (
    <div className="App">
      <header><p>Task Master</p></header>
      <div className="App-main">
        <div className="App-main-left">
          <div>
            <p className="catlist-header" style={{paddingLeft: ".5rem"}} onClick={() => handleClicCatListHeader()}>所有任务<span>{`(${currData.tasks.length})`}</span></p>
            <p className="catlist-header" style={{paddingLeft: ".5rem"}} onClick={() => handleClicCatListHeader()}>分类列表</p>
            <CatList
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              currData={currData}
              setCurrData={setCurrData}
            /> 
          </div>
          <FooterBtn text="新增任务" onClick={() => handlePrompt("tasks")}/>
        </div>

        <div className="App-main-center">
          <TodoList
            selectedTask={selectedTask}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
            currData={currData}
          />
          <FooterBtn text="新增待办" onClick={() => handlePrompt("todos")}/>
        </div>

        <div className="App-main-right">
          <TodoView
            selectedTodo={selectedTodo}
            isTodoEditable={isTodoEditable}
            setIsTodoEditable={setIsTodoEditable}
            currData={currData}
            setCurrData={setCurrData}
            setSelectedTodo={setSelectedTodo}
          />
        </div>
        
      </div>
      {showPrompt && propmtLevel === "tasks" ?
        <Prompt
          level="tasks"
          setShowPrompt={setShowPrompt}
          selectedCat={selectedCat}
          selectedTask={selectedTask}
          currData={currData}
          setCurrData={setCurrData} />
        :
        null}
      {showPrompt && propmtLevel === "todos" ?
        <Prompt
          level="todos"
          setShowPrompt={setShowPrompt}
          selectedCat={selectedCat}
          selectedTask={selectedTask}
          currData={currData}
          setCurrData={setCurrData} />
        :
        null}
    </div>
  );
}

export default App;
