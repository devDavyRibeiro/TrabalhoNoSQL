async function listarPets() {
    const cpfTutor = document.getElementById('cpfCliente').value.trim();
    const nomePet = document.getElementById('nome_pet').value.trim();
    const dataEntrada = document.getElementById('data_entrada').value.trim();
    const dataSaida = document.getElementById('data_saida').value.trim();
    

    let url = '/agendas'; // ajuste se precisar

    
    const params = new URLSearchParams();

    if (cpfTutor) params.append('cpfCliente', cpfTutor);
    if (nomePet)params.append('nome_pet', nomePet);
    if (dataEntrada) params.append('data_entrada', dataEntrada);
    if (dataSaida) params.append('data_saida', dataSaida);

    if ([...params].length > 0) {
        url += `?${params.toString()}`;
    }

    try {
        const response = await fetch(url);
        const agendas = await response.json();

        const corpoTabela = document.getElementById('corpoTabela');
        corpoTabela.innerHTML = "";

        agendas.forEach(reserva => {
            const linha = document.createElement('tr');

            linha.innerHTML = `
            <td>${reserva.nomeTutor || '-'}</td>
            <td>${reserva.cpfTutor || '-'}</td>
            <td>${reserva.nomePet || '-'}</td>
            <td>${reserva.dataEntrada || '-'}</td>
            <td>${reserva.dataSaida || '-'}</td>
            <td>
                <button onclick="verDetalhes('${reserva._id}')">👁️</button>
                <button onclick="editarPet('${reserva._id}')">✏️</button>
                <button onclick="excluirPet('${reserva._id}')">🗑️</button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
} catch (error) {
    console.error('Erro ao listar reservas:', error);
}
}

async function verDetalhes(id) {
    try {
        const response = await fetch(`/agendas/${id}`);

        const reserva = await response.json();

        const detalhesDiv = document.getElementById('detalhesReserva');
        detalhesDiv.innerHTML = `
            <p><strong>Nome do Tutor:</strong> ${reserva.nomeTutor}</p>
            <p><strong>CPF do Tutor:</strong> ${reserva.cpfTutor}</p>
            <p><strong>Nome do Pet:</strong> ${reserva.nomePet}</p>
            <p><strong>Data de Entrada:</strong> ${new Date(reserva.dataEntrada).toLocaleDateString()}</p>
            <p><strong>Data de Saida:</strong> ${new Date(reserva.dataSaida).toLocaleDateString()}</p>
             `;

        document.getElementById('modalDetalhes').style.display = 'block';
    } catch (error) {
        console.error('Erro ao buscar detalhes da Reserva:', error);
    }
}

function fecharModal() {
    document.getElementById('modalDetalhes').style.display = 'none';
}

function editarReserva(id) {
    alert('Função de edição não implementada ainda. ID: ' + id);
}

function excluirReserva(id) {
    if (confirm('Tem certeza que deseja excluir a Reserva?')) {
        fetch(`/agendas/${id}`, {

            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                alert('Reserva excluída com sucesso!');
                listarPets(); // recarrega lista
            } else {
                alert('Erro ao excluir a Reserva.');
            }
        });
    }
}

