import connection from '../database';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {
  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    
    await connection('students').where({cpf: cpf}).update({name: message.body});
    await saveInCache(message.from, "set_address_student");
    return `Que nome lindo, ${message.body.split(" ")[0]}! Agora me informe seu endereço`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}