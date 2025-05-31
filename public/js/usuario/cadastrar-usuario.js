document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    const formData = new FormData(this);

    // Converte os dados do formulário em objeto
    const data = {
        nome: formData.get("nome"),
        cpf: formData.get("cpf"),
        email: formData.get('email'),
        senha: formData.get('senha')
    };

    try {
        let localURL ="http://localhost:3000/api/usuarios";
        let internetURL = "https://trabalho-no-sql.vercel.app/api/usuarios";
      const response = await fetch(localURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Usuario cadastrado com sucesso!");
        let usuario = await response.json();
        console.log(usuario);
      } else {
        alert("Erro ao cadastrar o usuario. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });
