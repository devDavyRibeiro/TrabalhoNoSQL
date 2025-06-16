
async function verDetalhes(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/pets/${id}`,{
                headers: {
                    accessToken: localStorage.getItem('token')
                }
            }
        );

        const pet = await response.json();

        const detalhesDiv = document.getElementById('detalhesPet');
        detalhesDiv.innerHTML = `
            <p><strong>Nome:</strong> ${pet.nome}</p>
            <p><strong>Espécie:</strong> ${pet.especie}</p>
            <p><strong>Raça:</strong> ${pet.raca}</p>
            <p><strong>Idade:</strong> ${pet.idade}</p>
            <p><strong>Sexo:</strong> ${pet.sexo}</p>
            <p><strong>Porte:</strong> ${pet.porte}</p>
            <p><strong>Peso:</strong> ${pet.peso}</p>
            
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

// Função para redirecionar para a página de edição
function editarPet(id) {
    window.location.href = `/editarPet.html?id=${id}`;
}

async function carregarEditarPet() {
    if (!window.location.pathname.includes('/editarPet.html')) return;

    const id = new URLSearchParams(window.location.search).get('id');
    console.log("ID do pet:", id);  // Verifica se o ID está correto

    if (!id) return alert('ID do pet não encontrado!');

    try {
        const response = await fetch(`http://localhost:3000/api/pets/${id}`, {
            headers:{
                accessToken: localStorage.getItem('token')
            }
        });
        
        console.log("Resposta da API:", response);  // Verifica se a requisição foi bem-sucedida
        
        if (!response.ok) {
            console.error("Erro na requisição:", response.status, response.statusText);
            return alert('Erro ao buscar dados do pet.');
        }

        const pet = await response.json();

        console.log("Dados do pet:", pet);  // Verifica os dados retornados da API

        Object.entries(pet).forEach(([key, value]) => {
            const input = document.getElementById(key);
            if (input) input.value = value || '';
        });
    } catch (error) {
        console.error('Erro ao carregar pet:', error);
        alert('Erro ao carregar dados do pet.');
    }
}

// Função para atualizar os dados do pet
async function atualizarPet(event) {
    event.preventDefault();

    // Pega o ID do pet diretamente do campo oculto (petId) ou da URL
    const id = document.getElementById('id').value || new URLSearchParams(window.location.search).get('id');

    // Captura todos os dados do formulário
    const novosDadosPets = Array.from(document.querySelectorAll('#formEditarPet input, #formEditarPet select, #formEditarPet textarea'))
        .reduce((acc, input) => {
            acc[input.id] = input.value || (input.type === 'number' ? 0 : '');
            return acc;
        }, {});


    novosDadosPets.id = id; 
    try {
        const response = await fetch(`http://localhost:3000/api/pets/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                accessToken: localStorage.getItem('token')
            },
            body: JSON.stringify(novosDadosPets), // Envia os dados do pet com o ID
        });

        if (response.ok) {
            alert('Pet atualizado com sucesso!');
            window.location.href = '/consultarPets.html';
        } else {
            dados = await response.json();
            dados.errors.forEach((erro)=>{
                alert(erro.msg);
            })
        }
    } catch (error) {
        console.error('Erro ao atualizar pet:', error);
        alert('Erro ao atualizar pet.');
    }
}

// Inicializa a página de edição
if (window.location.pathname.includes('editarPet.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        carregarEditarPet();
        const formEditar = document.getElementById('formEditarPet');
        formEditar?.addEventListener('submit', atualizarPet);
    });
}


function excluirPet(id) {
    if (confirm('Tem certeza que deseja excluir o pet?')) {
        fetch(`http://localhost:3000/api/pets/${id}`, {
            method: 'DELETE',
            headers:{
                accessToken: localStorage.getItem('token')
            }
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
