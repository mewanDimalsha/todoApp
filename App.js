import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTask = () => {
    if (taskText.trim().length === 0) {
      Alert.alert("Error", "Task description cannot be empty");
      return;
    }
    if (isEditing) {
      saveEditTask();
    } else {
      addTask();
    }
  };

  const addTask = () => {
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTaskText("");
    saveTasks(updatedTasks);
  };

  const saveEditTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: taskText } : task
    );
    setTasks(updatedTasks);
    setTaskText("");
    setIsEditing(false);
    setEditingTaskId(null);
    saveTasks(updatedTasks);
  };

  const editTask = (id, text) => {
    setTaskText(text);
    setIsEditing(true);
    setEditingTaskId(id);
  };

  const deleteTask = (id) => {
    Alert.alert("Confirm", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updatedTasks = tasks.filter((task) => task.id !== id);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  const toggleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button
        title={isEditing ? "Save Task" : "Add Task"}
        onPress={handleTask}
      />
      <View style={styles.taskSectionsContainer}>
        <TaskList
          title="Pending Tasks"
          tasks={pendingTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleCompleteTask={toggleCompleteTask}
        />
        <TaskList
          title="Completed Tasks"
          tasks={completedTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleCompleteTask={toggleCompleteTask}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  taskSectionsContainer: {
    flex: 1,
    flexDirection: "column",
  },
});
