// Aguarda o carregamento completo do HTML antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    const flagsContainer = document.getElementById('flags-container');
    const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags';
    console.log("Tentando buscar dados de:", API_URL)

    // Função assíncrona para buscar e exibir os dados
    const fetchAndDisplayFlags = async () => {
        try {
            // 1. Faz a chamada para a API
            const response = await fetch(API_URL);

            // 2. Verifica se a chamada foi bem-sucedida
            if (!response.ok) {
                // Se não foi, lança um erro com o status da resposta (ex: 404, 500)
                throw new Error(`A requisição falhou com status: ${response.status}`);
            }

            // 3. Converte os dados da resposta para o formato JSON
            const countries = await response.json();

            // 4. Limpa a mensagem de "Carregando..."
            flagsContainer.innerHTML = '';
            
            // 5. Ordena os países por nome em ordem alfabética
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

            // 6. Para cada país na lista, cria e exibe seu card
            countries.forEach(country => {
                const flagCard = createFlagCardElement(country);
                flagsContainer.appendChild(flagCard);
            });

        } catch (error) {
            // 7. Se qualquer passo acima falhar, captura o erro
            console.error('Erro ao buscar as bandeiras:', error);
            flagsContainer.innerHTML = `<p class="loading-message">Não foi possível carregar as bandeiras. Tente novamente mais tarde.</p>`;
        }
    };

    // Função que cria o elemento HTML de um card de bandeira
    const createFlagCardElement = (country) => {
        // Cria o elemento <div> principal
        const cardDiv = document.createElement('div');
        cardDiv.className = 'flag-card';

        // Cria a imagem
        const flagImg = document.createElement('img');
        flagImg.src = country.flags.svg; // URL da bandeira no formato SVG (melhor qualidade)
        flagImg.alt = `Bandeira de ${country.name.common}`;

        // Cria o parágrafo com o nome do país
        const countryNameP = document.createElement('p');
        countryNameP.className = 'country-name';
        countryNameP.textContent = country.name.common;
        
        // Monta o card, adicionando a imagem e o nome dentro da div
        cardDiv.appendChild(flagImg);
        cardDiv.appendChild(countryNameP);
        
        // Retorna o elemento completo do card
        return cardDiv;
    };

    // Inicia todo o processo
    fetchAndDisplayFlags();
});