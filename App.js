
import { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GlobalState from './src/global/globalState';

import Home from './src/screens/home';
import Detalhes from './src/screens/detalhes';
import ReceitasSalvas from './src/screens/salvos';
import Login from './src/screens/login';
import Cadastro from './src/screens/cadastro';
import { autenticar } from './src/services/controllers/UsuariosController';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


const ListaReceitas = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen 
        name="Salvos" 
        component={ReceitasSalvas} 
        options={{
          tabBarLabel: 'Salvos'
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState({})


  const handleLogin = (email, login) => {
    autenticar(email, login)
      .then(usuario => {
        setIsAuthenticated(true)
        setUsuario(usuario)
      })
      .catch(err => console.log(err))
  }

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false }} initialParams={{ handleLogin: handleLogin}} />
          <Stack.Screen name="Cadastro"component={Cadastro} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <GlobalState usuario={usuario}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false }} />
          <Stack.Screen name="Detalhes"component={Detalhes} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
