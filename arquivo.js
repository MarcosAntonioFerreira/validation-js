
    function mascaraTelefone(input) {
      input.value = input.value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d{2})(\d{5})(\d{4}).*/, "+$1 $2 $3-$4")
        .slice(0, 17);
    }

    function validarTelefone(input) {
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
    }

    function validarEmail(input) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const erroElemento = document.getElementById("erro-email");

      if (!emailRegex.test(input.value)) {
        erroElemento.textContent = "E-mail inválido. Insira um e-mail válido.";
        input.classList.add("input-erro");
        return false;
      } else {
        erroElemento.textContent = "";
        input.classList.remove("input-erro");
        return true;
      }
    }

    function processarFormulario(event) {
      event.preventDefault();
      const loadingModal = document.getElementById('loadingModal');
      const successModal = document.getElementById('successModal');

      loadingModal.style.display = 'flex';

      const telefoneValido = validarTelefone(document.getElementById("telefone"));
      const emailValido = validarEmail(document.getElementById("email"));

      if (!telefoneValido || !emailValido) {
        alert("Por favor, corrija os campos inválidos antes de enviar.");
        return;
      }

      const inputs = document.querySelectorAll("#customer-form-ia input");
      const parametros = {};

      inputs.forEach((input) => {
        parametros[input.name] = input.value.trim();
      });

      
      if (parametros["nome"]) {
        const partesNome = parametros["nome"].split(" ");
        parametros["primeiro_nome"] = partesNome[0];
        parametros["sobrenome"] = partesNome.slice(1).join(" ");

       
        if (!parametros["sobrenome"]) {
          parametros["sobrenome"] = "nao preencheu sobrenome";
        }
      }



      const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
      const urlParams = new URLSearchParams(window.location.search);
      utms.forEach((utm) => {
        parametros[utm] = urlParams.get(utm) || '';
      });
      parametros['page_url'] = window.location.href;

      fetch('https://hook.us1.make.com/rjk392uyrxhp1yozgu6yd3dlde9jhgm3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parametros),
      })
        .then((response) => {
          if (response.ok) {
            loadingModal.style.display = 'none';
            successModal.style.display = 'flex';
          } else {
            alert("Erro ao enviar os dados. Tente novamente.");
          }
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
    }
 
