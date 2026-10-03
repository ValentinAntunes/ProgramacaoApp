import { StyleSheet, Text, TouchableOpacity } from "react-native";

/**
 * 
 * @param {string} title - texto dentro do btn
 * @param {function} handlePress - funçao disparada pelo btn
 * @example
 * <Button title="Texto" handlePress={handleFunction} />
 * @returns 
 */
export default function Button({ title, handlePress }) {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={handlePress}
    >
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#00B37E',
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
