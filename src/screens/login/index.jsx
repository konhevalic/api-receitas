import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Login = ({navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin } = route.params;
  

  const onLogin = () => {
    // Aqui você pode fazer a validação do e-mail e senha, e então chamar a função onLogin
    // para notificar o componente pai que o login foi realizado com sucesso.
    // Você pode passar os valores de e-mail e senha como argumentos para a função onLogin.
    handleLogin(email, password);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={text => setPassword(text)}
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
