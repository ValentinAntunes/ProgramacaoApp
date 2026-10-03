import { Image, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import ButtonIcon from '../components/ButtonIcon';
import { theme } from '../theme';

export default function Login({ navigation }) {
  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={require('../assets/illustration.png')}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se{'\n'}e organize suas{'\n'}jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games{'\n'}favoritos com seus amigos
          </Text>

          <ButtonIcon
            title="Entrar com Discord"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 360,
  },
  content: {
    marginTop: -40,
    paddingHorizontal: 50,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.heading,
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 40,
    fontFamily: theme.fonts.title700,
    marginBottom: 16,
  },
  subtitle: {
    color: theme.colors.heading,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 25,
    fontFamily: theme.fonts.text400,
    marginBottom: 64,
  },
});
