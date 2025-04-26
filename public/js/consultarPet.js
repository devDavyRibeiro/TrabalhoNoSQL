try {
  const response = await fetch("http://localhost:3000/pets/", {
    method: "GET"
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

