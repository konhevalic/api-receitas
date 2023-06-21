
import { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GlobalState from './src/global/globalState';

import Home from './src/screens/home';
import Detalhes from './src/screens/detalhes';
import Login from './src/screens/login';
import Cadastro from './src/screens/cadastro';
import { autenticar } from './src/services/controllers/UsuariosController';

// Criação das stacks e do tab navigator
const Stack = createStackNavigator();

export default function App() {
  // Estado para controlar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para armazenar os dados do usuário autenticado
  const [usuario, setUsuario] = useState({});

  // Função para lidar com o login do usuário
  const handleLogin = (email, login) => {
    autenticar(email, login)
      .then(usuario => {
        setIsAuthenticated(true);
        setUsuario(usuario);
      })
      .catch(err => console.log(err));
  };

  // Renderização condicional baseada na autenticação
  if (!isAuthenticated) {
    // Se o usuário não está autenticado, renderiza a tela de login
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false }} initialParams={{ handleLogin: handleLogin }} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // Se o usuário está autenticado, renderiza a tela principal
    return (
      <GlobalState usuario={usuario}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false }} />
            <Stack.Screen name="Detalhes" component={Detalhes} />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalState>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
