// OBJETO DO JOGO
const jogoDaVelha = {
    tabuleiro: ['','','','','','','','',''], // Tabuleiro do Jogo onde será preenchido com os simbolos.
    turno: 0, //Turno de qual será o simbolo a ser preenchido no tabuleiro, 0 ou 1 [INDICE DOS SIMBOLOS].
    
    simbolo: ['X','O'], // Array dos simbolos X ou O.
    fimDeJogo: false , // Variavel que diz se o jogo terminou ou não.
    containerElement: null,

    seqVenc: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]], // Possibilidades de ganahr o jogo.
    
    
    start(){
        this.tabuleiro.fill('');
        jogoDaVelha.draw();
        this.fimDeJogo = false;
    },
    trocaTurno(){
        this.turno === 0 ?this.turno = 1 : this.turno = 0;
    },
    
    jogada(casa){
        if (this.fimDeJogo || this.tabuleiro[casa] !== '') return false; // Se Acabou ou ja está preenchido Sai da Função
        const simboloEl = this.simbolo[this.turno];
        this.tabuleiro[casa] = simboloEl; // Se estiver vazio preenche com o simbolo do turno.
        this.draw(); // Redesenha o tabuleiro na tela.
        
        const ganhador = this.ganhou(simboloEl); // Verifica se alguem ganhou o jogo.
        if (ganhador >= 0) { // Se alguem ganhou o jogo.
            this.jogoTerminou(ganhador);
        }else if(this.checkEmpty()){
            this.jogoTerminou()
        }else{ // Se não, troca o turno, que altera o simbolo.
            jogoDaVelha.trocaTurno();
        }
        return true;
    },
    
    jogoTerminou(wonIndex) {
        
        if (wonIndex){
            const oneEl = document.querySelectorAll('div[onclick]');
            oneEl[this.seqVenc[wonIndex][0]].style.color = 'red';
            oneEl[this.seqVenc[wonIndex][1]].style.color = 'red';
            oneEl[this.seqVenc[wonIndex][2]].style.color = 'red';
            alert('Parabens Houve um Vencedor');
            this.fimDeJogo = true;
        }else{
            alert('O Jogo deu Velha.');
            this.fimDeJogo = true;
        }
        
        /*console.log(oneEl[this.seqVenc[wonIndex][0]]);
        console.log(this.seqVenc[wonIndex][1]);
        this.tabuleiro[this.seqVenc[wonIndex][0]] = 'E';
        this.tabuleiro[this.seqVenc[wonIndex][1]] = 'N';
        this.tabuleiro[this.seqVenc[wonIndex][2]] = 'D';*/
        console.log('GAME OVER');
        
    },
    
    ganhou(simbolo) {
        for (var i in this.seqVenc ){ // Percorre a sequencia 
            if (this.tabuleiro[this.seqVenc[i][0]] == simbolo && // Se tiver uma sequencia com 3 simbolos iguais foi o ganhador.
                this.tabuleiro[this.seqVenc[i][1]] == simbolo &&
                this.tabuleiro[this.seqVenc[i][2]] == simbolo){
                    
                    console.log("winning sequences INDEX:" + i);
                    return i;              
            }
        };
        return -1;
    },

    checkEmpty() {
        return !this.tabuleiro.includes('');
    },

    restart() {
        if (this.checkEmpty() || this.fimDeJogo) {
            this.start();
            alert('O jogo foi reiniciado')
        } else if (confirm('Jogo em andamento, quer reiniciar?')) {
            this.start();
            console.log('O jogo foi reiniciado!')
        }
    },

    init(container){ // Pega o container de onde será montado o jogo!
        this.containerElement = container; 
    },
    draw(){ // Desenha o tabuleiro nesse container, criando divs para cada poisição.
        let content = '';
        for (i in this.tabuleiro) {
            content += `<div onclick="jogoDaVelha.jogada(${i})">${this.tabuleiro[i]}</div>`; // Preencheu as div com o tabuleiro.
        } 
        this.containerElement.innerHTML = content;

        this.containerElement.innerHTML = this.tabuleiro.map((elemento, indice) => `<div onclick="jogoDaVelha.jogada('${indice}')"> ${elemento} </div>`).reduce((content, current) => content + current);
    },
    
};