import messageCachedSwitch from './messageCachedSwitch';
import {getFromCache, removeFromCache, saveInCache} from './database/cache';
import removeAccents from './utils/removeAccents';

module.exports = async (client, message) => {

  const cachedMessage = await switchFromCache(message);
  console.log("cachedMessage", cachedMessage);

  

  switch(removeAccents(message.body.toLowerCase().trim())){
    case "oi":
      return "E aí, como vai?"
    case "rematricula":
      saveInCache(message.from, 'set_cpf_student')
      return "Que ótimo! Para iniciarmos com o pé direito, vou pedir que me informe seu CPF"
    default:
      if(cachedMessage){
        const msg = await messageCachedSwitch(client, message, cachedMessage);
        return msg;
      }else {
        removeFromCache(message.from);
      return "Olá, seja bem vindo! Sou o AVIME. Hoje, vou ajudar você a fazer sua rematrícula (caso já seja um de nossos alunos) ou sua matrícula (caso esteja ingressando agora). Para dar início à nossa jornada, digite *rematricula*"
      }
    }
}

async function switchFromCache(message){
  let cachedMessage = await getFromCache(message.from);
  return cachedMessage;
}