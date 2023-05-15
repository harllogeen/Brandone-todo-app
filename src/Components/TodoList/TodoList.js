import { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");




  const editTask =  (id, updatedList) => {
    const updatedListFromApi = editTask(id, updatedList);
    const updatedLists = tasks.map ((task) => 
        task.id === id ? updatedListFromApi : task
    );
    setTasks(updatedLists)
    
  }

  const deleteTasks = (index) => {
    const updatedList = [...tasks];
    console.log("Automatic...");
    // delete updatedList[index];
    updatedList.splice(index, 1);
    setTasks(updatedList);
  };

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        setTasks(json);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

    const handleNewTodoTitleChange = event => {
      setNewTodoTitle(event.target.value);
    };

    const handleAddTodo = event => {
      event.preventDefault();
      const newTodo = { title: newTodoTitle };
      fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(tasks => setTodos([...todos, tasks]));
    setNewTodoTitle('');
   };
  return (
    <div className=" flex flex-col items-center">
      <h1 className=" text-4xl m-16 font-bold">BrandOne Todo-List App</h1>
      <div className=" bg-gray-300 p-6 rounded-lg ">
        <div className="p-6 bg-slate-700 flex gap-4">
          <input
            className=" bg-slate-100 rounded-md w-96 pl-3 "
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            placeholder="Create a new todo"
          />
          <button className=" bg-green-500 text-white p-3  rounded-md font-bold hover:bg-green-600" onClick={() =>handleAddTodo}>
              {isEditing ? "Add" : "Submit"}
            </button>
        </div>
        <div>
          {tasks?.length > 0 ? (
            <ul>
              {tasks.map((task, index) => (
                <div
                  className=" flex bg-slate-100 m-4 py-4 pl-12 pr-4 rounded-md"
                  key={index}
                >
                  <li className="self-center font-semibold pr-10 mr-6 grow">
                    {task.title}
                  </li>
                  <div className="">
                    <button
                      onClick={() => {
                        editTask(index);
                      }}
                      className=" bg-sky-950 text-white px-5 py-2 mx-1 rounded-md font-bold hover:bg-red-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteTasks(index);
                      }}
                      className=" bg-red-500 text-white p-2 mx-1 rounded-md font-bold hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <div>
              <p className=" text-red-950 font-bold text-center pt-4">
                No Task Found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
