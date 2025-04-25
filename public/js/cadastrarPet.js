document
  .getElementById("formulario")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    const formData = new FormData(this);

    // Converte os dados do formulário em objeto
    const data = {
      nomePet: formData.get("nome-pet"),
      especie: formData.get("especie"),
      raca: formData.get("raca"),
      dataNascimento: formData.get("dataNascimento"),
      sexo: formData.get("sexo"),
      porte: formData.get("porte"),
      cpfCliente: formData.get("cpfCliente"),
      peso: parseFloat(formData.get("peso")),
      observacoes: formData.get("observacoes"),
    };

    try {
      const response = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      let pet = await response.json();
      if (response.ok) {
        alert("Pet cadastrado com sucesso!");

      } else {
        if(response.status === 400){
          let erros = pet.errors;
          erros.forEach(erro => {
            alert(erro.msg);
          });
          
        }
        else if(response.status === 404){
          alert(pet.message);
        }

      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });
