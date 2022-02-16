


const modal = document.getElementById('modalDados') // buscando elemento da modal
const contador = document.querySelector('.contador') // buscando elemento main
const descricaoData = document.querySelector('[descricaoData]') // buscando elemento descrição da data
const dataUsuario = document.querySelector('[dataAlvo]') // buscando elemento data Alvo
const realizarContagem = document.querySelector('[realizarContagem]') // buscando botão para realizar contagem
const anoNovo = document.getElementById('anoNovo')

let dataAlvo = new Date(dataUsuario.value) // definindo data padrão do ano novo pelo value do campo

function fecharModal() {
    modal.style.display = 'none'
    contador.style.display = 'flex'
}


function contagemRegressiva(descricao = 'Ano Novo', botaoResetar = false) {

    console.log('iniciar contagem')
    atualizarTexto(descricao)
    dataAlvo = new Date(dataUsuario.value)
    contarDatas()
    setInterval(contarDatas, 1000)
    fecharModal()
    console.log(botaoResetar)
    if (botaoResetar) {
        console.log('sim')
        anoNovo.style.display = 'inline-block'
    }

}

function atualizarTexto(texto) {
    const dataHTML = document.querySelector('#data-texto')
    dataHTML.innerHTML = texto
}

function doisDigitos(numero) {
    if (numero < 10) {
        return '0' + `${numero}`
    } else {
        return numero
    }
}

function contarDatas() {

    const dataCorrente = new Date()


    const segundosTotal = (dataAlvo - dataCorrente) / 1000
    const dias = Math.floor(segundosTotal / 3600 / 24)
    const horas = Math.floor(segundosTotal / 3600) % 24
    const minutos = Math.floor(segundosTotal / 60) % 60
    const segundos = Math.floor(segundosTotal) % 60

    const diaHTML = document.querySelector('#dias')
    const horasHTML = document.querySelector('#horas')
    const minutosHTML = document.querySelector('#minutos')
    const segundosHTML = document.querySelector('#segundos')

    diaHTML.innerHTML = doisDigitos(dias)
    horasHTML.innerHTML = doisDigitos(horas)
    minutosHTML.innerHTML = doisDigitos(minutos)
    segundosHTML.innerHTML = doisDigitos(segundos)
}

function recarregar() {
    document.location.reload(true) // recarrega a página
}

function abrirModal() {
    modal.style.display = 'flex'
    contador.style.display = 'none'
}

function dataMinima() { // FAZER FUNCIONAR !!!!!!!
    let dataMinima = new Date()
    dataUsuario.min = dataMinima.getFullYear() + "-" + ((dataMinima.getMonth() + 1)) + "-" + dataMinima.getDate()

    // console.log(dataUsuario.min)
    // console.log(dataUsuario)
}

function buscarData () {
    console.log(dataUsuario.value)
    let dataDaContagem = new Date(dataUsuario.value)
    if (dataUsuario.value) {
        dataDaContagem = Date(dataUsuario.value)
        console.log(dataDaContagem)
        
    }
    return dataDaContagem
}

// dataMinima() // setando data minima igual a data atual

document.querySelector('.botaoFechar').onclick = fecharModal // fechar modal ao clicar no botão fechar
document.querySelector('#novaContagem').onclick = abrirModal // recarregar pagina
anoNovo.onclick = recarregar

realizarContagem.addEventListener('click', (e) => { // iniciar contagem ao clicar no botão
    e.preventDefault()

    if (descricaoData.value) {
        contagemRegressiva(descricaoData.value, true)
    }
    else {
        alert('Descrição obrigatória')
    }
})

modal.onclick = e => { // fechar modal ao clicar fora da modal
    if (e.target.id == 'modalDados') {
        fecharModal()
    }
}

contagemRegressiva()