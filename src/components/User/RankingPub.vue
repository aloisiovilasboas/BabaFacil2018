<template>
<v-container v-if = "ranking !== null && jogadores.length !== 0 && times.length !== 0" fluid grid-list-md text-xs-center :id="'container'">
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
      <v-alert v-if="temMensagem" :value="true" type="info">
      {{mensagem}}
    </v-alert>

      <v-btn :to="'/Resultados'" round color="primary" dark>Resultados dos Jogos</v-btn>

      
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
        v-if="this.$vuetify.breakpoint.name === 'xs'"
      >
      <!-- tr class="mouseoverlink" @click="onLoadPerfil(props.item.id)" -->
        <template slot="items" slot-scope="props" >
          <tr class="mouseoverlink" @click="props.expanded = !props.expanded">
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
           
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-layout fluid wrap row justify-space-between >
              <v-flex align-content-center>
            <v-card-text  class="text-xs-left paddinton">  
              <div> Grupos: {{ props.item.grupos }} pts </div>
              <div> Oitavas: {{ props.item.oitavas }} pts </div>
              <div> Quartas: {{ props.item.quartas }} pts</div>
              <div> Semifinais: {{ props.item.semis }} pts</div>
              <div> Final: {{ props.item.final }} pts</div>
              <div> Campeão: {{ props.item.campeao }} pts</div>
            </v-card-text>
            </v-flex>
            <v-flex class="text-xs-center" >
              <div class="paddintop">
              <v-btn @click="onLoadPerfil(props.item.id)" class="butaozinho" color="red" dark>Ver Apostas</v-btn>
              </div>
            </v-flex>
            </v-layout>
          </v-card>
      </template>
      </v-data-table>
      <v-data-table
        v-else
        :headers="headersCompleto"
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
            <td class="text-xs-center pontuacaostyle">
              {{ props.item.pontuacao }}
            </td>
            <td class="text-xs-center pontuacaostyle">
              {{ props.item.grupos }}
            </td>
            <td class="text-xs-center pontuacaostyle">
              {{ props.item.oitavas }}
            </td>
            <td class="text-xs-center pontuacaostyle">
              {{ props.item.quartas }}
            </td>
            <td class="text-xs-center pontuacaostyle">
              {{ props.item.semis }}
            </td>
            <td class="text-xs-center pontuacaostyle">
              {{ props.item.final }}
            </td>
            <td class="text-xs-center pontuacaostyle">
              {{ props.item.campeao }}
            </td>
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
      if (this.$store.getters.loadedRanking === null || this.$store.getters.loadedRanking === undefined) {
        this.$store.dispatch('loadRanking')
      }
      if (this.$store.getters.loadedTimes.length === 0) {
        this.$store.dispatch('loadTimes')
      }
     // console.log(this.$vuetify.breakpoint.name)
    },
    data () {
      return {
        pagination: {'sortBy': 'i', 'rowsPerPage': -1},
        headers: [
        //  {text: 'Nº', value: 'i'},
          {text: 'Posição', value: 'pos'},
          {text: 'Nome', value: 'nome'},
          {text: 'Pts', value: 'pontuacao'}
          /* {text: 'G', value: 'grupos'},
          {text: 'O', value: 'oitavas'},
          {text: 'Q', value: 'quartas'},
          {text: 'S', value: 'semis'},
          {text: 'F', value: 'final'},
          {text: 'C', value: 'campeao'} */
        ],
        headersCompleto: [
        //  {text: 'Nº', value: 'i'},
          {text: 'Posição', value: 'pos'},
          {text: 'Nome', value: 'nome'},
          {text: 'Pts', value: 'pontuacao'},
          {text: 'Grupos', value: 'grupos'},
          {text: '8as', value: 'oitavas'},
          {text: '4as', value: 'quartas'},
          {text: 'Semi', value: 'semis'},
          {text: 'Final', value: 'final'},
          {text: 'Campeão', value: 'campeao'}
         // {text: 'Situação', value: 'situacao'}
        ]
      }
    },
    methods: {
      onLoadPerfil (id) {
        this.$router.push('/perfil/' + id)
      },
      calculaPontuacao (jogadores) {
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
      ranking () {
       // console.log(this.$store.getters.loadedRanking)
        return this.$store.getters.loadedRanking
      },
      mensagem () {
        return this.ranking.mensagem
      },
      temMensagem () {
        return this.ranking.temMensagem
      },
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
      ultimoJogoT1 () {
        var it = this.times.findIndex((t1) => {
          return t1.id === this.ranking.ultimoJogoT1id
        })
        return this.times[it]
      },
      ultimoJogoT2 () {
        var it = this.times.findIndex((t2) => {
          return t2.id === this.ranking.ultimoJogoT2id
        })
        return this.times[it]
      },
      ultimoJogoT1gols () {
        return this.ranking.ultimoJogoT1gols
      },
      ultimoJogoT2gols () {
        return this.ranking.ultimoJogoT2gols
      },
      jogadores () {
        var jogadores = this.ranking.jogadores
        this.calculaPontuacao(jogadores)
        this.pagination.sortBy = 'i'
        // console.log(filtrados)
        return jogadores
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
 .table, .paddinton, .application .theme--light.table {
    padding-left: 30%;
    font-size: 85%;
} 
.table, .paddintop, .application .theme--light.table {
    padding-top: 30px;
}
.butaozinho {
  font-size: 80%;
}

/* table.table tbody td, .nomeusuarior {
  color: rgba(0,0,100,0.87);
  font-weight: 500;
} */

</style>
