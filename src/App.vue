<template>
  <div>
    <input
      v-model="search"
      type="text"
      name="search"
      @keyup="autocomplete"
      @blur="results = []"
    />
    <ul v-show="results.length > 0">
      <li v-for="r in results" :key="r.id">{{ r.year }} ({{ r.title }})</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      search: "",
      results: [],
    };
  },
  methods: {
    autocomplete() {
      if (this.search.length < 1) {
        this.results = [];
        return;
      }

      fetch("/.netlify/functions/autocomplete?search=" + this.search)
        .then((res) => res.json())
        .then((res) => {
          this.results = res;
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
