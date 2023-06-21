import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CheckBox, Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { criarUsuario } from '../../services/controllers/UsuariosController';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleCadastro = () => {
    if (!email || !senha || !confirmarSenha || (senha !== confirmarSenha)) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const usuario = {
        email,
        senha,
        admin: isAdmin ? 1 : 0
    }

    criarUsuario(usuario);


    navigation.goBack();

    setEmail('');
    setSenha('');
    setIsAdmin(false);
    setError('');
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <Input
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />

      <Input
        placeholder="Confirmar Senha"
        secureTextEntry
        onChangeText={setConfirmarSenha}
        value={confirmarSenha}
      />


      <CheckBox
        title="Administrador"
        checked={isAdmin}
        onPress={() => setIsAdmin(!isAdmin)}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Cadastro;
