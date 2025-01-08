function carregarFormulario() {
    fetch('https://hook.us1.make.com/pcaz93hslu47srt6bgf74xo52v1dkbqt?param=bbc')
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;
        })
        .catch(error => {
            console.error('Erro ao carregar o formulário:', error);
        });
}
window.mascaraTelefone = function (input) {
    input.value = input.value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d{2})(\d{5})(\d{4}).*/, "+$1 $2 $3-$4")
        .slice(0, 17);
};
window.validarTelefone = function (input) {
    const telefoneRegex = /^\+55\s\d{2}\s\d{5}-\d{4}$/;
    const erroElemento = document.getElementById("erro-telefone");
    if (!telefoneRegex.test(input.value)) {
        erroElemento.textContent = "Telefone inválido. Use o formato +XX XX XXXXX-XXXX.";
        input.classList.add("input-erro");
        return false;
    } else {
        erroElemento.textContent = "";
        input.classList.remove("input-erro");
        return true;
    }
};
