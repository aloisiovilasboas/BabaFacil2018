<template>

  <v-container>
    <v-layout>
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
        </v-flex>
      </v-layout>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card v-if="!loading">
          <v-card-text>
            <v-container>
              <div>Bem vindo, {{usuarioNovo.nomeOriginal}} </div>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="Nome Completo"
                      id="name"
                      v-model="name"
                      type="text"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="E-mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Senha"
                      id="password"
                      v-model="password"
                      type="password"
                      :rules="[seisDigitos]"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirme a senha"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="!loading && !enableCadastre" :loading="loading">
                      Cadastre-se
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password === this.confirmPassword ? true : 'As senhas não conferem'
      },
      seisDigitos () {
        return this.password.length >= 6 ? true : 'A senha deve ter pelo menos 6 dígitos'
      },
      enableCadastre () {
        return this.password === this.confirmPassword && this.password.length >= 6
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      },
      usuarioNovo () {
        if (!this.loading) {
          var u = this.$store.getters.loadedUsuario(this.id)
        //  console.log(u)
          if (u === null || u === undefined || !u.pendente) {
            u = {nome: ''}
            this.$router.push('/')
          }
          return u
        } else {
          return {nome: ''}
        }
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('cadastraUsuario', {id: this.usuarioNovo.id, nomeOriginal: this.usuarioNovo.nomeOriginal, addedby: this.usuarioNovo.addedby, nome: this.name, email: this.email})
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
