<template>
  <div>
    <input
      v-model="search"
      type="text"
      name="search"
      @keyup="autocomplete"
      @blur="results = []"
      @focus="autocomplete"
    />
    <ul v-show="results.length > 0">
      <li v-for="r in results" :key="r.id">{{ r.title }} ({{ r.year }})</li>
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
      prevSearch: "",
    };
  },
  methods: {
    autocomplete() {
      if (this.search.length < 1) {
        this.results = [];
        return;
      }

      if (this.search === this.prevSearch && this.results.length > 0) {
        return;
      }

      this.prevSearch = this.search;

      fetch("https://fathomless-reaches-08772.herokuapp.com/search/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prefix: query }),
      })
        .then((res) => res.json())
        .then((data) => (this.results = data.movieData))
        .catch((err) => console.log(err));
      // fetch("/.netlify/functions/autocomplete?search=" + this.search)
      //   .then((res) => res.json())
      //   .then((res) => {
      //     this.results = res;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
  created() {
    fetch("/.netlify/functions/autocomplete?search=1");
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

li {
  list-style-type: none;
}
</style>
