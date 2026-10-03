import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Feather } from '@expo/vector-icons';
import Background from '../components/Background';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import GameImage from '../components/GameImage';
import Button from '../components/Button';
import { theme } from '../theme';

export default function AgendarPartida({ navigation }) {
  const [categoria, setCategoria] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [hora, setHora] = useState('');
  const [minuto, setMinuto] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <Background>
      <Header title="Agendar partida" />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        bottomOffset={24}
      >
        <Text style={[styles.label, styles.labelCategoria]}>Categoria</Text>

        <CategoryList selecionada={categoria} onSelecionar={setCategoria} comCheckbox />

        <View style={styles.form}>
          <TouchableOpacity style={styles.servidor} activeOpacity={0.7}>
            <GameImage imagem={require('../assets/valorant.png')} fundo="#0F1923" />

            <View style={styles.servidorInfo}>
              <Text style={styles.servidorNome}>Valorosos</Text>
              <Text style={styles.servidorJogo}>Valorant</Text>
            </View>

            <Feather name="chevron-right" size={18} color={theme.colors.heading} />
          </TouchableOpacity>

          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Dia e mês</Text>
              <View style={styles.inputs}>
                <TextInput
                  style={styles.smallInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={dia}
                  onChangeText={setDia}
                />
                <Text style={styles.divider}>/</Text>
                <TextInput
                  style={styles.smallInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={mes}
                  onChangeText={setMes}
                />
              </View>
            </View>

            <View>
              <Text style={[styles.label, styles.labelHorario]}>Horário</Text>
              <View style={styles.inputs}>
                <TextInput
                  style={styles.smallInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={hora}
                  onChangeText={setHora}
                />
                <Text style={styles.divider}>:</Text>
                <TextInput
                  style={styles.smallInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={minuto}
                  onChangeText={setMinuto}
                />
              </View>
            </View>
          </View>

          <View style={styles.descricaoHeader}>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.max}>Max 100 caracteres</Text>
          </View>

          <TextInput
            style={styles.textArea}
            multiline
            maxLength={100}
            value={descricao}
            onChangeText={setDescricao}
          />

          <SafeAreaView edges={['bottom']} style={styles.footer}>
            <Button title="Agendar" onPress={() => navigation.goBack()} />
          </SafeAreaView>
        </View>
      </KeyboardAwareScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  label: {
    fontFamily: theme.fonts.title700,
    fontSize: 18,
    color: theme.colors.heading,
  },
  labelCategoria: {
    marginLeft: 24,
    marginTop: 32,
    marginBottom: 18,
  },
  labelHorario: {
    textAlign: 'right',
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 32,
  },
  servidor: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    paddingRight: 25,
    overflow: 'hidden',
  },
  servidorInfo: {
    flex: 1,
    marginLeft: 20,
  },
  servidorNome: {
    fontFamily: theme.fonts.title700,
    fontSize: 18,
    color: theme.colors.heading,
  },
  servidorJogo: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.highlight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  smallInput: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.secondary40,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    borderRadius: 8,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    textAlign: 'center',
  },
  divider: {
    marginHorizontal: 6,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    color: theme.colors.highlight,
  },
  descricaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 12,
  },
  max: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.highlight,
  },
  textArea: {
    height: 95,
    backgroundColor: theme.colors.secondary40,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    borderRadius: 8,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    lineHeight: 21,
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 40,
    paddingBottom: 24,
  },
});
