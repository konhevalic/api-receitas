import React, { useContext, useEffect, useState } from 'react'
import { useNavigationState } from '@react-navigation/native';
import GlobalStateContext from '../../global/globalStateContext'

import { View, StyleSheet, Image, Text, FlatList, Button } from 'react-native'
import ListaReceitas from '../../components/listaReceitas';
const Home = ({navigation, route}) => {

    const {listaReceitas} = useContext(GlobalStateContext)

    const navigationState = useNavigationState((state) => state); 
    const { index } = navigationState;

    return (
      <View>
        <ListaReceitas listaReceitas={listaReceitas} navigation={navigation} index={index} salvo={false} />
      </View>
        
    )
}

export default Home

const styles = StyleSheet.create({
    app: {
        marginHorizontal: "auto",
        width: 400,
        flexDirection: "row",
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
