<template>
  <div>
    <section class="posters">
      <img
        v-for="movie in movieData"
        class="poster"
        :src="movie.Poster"
        :alt="movie.Title"
        :key="movie.imdbID"
        :class="{ selected: selectedMovie === movie.imdbID }"
        @click="selectedMovie = movie.imdbID"
      />
    </section>
    <section class="details">
      <template v-if="selectedMovieDetails">
        <h3 class="details__title">{{ selectedMovieDetails.Title }}</h3>
        <p class="details__plot">{{ selectedMovieDetails.Plot }}</p>
        <p class="details__specs">
          <span class="spec">{{ selectedMovieDetails.Runtime }}</span>
          <span class="spec">{{ selectedMovieDetails.Year }}</span>
          <span class="spec">{{ selectedMovieDetails.Genre }}</span>
        </p>
        <p class="details__director">
          <b>Directed by</b> {{ selectedMovieDetails.Director }}
        </p>
        <p class="details__starring">
          <b>Starring</b> {{ selectedMovieDetails.Actors }}
        </p>
        <div>
          <a
            :href="
              'https://www.justwatch.com/us/search?q=' +
                selectedMovieDetails.Title
            "
            target="_blank"
            >Just Watch &rarr;</a
          >
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import { getPicksFromId } from "../services/picks-service";
export default {
  data() {
    return {
      movieData: null,
      title: "",
      selectedMovie: null,
    };
  },
  methods: {
    async populateData() {
      const { picks, error } = await getPicksFromId(this.$route.params.id);
      if (error) return;
      this.movieData = picks.data;
      this.$emit("setTitle", picks.title);
      this.selectedMovie = this.movieData[0].imdbID;
      /**
       * TODO
       * add error message in UI
       */
    },
  },
  mounted() {
    this.populateData();
  },
  computed: {
    selectedMovieDetails() {
      if (!this.movieData) return null;

      return this.movieData.find(
        (movie) => movie.imdbID === this.selectedMovie
      );
    },
  },
};
</script>

<style scoped>
.posters {
  /* display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 40px; */
  overflow-x: auto;
  padding: 30px 50px 35px;
  margin-bottom: 40px;
  text-align: center;
  white-space: nowrap;
}

.posters > * + * {
  margin-left: 35px;
}

.poster {
  width: 150px;
  height: 222px;
  /* aspect-ratio: 1 / 1.48; */
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 20%);
  cursor: pointer;
  transition: 150ms;
  display: inline-block;
}

.poster:hover {
  transform: translateY(4px);
}

.poster.selected {
  transform: translateY(20px);
}

.poster:not(.selected):active {
  transform: translateY(4px) scale(0.98);
  box-shadow: 0px 0px 7px rgb(0 0 0 / 45%);
}

.details {
  width: clamp(300px, 50%, 720px);
  margin: 0 auto;
  padding: 0 0 50px;
}

.details > * + * {
  margin-top: 20px;
}

.details__title {
  font-size: 42px;
  margin: 0;
}

.details__plot {
  font-size: 20px;
}

.details__specs {
  font-weight: 700;
}

.details__specs .spec {
  margin-right: 15px;
}
</style>
