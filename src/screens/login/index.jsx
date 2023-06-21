import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Login = ({ navigation, route }) => {
  // Estados para armazenar o e-mail e a senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função de login passada como parâmetro da rota
  const { handleLogin } = route.params;

  // Função chamada ao pressionar o botão de login. É utilizado a funcao handleLogin, passando parametros digitados pelo usuario.
  const onLogin = () => {
    handleLogin(email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={onLogin} />
      <Button title="Cadastre-se" onPress={() => navigation.navigate("Cadastro")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Login;
