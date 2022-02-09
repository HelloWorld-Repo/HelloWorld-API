const createEmail = (receiver, subject, message) => ({
  from: 'Equipe HelloWorld <helloworld.equipe@gmail.com>',
  to: receiver,
  subject,
  html: `
    <body style="background-color: #F5F5F5;">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Text+Me+One&display=swap');
      </style>
      <div style="min-height: 50vh;padding: 3em;background: #FFFFFF;box-shadow: 0px 5px 10px rgba(43, 43, 43, 0.05), 0px 15px 40px rgba(0, 0, 0, 0.02);border-radius: 10px;margin-bottom: 3rem;">
        <div style="background-color: #00DFC0;padding: 10px  30px;">
          <h1 style="font-size: 23px; color:#FFFFFF; font-family: Londrina Solid; text-align: center; margin: 0; font-weight: 100;">&lt;HelloWorld/&gt;</h1>
        </div>
        <h2 style="font-family: Londrina Solid;">${subject}</h2>
        <p style="font-family: Text Me One; font-size:16px; line-height: 26px;">
          ${message}
        </p>
        <p style="font-weight: 700;font-family: Text Me One;text-align: end;font-size: 16px;">Att.,<br/>Equipe HelloWorld</p>
        <p style="color:#4f4f4f;font-weight: 500;font-family: Text Me One;font-size: 14px; line-height: 25px;">Dúvidas, reclamações ou sugestões?<br/>Envie um e-mail para <strong>helloworld.equipe@gmail.com</strong></p>
        <hr/>
        <p style="color:#4f4f4f;font-weight: 500;font-family: Text Me One;font-size: 14px; line-height: 25px;">Quer aprender a programar gratuitamente?<br/>Baixe o app em <a href="https://helloworld.gq">helloworld.gq</a></p>
      </div>
    </body>
  `,
});

module.exports = createEmail;
