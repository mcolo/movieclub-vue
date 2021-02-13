<template>
  <div>
    <input
      v-model="search"
      type="text"
      name="search"
      @keyup="autocomplete"
      @focus="autocomplete"
    />
    <ul v-show="results.length > 0">
      <li v-for="movie in results" :key="movie.id" @click="addToPicks(movie)">
        {{ movie.title }} ({{ movie.year }})
      </li>
    </ul>
    <div v-show="picks.length > 0">
      <h3>Your Picks</h3>
      <ul>
        <li
          v-for="(pick, idx) in picks"
          :key="pick.id"
          @click="removePick(idx)"
        >
          {{ pick.title }} ({{ pick.year }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      results: [],
      prevSearch: "",
      picks: [],
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
        body: JSON.stringify({ prefix: this.search }),
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
    addToPicks(movie) {
      if (this.picks.indexOf(movie) > -1) return;
      this.picks.push(movie);
    },
    removePick(idx) {
      this.picks.splice(idx, 1);
    },
    startupServer() {
      fetch("https://fathomless-reaches-08772.herokuapp.com/search/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prefix: "" }),
      });
    },
    savePicks() {
      // post request
      // insert movie ids into DB
      // return database ID to use as URL
    },
    // TODO
    // share URL in dialog? save ids in DB when button is clicked
    // share URL after first pick? save ids in DB when pick is made
  },
  computed: {
    shareLink() {
      return (
        window.location.origin +
        "/picks/ids?=" +
        this.picks.map((val) => val.id).join(",")
      );
    },
  },
  created() {
    this.startupServer();
  },
};
</script>

<style>
ul {
  margin: none;
  padding: none;
}

li {
  list-style-type: none;
  cursor: pointer;
}

li:hover {
  text-decoration: underline;
}
</style>
