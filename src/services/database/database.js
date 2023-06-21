import * as SQLite from 'expo-sqlite'

//criacao do banco de dados local para a lista de receitas
export const dbReceitas = SQLite.openDatabase("listaReceitas")

//criacao do banco de dados local para usuarios
export const dbUsuarios = SQLite.openDatabase("usuarios")
