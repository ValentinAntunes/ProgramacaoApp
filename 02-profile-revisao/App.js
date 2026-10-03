import { StatusBar } from 'expo-status-bar';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import Button from './src/components/Button';
import Input from './src/components/Input';

const MAX_NAME_LENGTH = 40;

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('marcos@gmail.com')
  const [emailEditavel, setEmailEditavel] = useState(false)

  function fecharTeclado() {
    Keyboard.dismiss()
  }

  function handleSave() {
    Alert.alert(`Ola ${name}`)
    Haptics.selectionAsync()
  }

  function handleClean() {
    setName('')
  }

  function handleToggleEmail() {
    setEmailEditavel((estadoAtual) => !estadoAtual)
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyAvContainer}
      behavior={'padding'}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        bounces={false}
      >
        <TouchableWithoutFeedback onPress={fecharTeclado}>
          <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <Text style={styles.title}>Perfil</Text>

            <View style={styles.main}>
              <TouchableOpacity
                style={styles.btnAvatar}
                activeOpacity={0.5} // ajusta transparencia no clique
              >
                <Image
                  source={{ uri: 'https://avatars.githubusercontent.com/u/62637265?v=4' }}
                  style={styles.avatar}
                />

                <View style={styles.alterarFotoContainer}>
                  <Feather name="camera" size={16} color="#00B37E" />
                  <Text style={styles.txtAlterarFoto}>Alterar foto</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.inputsContainer}>
                <Input
                  placeholder='Nome'
                  value={name}
                  onChangeText={setName}
                  maxLength={MAX_NAME_LENGTH}
                />
                <Text style={styles.charCount}>{name.length}/{MAX_NAME_LENGTH} caracteres</Text>

                <View style={styles.emailRow}>
                  <Input
                    style={[styles.emailInput, !emailEditavel && styles.inputDisabled]}
                    value={email}
                    onChangeText={setEmail}
                    editable={emailEditavel}
                  />

                  <TouchableOpacity
                    style={styles.btnEditar}
                    onPress={handleToggleEmail}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.txtEditar}>{emailEditavel ? 'Concluir' : 'Editar'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputsContainer}>
                <Text style={styles.label}>Alterar senha</Text>

                <Input
                  placeholder='Senha antiga'
                  secureTextEntry
                />

                <Input
                  placeholder='Nova senha'
                  secureTextEntry
                />
              </View>

              <Button title="Salvar" handlePress={handleSave} />
              <Button title="Limpar" handlePress={handleClean} />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyAvContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#202024',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    marginVertical: 24, // cima/baixo
  },
  main: {
    backgroundColor: '#121214',
    flex: 1, // ocupa todo espaço disponivel em tela
    width: '100%',
    paddingVertical: 24, // espaço interno cima/baixo
    paddingHorizontal: 40,
  },
  btnAvatar: {
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 148,
    height: 148,
    borderRadius: 148,
    borderWidth: 2,
    borderColor: '#323238',
  },
  alterarFotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  txtAlterarFoto: {
    color: '#00B37E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputsContainer: {
    gap: 16,
    marginTop: 36,
  },
  charCount: {
    color: '#7C7C8A',
    fontSize: 12,
    marginTop: -8, // aproxima do campo Nome, compensando o gap do container
    alignSelf: 'flex-end',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emailInput: {
    flex: 1,
  },
  btnEditar: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  txtEditar: {
    color: '#00B37E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputDisabled: {
    backgroundColor: '#202024',
    color: '#666',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});