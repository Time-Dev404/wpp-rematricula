import connection from '../database';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {
  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    await connection('students').where({cpf: cpf}).update({address: message.body});
    await saveInCache(message.from, "set_city_student");
    return `Não conheço esse lugar, mas desejo um dia visitá-lo :D Me diz aí o nome da cidade onde você mora`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}