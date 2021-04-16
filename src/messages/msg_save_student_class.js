import connection from '../database';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {
  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    const student = await connection('students').select("id").where({cpf: cpf});

    const classes = await connection('classes').select("id").where({year: message.body});

    await connection('student_class').insert({
      class_id: classes.indexOf,
      student_id: student.id
    });
    
    await saveInCache(message.from, "set_class_student");
    return `Que massa, você finalizou sua rematrícula!`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}