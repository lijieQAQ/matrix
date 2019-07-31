<template>
  <div id="app">
    <img
            alt="Zondax logo"
            src="./assets/logo.png"
            width="300"
    >
    <h1>Matrix+Ledger integration example</h1>
    <MatrixLedger msg="Minimal Matrix+Ledger integration example" />
  </div>
</template>

<script>
import MatrixLedger from './components/MatrixLedger.vue';

export default {
    name: 'App',
    components: {
        MatrixLedger,
    },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
