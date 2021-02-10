<template>
  <div>
    <input v-model="search" type="text" name="search" />
    <button @click="hello">go</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    hello() {
      // alert("hello " + this.search);
      fetch("/.netlify/functions/autocomplete?search=" + this.search)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
