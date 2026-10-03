import { StyleSheet, TextInput } from 'react-native';

export default function Input({ placeholder, value, onChangeText, style, ...rest }) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor='#7C7C8A'
      selectionColor='#00B37E'
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#39393C',
    height: 56,
    width: '100%',
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    paddingLeft: 16,
  },
});