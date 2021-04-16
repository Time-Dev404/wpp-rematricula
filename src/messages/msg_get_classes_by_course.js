import connection from '../database';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {
  try {
    // const cpf = await getFromCache(`${message.from}_cpf`);
    // await connection('students').where({cpf: cpf}).update({email: message.body});

    const teachings = await connection('classes').select("id", "year").where({course_id: message.body});
    
    let text = "";
    let i = 0;
    teachings.forEach(teach => {
      i++;
      text += `\n${i} - *${teach.year}*`
    });

    await saveInCache(message.from, "set_class_student");
    return `Tudo bem. Me diz agora qual a sua turma: ${text}`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}