import React from 'react';
import ReactDOM from 'react-dom';
import orc from './imagens/orc.png';
import goblin from './imagens/globin.png';
import feiticeira from './imagens/feiticeira.png';
import soco from './imagens/soco.png';
import arco from './imagens/arco.png';
import espada from './imagens/espada.png';
import './index.css';

function Monstro(props) {
  var classeMonstro = "nome_objetos clicavel monstros"
  if (props.selecMonstro) {
    classeMonstro = classeMonstro + " selecionado"
  }
  return (
    <div className={classeMonstro} id={props.nome}  onClick={() => props.funcaoSelecionaMonstro(props.nome)}>
      <img src={props.imagem} alt="" width="150px"/>
      <p>{props.nome}</p>
      </div>
  )
}

function Arma(props) {
  var classeArma = "nome_objetos clicavel armas"
  if (props.selecArma) {
    classeArma = classeArma + " selecionado"
  }
  return (
    <div className={classeArma} id={props.nome}  onClick={() => props.funcaoSelecionaArma(props.nome)}>
      <img src={props.imagem} alt="" width="150px"/>
      <p>{props.nome}</p>
      </div>
  )
}

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personagem: '',
      arma: '',
      vida: '',
      armaDano: '',
      textinho: '',
      historico: ''
    }
  }

  clicaMonstro(id) {
    let vidaMonstro = 0;
    if (id === 'orc') {
      vidaMonstro = 20;
    } else if (id === 'goblin') {
      vidaMonstro = 30;
    } else {
      vidaMonstro = 40;
    }
    this.setState(
      {
        personagem: id,
        vida: vidaMonstro
      }   
    )
  }
  

  clicaArma(id) {
    let danoDaArma = 0;
    if (id === 'soco') {
      danoDaArma = 10;
    } else if (id === 'arco') {
      danoDaArma = 20;
    } else {
      danoDaArma = 30;
    }
    this.setState(
      {
        arma: id,
        armaDano: danoDaArma
      }
    )
  }

  calculaLuta() {
    var textoNome = '';
    console.log(this.state.vida, this.state.armaDano)
    if (this.state.vida == 0 && this.state.armaDano == 0){
      textoNome = 'Selecione um monstro e um personagem'
    } else if (this.state.vida == 0) {
      textoNome = 'Selecione um monstro'
    } else if (this.state.armaDano == 0) {
      textoNome = 'Selecione uma arma'
    } else {
      var vida = this.state.vida
      var dano = this.state.armaDano
      dano = dano - vida;
      if (dano >= 0) {
        textoNome = `Você matou o/a ${this.state.personagem}`
      } else {
        textoNome = `Você não matou o/a ${this.state.personagem}`
      }
    }
    this.setState(
      {
        textinho: textoNome,
      }
    )
  }

  render() {
    return (
      <div id="fundao">
            <div className="calc_negrito" id="calc"><h1>Calculadora de Dano</h1></div>
            <div className="calc_negrito"><h3>Selecione um personagem</h3></div>
            <div id="monstros">
              <Monstro nome="orc" imagem={orc} selecMonstro={this.state.personagem === 'orc'} funcaoSelecionaMonstro={(id) => this.clicaMonstro(id)}/>
              <Monstro nome="goblin" imagem={goblin} selecMonstro={this.state.personagem === 'goblin'} funcaoSelecionaMonstro={(id) => this.clicaMonstro(id)}/>
              <Monstro nome="feiticeira" imagem={feiticeira} selecMonstro={this.state.personagem === 'feiticeira'} funcaoSelecionaMonstro={(id) => this.clicaMonstro(id)}/>
            </div>
            <div className="calc_negrito"><h3>Selecione uma arma</h3></div>
            <div id="armas">
              <Arma nome="soco" imagem={soco} selecArma={this.state.arma === 'soco'} funcaoSelecionaArma={(id) => this.clicaArma(id)}/>
              <Arma nome="arco" imagem={arco} selecArma={this.state.arma === 'arco'} funcaoSelecionaArma={(id) => this.clicaArma(id)}/>
              <Arma nome="espada" imagem={espada} selecArma={this.state.arma === 'espada'} funcaoSelecionaArma={(id) => this.clicaArma(id)}/>
            </div>
            <div id="botao"><button id="botao_clicavel" name="Calcular Dano" onClick={() => this.calculaLuta()}>Calcular Dano</button></div>
            <div id="texto">{this.state.textinho}</div>
        </div>
    )
  }
}

ReactDOM.render(
  <Jogo />,
  document.getElementById('root')
);