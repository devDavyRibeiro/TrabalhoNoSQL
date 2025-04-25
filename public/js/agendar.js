document
  .getElementById("form-agendamento")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    const formData = new FormData(this);

    // Converte os dados do formulário em objeto
    const data = {
      nomeCliente: formData.get("nome_cliente"),
      cpfTutot: formData.get("cpf_tutor"),
      nomePet: formData.get("nome_pet"),
      dataEntrada: formData.get("data_entrada"),
      dataSaida: formData.get("data_saida"),
    };

    try {
      const response = await fetch("http://localhost:3000/agendas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("agenda cadastrada com sucesso!");
        let agenda = await response.json();
        console.log(agenda);
    }
    else {
        alert("Erro ao cadastrar agendamento. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    };
});