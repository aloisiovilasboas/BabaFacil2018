import {store} from '../store'

export default (to, from, next) => {
  if (store.getters.user) {
    if (name === 'Admin' || name === 'Usuarios' || name === 'Gabarito') {
      var admins = this.$store.getters.loadedAdmins
      var user = this.$store.getters.user
      var isAdmin = false
      admins.forEach(admin => {
        if (admin.adminId === user.id) {
          isAdmin = true
        }
      })
      if (isAdmin) {
        next()
      } else {
        next('/')
      }
    } else {
      next()
    }
  } else {
    next('/signin')
  }
}
