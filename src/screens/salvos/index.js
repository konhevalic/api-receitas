import React, { useRef, useEffect, useState} from 'react'
import GlobalStateContext from '../../global/globalStateContext'
import { useNavigationState } from '@react-navigation/native';
import { StyleSheet, Text} from 'react-native'
import ListaReceitas from '../../components/listaReceitas'
import { read } from '../../services/controllers/ListaReceitasController'

const ReceitasSalvas = ({navigation}) => {

    const [lista, setLista] = useState([])

    const dadosRef = useRef(lista);


    const navigationState = useNavigationState((state) => state); 
    const { index } = navigationState;

    useEffect(() => {

      const carregarDados = async () => {
        try {
          const resultado = await read()

            // Chame a função de leitura do SQLite
            
            setLista(resultado._array)
            dadosRef.current = resultado


      
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
      };
    
      carregarDados();
    
    }, [index]);

    return (
        lista && <ListaReceitas listaReceitas={lista} navigation={navigation} salvo={true}/>
    )
}

export default ReceitasSalvas

const styles = StyleSheet.create({
    app: {
        marginHorizontal: "auto",
        width: 400,
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: '100%'
      },
      item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 2,
        borderRadius: 8.0,
        color: '#aaa',
      },
      image: {
        width:150,
        height:150,
        resizeMode:'contain',
        margin:8,
    }
  });
