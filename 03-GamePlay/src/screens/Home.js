import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Background from '../components/Background';
import CategoryList from '../components/CategoryList';
import ListHeader from '../components/ListHeader';
import Appointment from '../components/Appointment';
import { theme } from '../theme';

const partidas = [
  {
    id: '1',
    nome: 'LOL não pô',
    categoria: '1',
    data: '18/06 às 21:00h',
    anfitriao: true,
    imagem: require('../assets/lol.png'),
    fundo: '#0B1B2B',
    descricao: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
  },
  {
    id: '2',
    nome: 'Red dédi',
    categoria: '3',
    data: '23/06 às 19:00h',
    anfitriao: false,
    imagem: require('../assets/rdr2.jpg'),
    descricao: 'Bora fazer uns assaltos no velho oeste com a gangue toda',
  },
  {
    id: '3',
    nome: 'Cszinho',
    categoria: '2',
    data: '20/06 às 09:00h',
    anfitriao: true,
    imagem: require('../assets/csgo.png'),
    fundo: '#FFFFFF',
    descricao: 'Treino de mira e x1 pra subir de patente',
  },
  {
    id: '4',
    nome: 'que jogo é esse?',
    categoria: '1',
    data: '20/06 às 14:20h',
    anfitriao: true,
    imagem: require('../assets/apex.jpg'),
    descricao: 'Squad fechado pra ranqueada, só entra quem joga sério',
  },
  {
    id: '5',
    nome: 'Valorant é ruim',
    categoria: '3',
    data: '18/06 às 21:00h',
    anfitriao: true,
    imagem: require('../assets/valorant.png'),
    fundo: '#0F1923',
    descricao: 'Partida de boa com a galera depois da aula',
  },
  {
    id: '6',
    nome: 'Gta 6 kkk',
    categoria: '3',
    data: '25/06 às 22:00h',
    anfitriao: false,
    imagem: require('../assets/gta.jpg'),
    descricao: 'Rolê em Los Santos sem compromisso',
  },
];

export default function Home({ navigation }) {
  const [categoria, setCategoria] = useState('');

  function handleCategoria(id) {
    setCategoria(id === categoria ? '' : id);
  }

  const lista = categoria
    ? partidas.filter((item) => item.categoria === categoria)
    : partidas;

  return (
    <Background>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.user}>
            <LinearGradient
              style={styles.avatarBorda}
              colors={[theme.colors.primary, theme.colors.secondary30]}
            >
              <Image source={require('../assets/eu.jpeg')} style={styles.avatar} />
            </LinearGradient>

            <View>
              <Text style={styles.greeting}>
                Olá, <Text style={styles.username}>Valentin</Text>
              </Text>
              <Text style={styles.message}>Hoje é dia de vitória</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AgendarPartida')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" size={24} color={theme.colors.heading} />
          </TouchableOpacity>
        </View>

        <CategoryList selecionada={categoria} onSelecionar={handleCategoria} />

        <ListHeader title="Partidas agendadas" subtitle={`Total ${lista.length}`} />

        <FlatList
          data={lista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Appointment
              data={item}
              onPress={() => navigation.navigate('Detalhes', { partida: item })}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 26,
    marginBottom: 42,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBorda: {
    width: 49,
    height: 49,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 8,
  },
  greeting: {
    fontFamily: theme.fonts.title500,
    fontSize: 24,
    color: theme.colors.heading,
  },
  username: {
    fontFamily: theme.fonts.title700,
  },
  message: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.highlight,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingTop: 12,
    paddingBottom: 60,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.secondary40,
    marginLeft: 114,
    marginVertical: 20,
  },
});
