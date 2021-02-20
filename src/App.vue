<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Hind:wght@400;700&display=swap");

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #f9fafb;
}

.logo {
  font-family: "Hind", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #1a202e;
  text-transform: uppercase;
  margin: 10px 15px;
  /* width: 50%;
  margin: 15px auto;
  min-width: 720px; */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
