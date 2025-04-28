async function listarReservas() {
    const cpfTutor = document.getElementById('cpf_tutor').value.trim();
    const nomePet = document.getElementById('nome_pet').value.trim();
    const dataEntrada = document.getElementById('data_entrada').value.trim();
    const dataSaida = document.getElementById('data_saida').value.trim();
    

    let url = 'https://trabalho-no-sql.vercel.app/agendas'; // ajuste se precisar

    
    const params = new URLSearchParams();

    if (cpfTutor) params.append('cpf_tutor', cpfTutor);
    if (nomePet) params.append('nome_pet', nomePet);
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
            <td>${reserva.nome_cliente || '-'}</td>
            <td>${reserva.cpf_tutor || '-'}</td>
            <td>${reserva.nome_pet || '-'}</td>
            <td>${reserva.data_entrada || '-'}</td>
            <td>${reserva.data_saida || '-'}</td>
            <td>
                <button onclick="verDetalhes('${reserva._id}')">👁️</button>
                <button onclick="editarAgenda('${reserva._id}')">✏️</button>
                <button onclick="excluirReserva('${reserva._id}')">🗑️</button>
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
        const response = await fetch(`/agendas2/${id}`);

        const reserva = await response.json();

        const detalhesDiv = document.getElementById('detalhesReservas');
        detalhesDiv.innerHTML = `
            <p><strong>Nome do Tutor:</strong> ${reserva.nome_cliente}</p>
            <p><strong>CPF do Tutor:</strong> ${reserva.cpf_tutor}</p>
            <p><strong>Nome do Pet:</strong> ${reserva.nome_pet}</p>
            <p><strong>Data de Entrada:</strong> ${new Date(reserva.data_entrada).toLocaleDateString()}</p>
            <p><strong>Data de Saida:</strong> ${new Date(reserva.data_saida).toLocaleDateString()}</p>
             `;

        document.getElementById('modalDetalhes').style.display = 'block';
    } catch (error) {
        console.error('Erro ao buscar detalhes da Reserva:', error);
    }
}

function fecharModal() {
    document.getElementById('modalDetalhes').style.display = 'none';
}


// Função para redirecionar para a página de edição
function editarAgenda(id) {
    window.location.href = `/editarAgenda.html?id=${id}`;
}

async function carregarEditarAgenda() {
    if (!window.location.pathname.includes('/editarAgenda.html')) return;

    const id = new URLSearchParams(window.location.search).get('id');
    console.log("ID da agenda:", id);  // Verifica se o ID está correto

    if (!id) return alert('ID da agenda não encontrado!');

    try {
        const response = await fetch(`/agendas2/${id}`);
        
        console.log("Resposta da API:", response);  // Verifica se a requisição foi bem-sucedida
        
        if (!response.ok) {
            console.error("Erro na requisição:", response.status, response.statusText);
            return alert('Erro ao buscar dados da agenda.');
        }

        const agenda = await response.json();

        console.log("Dados do agenda:", agenda);  // Verifica os dados retornados da API

        Object.entries(agenda).forEach(([key, value]) => {
            const input = document.getElementById(key);
            if (input) input.value = value || '';
        });
    } catch (error) {
        console.error('Erro ao carregar agenda:', error);
        alert('Erro ao carregar dada agenda.');
    }
}

// Função para atualizar os dados do pet
async function atualizarAgenda(event) {
    event.preventDefault();

    // Pega o ID do pet diretamente do campo oculto (petId) ou da URL
    const id = document.getElementById('id').value || new URLSearchParams(window.location.search).get('id');

    // Captura todos os dados do formulário
    const novosDadosAgenda = Array.from(document.querySelectorAll('#form-editarAgendamento input'))
        .reduce((acc, input) => {
            acc[input.id] = input.value || (input.type === 'number' ? 0 : '');
            return acc;
        }, {});


    novosDadosAgenda.id = id; 
    try {
        const response = await fetch(`/agendas2/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novosDadosAgenda), // Envia os dados do pet com o ID
        });

        if (response.ok) {
            alert('Agenda atualizado com sucesso!');
            window.location.href = '/consultaReserva.html';
        } else {
            alert('Erro ao atualizar agenda.');
        }
    } catch (error) {
        console.error('Erro ao atualizar agenda:', error);
        alert('Erro ao atualizar agenda.');
    }
}

// Inicializa a página de edição
if (window.location.pathname.includes('editarAgenda.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        carregarEditarAgenda();
        const formEditar = document.getElementById('form-editarAgendamento');
        formEditar?.addEventListener('submit', atualizarAgenda);
    });
}

function excluirReserva(id) {
    if (confirm('Tem certeza que deseja excluir a Reserva?')) {
        fetch(`/agendas2/${id}`, {

            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                alert('Reserva excluída com sucesso!');
                listarReservas(); // recarrega lista
            } else {
                alert('Erro ao excluir a Reserva.');
            }
        });
    }
}

