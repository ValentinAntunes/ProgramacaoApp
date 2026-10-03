import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Background from '../components/Background';
import Header from '../components/Header';
import ListHeader from '../components/ListHeader';
import Avatar from '../components/Avatar';
import ButtonIcon from '../components/ButtonIcon';
import { theme } from '../theme';

const jogadores = [
  { id: '1', nome: 'Valentin Antunes', online: true, avatar: require('../assets/eu.jpeg') },
  { id: '2', nome: 'Mauro Schulz', online: false, avatar: require('../assets/mauro.jpeg') },
  { id: '3', nome: 'Rafael Dornelas', online: false, avatar: require('../assets/dodo.jpeg') },
];

export default function Detalhes({ route }) {
  const { partida } = route.params;

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <TouchableOpacity>
            <MaterialCommunityIcons name="share-variant" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        }
      />

      <ImageBackground source={require('../assets/banner.png')} style={styles.banner}>
        <LinearGradient
          style={styles.bannerContent}
          colors={['transparent', 'rgba(14, 22, 71, 0.9)']}
        >
          <Text style={styles.title}>{partida.nome}</Text>
          <Text style={styles.subtitle}>{partida.descricao}</Text>
        </LinearGradient>
      </ImageBackground>

      <ListHeader title="Jogadores" subtitle={`Total ${jogadores.length}`} />

      <FlatList
        data={jogadores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.member}>
            <Avatar imagem={item.avatar} />

            <View>
              <Text style={styles.memberName}>{item.nome}</Text>
              <View style={styles.status}>
                <View
                  style={[
                    styles.bullet,
                    { backgroundColor: item.online ? theme.colors.on : theme.colors.primary },
                  ]}
                />
                <Text style={styles.statusText}>{item.online ? 'Disponível' : 'Ocupado'}</Text>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        style={styles.list}
      />

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 234,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  title: {
    fontFamily: theme.fonts.title700,
    fontSize: 28,
    color: theme.colors.heading,
  },
  subtitle: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    lineHeight: 21,
    color: theme.colors.heading,
  },
  list: {
    marginTop: 12,
  },
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  memberName: {
    fontFamily: theme.fonts.title700,
    fontSize: 18,
    color: theme.colors.heading,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 9,
  },
  statusText: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.highlight,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.secondary40,
    marginLeft: 93,
    marginVertical: 14,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
});
