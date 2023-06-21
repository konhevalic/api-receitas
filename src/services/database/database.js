import * as SQLite from 'expo-sqlite'

export const dbReceitas = SQLite.openDatabase("listaReceitas")

export const dbUsuarios = SQLite.openDatabase("usuarios")
