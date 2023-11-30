import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import "./body.css";
import Task from "../task/task";
import { db } from '../../firebase';
import {
  collection,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
  addDoc
} from "firebase/firestore";

const Body = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(false);
  const [newTask, setNewTask] = useState("");
  const user = sessionStorage.getItem('user');
  const Navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setTasks(items);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    // Initialize 'user' key in sessionStorage if it doesn't exist
    if (!sessionStorage.getItem('user')) {
      sessionStorage.setItem('user', ''); // You can set it to any default value you want
    }
  }, []);

  const addNewTask = async () => {
    if(user!== null && user!== "" && newTask !== ""){
      try {
        const docRef = await addDoc(collection(db, "tasks"), { userID: user, title: newTask, completed: false, deleted: false });
        setTasks([...tasks, { id: docRef.id, userID: user, title: newTask, completed: false, deleted: false }]);
        setNewTask(''); // Clear input field after adding task
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
    else{
      Navigate('/login');
    }
  }

  const completeTask = async (id) => {
    try {
      await updateDoc(doc(db, "tasks", id), { completed: true });
      setTasks(tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      ));
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const todoTasks = () => {
    setFilter(false);
    document.getElementById("completedBtn").classList.remove("active");
    document.getElementById("todoBtn").classList.add("active");
  };

  const completedTasks = () => {
    setFilter(true);
    document.getElementById("todoBtn").classList.remove("active");
    document.getElementById("completedBtn").classList.add("active");
  }

  return (
    <>
      <Header />
      <main>
        <div id="newTask">
          <input type="text" placeholder="Add new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} id="taskInput" />
          <button id="addTask" onClick={addNewTask}>+</button>
        </div>
        <hr />
        <div id="statusFilter">
          <button id="todoBtn" className="active" onClick={todoTasks}>To Do</button>
          <button id="completedBtn" onClick={completedTasks}>Completed</button>
        </div>
        <div id="taskList">
          {
            tasks.filter((task) => task.userID === user && task.deleted === false && task.completed === filter).map((task) => (
              <Task key={task.id} taskId={task.id} title={task.title} completed={task.completed} completetask={() => completeTask(task.id)} deletetask={() => deleteTask(task.id)} />
            ))
          }
        </div>
      </main>
    </>
  );
};

export default Body;