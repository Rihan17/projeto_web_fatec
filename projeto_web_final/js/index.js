document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#form'); 

    if (formulario) {
        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();
            emailjs.init({
                publicKey: "slG5oTlZWAZLd-HgX",
            });

            // Envio do formulário
            emailjs.sendForm("service_rihan", "template_l76alwf", formulario)
                .then((resposta) => {
                    alert("Comentário enviado com sucesso !!");
                    formulario.reset();
                })
                .catch((erro) => {
                    alert("Erro no envio !!");
                    console.error("Erro:", erro);
                });
        });
    }
});