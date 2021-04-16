import connection from '../database';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {
  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    await connection('students').where({cpf: cpf}).update({registration: message.body});

    await saveInCache(message.from, "set_address_student");
    return `Massa. Me diz aí seu endereço`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}