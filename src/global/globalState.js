import axios from 'axios'
import React, {useState, useEffect} from 'react'
import GlobalStateContext from './globalStateContext'
import { BASE_URL } from '../constants/url'
import { read } from '../services/controllers/ListaReceitasController'

const GlobalState = (props) => {

    const {usuario} = props
    const {admin} = usuario

    const [listaReceitas, setListaReceitas] = useState([])
    const [receitasAdicionadas, setReceitasAdicionadas] = useState([]);

    const carregarDados = async () => {
        try {
            if(admin === 0) {
                const resultado = await read()
                setListaReceitas(resultado._array)
            } else if (admin === 1) {
                axios.get(`${BASE_URL}/search.php?s`)
                .then(async response => {
                    const resultado = await read()
                    setReceitasAdicionadas(resultado._array)
                    setListaReceitas(response.data.meals)
                })
                .catch(err => console.log(err))
            }
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
    };

    useEffect(() => {

        carregarDados();

    }, [usuario])

    const data = {listaReceitas, admin, receitasAdicionadas, setListaReceitas}

    return (
        <GlobalStateContext.Provider value={data}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState