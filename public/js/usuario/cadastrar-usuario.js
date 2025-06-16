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
      const resultado = await response.json();

      if (response.ok) {
        alert("Usuario cadastrado com sucesso!");
        window.location.href = "../../login.html" 
        console.log(resultado);
        return;
      } 
      if (resultado.errors && Array.isArray(resultado.errors)) {
        const mensagensErro = resultado.errors.map(e => `• ${e.msg}`).join("\n");
        alert("Erro(s) ao cadastrar o pet:\n" + mensagensErro);
        return;
      }

      if (resultado.message) {
        alert("Erro: " + resultado.message);
        return;
      }else {
        alert("Erro ao cadastrar o usuario. Verifique os dados e tente novamente.");
         return
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });
