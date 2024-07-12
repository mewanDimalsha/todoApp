import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import TaskItem from "./TaskItem";

const TaskList = ({
  title,
  tasks,
  editTask,
  deleteTask,
  toggleCompleteTask,
}) => {
  return (
    <View style={styles.taskSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            editTask={editTask}
            deleteTask={deleteTask}
            toggleCompleteTask={toggleCompleteTask}
          />
        )}
        ListEmptyComponent={<Text>No {title.toLowerCase()} available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default TaskList;
