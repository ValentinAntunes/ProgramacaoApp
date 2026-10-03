import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

export const categorias = [
  { id: '1', title: 'Ranqueada', icon: require('../assets/ranked.png') },
  { id: '2', title: 'Duelo 1x1', icon: require('../assets/duel.png') },
  { id: '3', title: 'Diversão', icon: require('../assets/fun.png') },
  { id: '4', title: 'Treino', icon: require('../assets/training.png') },
];

export default function CategoryList({ selecionada, onSelecionar, comCheckbox = false }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.list}
    >
      {categorias.map((item) => {
        const ativa = item.id === selecionada;

        let opacidade = 1;
        if (comCheckbox && !selecionada) opacidade = 0.4;
        if (!comCheckbox && selecionada && !ativa) opacidade = 0.4;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onSelecionar(item.id)}
            activeOpacity={0.7}
            style={{ opacity: opacidade }}
          >
            <LinearGradient
              style={[styles.card, ativa && styles.cardAtivo]}
              colors={ativa ? ['#1F2A70', '#1B2565'] : ['#171F52', '#141B4B']}
            >
              {comCheckbox && <View style={[styles.check, ativa && styles.checkAtivo]} />}

              <Image source={item.icon} style={styles.icon} resizeMode="contain" />
              <Text style={styles.title}>{item.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  list: {
    paddingHorizontal: 24,
    gap: 8,
  },
  card: {
    width: 104,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingTop: 8,
  },
  cardAtivo: {
    borderColor: theme.colors.secondary30,
  },
  icon: {
    width: 48,
    height: 48,
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 15,
  },
  check: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: theme.colors.secondary100,
    borderWidth: 2,
    borderColor: theme.colors.secondary50,
  },
  checkAtivo: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});
