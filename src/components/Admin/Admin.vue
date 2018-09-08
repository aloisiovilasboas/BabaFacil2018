<template>
  <div>
  <!--	<v-btn  :to="'/CreateGrupo'">
                    <v-icon left light>arrow_forward</v-icon>
                    Add Grupo
                  </v-btn> -->
    <!--              <v-btn  v-on:click="geraSiglas">
                    <v-icon left light>arrow_forward</v-icon>
                    Gera Siglas
                  </v-btn> 
                  -->
                  <!--<v-btn  v-on:click="geraPartidas">
                    <v-icon left light>arrow_forward</v-icon>
                    Gera Partidas
                  </v-btn>-->
             <!--     <v-btn  v-on:click="geraPartidasSegundaFase">
                    <v-icon left light>arrow_forward</v-icon>
                    Gera Partidas Segunda Fase
                  </v-btn> -->
                  <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                    
                    <v-card class="margin" color="grey lighten-3">  
                    <v-flex > 
                      <v-flex>
                       <v-text-field 
                          label="admin id:"
                           v-model="adminid"
                        ></v-text-field>
                        <v-text-field 
                          label="nome:"
                           v-model="adminnome"
                        ></v-text-field>
                        </v-flex>
                        <v-btn :disabled="true"  v-on:click="addAdmin">
                          <v-icon left light>arrow_forward</v-icon>
                          Adiciona Admin
                        </v-btn>
                    </v-flex>
                    </v-card>

                   <v-card class="margin" color="grey lighten-3">  
                    <v-flex > 
                    <v-btn  :to="'/Rankingadmin'">
                      <v-icon left light>arrow_forward</v-icon>
                        Ranking
                    </v-btn>
                	  <v-btn  :to="'/Gabarito'">
                      <v-icon left light>arrow_forward</v-icon>
                        Gabarito
                     </v-btn>
                	  <v-btn  :to="'/Resultados'">
                      <v-icon left light>arrow_forward</v-icon>
                        Resultados
                     </v-btn>
                       <!-- <v-btn  v-on:click="SalvaApostas">
                          <v-icon left light>arrow_forward</v-icon>
                          Salva Apostas
                        </v-btn> -->

                     
                    </v-flex>
                    </v-card>

                    <v-card class="margin" color="grey lighten-3">  
                    <v-flex > 
                	  <v-btn  :to="'/Usuarios'">
                      <v-icon left light>arrow_forward</v-icon>
                        Usuarios
                     </v-btn>
                    </v-flex>
                    </v-card>

                  </v-flex>

                  



  </div>  
</template>

<script>
  export default {
    beforeCreate () {
      if (this.$store.getters.loadedGabarito === null) {
        this.$store.dispatch('loadGabarito')
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
    },
    data () {
      return {
        adminid: '',
        adminnome: ''
      }
    },
    methods: {
      geraSiglas () {
        function removerAcentos (s) {
          return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        }
        var times = this.$store.getters.loadedTimes
        times.forEach(time => {
          var sigla = removerAcentos(time.nome.slice(0, 3).toUpperCase())
          console.log(sigla)
          time.sigla = sigla
        })
      },
      geraPartidas () {
        var times = this.$store.getters.loadedTimes
        var grupos = [
          {l: 'A', times: times.filter(time => time.grupo === 'A')},
          {l: 'B', times: times.filter(time => time.grupo === 'B')},
          {l: 'C', times: times.filter(time => time.grupo === 'C')},
          {l: 'D', times: times.filter(time => time.grupo === 'D')},
          {l: 'E', times: times.filter(time => time.grupo === 'E')},
          {l: 'F', times: times.filter(time => time.grupo === 'F')},
          {l: 'G', times: times.filter(time => time.grupo === 'G')},
          {l: 'H', times: times.filter(time => time.grupo === 'H')}
        ]
        var todasAsPartidas = []
        grupos.forEach(grupo => {
          var ts = grupo.times
          todasAsPartidas.push({grupo: grupo.l, time1id: ts[2].id, time2id: ts[3].id, t1nome: ts[2].nome, t2nome: ts[3].nome, data: '', hora: ''})
          todasAsPartidas.push({grupo: grupo.l, time1id: ts[0].id, time2id: ts[1].id, t1nome: ts[0].nome, t2nome: ts[1].nome, data: '', hora: ''})
          todasAsPartidas.push({grupo: grupo.l, time1id: ts[0].id, time2id: ts[2].id, t1nome: ts[0].nome, t2nome: ts[2].nome, data: '', hora: ''})
          todasAsPartidas.push({grupo: grupo.l, time1id: ts[1].id, time2id: ts[3].id, t1nome: ts[1].nome, t2nome: ts[3].nome, data: '', hora: ''})
          todasAsPartidas.push({grupo: grupo.l, time1id: ts[0].id, time2id: ts[3].id, t1nome: ts[0].nome, t2nome: ts[3].nome, data: '', hora: ''})
          todasAsPartidas.push({grupo: grupo.l, time1id: ts[1].id, time2id: ts[2].id, t1nome: ts[1].nome, t2nome: ts[2].nome, data: '', hora: ''})
        })
        console.log(todasAsPartidas)
        this.$store.dispatch('createPartidas', todasAsPartidas)
        this.$router.push('/profile')
      },
      /* geraPartidasSegundaFase () {
        var fases = [
          {fase: 'Oitavas', partidas: []},
          {fase: 'Quartas', partidas: []},
          {fase: 'Semifinal', partidas: []},
          {fase: 'Final', partidas: []}
        ]
        fases[0].partidas = [
          {time1GP: '1º do A', time2GP: '2º do B', numero: '1', data: '30/06', hora: '15:00', gt1: 'A', gt2: 'B'},
          {time1GP: '1º do C', time2GP: '2º do D', numero: '2', data: '30/06', hora: '11:00', gt1: 'C', gt2: 'D'},
          {time1GP: '1º do E', time2GP: '2º do F', numero: '3', data: '02/07', hora: '11:00', gt1: 'E', gt2: 'F'},
          {time1GP: '1º do G', time2GP: '2º do H', numero: '4', data: '02/07', hora: '15:00', gt1: 'G', gt2: 'H'},
          {time1GP: '1º do B', time2GP: '2º do A', numero: '5', data: '01/07', hora: '11:00', gt1: 'B', gt2: 'A'},
          {time1GP: '1º do D', time2GP: '2º do C', numero: '6', data: '01/07', hora: '15:00', gt1: 'D', gt2: 'C'},
          {time1GP: '1º do F', time2GP: '2º do E', numero: '7', data: '03/07', hora: '11:00', gt1: 'F', gt2: 'E'},
          {time1GP: '1º do H', time2GP: '2º do G', numero: '8', data: '03/07', hora: '15:00', gt1: 'H', gt2: 'G'}
        ]
        fases[1].partidas = [
          {time1GP: 'Oitavas 1', time2GP: 'Oitavas 2', numero: '1', data: '06/07', hora: '11:00', t1: '1', t2: '2'},
          {time1GP: 'Oitavas 3', time2GP: 'Oitavas 4', numero: '2', data: '06/07', hora: '15:00', t1: '3', t2: '4'},
          {time1GP: 'Oitavas 5', time2GP: 'Oitavas 6', numero: '3', data: '07/07', hora: '15:00', t1: '5', t2: '6'},
          {time1GP: 'Oitavas 7', time2GP: 'Oitavas 8', numero: '4', data: '07/07', hora: '11:00', t1: '7', t2: '8'}
        ]
        fases[2].partidas = [
          {time1GP: 'Quartas 1', time2GP: 'Quartas 2', numero: '1', data: '10/07', hora: '15:00', t1: '1', t2: '2'},
          {time1GP: 'Quartas 3', time2GP: 'Quartas 4', numero: '2', data: '11/07', hora: '15:00', t1: '3', t2: '4'}
        ]
        fases[3].partidas = [
          {time1GP: 'Semifinal 1', time2GP: 'Semifinal 2', numero: '1', data: '15/07', hora: '12:00', ot1: '1', ot2: '2'}
        ]
        console.log(fases)
        this.$store.dispatch('createPartidasSegundaFase', fases)
        this.$router.push('/profile')
      } */
      addAdmin () {
        this.$store.dispatch('createAdmin', {id: this.adminid, nome: this.adminnome})
      },
      SalvaApostas () {
        this.$store.dispatch('salvaApostas', {})
      }
    }
  }
</script>
