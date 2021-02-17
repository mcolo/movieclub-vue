<template>
  <div>
    <h1 v-if="title">{{ title }}</h1>
    <p>Movie Data:</p>
    <div>{{ movieData }}</div>
  </div>
</template>

<script>
import { getPicksFromId, getMovieDataFromIds } from "../services/picks-service";
export default {
  data() {
    return {
      picks: [],
      movieData: null,
      title: "",
    };
  },
  methods: {
    async populateData() {
      const { pickData, error } = await getPicksFromId(this.$route.params.id);
      if (error) return;
      /**
       * TODO
       * add error message in UI
       */
      this.picks = JSON.parse(pickData.picks);
      this.title = pickData.title;
      const ids = this.picks.map((pick) => pick.id);
      const { movieData, error: movieDataError } = await getMovieDataFromIds(
        ids
      );
      if (movieDataError) return;
      /**
       * TODO
       * add error message in UI
       */
      this.movieData = movieData;

      // const url =
      //   "https://fathomless-reaches-08772.herokuapp.com/api/picks/" +
      //   this.$route.params.id;
      // const options = {
      //   method: "GET",
      //   mode: "cors",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      // fetch(url, options)
      //   .then((res) => res.json())
      //   .then((res) => {
      //     this.picks = JSON.parse(res.picks);
      //     this.title = res.title;
      //     this.getImdbData();
      //   })
      //   .catch((err) => console.log(err));
    },
    // getImdbData() {
    //   const ids = this.picks.map((pick) => pick.id);
    //   const url =
    //     "https://fathomless-reaches-08772.herokuapp.com/api/movieData/";
    //   const options = {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ ids }),
    //   };
    //   fetch(url, options)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       this.movieData = res;
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
  mounted() {
    this.populateData();
  },
};
</script>
