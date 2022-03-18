
const modal = document.getElementById('modalDados') // buscando elemento da modal
const contador = document.querySelector('.contador') // buscando elemento main
const descricaoData = document.querySelector('[descricaoData]') // buscando elemento descrição da data
const dataUsuario = document.querySelector('[dataAlvo]') // buscando elemento data Alvo
const realizarContagem = document.querySelector('[realizarContagem]') // buscando botão para realizar contagem
const anoNovo = document.getElementById('anoNovo') // botão para resetar a contagem para o ano novo
const msg = document.getElementById('msg') // elemento para exibir mensagens na modal
const alerta = document.querySelector('.alerta') // classe para alertas para usuário

function fecharModal() {
    modal.style.display = 'none'
    contador.style.display = 'flex'
    alerta.style.display = 'none'
}

function contagemRegressiva(descricao = 'Ano Novo', botaoResetar = false) {

    console.log('iniciar contagem')
    atualizarTexto(descricao)
    dataAlvo = new Date(`${dataUsuario.value}T00:00:00`)
    contarDatas()
    setInterval(contarDatas, 1000)
    fecharModal()
    if (botaoResetar) {
        anoNovo.style.display = 'inline-block'
    }

}

function atualizarTexto(texto) {
    const dataHTML = document.querySelector('#data-texto')
    dataHTML.innerHTML = texto
}

function doisDigitos(numero) {
    if (numero < 10 && numero > 0) {
        return '0' + `${numero}`
    } else if (numero <= 0) {
        return '00'
    } else
        return numero
}

function contarDatas() {

    const dataCorrente = new Date()


    const segundosTotal = (dataAlvo - dataCorrente) / 1000
    let dias = Math.floor(segundosTotal / 3600 / 24)
    let horas = Math.floor(segundosTotal / 3600) % 24
    let minutos = Math.floor(segundosTotal / 60) % 60
    const segundos = Math.floor(segundosTotal) % 60

    const diaHTML = document.querySelector('#dias')
    const horasHTML = document.querySelector('#horas')
    const minutosHTML = document.querySelector('#minutos')
    const segundosHTML = document.querySelector('#segundos')

    diaHTML.innerHTML = doisDigitos(dias)
    horasHTML.innerHTML = doisDigitos(horas)
    minutosHTML.innerHTML = doisDigitos(minutos)
    segundosHTML.innerHTML = doisDigitos(segundos)
    

    if ((dias + horas + minutos + segundos) === 0) {
        alerta.classList.add('bom')
        mensagemAlerta(descricaoData.value ? 'A data: "' + descricaoData.value + '" chegou!!!' : 'Feliz Ano Novoooo !!!')
    }
}

function recarregar() {
    document.location.reload(true) // recarrega a página
}

function abrirModal() {
    modal.style.display = 'flex'
    contador.style.display = 'none'
    descricaoData.value = ''
    definirDatas()
}

function definirDatas() {
    let dataMinima = new Date()
    dataUsuario.min = dataMinima.getFullYear() + "-" + (doisDigitos(dataMinima.getMonth() + 1)) + "-" + (doisDigitos(dataMinima.getDate() + 1))
    dataUsuario.value = `${dataMinima.getFullYear() + 1}-01-01`
}


function mensagemAlerta(textoMensagem) {
    msg.innerHTML = textoMensagem
    alerta.style.display = 'block'
}

definirDatas() // setando data minima igual a data atual e ano novo a partir do ano corrente

document.querySelector('.botaoFechar').onclick = fecharModal // fechar modal ao clicar no botão fechar
document.querySelector('#novaContagem').onclick = abrirModal // recarregar pagina
anoNovo.onclick = recarregar

realizarContagem.addEventListener('click', (e) => { // iniciar contagem ao clicar no botão
    e.preventDefault()

    if (dataUsuario.value >= dataUsuario.min) {
        if (descricaoData.value) {
            contagemRegressiva(descricaoData.value, true)
        }
        else {
            mensagemAlerta('Preencha a descrição!')
        }
    } else mensagemAlerta('Data tem que ser maior que hoje!')
})

modal.onclick = e => { // fechar modal ao clicar fora da modal
    if (e.target.id == 'modalDados') {
        fecharModal()
    }
}

contagemRegressiva()
