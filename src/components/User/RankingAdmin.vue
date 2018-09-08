<template>
<v-container v-if = "jogadores !== undefined && jogadores.length !== 0 && gabarito !== null && gabarito !== undefined && partidas !== undefined && times !== null" fluid grid-list-md text-xs-center :id="'container'">
<v-layout column >
  <v-layout column >
    <v-flex xs12 >
      <div>
      <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
      <v-layout row wrap>
          <v-flex xs12>
            <v-card color="blue-grey darken-4" class="white--text">
              <v-container fluid grid-list-lg>
             
                <div class="headline">Último jogo</div>
              </v-container>
              <v-container fluid grid-list-lg>
      <div>
       <v-layout fluid wrap row align-items justify-center >
               <v-flex xs4 sm2 lg1 >
                 <v-layout row align-items align-center coluna1 justify-space-between>
                    <v-avatar :size="40" :tile="true">
                        <img :src="ultimoJogoT1.imgurl">
                    </v-avatar>
                    <div  class="text-xs-right subheading"> {{ultimoJogoT1.sigla}}</div>
                    <div  class="text-xs-right subheading"> {{ultimoJogoT1gols}}</div>
                 </v-layout>
              </v-flex>
              <v-flex  xs2 md1 align-end justify-end align-content-end >
              <div ><p>x</p></div>
              </v-flex>
              <v-flex xs4 sm2 lg1>     
                 <v-layout row align-center reverse coluna1 justify-space-between>
                     <v-avatar :size="40" :tile="true">
                         <img :src="ultimoJogoT2.imgurl">
                     </v-avatar>
                    <div  class="text-xs-right subheading"> {{ultimoJogoT2.sigla}}</div>
                    <div  class="text-xs-right subheading"> {{ultimoJogoT2gols}}</div>
                 </v-layout>
            </v-flex>         
          </v-layout>
    </div>
             
              </v-container>
            </v-card>        
          </v-flex>
      </v-layout>
      </v-container>
      </v-card>
      <div>
        <input type="checkbox" label="asdas" v-model="temMensagem" >
        Publicar informação?
            </div>
      <v-alert :value="true" type="info">

       <input v-model="mensagem" placeholder="Digite a informação aqui">
      </v-alert>

      <v-btn v-on:click="publicaRanking" round color="red" dark>PUBLICA RANKING</v-btn>

      
    </div>
    </v-flex>
  <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
    <v-flex xs12 >
    <v-data-table
        :headers="headers"
        :items="jogadores"
        :pagination.sync="pagination"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props" >
          <tr class="mouseoverlink" @click="onLoadPerfil(props.item.id)" >
       <!--     <td class="text-xs-left">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.i }}</router-link>
            </td> -->
           <td class="text-xs-left">
              {{ props.item.pos }} 
            </td>
            <td class="text-xs-left nomeusuarior ">
              {{ props.item.nome }}
            </td>
            <td class="text-xs-left pontuacaostyle">
              {{ props.item.pontuacao }}
            </td>
            <td class="text-xs-left pontuacaostyle">
              {{ props.item.grupos }}
            </td>
            <td class="text-xs-left pontuacaostyle">
              {{ props.item.oitavas }}
            </td>
            <td class="text-xs-left pontuacaostyle">
              {{ props.item.quartas }}
            </td>
            <td class="text-xs-left pontuacaostyle">
              {{ props.item.semis }}
            </td>
            <td class="text-xs-left pontuacaostyle">
              {{ props.item.final }}
            </td>
            <td class="text-xs-left pontuacaostyle">
              {{ props.item.campeao }}
            </td>

           <!-- <td class="text-xs-left">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.pos }}</router-link>
            </td>
            <td class="text-xs-left nomeusuarior ">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.nome }}</router-link>
            </td>
            <td class="text-xs-left">
              <router-link :to="`/perfil/${props.item.id}`" tag="td">{{ props.item.pontuacao }}</router-link>
            </td>
            -->
          </tr>
        </template>
      </v-data-table>
    </v-flex>
      </v-container>
  </v-card>
  </v-layout>
</v-layout>
</v-container>
<v-container v-else>
    <div class = "text-xs-center"> <v-progress-circular :size="50" indeterminate color="red"></v-progress-circular></div>
  </v-container>
</template>

<script>
  export default {
    beforeCreate () {
      if (this.$store.getters.loadedApostasSalvas === undefined || this.$store.getters.loadedApostasSalvas.length === 0) {
        this.$store.dispatch('loadApostasSalvas')
      }
      if (this.$store.getters.loadedUsuarios === undefined || this.$store.getters.loadedUsuarios.length === 0) {
        this.$store.dispatch('loadUsuarios')
      }
      if (this.$store.getters.loadedGabarito === undefined || this.$store.getters.loadedGabarito === null) {
        this.$store.dispatch('loadGabarito')
      }
      if (this.$store.getters.loadedTimes === undefined || this.$store.getters.loadedTimes.length === 0) {
        this.$store.dispatch('loadTimes')
      }
      if (this.$store.getters.loadedPartidas.length === 0 || this.$store.getters.loadedPartidas === undefined) {
        this.$store.dispatch('loadPartidas')
      }
      if (this.$store.getters.loadedFases === null || this.$store.getters.loadedFases.length === 0) {
        this.$store.dispatch('loadFases')
      }
    },
    data () {
      return {
        mensagem: null,
        temMensagem: false,
        grupo: '',
        nroPendentes: 0,
        nroCadastrados: 0,
        nroEnviados: 0,
        nroPagos: 0,
        pagination: {'sortBy': 'i', 'rowsPerPage': -1},
        headers: [
        //  {text: 'Nº', value: 'i'},
          {text: 'Posição', value: 'pos'},
          {text: 'Nome', value: 'nome'},
          {text: 'P', value: 'pontuacao'},
          {text: 'G', value: 'grupos'},
          {text: 'O', value: 'oitavas'},
          {text: 'Q', value: 'quartas'},
          {text: 'S', value: 'semis'},
          {text: 'F', value: 'final'},
          {text: 'C', value: 'campeao'}
         // {text: 'Situação', value: 'situacao'}
        ]
      }
    },
    methods: {
      publicaRanking () {
         // console.log(this.grupos)
        var jogadoresR = []
        this.jogadores.forEach(jogador => {
          var j =
            {
              nome: jogador.nome,
              pontuacao: jogador.pontuacao,
              id: jogador.id,
              grupos: jogador.grupos,
              oitavas: jogador.oitavas,
              quartas: jogador.quartas,
              semis: jogador.semis,
              final: jogador.final,
              campeao: jogador.campeao
            }
          jogadoresR.push(j)
        })
       // console.log(fasesApostas)
        console.log(this.mensagem)
        this.$store.dispatch('cadastraRanking', {
          jogadores: jogadoresR,
          ultimoJogoT1id: this.ultimoJogoT1.id,
          ultimoJogoT2id: this.ultimoJogoT2.id,
          ultimoJogoT1gols: this.ultimoJogoT1gols,
          ultimoJogoT2gols: this.ultimoJogoT2gols,
          temMensagem: this.temMensagem,
          mensagem: this.mensagem
        })
        this.$router.push('/Ranking')
      },
      onLoadPerfil (id) {
        this.$router.push('/perfiladmin/' + id)
      },
      toTitleCase (str) {
        var s = str.replace(
          /([^\W_]+[^\s-]*) */g,
          function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          }
        )
        return s.replace(/De |Da |Das |Dos /gi, function (x) {
          return x.toLowerCase()
        })
      },
      calculaPontuacaoGrupo (partidaJogador, partidaGabarito) {
        var pontuacao = 0
        var jogador = Number(partidaJogador.time1gols) - Number(partidaJogador.time2gols)
        var gabarito = Number(partidaGabarito.time1gols) - Number(partidaGabarito.time2gols)
        if ((jogador > 0 && gabarito > 0) || (jogador < 0 && gabarito < 0) || (jogador === 0 && gabarito === 0)) {
          if (Number(partidaJogador.time1gols) === Number(partidaGabarito.time1gols) && Number(partidaJogador.time2gols) === Number(partidaGabarito.time2gols)) {
            pontuacao = 5
          } else {
            pontuacao = 1
          }
        }
        return pontuacao
      },
      calculaPontuacaoMataMata (jogador, gabarito) {
       // console.log(jogador.times)
       // console.log(gabarito.times)
        var p = 0
        if (gabarito.times !== undefined && gabarito.times !== null) {
          gabarito.times.forEach(time => {
            if (jogador.times.includes(time)) {
              p += 1
            //  console.log(time)
            }
          })
        }
        return p
      },
      calculaColocacao (jogadores) {
        jogadores.sort(function (jogadorA, jogadorB) {
          if (jogadorB.pontuacao - jogadorA.pontuacao === 0) {
            var nameA = jogadorA.nome // ignore upper and lowercase
            var nameB = jogadorB.nome // ignore upper and lowercase
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }
            return 0
          } else {
            return jogadorB.pontuacao - jogadorA.pontuacao
          }
        })
        var pos = 1
        var i = 0
        var pontuacaoanterior = 0
        var inicio = true
        jogadores.forEach(jogador => {
          i++
          if (inicio) {
            pontuacaoanterior = jogador.pontuacao
            inicio = false
          } else {
            if (jogador.pontuacao < pontuacaoanterior) {
              pos = i
              pontuacaoanterior = jogador.pontuacao
            }
          }
          jogador.i = i
          jogador.pos = pos
        })
      }
    },
    computed: {
      times () {
        var times = this.$store.getters.loadedTimes
        function removerAcentos (s) {
          return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        }
        times.forEach(time => {
          var sigla = removerAcentos(time.nome.slice(0, 3).toUpperCase())
         // console.log(sigla)
          time.sigla = sigla
        })
        return times
      },
      partidas () {
        var partidas = this.$store.getters.loadedPartidas
        return partidas
      },
      segundaFase () {
        var fases = this.$store.getters.loadedFases
        return fases
      },
      fases () {
        var fases = this.segundaFase
        for (let i = 0; i < fases.length; i++) {
          for (let j = 0; j < fases[i].partidas.length; j++) {
            var time1 = {id: null, grupo: null, nome: null, imgurl: null}
            var time2 = {id: null, grupo: null, nome: null, imgurl: null}
            fases[i].partidas[j].time1 = time1
            fases[i].partidas[j].time2 = time2
            fases[i].partidas[j].time1.nome = this.segundaFase[i].partidas[j].time1GP
            fases[i].partidas[j].time2.nome = this.segundaFase[i].partidas[j].time2GP
            fases[i].partidas[j].disabled = true
            fases[i].partidas[j].selecionado = null
          }
        }
        return fases
      },
      ultimoJogoT1 () {
        var it = this.times.findIndex((t1) => {
          return t1.id === this.gabarito.ultimojogoT1
        })
       // console.log(this.times[it])
        if (it === -1) {
          return {nome: '', imgurl: ''}
        } else {
          return this.times[it]
        }
      },
      ultimoJogoT2 () {
        var it = this.times.findIndex((t2) => {
          return t2.id === this.gabarito.ultimojogoT2
        })
       // console.log(this.times[it])
        if (it === -1) {
          return {nome: '', imgurl: ''}
        } else {
          return this.times[it]
        }
      },
      ultimoJogoT1gols () {
        return this.gabarito.ultimojogoT1gols
      },
      ultimoJogoT2gols () {
        return this.gabarito.ultimojogoT2gols
      },
      users () {
        return this.$store.getters.loadedUsuarios
      },
      apostas () {
        return this.$store.getters.loadedApostas
      },
      gabarito () {
        return this.$store.getters.loadedGabarito
      },
      apostasSalvas () {
        return this.$store.getters.loadedApostasSalvas
      },
      jogadores () {
       // console.log('gabarito')
       // console.log(this.$store.getters.gabarito)
        var usuarios = this.users
        var index = 1
        var filtrados = []
        usuarios.forEach(user => {
          if (!user.pendente && user.pago) {
            var indexAposta = this.apostasSalvas.findIndex((aposta) => {
              return aposta.usuarioid === user.id
            })
            if (indexAposta !== -1) {
              user.apostas = this.apostasSalvas[indexAposta]
              if (user.nome.indexOf(' ') === -1) {
                user.nome = user.nomeOriginal
              }
              user.nome = this.toTitleCase(user.nome)
              user.situacao = 'Enviado'
              filtrados.push(user)
              user.index = index
              index++
            }
          }
        })
        if (this.gabarito !== undefined && this.gabarito !== null) {
        //  console.log(this.gabarito.gruposOrganizados)
        //  console.log(this.gabarito.grupos)
        //  console.log(this.gabarito.fasesOrganizadas)
         // console.log(this.gabarito.gruposOrganizados)
          filtrados.forEach(jogador => {
            var pontos = 0
            for (let i = 0; i < this.gabarito.grupos.length; i++) {
              for (let j = 0; j < this.gabarito.grupos[j].partidas.length; j++) {
                if (this.gabarito.grupos[i].partidas[j].time1gols !== null && this.gabarito.grupos[i].partidas[j].time1gols !== undefined) {
                  var ipart = jogador.apostas.grupos[i].partidas.findIndex((partida) => {
                    return partida.id === this.gabarito.grupos[i].partidas[j].id
                  })
                  var pontosPartida = this.calculaPontuacaoGrupo(jogador.apostas.grupos[i].partidas[ipart], this.gabarito.grupos[i].partidas[j])
                  pontos += pontosPartida
                }
              }
            }
            jogador.grupos = pontos
           // console.log(this.gabarito.matamata[0])
            var oitavas = this.calculaPontuacaoMataMata(jogador.apostas.matamata[0], this.gabarito.matamata[0]) * 8
            jogador.oitavas = oitavas
            var quartas = this.calculaPontuacaoMataMata(jogador.apostas.matamata[1], this.gabarito.matamata[1]) * 10
            jogador.quartas = quartas
            var semis = this.calculaPontuacaoMataMata(jogador.apostas.matamata[2], this.gabarito.matamata[2]) * 15
            jogador.semis = semis
            var final = this.calculaPontuacaoMataMata(jogador.apostas.matamata[4], this.gabarito.matamata[4]) * 20
            jogador.final = final
            var campeao = this.calculaPontuacaoMataMata(jogador.apostas.matamata[3], this.gabarito.matamata[3]) * 30
            jogador.campeao = campeao
            jogador.pontuacao = pontos + oitavas + quartas + semis + final + campeao
           // jogador.pontuacao = pontos
          })
         // console.log(filtrados)
          this.calculaColocacao(filtrados)
          this.pagination.sortBy = 'i'
         // console.log(filtrados)
          return filtrados
        } else {
          return filtrados
        }
      }
    }
  }
</script>

<style>
a:link {
    text-decoration: none;
}
.mouseoverlink { 
  cursor: pointer; 
}
.table, .nomeusuarior, .application .theme--light.table {
    font-weight: bold;
}
.table, .pontuacaostyle, .application .theme--light.table {
    min-width: 50px;
}
/* table.table tbody td, .nomeusuarior {
  color: rgba(0,0,100,0.87);
  font-weight: 500;
} */

</style>
