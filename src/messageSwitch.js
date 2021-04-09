module.exports = (client, message) => {
  switch(message){
    case "oi":
      return "E aí, como vai?"
    case "rematricula":
      return "Que ótimo! Para iniciarmos com o pé direito, vou pedir que me informe seu nome completo"
    default:
      return "Olá, seja bem vindo! Sou o assistente virtual do IFMA - Santa inês. Hoje, vou ajudar você a fazer sua rematrícula (caso já seja um de nossos alunos) ou sua matrícula (caso esteja ingressando agora). Para dar início à nossa jornada, digite *rematrícula*"
  }
}