import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Edges, SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  children: React.ReactNode;
  edges?: Edges | undefined;
  frameStyle?: StyleProp<ViewStyle>,
}

const Frame = ({ children, frameStyle, edges }: Props) => {
  return (
     <SafeAreaView style={[styles.container, frameStyle]} edges={edges}>
      {children}
    </SafeAreaView>
  )
}

export default Frame

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})