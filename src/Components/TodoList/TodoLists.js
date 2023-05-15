import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert/Alert";

const TodoLists = () => {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setTasks(
        tasks.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "success", "Value Changes");
    } else {
      showAlert(true, "success", "Item Added to the List");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setTasks([...tasks, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setTasks(tasks.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const editItem = tasks.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(editItem.title);
  };
  const clearList = () => {
    showAlert(true, "danger", "Items Empty");
    setTasks([]);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" justify-center my-6  flex flex-col items-center"
      >
        <div className=" bg-gray-300 p-6 rounded-lg justify-center items-center shadow-lg  ">
          <div className=" items-center justify-center text-center  w-full">
            {" "}
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} tasks={tasks} />
            )}
          </div>

          <h1 className=" text-3xl text-sky-900 font-bold items-center text-center pb-4">
            BrandOne Todo-List App
          </h1>
          <div className="p-6 bg-slate-700  flex gap-4 justify-center ">
            <input
              className=" bg-slate-100 rounded-md w-96 pl-3 "
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Create a new todo"
            />
            <button className=" bg-green-500 text-white p-3  rounded-md font-bold hover:bg-green-600">
              {isEditing ? "Add" : "Submit"}
            </button>
          </div>
          {tasks.length > 0 && (
            <div className="mt-4 items-center ">
              <List items={tasks} removeItem={removeItem} editItem={editItem} />
              <div className="text-center">
                <button
                  className=" bg-amber-500 text-black mt-4 shadow-lg px-4 py-1 font-bold rounded-sm text-center items-center hover:bg-amber-600 "
                  onClick={clearList}
                >
                  Clear List
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoLists;
