import React, { useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { addTask, toggleTask, deleteTask, setFilter, editTask} from "../redux/slices/tasksSlice";
import AddTaskModal from "../components/AddTaskModal";
import TaskItem from "../components/TaskCard";
import FilterTabs from "../components/FilterTabs";
import { Task } from "../types/task";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Filter + Search Logic
  const filtered = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) => {
      const query = search.toLowerCase();

      return (
        task.task.toLowerCase().includes(query) ||
        (task.title?.toLowerCase().includes(query) ?? false)
      );
    });

  return (
    <View style={styles.container}>

      {/* FILTER TABS */}
      <FilterTabs
        currentFilter={filter}
        onChange={(f) => dispatch(setFilter(f))}
      />


      {/* SEARCH BAR */}
      <TextInput
        placeholder="Search tasks..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />


      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={(id) => dispatch(toggleTask(id))}
            onDelete={(id) => dispatch(deleteTask(id))}
            onEdit={(task) => {
              if (!task.completed) {
                setEditingTask(task);
                setModalVisible(true);
              }
            }}
          />
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}>+ Add Task</Text>
      </TouchableOpacity>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingTask(null);
        }}
        defaultTask={editingTask?.task}
        defaultTitle={editingTask?.title}
        onSubmit={(task, title) => {
          if (editingTask) {
            dispatch(
              editTask({
                id: editingTask.id,
                task,
                title,
              })
            );
          } else {
            dispatch(
              addTask({
                id: Date.now().toString(),
                task,
                title,
                completed: false,
                dateAdded: new Date().toISOString(),
                dateCompleted: null,
              })
            );
          }

          setEditingTask(null);
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FB",
  },

  tabsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: "#4F46E5",
  },

  tabText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#fff",
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
  },

  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 30,
    elevation: 5,
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
  },
});

