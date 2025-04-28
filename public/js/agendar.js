document
  .getElementById("form-agendamento")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    const formData = new FormData(this);

    // Converte os dados do formulário em objeto
    const data = {
        nome_cliente: formData.get("nome_cliente"),
        cpf_tutor:formData.get("cpf_tutor"),
        nome_pet:formData.get("nome_pet"),
        data_entrada:formData.get("data_entrada"),
        data_saida:formData.get("data_saida"),
    };

    try {
      const response = await fetch("https://trabalho-no-sql.vercel.app/agendas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Reserva cadastrada com sucesso!");
        let agenda = await response.json();
        console.log(agenda);
      } else {
        alert("Erro ao cadastrar o reserva. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });
