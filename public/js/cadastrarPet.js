document
  .getElementById("formulario")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio tradicional do formulário
    /*  document.getElementById("mensagem-sucesso").textContent = "";
    document.getElementById("mensagem-erro").textContent = "";*/

    const formData = new FormData(this);

    // Converte os dados do formulário em objeto
    const data = {
      nome: formData.get("nome"),
      especie: formData.get("especie"),
      raca: formData.get("raca"),
      idade: parseInt(formData.get("idade")),
      sexo: formData.get("sexo"),
      porte: formData.get("porte"),
      nome_tutor: formData.get("nome_tutor"),
      cpfCliente: formData.get("cpfCliente"),
      peso: parseFloat(formData.get("peso")),
      observacoes: formData.get("observacoes"),
    };

    try {
      const response = await fetch("http://localhost:3000/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resultado = await response.json();

      if (response.ok) {
        alert("Pet cadastrado com sucesso!");
        console.log(resultado);
        document.getElementById("formulario").reset();
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
      }
      alert("Erro ao cadastrar o pet. Verifique os dados.");

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });
/*
      if (response.ok) {
        alert("Pet cadastrado com sucesso!");
        let pet = await response.json();
        console.log(pet);
        document.getElementById("formulario").reset();
       

      } else {
        const erro = await response.json(); 
        alert(erro.erro || "Erro ao cadastrar o pet. Verifique os dados.");

      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });*/