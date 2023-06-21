import { useContext } from 'react'
import { View, StyleSheet, Image, Text, FlatList, Button } from 'react-native'

const ListaReceitas = ({navigation, listaReceitas}) => {

    return (
        <View style={styles.app}>
            <FlatList 
                data={listaReceitas}
                numColumns={2}
                key={item => item.idMeal}
                keyExtractor={item => item.idMeal}
                renderItem= {({item}) => {
                    return (
                        <View style={styles.item}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: item.strMealThumb,
                                }}
                            />
                            <Text>{item.strMeal}</Text>
                            <Button
                                title="Detalhes"
                                onPress={() => navigation.navigate("Detalhes", {receita: item})}
                            />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default ListaReceitas

const styles = StyleSheet.create({
    app: {
        marginHorizontal: "auto",
        width: 400,
        flexDirection: "row",
        maxWidth: '100%',
        height: '100%'
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
