import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "../types/task";
import { COLORS } from "../theme/colors";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const added = new Date(task.dateAdded).toLocaleDateString();

  const completed = task.dateCompleted
    ? new Date(task.dateCompleted).toLocaleDateString()
    : null;

  return (
    <View style={styles.card}>

      <View style={styles.row}>

        {/* LEFT SIDE CONTENT */}
        <View style={styles.content}>

          {task.title ? (
            <Text style={styles.title}>{task.title}</Text>
          ) : null}

          <Text style={[styles.task, task.completed && styles.done]}>
            {task.task}
          </Text>

          <View style={styles.dateRow}>
            <Text style={styles.date}>Added: {added}</Text>

            {completed && (
              <Text style={styles.date}>Completed: {completed}</Text>
            )}
          </View>

        </View>

        {/* RIGHT SIDE CONTROLS */}
        <View style={styles.controlsColumn}>

          {/* CHECKBOX (centered) */}
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => onToggle(task.id)}
          >
            <Ionicons
              name={task.completed ? "checkbox" : "square-outline"}
              size={26}
              color={task.completed ? COLORS.primary : COLORS.secondary}
            />
          </TouchableOpacity>

          {/* DELETE BUTTON AND EDIT BUTTON (bottom) */}

          <View style={{ flexDirection:"row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => onDelete(task.id)}
            >
                <Ionicons name="trash-outline" size={22} color={COLORS.error} />
            </TouchableOpacity>

            {!task.completed && (
              <TouchableOpacity onPress={() => onEdit(task)}>
                <Ionicons name="create-outline" size={26} color={COLORS.primary} />
              </TouchableOpacity>
            )}

          </View>



        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
  },

  content: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  task: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },

  done: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  controlsColumn: {
    width: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },

  checkbox: {
    flex: 1,
    justifyContent: "center",
  },

  deleteBtn: {
    paddingBottom: 2,
  },
});
