async function listarPets() {
    const cpfCliente = document.getElementById('cpfCliente').value.trim();
    const especie = document.getElementById('especie').value.trim();
    const idadeMinima = document.getElementById('idadeMinima').value.trim();
    const idadeMaxima = document.getElementById('idadeMaxima').value.trim();
    const porte = document.getElementById('porte').value.trim();

    let url = '/pets'; // ajuste se precisar

    const params = new URLSearchParams();

    if (cpfCliente) params.append('cpfCliente', cpfCliente);
    if (especie) params.append('especie', especie);
    if (idadeMinima) params.append('idadeMinima', idadeMinima);
    if (idadeMaxima) params.append('idadeMaxima', idadeMaxima);
    if (porte) params.append('porte', porte);

    if ([...params].length > 0) {
        url += `?${params.toString()}`;
    }

    try {
        const response = await fetch(url);
        const pets = await response.json();

        const corpoTabela = document.getElementById('corpoTabela');
        corpoTabela.innerHTML = "";

        pets.forEach(pet => {
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${pet.nome || '-'}</td>
                <td>${pet.especie || '-'}</td>
                <td>${pet.raca || '-'}</td>
                <td>${pet.sexo || '-'}</td>
                <td>${pet.idade ? `${pet.idade} anos` : '-'}</td>
                <td>${pet.porte || '-'}</td>
                
                <td>${pet.nome_tutor || '-'}</td>
                <td>${pet.cpfCliente || '-'}</td>
                <td>${pet.peso || '-'}</td>
                <td>
                    <button onclick="verDetalhes('${pet._id}')">👁️</button>
                    <button onclick="editarPet('${pet._id}')">✏️</button>
                    <button onclick="excluirPet('${pet._id}')">🗑️</button>
                </td>
            `;
            corpoTabela.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao listar pets:', error);
    }
}

async function verDetalhes(id) {
    try {
        const response = await fetch(`/pets/${id}`);

        const pet = await response.json();

        const detalhesDiv = document.getElementById('detalhesPet');
        detalhesDiv.innerHTML = `
            <p><strong>Nome:</strong> ${pet.nome}</p>
            <p><strong>Espécie:</strong> ${pet.especie}</p>
            <p><strong>Raça:</strong> ${pet.raca}</p>
            <p><strong>Ano Nascimento:</strong> ${pet.idade}</p>
            <p><strong>Sexo:</strong> ${pet.sexo}</p>
            <p><strong>Porte:</strong> ${pet.porte}</p>
            <p><strong>Peso:</strong> ${pet.peso}</p>
            <p><strong>CPF do Tutor:</strong> ${pet.cpfCliente}</p>
            <p><strong>Nome do Tutor:</strong> ${pet.nome_tutor}</p>
            <p><strong>Observações:</strong> ${pet.observacoes}</p>
        `;

        document.getElementById('modalDetalhes').style.display = 'block';
    } catch (error) {
        console.error('Erro ao buscar detalhes do pet:', error);
    }
}

function fecharModal() {
    document.getElementById('modalDetalhes').style.display = 'none';
}

function editarPet(id) {
    alert('Função de edição não implementada ainda. ID: ' + id);
}

function excluirPet(id) {
    if (confirm('Tem certeza que deseja excluir o pet?')) {
        fetch(`/pets/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                alert('Pet excluído com sucesso!');
                listarPets(); // recarrega lista
            } else {
                alert('Erro ao excluir o pet.');
            }
        });
    }
}
