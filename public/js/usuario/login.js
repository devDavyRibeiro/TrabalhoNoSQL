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

      if (response.ok) {
        dados = await response.json();
        window.localStorage.setItem('token',dados.accessToken)
        console.log(dados.accessToken);
        window.location.href = '../../consultarPets.html'
      } else {
        alert("Erro ao cadastrar o usuario. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });
