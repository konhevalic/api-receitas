import {dbReceitas} from '../database/database'

dbReceitas.transaction((tx) => { 
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS listaReceita (id INTEGER PRIMARY KEY AUTOINCREMENT, idMeal TEXT, strMeal TEXT, strMealThumb TEXT, strCategory TEXT, strArea TEXT, strInstructions TEXT, strYoutube TEXT);"
    );
});

export const create = (obj) => {
    
    return new Promise((resolve, reject) => {
        dbReceitas.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO listaReceita (idMeal, strMeal, strMealThumb, strCategory, strArea, strInstructions, strYoutube) values(?, ?, ?, ?, ?, ?, ?);",
                [obj.idMeal, obj.strMeal, obj.strMealThumb, obj.strCategory, obj.strArea, obj.strInstructions, obj.strYoutube],
                (_, { rowsAffected, insertId }) => {
                    if(rowsAffected > 0) {
                        resolve(insertId)
                        console.log("adicionado")
                    } else {
                        reject("Erro ao inserir dados na tabela: " + JSON.stringify(obj))
                    }
                },
                (_, error) => reject(error, "errou")
            )
        })
    }) 
}

export const update = (id, obj) => {
    
    return new Promise((resolve, reject) => {
        dbReceitas.transaction((tx) => {
            tx.executeSql(
                "UPDATE listaReceita SET strMeal=?, strMealThumb=?, strCategory=?, strArea=?, strInstructions=?, strYoutube=? WHERE id=?;",
                [obj.strMeal, obj.strMealThumb, obj.strCategory, obj.strArea, obj.strInstructions, obj.strYoutube, id],
                (_, { rowsAffected, insertId }) => {
                  if (rowsAffected > 0) {
                    // Consulta separada para obter o ID do registro atualizado
                    tx.executeSql(
                      "SELECT last_insert_rowid();",
                      [],
                      (_, { rows }) => {
                        const insertId = rows.item(0)["last_insert_rowid()"];
                        resolve(insertId);
                      },
                      (_, error) => reject(error)
                    );
                  } else {
                    reject("Erro ao inserir dados na tabela: " + JSON.stringify(obj));
                  }
                },
                (_, error) => reject(error)
              );
        })
    })
}

export const remove = (id) => {
    
    return new Promise((resolve, reject) => {
        dbReceitas.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM listaReceita WHERE id=?;",
                [id],
                (_, { rowsAffected, insertId }) => {
                    if(rowsAffected > 0) {
                        console.log("removido")
                        resolve(insertId)
                    } else {
                        reject("Erro ao remover dados na tabela: " + JSON.stringify(obj))
                    }
                },
                (_, error) => reject(error)
            )
        })
    })
}


export const read = () => {

    return new Promise((resolve, reject) => {
        dbReceitas.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM listaReceita;",
              [],
              (_, { rows }) => {
                resolve(rows);
              },
              error => {
                console.log('Erro ao recuperar os dados:', error);
              }
            );
          });
    })
}