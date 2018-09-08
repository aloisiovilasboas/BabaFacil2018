<template>
  <v-container v-if = "$store.getters.loadedMinhasApostas !== null && segundaFase.length !== 0 && partidas.length !==0 && times !== null"   fluid grid-list-md text-xs-center :id="'container'">
<v-tabs
    dark
    color="red darken-2"
    show-arrows
  >
    <v-tabs-slider color="amber lighten-3"></v-tabs-slider>
    <v-tab
      v-for="grupo in grupos"
      :key="grupo.l"
      :href="'#grupo-' + grupo.l"
    >
    <v-badge left overlap color="red" :value="false">
      <span slot="badge">!</span>
      Grupo {{ grupo.l }}
    </v-badge>
    </v-tab>
    
    <v-tab
      v-for="fase in fases"
      :key="fase.id"
      :href="'#' + fase.id"
    >
    <v-badge left overlap color="red" :value="false">
      <span slot="badge">!</span>
      {{ fase.fase }}
    </v-badge>
    </v-tab>








    
    <v-tabs-items>
      <v-tab-item
        v-for="grupo in grupos"
        :key="grupo.l"
        :id="'grupo-' + grupo.l">
      
        <!-- <h1 v-for="partida in grupo.partidas" :key="partida.id" >{{partida.time1nome}}</h1>-->
        <span style="display: inline-block; margin-top: 20px;" > </span>
        <v-layout v-for="partida in grupo.partidas" :key="partida.id" column>
          <v-layout fluid wrap row align-items justify-center >
               <v-flex xs4 sm2 lg1 >
                 <v-layout row align-items align-center coluna1 justify-space-between>
                    <v-avatar :size="20" :tile="true">
                        <img :src="partida.time1.imgurl">
                    </v-avatar>
                    <div  class="text-xs-right"> {{partida.time1.sigla}}</div>
                    
                    <v-layout class = "input1layout">
                      <div class="subheading"> {{partida.time1gols}} </div>
                    <!--      <v-text-field
                            v-model="partida.time1gols"
                            @change="update(1, indexG, indexP)"
                            type="number"
                            class ="input1"
                            single-line
                          ></v-text-field> -->
                    </v-layout> 
                 </v-layout>
              </v-flex>
              <v-flex  xs2 md1 align-end justify-end align-content-end >
              <div ><p>x</p></div>
              </v-flex>
              <v-flex xs4 sm2 lg1>     
                 <v-layout row align-center reverse coluna1 justify-space-between>
                     <v-avatar :size="20" :tile="true">
                         <img :src="partida.time2.imgurl">
                     </v-avatar>
                    <div  class="text-xs-right"> {{partida.time2.sigla}}</div>
                    <v-layout class = "input1layout">
                      <div class = "subheading "> {{partida.time2gols}} </div>
                       <!--   <v-text-field
                            class = "input1"
                            type="number"
                            v-model="partida.time2gols"
                            @change="update(2, indexG, indexP)"
                            :pagination.sync="pagination"
                            hide-actions
                            single-line
                          ></v-text-field> -->
                    </v-layout>
                 </v-layout>
            </v-flex>         
          </v-layout>
          <v-layout fluid wrap row align-items justify-center >
            <p class="hora">{{partida.data +' - '+partida.hora}}</p>
          </v-layout>
         </v-layout> 

         <h1>{{ligacaop}}</h1>   

        <v-data-table
        	:headers="headers"
        	:items="grupo.times"
          :pagination.sync="pagination"
          :hide-actions="true"
          class="elevation-1"
          item-key="bandeira"
         >
          <template slot="items" slot-scope="props">
              <td class="text-xs-right"  :id ="'pos'+ props.item.pos" >{{props.item.pos}}</td>
              <td class="text-xs-center">
                <v-avatar :tile="true" >
                  <img :src= "props.item.imgurl" alt="avatar">
                </v-avatar></td>	
              <td class="text-xs-center">{{props.item.nome }}</td>
              <td class="text-xs-right">{{props.item.p}}</td>
              <td class="text-xs-right">{{props.item.v}}</td>
              <td class="text-xs-right">{{props.item.e}}</td>
              <td class="text-xs-right">{{props.item.d}}</td>
              <td class="text-xs-right">{{props.item.gp}}</td>
              <td class="text-xs-right">{{props.item.gc}}</td>
              <td class="text-xs-right">{{props.item.sg}}</td>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item v-for="(fase, indexFase) in fases" :key="fase.id"
        :id="fase.id">
        <v-layout row wrap v-for="(partida, indexPartida) in fase.partidas" :key="partida.titulo">
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <v-card class="margin" color="grey lighten-3">
              <v-container fluid>
                <v-layout row>
                  <v-flex wrap sm 9>
                  <v-radio-group column :disabled="(partida.time1.id === null || partida.time2.id === null )" :v-model="partida.selecionado" >
                    <v-layout row wrap >
                      <v-flex xs2 sm1 wrap >
                        <v-avatar v-if="(partida.time1.imgurl !== null)" class="avatarflex" :size="24" :tile="true">
                          <img :src="partida.time1.imgurl">
                        </v-avatar>
                      </v-flex>
                      <v-flex xs7 >
                        <v-radio
                        :ref="'radio' +indexFase+indexPartida+1"
                        :disabled="true"
                          @change="updateRadios(fases,indexFase,partida,1)"
                          :label="partida.time1.nome"
                          color="indigo darken_4"
                          :value="partida.time1"
                          :isActive="true"
                        ></v-radio>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap >
                      <v-flex xs2 sm1 >
                        <v-avatar v-if="(partida.time2.imgurl !== null)" class="avatarflex" :size="24" :tile="true">
                          <img :src="partida.time2.imgurl">
                        </v-avatar>
                      </v-flex>
                      <v-flex xs7 >
                        <v-radio
                        :ref="'radio' +indexFase+indexPartida+2"
                        :disabled="true"
                          @change="updateRadios(fases,indexFase,partida,2)"
                          :label="partida.time2.nome"
                          color="indigo darken_4"
                          :value="partida.time2"
                        ></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                  </v-flex>
                  <v-flex align-center sm1 class ="subs">
                    
                        <div v-if="( indexFase !== 3 )" class="subs2">
                            <h5 >{{fase.fase + ' ' + partida.numero}}</h5>
                          <div>{{ partida.data +' '+ partida.hora}}</div>
                        </div>
                         <div v-else class="subs2">
                            <h5 >{{fase.fase}}</h5>
                          <div>{{ partida.data +' '+ partida.hora}}</div>
                        </div>                       
                      
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>

            <v-card v-if="(indexFase === 3)" class="margin" dark color="gray darken-4">
              <v-container fluid  >
                <v-layout row>
                      <v-flex  >
                        <h3 class="headline">Campeão</h3>
                        <h3 class="title">{{campeao.nome}}</h3>
                        <v-avatar class="avatarflex" :size="24" :tile="true">
                          <img :src="campeao.imgurl">
                        </v-avatar>
                      </v-flex>
                      
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
  </v-container>
  <v-container v-else>
    <div class = "text-xs-center"> <v-progress-circular :size="50" indeterminate color="red"></v-progress-circular></div>
  </v-container>
</template>

<script>
  export default {
    beforeCreate () {
      if (this.$store.getters.loadedMinhasApostas === null) {
        this.$store.dispatch('loadMinhasApostas')
      }
      if (this.$store.getters.loadedTimes.length === 0) {
        this.$store.dispatch('loadTimes')
      }
      if (this.$store.getters.loadedFases === null || this.$store.getters.loadedPartidas.length === 0 || this.$store.getters.loadedFases === undefined) {
        this.$store.dispatch('loadPartidas')
      }
      if (this.$store.getters.loadedFases === null || this.$store.getters.loadedFases.length === 0) {
        this.$store.dispatch('loadFases')
      }
      // var ap = this.$store.getters.loadedMinhasApostas
      //  console.log('ap')
      //  console.log(ap.fases)
      //  console.log(ap.grupos)
    },
    data () {
      return {
        ex7: 'red',
        ex8: 'primary',
        selecionado: null,
        campeao: {id: null, grupo: null, nome: null, imgurl: null},
        pagination: {'sortBy': 'pos', 'rowsPerPage': -1},
        ligacaop: 0,
        headers: [
          {text: ' ', value: 'pos', align: 'center', sortable: false},
          {text: '', value: 'bandeira', align: 'center', sortable: false},
          {text: 'Times', value: 'nome', align: 'center', sortable: false},
          { text: 'P', value: 'p', align: 'right', sortable: false },
          { text: 'V', value: 'vitorias', align: 'right', sortable: false },
          { text: 'E', value: 'empates', align: 'right', sortable: false },
          { text: 'D', value: 'derrotas', align: 'right', sortable: false },
          { text: 'GP', value: 'golsPro', align: 'right', sortable: false },
          { text: 'GC', value: 'golsContra', align: 'right', sortable: false },
          { text: 'SG', value: 'saldoGols', align: 'right', sortable: false }
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      minhasApostasGrupos () {
       // console.log('apgrupos:')
       // console.log(this.$store.getters.loadedMinhasApostas.grupos)
        return this.$store.getters.loadedMinhasApostas.grupos
      },
      minhasApostasFases () {
     //   console.log(this.$store.getters.loadedMinhasApostas.fases)
        return this.$store.getters.loadedMinhasApostas.fases
      },
      times () {
        return this.$store.getters.loadedTimes
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
      grupos () {
        var times = this.times
        function removerAcentos (s) {
          return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        }
        times.forEach(time => {
          var sigla = removerAcentos(time.nome.slice(0, 3).toUpperCase())
         // console.log(sigla)
          time.sigla = sigla
        })
        var partidas = this.partidas
        var letras = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]
        var gruposOrganizados = []
        letras.forEach(letra => {
          var partidasGrupo = partidas.filter(partida => partida.grupo === letra)
          var timesGrupo = times.filter(time => time.grupo === letra)
          var posicao = 1
          timesGrupo.forEach(time => {
            time.pos = posicao
            posicao++
          })
          partidasGrupo.forEach(partida => {
            var time1 = null
            var time2 = null
            timesGrupo.forEach(time => {
              time.p = 0
              time.v = 0
              time.e = 0
              time.d = 0
              time.gp = 0
              time.gc = 0
              time.sg = 0
              if (partida.time1id === time.id) {
                time1 = time
              } else if (partida.time2id === time.id) {
                time2 = time
              }
            })
            partida.time1 = time1
            partida.time2 = time2
            partida.time1gols = null
            partida.time2gols = null
          })
          gruposOrganizados.push({l: letra,
            times: timesGrupo,
            partidas: partidasGrupo
          })
        })
        gruposOrganizados.forEach(grupo => {
          this.update(grupo)
        })
        this.updateRadios()
        return gruposOrganizados
      }
    },
    methods: {
      calculaPontuacao (time, grupo) {
        // time.dados = {p: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0}
        time.p = 0
        time.v = 0
        time.e = 0
        time.d = 0
        time.gp = 0
        time.gc = 0
        time.sg = 0
        grupo.partidas.forEach(partida => {
          if ((partida.time1gols !== '' && partida.time2gols !== '') && (partida.time1gols !== null && partida.time2gols !== null)) {
            if (time.id === partida.time1.id) {
              time.gp += Number(partida.time1gols)
              time.gc += Number(partida.time2gols)
              if (partida.time1gols > partida.time2gols) {
                time.p += 3
                time.v += 1
              } else if (partida.time1gols === partida.time2gols) {
                time.p += 1
                time.e += 1
              } else {
                time.d += 1
              }
            } else if (time.id === partida.time2.id) {
              time.gp += Number(partida.time2gols)
              time.gc += Number(partida.time1gols)
              if (partida.time1gols < partida.time2gols) {
                time.p += 3
                time.v += 1
              } else if (partida.time1gols === partida.time2gols) {
                time.p += 1
                time.e += 1
              } else {
                time.d += 1
              }
            }
          }
        })
        time.sg = Number(time.gp) - Number(time.gc)
      },
      updateRadios () {
        // (fases, indexFase, partida, ntime)
        var apFases = this.minhasApostasFases
        for (let indexFase = 0; indexFase < this.fases.length; indexFase++) {
          const fase = this.fases[indexFase]
          var indexF = apFases.findIndex((apf) => {
            return apf.id === fase.id
          })
          var apf = apFases[indexF]
          fase.partidas.forEach(partida => {
            var indexP = apf.partidas.findIndex((app) => {
              return app.numero === partida.numero
            })
            var app = apf.partidas[indexP]
            partida.selecionado = app.selecionado
            var ntime = partida.selecionado
            if (this.$refs['radio' + indexFase + Number(partida.numero - 1) + ntime] !== undefined) {
             // console.log('radio' + indexFase + partida.numero + ntime)
             // console.log(this.$refs['radio' + indexFase + Number(partida.numero - 1) + ntime][0])
              this.$refs['radio' + indexFase + Number(partida.numero - 1) + ntime][0].isActive = true
            }
            var timesel = {id: null, grupo: null, nome: null, imgurl: null}
            if (ntime === 1) {
              timesel = partida.time1
            } else {
              timesel = partida.time2
            }
            if (fase.fase === 'Final') {
              this.campeao = timesel
            } else {
              if (Number(((partida.numero - 1) % 2) + 1) === 1) {
                this.fases[Number(indexFase + 1)].partidas[(Number(Math.ceil(partida.numero / 2) - 1))].time1 = timesel
              } else {
                this.fases[Number(indexFase + 1)].partidas[(Number(Math.ceil(partida.numero / 2) - 1))].time2 = timesel
              }
            }
            this.ligacaop += 1
          })
        }
      },
      calculaPosicoes (grupo) {
        grupo.times.sort(function (timea, timeb) {
         // console.log(timea.p - timeb.p)
          if (timeb.p - timea.p !== 0) {
            return timeb.p - timea.p
          } else {
            if (timeb.sg - timea.sg !== 0) {
              return timeb.sg - timea.sg
            } else {
              if (timeb.gp - timea.gp !== 0) {
                return timeb.gp - timea.gp
              } else {
                var pindex = grupo.partidas.findIndex((pG) => {
                  return ((pG.time1.id === timea.id && pG.time2.id === timeb.id) || (pG.time1.id === timeb.id && pG.time2.id === timea.id))
                })
                var pG = grupo.partidas[pindex]
                if (pG.time1.id === timea.id && pG.time2.id === timeb.id) {
                  return pG.time2gols - pG.time1gols
                } else {
                  return pG.time1gols - pG.time2gols
                }
              }
            }
          }
        })
        var posicao = 1
        grupo.times.forEach(time => {
          time.pos = posicao
          posicao++
         // console.log(time.sigla)
        })
        this.primeiroA = grupo.times[0]
      },
      updateOitavas (grupo) {
        var partidasOitavas = this.fases[0].partidas
        var t1index = partidasOitavas.findIndex((p8) => {
          return p8.gt1 === grupo.l
        })
        partidasOitavas[t1index].time1 = grupo.times[0]
        var t2index = partidasOitavas.findIndex((p8) => {
          return p8.gt2 === grupo.l
        })
        partidasOitavas[t2index].time2 = grupo.times[1]
      },
      desmarcaOitavas (grupo) {
        var partidasOitavas = this.fases[0].partidas
        var t1index = partidasOitavas.findIndex((p8) => {
          return p8.gt1 === grupo.l
        })
        partidasOitavas[t1index].time1 = {id: null, grupo: null, nome: null, imgurl: null}
        partidasOitavas[t1index].time1.nome = this.segundaFase[0].partidas[t1index].time1GP
       // console.log('radio' + 0 + t1index)
        this.$refs['radio' + 0 + t1index + 1][0].isActive = false
        this.$refs['radio' + 0 + t1index + 2][0].isActive = false
        var t2index = partidasOitavas.findIndex((p8) => {
          return p8.gt2 === grupo.l
        })
        partidasOitavas[t2index].time2 = {id: null, grupo: null, nome: null, imgurl: null}
        partidasOitavas[t2index].time2.nome = this.segundaFase[0].partidas[t2index].time2GP
       // console.log('radio' + 0 + t2index)
        this.$refs['radio' + 0 + t2index + 1][0].isActive = false
        this.$refs['radio' + 0 + t2index + 2][0].isActive = false
        this.desmarcaProxFase(0, partidasOitavas[t1index])
        this.desmarcaProxFase(0, partidasOitavas[t2index])
      },
      desmarcaProxFase (indexFase, partida) {
        var nulltime = {id: null, grupo: null, nome: null, imgurl: null}
        if (indexFase === 3) {
          this.campeao = nulltime
        } else {
          this.$refs['radio' + Number(indexFase + 1) + (Number(Math.ceil(partida.numero / 2) - 1)) + 1][0].isActive = false
          this.$refs['radio' + Number(indexFase + 1) + (Number(Math.ceil(partida.numero / 2) - 1)) + 2][0].isActive = false
          if (Number(((partida.numero - 1) % 2) + 1) === 1) {
            this.fases[Number(indexFase + 1)].partidas[(Number(Math.ceil(partida.numero / 2) - 1))].time1 = nulltime
            this.fases[Number(indexFase + 1)].partidas[(Number(Math.ceil(partida.numero / 2) - 1))].time1.nome = this.segundaFase[Number(indexFase + 1)].partidas[(Number(Math.ceil(partida.numero / 2) - 1))].time1GP
          } else {
            this.fases[Number(indexFase + 1)].partidas[(Number(Math.ceil(partida.numero / 2) - 1))].time2 = nulltime
            this.fases[Number(indexFase + 1)].partidas[(Number(Math.ceil(partida.numero / 2) - 1))].time2.nome = this.segundaFase[Number(indexFase + 1)].partidas[(Number(Math.ceil(partida.numero / 2) - 1))].time2GP
          }
          this.desmarcaProxFase(Number(indexFase + 1), this.fases[Number(indexFase + 1)].partidas[(Number(Math.ceil(partida.numero / 2) - 1))])
        }
      },
      update (grupo) {
       // (numTime, indexG, indexP)
       // var grupo = this.grupos[indexG]
       // var partida = grupo.partidas[indexP]
        var apGrupos = this.minhasApostasGrupos
        var indexG = apGrupos.findIndex((apg) => {
          return apg.l === grupo.l
        })
        var apg = apGrupos[indexG]
        grupo.partidas.forEach(partida => {
          var indexP = apg.partidas.findIndex((app) => {
            return app.id === partida.id
          })
          var app = apg.partidas[indexP]
          partida.time1gols = app.time1gols
          partida.time2gols = app.time2gols
          this.ligacaop += 1
        })
        grupo.times.forEach(time => {
          this.calculaPontuacao(time, grupo)
        })
        this.pagination.sortBy = 'pos'
        this.calculaPosicoes(grupo)
        this.updateOitavas(grupo)
        this.ligacaop += 1
      },
      salvarPalpites () {
       // console.log(this.grupos)
        var gruposApostas = []
        this.grupos.forEach(grupo => {
          var grupoAposta = {l: grupo.l, partidas: []}
          grupo.partidas.forEach(partida => {
            var partidaAposta = {id: partida.id, time1gols: partida.time1gols, time2gols: partida.time2gols}
            grupoAposta.partidas.push(partidaAposta)
          })
          gruposApostas.push(grupoAposta)
        })
       // console.log(gruposApostas)
       // console.log(this.fases)
        var fasesApostas = []
        this.fases.forEach(fase => {
          var faseAposta = {id: fase.id, partidas: []}
          fase.partidas.forEach(partida => {
            var partidaAposta = {numero: partida.numero, selecionado: partida.selecionado}
            faseAposta.partidas.push(partidaAposta)
          })
          fasesApostas.push(faseAposta)
        })
       // console.log(fasesApostas)
        this.$store.dispatch('cadastraMinhasApostas', {grupos: gruposApostas, fases: fasesApostas})
      }
    }
  }
</script>

<style>
.coluna1{
  align-items: flex-center;
}
.input1layout{
  max-width: 10px;
}
.input2{
  font-size: 8px;
}
.xizinho{
  height: 100%;
}
.container.grid-list-md .layout .flex {
    padding: 0px;
}
.input-group {
    padding-top: 20px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
}
.input-group--text-field input, .input-group--text-field textarea{
    font-size: 14px;
}
p.xizinho {
    margin-bottom: 0px;
    padding-top: 1.4em;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 1em;
}
p.hora {
    font-size: 10px;
    font-weight: 400;

}
h1 {
  font-size: 0%
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
    padding-top: 0px;
    padding-right: 12px;
    padding-bottom: 0px;
    padding-left: 12px;
}
#pos1 {
  color: blue;
  font-weight: 600;

}
#pos2 {
  color: blue;
  font-weight: 600;
}
.avatarflex{
  padding-top: 0.4em;
  padding-bottom: 0.0em;
}
.margin{
  margin-top: 10px;
}

.card__title--primary {
    padding: 0px;
    max-width: 20px;
    margin:0px;
}
div.subs {
  max-width: 90px;
}
div.subs2 {
  padding-top:20px;
  float: right;
}

</style>
