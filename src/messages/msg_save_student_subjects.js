import connection from '../database';
import {getFromCache, saveInCache, removeFromCache} from '../database/cache';
export default async (client, message) => {
  try {
    
    await removeFromCache(message.from);
    await saveInCache(`${message.from}_class`, message.body);
    return `Muito bem, você concluiu sua rematrícula!`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}