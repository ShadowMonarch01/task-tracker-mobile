import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

type Filter = "all" | "active" | "completed";

interface Props {
  currentFilter: Filter;
  onChange: (filter: Filter) => void;
}

export default function FilterTabs({ currentFilter, onChange }: Props) {
  const tabs: Filter[] = ["all", "active", "completed"];

  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            currentFilter === tab && styles.activeTab
          ]}
          onPress={() => onChange(tab)}
        >
          <Text
            style={[
              styles.tabText,
              currentFilter === tab && styles.activeTabText
            ]}
          >
            {tab.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.primary,
  },

  tabText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#fff",
  },
});
