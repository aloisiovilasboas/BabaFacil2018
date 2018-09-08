<template>
<v-form @submit.prevent="onCreateGrupo">
    <v-text-field
      v-model="grupo"
      name="grupo"
      label="Grupo"
      id="grupo"
      required
    ></v-text-field>
    
    <v-text-field
      v-model="time1"
      name="time1"
      label="Time 1"
      required
    ></v-text-field>
    <v-text-field
      v-model="time1url"
      name="time1url"
      label="Time 1 img URL"
      required
    ></v-text-field>
    <v-text-field
      v-model="time2"
      name="time2"
      label="Time 2"
      id="time2"
      required
    ></v-text-field>
        <v-text-field
      v-model="time2url"
      name="time2url"
      label="Time 2 img URL"
      required
    ></v-text-field>
    <v-text-field
      v-model="time3"
      name="time3"
      label="Time 3"
      id="time3"
      required
    ></v-text-field>
        <v-text-field
      v-model="time3url"
      name="time3url"
      label="Time 3 img URL"
      required
    ></v-text-field>
    <v-text-field
      v-model="time4"
      name="time4"
      label="Time 4"
      id="time4"
      required
    ></v-text-field>
        <v-text-field
      v-model="time4url"
      name="time4url"
      label="Time 4 img URL"
      required
    ></v-text-field>
    
    <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Criar grupo</v-btn>
    
  </v-form>
</template>

<script>
  export default {
    data () {
      return {
        grupo: '',
        time1: '',
        time2: '',
        time3: '',
        time4: '',
        time1url: '',
        time2url: '',
        time3url: '',
        time4url: ''
      }
    },
    computed: {
      formIsValid () {
        return this.grupo !== '' &&
          this.time1 !== '' &&
          this.time2 !== '' &&
          this.time3 !== '' &&
          this.time4 !== '' &&
          this.time1url !== '' &&
          this.time2url !== '' &&
          this.time3url !== '' &&
          this.time4url !== ''
      }
    },
    methods: {
      onCreateGrupo () {
        if (!this.formIsValid) {
          return
        }
        const grupoData = {
          grupo: this.grupo,
          time1: this.time1,
          time2: this.time2,
          time3: this.time3,
          time4: this.time4,
          time1url: this.time1url,
          time2url: this.time2url,
          time3url: this.time3url,
          time4url: this.time4url
        }
        this.$store.dispatch('createGrupo', grupoData)
        this.$router.push('/profile')
      }
    }
  }
</script>
