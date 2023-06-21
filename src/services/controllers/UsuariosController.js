import {dbUsuarios} from '../database/database'

dbUsuarios.transaction((tx) => { 
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, senha TEXT, admin INTEGER);"
    );
});

export const criarUsuario = (obj) => {
    
    return new Promise((resolve, reject) => {
        dbUsuarios.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO usuarios (email, senha, admin) values(?, ?, ?);",
                [obj.email, obj.senha, obj.admin],
                (_, { rowsAffected, insertId }) => {
                    if(rowsAffected > 0) {
                        resolve(insertId)
                    } else {
                        reject("Erro ao inserir dados na tabela: " + JSON.stringify(obj))
                    }
                },
                (_, error) => reject(error, "errou")
            )
        })
    }) 
}


export const autenticar = (email, senha) => {
    return new Promise((resolve, reject) => {
      dbUsuarios.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM usuarios WHERE email = ? AND senha = ?;",
          [email, senha],
          (_, { rows }) => {
            const len = rows.length;
            if (len > 0) {
              // As credenciais são válidas, retorne o usuário
              const usuario = rows.item(0);
              resolve(usuario);
            } else {
              // As credenciais são inválidas
              reject("Usuario invalido");
            }
          },
          (_, error) => reject(error)
        );
      });
    });
  };