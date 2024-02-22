// ----------------------------------------------
// Cria uma estrutura de dados com informações das unidades da PUC Minas 
const centralLatLong = [-43.9397233, -19.9332786];

// Importante: Substitua 'SUA_CHAVE_DE_API' pela chave real da API Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYmllbGxhbnphYyIsImEiOiJjbHBpZ2Z2ZWswYXllMnFxczN3bnJ0MjR2In0.PB-iFM1npI--zXdPUJd5sg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: centralLatLong,
    zoom: 9
});

// Função para adicionar marcadores com base nos dados da API
function adicionarMarcadores(dados) {
    dados.forEach((uni) => {
        let popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3><a href="${uni.url}" target="_blank">${uni.descricao}</a></h3><br>
                          ${uni.endereco} <br> ${uni.cidade}`);
        const marker = new mapboxgl.Marker({ color: uni.cor })
            .setLngLat(uni.latlong)
            .setPopup(popup)
            .addTo(map);
    });
}

// Função para buscar dados da API
async function obterDadosDaAPI() {
    try {
        const resposta = await fetch('https://jsondiw.gabrielfilipe10.repl.co/unidadesPUC'); // Substitua 'URL_DA_SUA_API' pela URL real da sua API
        const dados = await resposta.json();
        adicionarMarcadores(dados);
    } catch (erro) {
        console.error('Erro ao obter dados da API:', erro);
    }
}

// Chama a função para obter dados da API
obterDadosDaAPI();

document.addEventListener("DOMContentLoaded", function () {
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`b${i}`).addEventListener('click', function () {
            // Redirecionar para album.html
            window.location.href = `album.html?id=${i}`;
        });
    }
});
// Obtém o ID do álbum da URL
const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get('id');

// Chama a função para obter os dados do álbum correspondente ao ID
document.addEventListener("DOMContentLoaded", function () {
    // Função para obter dados do álbum a partir da API
    function fetchDadosDaAPI(albumId) {
        // Substitua 'https://jsondiw.gabrielfilipe10.repl.co/album' pela URL real da sua API
        fetch(`https://jsondiw.gabrielfilipe10.repl.co/album/${albumId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                return response.json();
            })
            .then(data => preencherDadosNoHTML(data))
            .catch(error => console.error('Erro ao obter dados do JSON', error));
    }

    // Função para preencher os dados no HTML
    function preencherDadosNoHTML(album) {
        // Se o álbum não for encontrado, exiba uma mensagem de erro
        if (!album) {
            console.error(`Álbum com ID ${albumId} não encontrado`);
            return;
        }

        // Restante do seu código para preencher os dados no HTML...

        var tituloAlbum = document.getElementById('titulo');
        var urlImagemAlbum = document.getElementById('urlimg');
        var descricaoAlbum = document.getElementById('descricao');
        var localizacaoAlbum = document.getElementById('localizacao');
        var dataAlbum = document.getElementById('data');

        // Substituir os textos com base nos dados do álbum
        tituloAlbum.textContent = album.titulo;
        urlImagemAlbum.src = album.urlimg;
        descricaoAlbum.textContent = album.descricao;
        localizacaoAlbum.textContent = 'Localização: ' + album.localizacao;
        dataAlbum.textContent = 'Data de Registro: ' + album.data;
    }

    // Obtém o ID do álbum da URL
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');

    // Chama a função para obter os dados do álbum correspondente ao ID
    fetchDadosDaAPI(albumId);

    // Restante do seu código...
});

document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.getElementById('carousel-inner');

    // Fazer solicitação à API para obter a lista de imagens
    fetch('https://jsondiw--gabrielfilipe10.repl.co/destaques')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Adicionar as imagens dinamicamente ao carrossel
            data.forEach((item, index) => {
                const figure = document.createElement('figure');
                figure.classList.add('carousel-item');

                if (index === 0) {
                    figure.classList.add('active');
                }

                const img = document.createElement('img');
                img.src = item.url;
                img.classList.add('d-block', 'w-100');
                img.alt = item.descricao;
                img.height = 320;
                img.width = 800;

                figure.appendChild(img);
                carouselInner.appendChild(figure);
            });
        })
        .catch(error => console.error('Erro ao obter dados da API', error));
});

document.addEventListener('DOMContentLoaded', function () {
    // Faz a requisição à API
    fetch('https://jsondiw--gabrielfilipe10.repl.co/cards')
        .then(response => response.json())
        .then(data => {
            // Manipula os dados recebidos e preenche os cards
            data.forEach(stadium => {
                const cardContainer = document.createElement('section');
                cardContainer.className = 'col-md-3 pb-3';

                const card = document.createElement('article');
                card.className = 'card';

                const link = document.createElement('a');
                link.href = stadium.link;

                const image = document.createElement('img');
                image.src = stadium.image;
                image.className = 'card-img-top';
                image.alt = '...';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const title = document.createElement('h5');
                title.className = 'card-title';
                title.textContent = stadium.name;

                const text = document.createElement('p');
                text.className = 'card-text';
                text.textContent = stadium.description;

                const cardLink = document.createElement('a');
                cardLink.href = '#'; // Usar '#' para evitar a navegação padrão
                cardLink.className = 'card-link';
                cardLink.id = stadium.id;

                // Adiciona os elementos à hierarquia HTML
                cardLink.appendChild(title);
                cardLink.appendChild(text);

                cardBody.appendChild(cardLink);

                link.appendChild(image);

                card.appendChild(link);
                card.appendChild(cardBody);

                cardContainer.appendChild(card);

                // Adiciona o card ao DOM
                const container = document.querySelector('.row');
                container.appendChild(cardContainer);

                // Adiciona o evento de clique para redirecionamento ao clicar no card
                cardLink.addEventListener('click', function () {
                    // Obtém o link do card e redireciona para a página album.html com o parâmetro 'id'
                    window.location.href = 'album.html?id=' + stadium.id;
                });

            });
        })
        .catch(error => console.error('Erro na requisição à API:', error));
});

