<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo darken-4" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Bolão do AFC</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-lg-and-down">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout

        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      
          <main>
            <router-view></router-view>
          </main>
        
    </v-content>
    <v-footer color="indigo darken-4" app>
      <span  class="white--text" >&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        drawer: null
      }
    },
    props: {
      source: String
    },
    computed: {
      menuItems () {
        let menuItems = [
         // {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Login', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
          //  {icon: 'casino', title: 'Fazer Apostas', link: '/apostas'},
            {icon: 'line_style', title: 'Apostas Cadastradas', link: '/apostasCadastradas'}
          ]
          if (this.isAdmin) {
            menuItems.push({icon: 'person', title: 'admin', link: '/admin'})
          }
        }
        menuItems.push({icon: 'list_alt', title: 'Regras', link: '/regras'})
        menuItems.push({icon: 'format_list_numbered', title: 'Ranking', link: '/ranking'})
        menuItems.push({icon: 'flag', title: 'Resultados', link: '/resultados'})
        menuItems.push({icon: 'info', title: 'Sobre', link: '/sobre'})
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      isAdmin () {
        var admins = this.$store.getters.loadedAdmins
        var user = this.$store.getters.user
        var isAdmin = false
        admins.forEach(admin => {
          if (admin.adminId === user.id) {
            isAdmin = true
          }
        })
        return isAdmin
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
