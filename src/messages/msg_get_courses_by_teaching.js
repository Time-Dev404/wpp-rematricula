import connection from '../database';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {
  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    await connection('students').where({cpf: cpf}).update({email: message.body});

    const teachings = await connection('teaching').select("id", "name");
    let text = "";
    teachings.forEach(teach => {
      text += `\n*${teach.id}* - ${teach.name}`
    });

    await saveInCache(message.from, "set_teaching_student");
    return `Tudo bem. Me diz agora qual dessas é a sua modalidade de ensino:${text}`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}