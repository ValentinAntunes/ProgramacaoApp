import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import GameImage from './GameImage';
import { categorias } from './CategoryList';
import { theme } from '../theme';

export default function Appointment({ data, onPress }) {
  const categoria = categorias.find((item) => item.id === data.categoria);
  const corJogador = data.anfitriao ? theme.colors.primary : theme.colors.on;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <GameImage imagem={data.imagem} fundo={data.fundo} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>{data.nome}</Text>
          <Text style={styles.category}>{categoria.title}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.info}>
            <MaterialCommunityIcons name="calendar-blank" size={18} color={theme.colors.primary} />
            <Text style={styles.date}>{data.data}</Text>
          </View>

          <View style={styles.info}>
            <FontAwesome name="user" size={16} color={corJogador} />
            <Text style={[styles.player, { color: corJogador }]}>
              {data.anfitriao ? 'Anfitrião' : 'Visitante'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    marginLeft: 26,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 18,
  },
  category: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
    fontSize: 13,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  date: {
    fontFamily: theme.fonts.text500,
    color: theme.colors.heading,
    fontSize: 13,
  },
  player: {
    fontFamily: theme.fonts.text500,
    fontSize: 13,
  },
});
