const corpo = document.querySelector('body');
const titulo = document.querySelector('.Titulo');
const container = document.querySelector('#container');

corpo.style.backgroundColor = '#29207b';
corpo.style.color = 'white';
titulo.innerHTML = 'Kayc Félix da Silva Loche';
container.style.width = '94%';
container.style.textAlign = 'center'
container.style.backgroundColor = '#ff08d6';

let anuncio = '<h2> Curso de Desenvolvimento com IA <h2>';
container.innerHTML += anuncio;

let imagem = '<img src="https://geartips.club/blog/wp-content/uploads/sites/2/2022/10/pessoas-trilhando-floresta.jpg" alt=""> Curso de Desenvolvimento com IA <img>';
container.innerHTML += imagem;