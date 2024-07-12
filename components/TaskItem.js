import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const TaskItem = ({ task, editTask, deleteTask, toggleCompleteTask }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={task.completed}
        onPress={() => toggleCompleteTask(task.id)}
      />
      <View style={styles.taskTextContainer}>
        <TouchableOpacity onPress={() => toggleCompleteTask(task.id)}>
          <Text
            style={[styles.taskText, task.completed && styles.completedTask]}
            numberOfLines={expanded ? undefined : 1}
          >
            {task.text}
          </Text>
        </TouchableOpacity>
        {task.text.length > 30 && (
          <TouchableOpacity onPress={toggleExpand}>
            <Text style={styles.seeMoreText}>
              {expanded ? "See Less" : "See More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => editTask(task.id, task.text)}
      >
        <MaterialIcons name="edit" size={24} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => deleteTask(task.id)}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 18,
  },
  seeMoreText: {
    color: "blue",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  iconContainer: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskItem;
