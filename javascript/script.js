// Funções originais da barra lateral (Menu) mantidas intactas
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// --- Sistema de Carrossel com Giro Infinito Real ---
let isMoving = false; // Impede bugs visual se o usuário clicar muito rápido

function moveSlide(direction) {
    const track = document.getElementById('track');
    const items = document.querySelectorAll('.carousel-item');
    
    // Evita cliques simultâneos durante a animação
    if (isMoving) return;
    isMoving = true;

    // Descobre a largura de um item individual para mover a quantidade exata
    const amountToMove = items[0].offsetWidth;

    if (direction === 1) {
        // --- Girando para a DIREITA --->
        // Move a esteira para a esquerda
        track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(-${amountToMove}px)`;

        // Espera a animação acabar para mover o elemento no HTML e resetar a posição
        setTimeout(() => {
            track.style.transition = "none";
            track.appendChild(track.firstElementChild); // Move o primeiro item para o fim do grupo
            track.style.transform = `translateX(0px)`;
            isMoving = false;
        }, 400);

    } else if (direction === -1) {
        // --- Girando para a ESQUERDA <---
        // Move o último item para o início antes da animação começar, deslocando o eixo
        track.style.transition = "none";
        track.insertBefore(track.lastElementChild, track.firstElementChild);
        track.style.transform = `translateX(-${amountToMove}px)`;

        // Força o navegador a processar a mudança de posição instantaneamente
        track.offsetHeight; 

        // Faz a animação deslizando de volta para o zero
        track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(0px)`;

        setTimeout(() => {
            isMoving = false;
        }, 400);
    }
}

// --- Funções do Controle do Pop-up (Modal) ---

function openModal(title, imgSrc, description) {
    const modal = document.getElementById('projectModal');
    
    // Alimenta os elementos do Pop-up com as informações do projeto clicado
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalImg').alt = title;
    document.getElementById('modalDescription').innerText = description;
    
    // Exibe o modal mudando o display para flex
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById('projectModal').style.display = "none";
}

// Fecha o pop-up automaticamente se o usuário clicar no fundo escuro fora do card branco
function closeModalOutside(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
}