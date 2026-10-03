import { Image, StyleSheet, View } from 'react-native';
import { theme } from '../theme';

export default function GameImage({ imagem, fundo }) {
  return (
    <View style={[styles.container, fundo && { backgroundColor: fundo, padding: 6 }]}>
      <Image
        source={imagem}
        style={styles.image}
        resizeMode={fundo ? 'contain' : 'cover'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 68,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    overflow: 'hidden',
    backgroundColor: theme.colors.secondary40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
