import React, { useEffect, useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: string, title?: string) => void;
  defaultTask?: string;
  defaultTitle?: string;
}


export default function AddTaskModal({ visible, onClose, onSubmit, defaultTask, defaultTitle }: Props) {
  const [task, setTask] = useState(defaultTask || "");
  const [title, setTitle] = useState(defaultTitle || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!task.trim() || task.trim().length < 3) {
      setError("Task must be at least 3 characters long");
      return;
    }

    onSubmit(task, title);

    setTask("");
    setTitle("");
    setError("");

    onClose();
  };

  useEffect(() => {
    if (visible) {
        setTask(defaultTask || "");
        setTitle(defaultTitle || "");
        setError("");
    }
  }, [visible, defaultTask, defaultTitle]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={styles.header}>New Task</Text>

          {/* TITLE INPUT */}
          <TextInput
            placeholder="Title (optional)"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            style={styles.input}
          />

          {/* TASK INPUT */}
          <TextInput
            placeholder="Task"
            value={task}
            onChangeText={(text) => {
              setTask(text);
              if (error) setError("");
            }}
            style={[
              styles.input,
              error && styles.errorInput
            ]}
          />

          {/* ERROR MESSAGE */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000050",
  },

  container: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },

  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  errorInput: {
    borderColor: "#EF4444",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginBottom: 10,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  cancel: {
    color: "#999",
  },

  addBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },

  addText: {
    color: "#fff",
  },
});
