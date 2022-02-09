const createEmail = require('../../config/mail/base');

class EmailController {
  newRegister(to, name) {
    const content = `Olá, ${name}!<br/>
      Seja muito bem vind@ ao <strong>HelloWorld</strong>, um aplicativo para você aprender lógica de programação <strong>gratuitamente</strong> e <strong>em português</strong>!`;
    const subject = 'Seja bem vind@!';
    return createEmail(to, subject, content);
  }

  newAdminRegister(to, name, pass) {
    const content = `Olá, ${name}!<br/>
      Seja muito bem vind@ ao <strong>HelloWorld</strong>, um aplicativo para você aprender lógica de programação <strong>gratuitamente</strong> e <strong>em português</strong>!<br/><br/>
      Você foi cadastrado como administrador e pode acessar a plataforma de gerenciamento através do link <a href="https://helloworld.gq">helloworld.gq</a>
      Sua senha de acesso temporário é <br/><br/><span style="font-weight: 700; margin: auto;display: table;">${pass}</span><br/><br/>`;

    const subject = 'Seja bem vind@!';
    return createEmail(to, subject, content);
  }

  newImportRegister(to, name, pass) {
    const content = `Olá, ${name}!<br/>
      Seja muito bem vind@ ao <strong>HelloWorld</strong>, um aplicativo para você aprender lógica de programação <strong>gratuitamente</strong> e <strong>em português</strong>!<br/><br/>
      Sua senha de acesso temporário é <br/><br/><span style="font-weight: 700; margin: auto;display: table;">${pass}</span><br/><br/>`;
    const subject = 'Seja bem vind@!';
    return createEmail(to, subject, content);
  }

  recoveryPassword(to, name, pass) {
    const content = `Olá, ${name}! Você acabou de solicitar uma nova senha.<br/><br/>
      Sua senha de acesso temporário é <br/><br/><span style="font-weight: 700; margin: auto;display: table;">${pass}</span><br/><br/>
      Se não foi você, fique tranquil@, sua senha não foi enviada a mais ninguém e você pode trocá-la em seu próximo acesso ao aplicativo. 
    `;

    const subject = 'Sua nova senha';
    return createEmail(to, subject, content);
  }

  courseConclusion(to, name) {
    const content = `Olá, ${name}!<br/><br/>
      Vimos que você finalizou toda a sua jornada no nosso aplicativo!<br/>
      Foi um grande passo, mas isso é apenas o começo de uma história muito maior.
      Nossa dica: não desista dos seus sonhos e continue buscando o conhecimento, sabemos que valerá a pena!
    `;

    const subject = 'Isso é só o começo!';
    return createEmail(to, subject, content);
  }
}

module.exports = new EmailController();
