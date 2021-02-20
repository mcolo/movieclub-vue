<template>
  <div>
    <header>
      <h1 class="logo">movieclub</h1>
    </header>
    <section class="posters">
      <template v-if="picks.length > 0">
        <ul>
          <li
            v-for="(pick, idx) in picks"
            :key="pick.id"
            @click="removePick(idx)"
          >
            {{ pick.title }}
          </li>
        </ul>
        <label for="title">Title</label>
        <input v-model="title" name="title" placeholder="title" />
        <button @click="sharePicks">Share Picks</button>
        <a v-if="shareUrl" :href="shareUrl" target="_blank">{{ shareUrl }}</a>
      </template>
      <template v-else>
        <h3 class="placeholder">
          Search for a movie to start a new list
        </h3>
      </template>
    </section>
    <section class="search">
      <div class="search-wrap" :class="{ searching: searching === true }">
        <input
          v-model="search"
          type="text"
          name="search"
          @keyup="autocomplete"
          @focus="searching = true"
          @blur="searching = false"
          class="search__bar"
        />
        <!-- :placeholder="searching ? 'Multiplicity' : null" -->
        <svg
          class="search__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 124.524 124.524"
        >
          <path
            d="M51 102.05c10.5 0 20.2-3.2 28.3-8.6l29.3 29.3c2.301 2.3 6.101 2.3 8.5 0l5.7-5.7c2.3-2.3 2.3-6.1 0-8.5l-29.4-29.2c5.399-8.1 8.6-17.8 8.6-28.3 0-28.1-22.9-51-51-51s-51 22.9-51 51c0 28.099 22.8 51 51 51zm0-82c17.1 0 31 13.9 31 31s-13.9 31-31 31-31-13.9-31-31 13.9-31 31-31z"
          />
        </svg>
        <p v-show="searching" class="search__tip">
          <template v-if="search.length > 0">Results</template>
          <template v-else>
            "{{ quotes[Math.floor(Math.random() * quotes.length)] }}"
          </template>
        </p>
        <ul v-show="results.length > 0" class="search__results">
          <li
            v-for="movie in results"
            :key="movie.id"
            @click="addToPicks(movie)"
            class="search__result"
          >
            {{ movie.title }} ({{ movie.year }})
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { getSearchResults } from "../services/autocomplete-service";
import { setPicks } from "../services/picks-service";

export default {
  data() {
    return {
      search: "",
      results: [],
      title: "",
      prevSearch: "",
      picks: [],
      id: null,
      shareUrl: "",
      searching: false,
      quotes: [
        "Toto, I've a feeling we're not in Kansas anymore.",
        "Hasta la vista, baby.",
        "Say hello to my little friend!",
        "You're gonna need a bigger boat.",
        "May the force be with you.",
      ],
    };
  },
  methods: {
    async autocomplete() {
      if (this.search.length < 1) {
        this.results = [];
        return;
      }

      if (this.search === this.prevSearch && this.results.length > 0) {
        return;
      }

      this.prevSearch = this.search;
      const { movieData } = await getSearchResults(this.search);
      this.results = movieData || [];
    },
    async sharePicks() {
      const data = {
        title: this.title,
        picks: this.picks,
        id: this.id,
      };
      const { id } = await setPicks(data);
      if (!id) return;
      /**
       * TODO
       * add error message in UI
       */
      this.id = id;
      this.shareUrl = window.location.origin + "/picks/" + this.id;
    },
    addToPicks(movie) {
      if (this.picks.indexOf(movie) > -1) return;
      this.picks.push(movie);
    },
    removePick(idx) {
      this.picks.splice(idx, 1);
    },
    // TODO
    // share URL in dialog? save ids in DB when button is clicked
    // share URL after first pick? save ids in DB when pick is made
  },
};
</script>

<style>
.placeholder {
  font-family: "Hind", sans-serif;
  margin: 0;
}

.search {
  width: 50%;
  margin: 0 auto;
  min-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-wrap {
  position: relative;
  background: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #eee;
  transition: 100ms cubic-bezier(0.4, 1, 0.8, 1.7);
}

.search-wrap.searching {
  box-shadow: 0px 0px 35px rgb(0 0 0 / 7%);
}

.search__bar {
  border: none;
  outline: none;
  border-radius: 8px;
  line-height: 1;
  padding: 15px 20px 10px 58px;
  font-size: 18px;
  font-family: "Hind", sans-serif;
  display: block;
  min-width: 400px;
  box-sizing: border-box;
  /* margin: 0 0 15px; */
  transition: 100ms cubic-bezier(0.4, 1, 0.8, 1.7), border 0ms;
  /* box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.09); */
  cursor: pointer;
}

.search__bar:focus {
  min-width: 420px;
  padding: 20px 25px 15px 58px;
  border-bottom: 1px solid #eee;
  cursor: text;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.search__icon {
  position: absolute;
  width: 17px;
  left: 20px;
  top: 21px;
  transition: transform 100ms;
}

.search__bar:focus + .search__icon {
  opacity: 1;
  transform: translateY(5px) scale(1.2);
}

.search__icon path {
  fill: #a5b4fc;
}

.search__tip {
  margin: 0;
  padding: 10px 20px;
  font-family: "Hind", sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #aaa;
  letter-spacing: 1px;
}

.search__results {
  min-width: 400px;
  margin: 0;
  padding: 0;
}

.search__result {
  list-style-type: none;
  cursor: pointer;
}

li:hover {
  text-decoration: underline;
}
</style>
