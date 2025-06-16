document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    const formData = new FormData(this);

    // Converte os dados do formulário em objeto
    const data = {
        email: formData.get('email'),
        senha: formData.get('senha')
    };

    try {
        let localURL ="http://localhost:3000/api/usuarios";

        const response = await fetch(`${localURL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        });

      const dados = await response.json();

      if (response.ok) {
        window.localStorage.setItem('token',dados.accessToken)
        window.location.href = '../../consultarPets.html'
        return
      } 
      if (dados.errors && Array.isArray(dados.errors)) {
        const mensagensErro = dados.errors.map(e => `• ${e.msg}`).join("\n");
        alert("Erro(s):\n" + mensagensErro);
        return;
      }

      if (dados.message) {
        alert("Erro: " + dados.message);
        return;
      }
      else {
        alert("Erro ao realizar o login. Verifique os dados e tente novamente.");
        return
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });
