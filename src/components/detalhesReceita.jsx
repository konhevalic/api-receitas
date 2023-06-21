import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button} from 'react-native'
import GlobalStateContext from '../global/globalStateContext'
import { create, read, remove } from '../services/controllers/ListaReceitasController';
import { useNavigation } from '@react-navigation/native';
import ModalMessage from './modal';
import { useEffect } from 'react';

//ingredientes e quantidade, fazer funcao para adicionar essas propriedades em utils
//documentar funcoes    

const DetalhesReceita = ({route}) => {

    const [showModal, setShowModal] = useState(false)
    const [isAdicionado, setIsAdicionado] = useState(false);
    const [receitaId, setReceitaId] = useState()

    const {admin, receitasAdicionadas, setListaReceitas, listaReceitas} = useContext(GlobalStateContext)

    const navigation = useNavigation();

    const {receita} = route.params

    useEffect(() => {
        if(admin) {

            const adicionado = receitasAdicionadas.filter(item => item.idMeal === receita.idMeal)

            if(adicionado.length === 1) {
                setReceitaId(adicionado[0].id)
                setIsAdicionado(true)
            }
        }

    }, [receita.id])

    const carregarDados = async () => {
        try {
            if(admin === 0) {
                const resultado = await read()
                setListaReceitas(resultado._array)
            }
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
    };

    useEffect(() => {
        carregarDados();
        

    }, [showModal])


    const adicionarReceita = (receita) => {
        const objAdicionado = {
            idMeal: receita.idMeal,
            strMeal: receita.strMeal,
            strMealThumb: receita.strMealThumb,
            strCategory: receita.strCategory,
            strArea: receita.strArea,
            strInstructions: receita.strInstructions,
            strYoutube: receita.strYoutube
        }
    
        create(objAdicionado)
    }

    const removerReceita = (id) => {
        remove(id)
        navigation.goBack();
    }

    const editarReceita = () => {
        setShowModal(true)
    }

    return (
        <ScrollView style={styles.container}>
            <ModalMessage showModal={showModal} receita={receita} setShowModal={setShowModal} />
            <View>
                <Image
                    style={styles.image}
                    source={{
                        uri: receita.strMealThumb,
                    }}
                />
            </View>
            <View style={styles.linha}>
                <Text style={styles.texts}>Nome: </Text>
                <Text style={styles.propriedades}>{receita.strMeal}</Text>
            </View>
            <View style={styles.linha}>
                <Text style={styles.texts}>Categoria: </Text>
                <Text style={styles.propriedades}>{receita.strCategory}</Text>
                
            </View>
            <View style={styles.linha}>
                <Text style={styles.texts}>Area: </Text>
                <Text style={styles.propriedades}>{receita.strArea}</Text>
            </View>
            <View style={styles.linha}>
                <Text style={styles.texts}>Instrucoes: </Text>
                <Text style={styles.propriedades}>{receita.strInstructions}</Text>
            </View>
            <View style={styles.linha}>
                <Text style={styles.texts}>Tutorial: </Text>
                <Text style={styles.propriedades}>{receita.strYoutube}</Text>
            </View>

            <View style={styles.buttons}>
                {admin && isAdicionado ? (<Button
                    title={"Remover Receita"}
                    onPress={() => removerReceita(receitaId)}
                />): <Text></Text>}
                <Button
                    title={admin ? "Salvar Receita" : "Editar Receita"}
                    onPress={admin ? () => adicionarReceita(receita) : () => editarReceita()}
                />
            </View>
        </ScrollView>
    )
}

export default DetalhesReceita;


const styles = StyleSheet.create({

    container: {
        margin: 24,
        display: 'flex',
        flexWrap: 'wrap', 
        maxWidth: '100%', 
        overflow: 'hidden', 
        textAlign: 'left'
    },

    linha: {
        flexDirection: 'row'
    },

    texts: {
        fontSize: 16,
        marginTop: 16,
        fontWeight: 'bold',
    },

    propriedades: {
        fontSize: 16,
        marginTop: 16,
        
    },

    buttons: {
        marginTop: 18,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width:150,
        height:150,
        resizeMode:'contain',
        margin:8,
        justifyContent: 'center',
        display: 'flex'
    }
  });
