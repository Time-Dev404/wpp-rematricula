import {saveInCache} from './database/cache';
import msg_save_student_cpf from './messages/msg_save_student_cpf';
import msg_save_student_name from './messages/msg_save_student_name';
import msg_save_student_address from './messages/msg_save_student_address';

export default async (client, message, cachedMessage) => {

  let mesg;

  switch(cachedMessage){

    case "set_cpf_student":
      mesg = await msg_save_student_cpf(client, message);
      return mesg;

    case "set_name_student":
        mesg = await msg_save_student_name(client, message);
        return mesg;

    case "set_address_student":
      mesg = await msg_save_student_address(client, message);
      return mesg;

    case "rematricula":
      saveInCache(message.from, 'set_cpf_student')
      return "Que ótimo! Para iniciarmos com o pé direito, vou pedir que me informe seu CPF"
    
    default:
      return "Olá, seja bem vindo! Sou o assistente virtual do IFMA - Santa inês. Hoje, vou ajudar você a fazer sua rematrícula (caso já seja um de nossos alunos) ou sua matrícula (caso esteja ingressando agora). Para dar início à nossa jornada, digite *rematricula*"
  }
}
