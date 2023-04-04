let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');
let numeroVoto = '';
let etapa = 0;
let numeroCanditado = undefined
let nomeCanditado = undefined
let partidoCanditado = undefined
let votoBranco = false;
let votoNulo = false;
let resultadoVoto = []
let listcanditados =''


document.querySelector('.canditos button').addEventListener('click',()=>{
    upDateCanditados()
    abrirCanditados(document.querySelector('.urna'),document.querySelector('.area-lista'))
    console.log('ok')
})


function iniciarVoto(){
    let numeroEtapas = etapas[etapa]
    let numeroHtml = '';
    for(let i=0;i<numeroEtapas.numeros;i++){
        if(i === 0){
            numeroHtml += `<div class="numero pisca"></div>`;
        }else{
            numeroHtml += `<div class="numero"></div>`;
        }
    }
    seuVotoPara.style.display = 'none'
    numeros.innerHTML = numeroHtml
    descricao.innerHTML = ''
    aviso.style.display= 'none'
    lateral.innerHTML =''
    numeroVoto = ""
    numeros.style.display = 'block'
    cargo.innerHTML = numeroEtapas.titulo
    numeroCanditado = undefined
    votoBranco = false;
    votoNulo = false;
}

function clicou (n){
    let numeropisca = document.querySelector('.numero.pisca')
    if (numeropisca !== null){ 
        numeropisca.innerHTML = n 
        numeroVoto += n
        numeropisca.classList.remove('pisca');
    }
    
    if( numeropisca.nextElementSibling !== null) {
        numeropisca.nextElementSibling.classList.add('pisca')
    }else{
        validacaoVoto()
       
    }
}

function validacaoVoto(){
    let numeroEtapas = etapas[etapa];
    let escolhaCandidato = numeroEtapas.candidatos.filter((intem)=>{
        if(intem.numero === numeroVoto){
            return true;
        }else{
            return false;
        }
    })
    if(escolhaCandidato.length > 0){
        escolhaCandidato =escolhaCandidato[0]
        aviso.style.display = 'block'
        descricao.innerHTML = `nome: ${escolhaCandidato.nome} <br/> partido: ${escolhaCandidato.partido}`
        let fotoCantidato = '';
        seuVotoPara.style.display = 'block'
        for(let i in escolhaCandidato.fotos){
            if(escolhaCandidato.fotos[i].small){
                fotoCantidato += `<div class="d-1-image small"><img src="images/${escolhaCandidato.fotos[i].url}" alt="" />${escolhaCandidato.fotos[i].legenda}</div>`;
            }else{
                fotoCantidato += `<div class="d-1-image"><img src="images/${escolhaCandidato.fotos[i].url}" alt="" />${escolhaCandidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotoCantidato
        numeroCanditado = escolhaCandidato.numero
        nomeCanditado = escolhaCandidato.nome
        partidoCanditado = escolhaCandidato.partido
    }else{
        votoNulo = true
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }

}

function branco(){
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    numeros.style.display = 'none'
    aviso.style.display= 'flex'
    seuVotoPara.style.display = 'block'
    lateral.innerHTML = '';
    votoBranco = true;
    numeroVoto = '';
    
}

function corrige(){
    iniciarVoto()
}
function confirma(){   
    let numeroEtapas = etapas[etapa];
    let confirmacao = false
    
    if(votoBranco === true ){
        confirmacao = true
        resultadoVoto.push({
            cargo: numeroEtapas.titulo,
            voto : 'EM BRANCO'
    
        })
    }else if (votoNulo === true){
        confirmacao = true;
        resultadoVoto.push({
            cargo: numeroEtapas.titulo,
            voto : 'Nulo'
    
        })
    }else if(numeroVoto === numeroCanditado){
        confirmacao = true;
        resultadoVoto.push({
            cargo: numeroEtapas.titulo,
            NumeroCanditado : numeroCanditado,
            NomeCanditado:  nomeCanditado,
            PartidoCanditado:partidoCanditado 
        })
    }else if (  numeroVoto.length < numeroEtapas.numeros){
        alert('escolha um cadito')
    }
    if(confirmacao){
        etapa++;
        if(etapa == 1){
            iniciarVoto()
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">Fim</div>'
        }
        
    }
}
function upDateCanditados(){
      let area = document.querySelector('.area-lista')
      area.innerHTML = `<div class="closed-area"><span>X</span></div>`;
      
      for(let i in etapas[0].candidatos){
        area.innerHTML +=  `<div class="area-canditos">
            <div class="area-info">
                <div class="nome">${etapas[0].candidatos[i].fotos[0].legenda}: ${etapas[0].candidatos[i].nome}</div>
                <div class="partido"> PARTIDO: ${etapas[0].candidatos[i].partido}</div>
                <div class="numero-voto"> NUMERO: ${etapas[0].candidatos[i].numero}</div>
            </div>
            <div class="area-foto"> 
                <fieldset>
                    <legend>${etapas[0].candidatos[i].fotos[0].legenda}</legend>
                    <img src="images/${etapas[0].candidatos[i].fotos[0].url}">
                </fieldset>
            </div>
        </div>
        <div class="linha"></div>` 
      }
      
      
      
      
      for(let i in etapas[1].candidatos){
        area.innerHTML += 
        `<div class="area-canditos">
            <div class="area-info">
                <div class="nome">${etapas[1].candidatos[i].fotos[0].legenda}: ${etapas[1].candidatos[i].nome}</div>
                <div class="nome-vice"> VICE-PREFEITO: ${etapas[1].candidatos[i].vice}</div>
                <div class="partido"> PARTIDO: ${etapas[1].candidatos[i].partido}</div>
                <div class="numero-voto"> NUMERO: ${etapas[1].candidatos[i].numero}</div>
            </div>
            <div class="area-foto"> 
                <fieldset>
                    <legend>${etapas[1].candidatos[i].fotos[0].legenda}</legend>
                    <img src="images/${etapas[1].candidatos[i].fotos[0].url}">
                </fieldset>
        
                <fieldset>
                    <legend>${etapas[1].candidatos[i].fotos[1].legenda}</legend>
                    <img src="images/${etapas[1].candidatos[i].fotos[1].url}" alt="">
                </fieldset>
            </div>
        </div>
        <div class="linha"></div>` 
    }
    document.querySelector('.closed-area').addEventListener('click',()=>{
        abrirCanditados(document.querySelector('.area-lista'),document.querySelector('.urna'))
        
    })
}
function abrirCanditados(closed,open){
    closed.style.opacity = '0';;
    open.style.opacity = '0';
    open.style.display = 'flex';
    setTimeout(()=>{
        closed.style.display ='none';
        open.style.opacity = '1';
    },300)

}


function log(msg){
    
}
iniciarVoto()







