window.addEventListener('load',listarPets)
async function listarPets() {
   // const cpfCliente = document.getElementById('cpfCliente').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const especie = document.getElementById('especie').value.trim();
    const idadeMinima = document.getElementById('idadeMinima').value.trim();
    const idadeMaxima = document.getElementById('idadeMaxima').value.trim();
    const porte = document.getElementById('porte').value.trim();

    let url = 'http://localhost:3000/api/pets'; // ajuste se precisar

    const params = new URLSearchParams();

    /*if (cpfCliente) params.append('cpfCliente', cpfCliente);*/
    if (nome) params.append('nome' , nome);
    if (especie) params.append('especie', especie);
    if (idadeMinima) params.append('idade_min', idadeMinima);
    if (idadeMaxima) params.append('idade_max', idadeMaxima);
    if (porte) params.append('porte', porte);

    if ([...params].length > 0) {
        url += `?${params.toString()}`;
    }

    try {
        const response = await fetch(url,{
            headers: {
                accessToken: localStorage.getItem('token')
            }
        });
        if(response.ok){
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
                    
                   
                    <td>${pet.peso || '-'}</td>
                    <td>${pet.observacoes|| '-'}</td>
                    <td>
                        <button onclick="verDetalhes('${pet._id}')">👁️</button>
                        <button onclick="editarPet('${pet._id}')">✏️</button>
                        <button onclick="excluirPet('${pet._id}')">🗑️</button>
                    </td>
                `;
                corpoTabela.appendChild(linha);
            });
        }
        else{
            console.error("erro")
            //aparecer erro na tela
        }
    } catch (error) {
        console.error('Erro ao listar pets:', error);
    }
}