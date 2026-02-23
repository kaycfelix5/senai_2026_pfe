const corpo = document.querySelector('body');
const titulo = document.querySelector('.Titulo');
const container = document.querySelector('#container');
const imagem = document.querySelector('#imagem')

corpo.style.backgroundColor = '#29207b';
corpo.style.color = 'white';
titulo.textContent = 'Adicionando elementos via JS';
container.style.width = '94%';
container.style.margin = '0 auto';
container.style.backgroundColor = '#ff08d6';

let anuncio = '<h2>Curso Dev com IA - novidade !!!<h2>';
container.innerHTML += anuncio;

imagem.setAttribute('src','https://www.viagenscinematograficas.com.br/wp-content/uploads/2017/02/Melhores-Ilhas-do-Brasil-Capa.jpg');
//imagem.removeAttribute('src')

imagem.classList.add('imagem');