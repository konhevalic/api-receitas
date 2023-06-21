import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native'
import DetalhesReceita from '../../components/detalhesReceita';
// import ModalMessage from '../../components/modal';
import GlobalStateContext from '../../global/globalStateContext'


const Detalhes = ({navigation, route}) => {

    const {listaReceitas} = useContext(GlobalStateContext)

    const {receita} = route.params

    const [isAdded, setIsAdded] = useState(false)

    const indexReceita = listaReceitas.findIndex((item) => item.strMeal === receita.strMeal)

    useEffect(() => {
        if(indexReceita < 0) {
            setIsAdded(false)
        } else {
            setIsAdded(true)
        }
    }, [])

    return (
        <DetalhesReceita 
            navigation={navigation} 
            route={route}
            isAdded={isAdded}
        />
    )
}

export default Detalhes;
