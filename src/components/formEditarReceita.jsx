import { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native'
import globalStyles from '../../globalStyles';
import { read, update } from '../services/controllers/ListaReceitasController';

const FormEditarReceita = ({receita, setShowModal}) => {

    //Estado para salvar objeto que sera enviado para o banco de dados
    const [novaReceita, setNovaReceita] = useState({
        strMeal: receita.strMeal,
        strMealThumb: receita.strMealThumb,
        strCategory: receita.strCategory,
        strArea: receita.strArea,
        strInstructions: receita.strInstructions,
        strYoutube: receita.strYoutube
      });

    //Funcao para editar dados salvos
    const editarCampo = (key, value) => {
        setNovaReceita(prevReceita => ({
            ...prevReceita,
            [key]: value
        }))
        
    }

    //Funcao que ira atualizar os dados informados no banco de dados.
    const salvarReceita = () => {
        update(parseInt(receita.id, 10), novaReceita)
        setShowModal(false)
    }

    return (
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={(value) => editarCampo('strMeal', value)}
                        placeholder="Nome receita"
                        defaultValue={receita.strMeal}
                    />
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={(value) => editarCampo('strCategory', value)}
                        placeholder="Categoria"
                        defaultValue={receita.strCategory}
                    />
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={(value) => editarCampo('strArea', value)}
                        placeholder="Regiao"
                        defaultValue={receita.strArea}
                    />
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={(value) => editarCampo('strInstructions', value)}
                        placeholder="Modo de preparo"
                        defaultValue={receita.strInstructions}
                    />
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={(value) => editarCampo('strYoutube', value)}
                        defaultValue={receita.strYoutube}
                        placeholder="Link Youtube"
                    />
                    <Button 
                        onPress={() => salvarReceita()}
                        title="Salvar"
                    />
                </View>
            </View>
    )
}

export default FormEditarReceita;

const styles = StyleSheet.create({

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },

      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },

  });