document.addEventListener('DOMContentLoaded', () => {
    // Modal Logic
    const modal = document.getElementById('player-modal');
    const closeBtn = document.querySelector('.close-btn');
    const bottomCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body');
    const modalButtons = document.querySelectorAll('.btn-modal');

    const playerData = {
        'price': {
            name: 'CAPITÃO PRICE',
            role: 'Líder de Esquadrão 🇬🇧',
            bio: 'John Price é um atirador de elite experiente e líder da Força-Tarefa 141. Especialista em operações sob pressão extrema e ambientes hostis.',
            skills: ['Liderança Tática', 'Mestre em Furtividade', 'Especialista em CQB'],
            weapons: 'M4A1 Custom, Desert Eagle',
            missions: 'Operação Kingfish, Fim de Jogo'
        },
        'ghost': {
            name: 'GHOST',
            role: 'Tenente 🇬🇧',
            bio: 'Simon "Ghost" Riley é conhecido por sua máscara de caveira balaclava, e atua como o segundo em comando na Força-Tarefa 141.',
            skills: ['Infiltração', 'Guerra Psicológica', 'Demolição'],
            weapons: 'ACR, Intervencion',
            missions: 'Operação Loose Ends, Takedown'
        },
        'soap': {
            name: 'SOAP',
            role: 'Sargento 🏴󠁧󠁢󠁳󠁣󠁴󠁿',
            bio: 'John "Soap" MacTavish é um veterano do SAS, perito em demolições e armas de curta distância.',
            skills: ['Explosivos C4', 'Faca de Arremesso', 'Tiro ao Alvo'],
            weapons: 'M14 EBR, M1911',
            missions: 'Apenas Bons Tempos, O Gulag'
        },
        'gaz': {
            name: 'GAZ',
            role: 'Sargento 🇬🇧',
            bio: 'Kyle "Gaz" Garrick é especialista em comunicações e interceptação de rádio, essencial nas operações anti-terrorismo.',
            skills: ['Comunicação', 'Inteligência de Sinal', 'Assalto'],
            weapons: 'G36C, USP .45',
            missions: 'Guerra de Picadilly, Cidade Natal'
        },
        'farah': {
            name: 'FARAH',
            role: 'Comandante 🇺ْر',
            bio: 'Farah Karim é a comandante fundadora das Forças de Libertação de Urzikstan. Uma guerreira incansável pela liberdade.',
            skills: ['Táticas de Guerrilha', 'Reconhecimento', 'Sobrevivência'],
            weapons: 'AK-47, SKS',
            missions: 'Lobo Solitário, Embaixada'
        },
        'alex': {
            name: 'ALEX',
            role: 'Agente CIA 🇺🇸',
            bio: '"Alex" é o codinome de um agente de Atividades Especiais da CIA que atua incrustado em forças aliadas globais.',
            skills: ['Operações Clandestinas', 'Engenharia de Campo', 'Pilotagem'],
            weapons: 'M13, X16',
            missions: 'Forno Frio, Proxy War'
        }
    };

    function closeModal() {
        modal.classList.remove('show');
    }

    modalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const playerKey = btn.getAttribute('data-player');
            const data = playerData[playerKey];

            if (data) {
                modalBody.innerHTML = `
                    <div class="modal-header">
                        <h2>${data.name}</h2>
                        <p>${data.role}</p>
                    </div>
                    <div class="modal-section">
                        <h4>Biografia</h4>
                        <p>${data.bio}</p>
                    </div>
                    <div class="modal-section">
                        <h4>Habilidades Especiais</h4>
                        <ul>
                            ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-section">
                        <h4>Armas Favoritas</h4>
                        <p>${data.weapons}</p>
                    </div>
                    <div class="modal-section">
                        <h4>Missões Notáveis</h4>
                        <p>${data.missions}</p>
                    </div>
                `;
                modal.classList.add('show');
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);
    bottomCloseBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });

    // Parallax Effect Adjust for Barracks Background
    const barracksLayer = document.getElementById('layer-barracks');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (barracksLayer) barracksLayer.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
});
