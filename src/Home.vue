<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-button
      @click="dynamic"
      round
    >Dynamic</el-button>
    <el-button
      @click="hello"
      round
    >HelloWorld</el-button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  components: {
  },
  methods: {
    dynamic () {
      console.log('dynamic')
      this.$router.push('/dynamic')
    },
    hello () {
      console.log('helloWorld')
      this.$router.push('/hello')
    }
  }
}
</script>
