document
  .getElementById("formulario")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    const formData = new FormData(this);

    // Converte os dados do formulário em objeto
    const data = {
      nome: formData.get("nome"),
      especie: formData.get("especie"),
      raca: formData.get("raca"),
      idade: parseInt(formData.get("idade")),
      sexo: formData.get("sexo"),
      porte: formData.get("porte"),
      nome_tutor:formData.get("nome_tutor"),
      cpfCliente: formData.get("cpfCliente"),
      peso: parseFloat(formData.get("peso")),
      observacoes: formData.get("observacoes"),
    };

    try {
      const response = await fetch("https://trabalho-no-sql.vercel.app/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Pet cadastrado com sucesso!");
        let pet = await response.json();
        console.log(pet);
      } else {
        alert("Erro ao cadastrar o pet. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });
