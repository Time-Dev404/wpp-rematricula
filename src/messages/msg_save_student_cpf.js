import connection from '../database';
import {saveInCache} from '../database/cache';
export default async (client, message) => {
  try {
    await connection('students').insert({cpf: message.body, chat_id: message.from});
    await saveInCache(message.from, "set_name_student");
    await saveInCache(`${message.from}_cpf`, message.body);
    return `Ótimo. Agora me informe seu nome completo`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que você já fez sua rematrícula`;
  }
}