<template>
  <div>
    <section class="posters">
      <transition-group name="pop">
        <img
          class="poster"
          v-for="(pick, index) in picks"
          :key="pick.imdbID"
          :src="pick.Poster"
          :alt="pick.Title"
          @click="removePick(index)"
        />
      </transition-group>
      <template v-if="picks.length > 0">
        <div
          class="share"
          @click="sharePicks"
          :class="{ 'share--active': sharing }"
        >
          <svg-share-icon class="share__icon"></svg-share-icon>
        </div>
        <!-- <label for="title">Title</label>
        <input v-model="title" name="title" placeholder="title" />
        <button @click="sharePicks">Share Picks</button>
        <a v-if="shareUrl" :href="shareUrl" target="_blank">{{ shareUrl }}</a> -->
      </template>
      <transition name="appear">
        <h2 class="placeholder" v-if="picks.length < 1">
          Search for a movie to start a new list
        </h2>
      </transition>
    </section>
    <transition name="search-share-toggle">
      <section class="search" v-show="!sharing">
        <div class="search-wrap" :class="{ searching: searching === true }">
          <input
            v-model="search"
            autocomplete="off"
            type="text"
            name="search"
            class="search__bar"
            @keyup="autocomplete"
            @blur="inputBlur"
            @focus="inputFocus"
            :placeholder="searching ? currentQuote.title : null"
          />
          <svg-search-icon class="search__icon"></svg-search-icon>
          <p v-show="searching" class="search__tip">
            <template v-if="search.length > 0">Results</template>
            <template v-else>{{ currentQuote.quote }}</template>
          </p>
          <ul
            v-show="this.searching && results.length > 0"
            class="search__results"
          >
            <search-result-item
              v-for="movie in results"
              :key="movie.id"
              :movie="movie"
              @addToPicks="addToPicks(movie)"
            ></search-result-item>
          </ul>
        </div>
      </section>
    </transition>
    <transition name="search-share-toggle">
      <share-picks v-show="sharing" :picks="picks"></share-picks>
    </transition>
  </div>
</template>

<script>
import { getSearchResults } from "../services/autocomplete-service";
import { getMovieDataFromIds } from "../services/picks-service";
import blop from "../assets/blop.mp3";
import woosh from "../assets/swoosh.mp3";
import SearchResultItem from "../components/SearchResultItem.vue";
import SvgShareIcon from "../inline-svgs/SvgShareIcon.vue";
import SvgSearchIcon from "../inline-svgs/SvgSearchIcon.vue";
import SharePicks from "../components/SharePicks.vue";

export default {
  components: { SearchResultItem, SvgShareIcon, SvgSearchIcon, SharePicks },
  data() {
    return {
      search: "",
      results: [],
      title: "",
      prevSearch: "",
      picks: [],
      id: null,
      shareUrl: "",
      sharing: false,
      searching: false,
      quoteIndex: 0,
      // quotes: [
      //   "Toto, I've a feeling we're not in Kansas anymore.",
      //   "Hasta la vista, baby.",
      //   "Say hello to my little friend!",
      //   "You're gonna need a bigger boat.",
      //   "May the force be with you.",
      // ],
      quotes: [
        {
          title: "The Wizard of Oz",
          quote: "Toto, I've a feeling we're not in Kansas anymore.",
        },
        {
          title: "Terminator 2",
          quote: "Hasta la vista, baby.",
        },
        { title: "Scarface", quote: "Say hello to my little friend!" },
        { title: "JAWS", quote: "You're gonna need a bigger boat." },
        { title: "Star Wars", quote: "May the force be with you." },
      ],
    };
  },
  computed: {
    currentQuote() {
      return this.quotes[this.quoteIndex];
    },
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
    inputFocus() {
      this.searching = true;
      this.quoteIndex = Math.floor(Math.random() * this.quotes.length);
    },
    sharePicks() {
      this.sharing = !this.sharing;
    },
    inputBlur() {
      if (this.search.length < 1) {
        this.searching = false;
      }
    },
    async addToPicks(movie) {
      if (this.pickExists(movie.id)) return;
      const data = await getMovieDataFromIds([movie.id]);
      this.picks.push(data.movieData[0]);
      const audio = new Audio(blop);
      audio.play();
    },
    pickExists(id) {
      return this.picks.find((pick) => {
        return pick.imdbID === id;
      });
    },
    removePick(idx) {
      this.picks.splice(idx, 1);
      this.playWoosh();
    },
    playWoosh() {
      const audio = new Audio(woosh);
      audio.play();
    },
    // TODO
    // share URL in dialog? save ids in DB when button is clicked
    // share URL after first pick? save ids in DB when pick is made
  },
};
</script>

<style scoped>
.placeholder {
  margin: 40px 0 0;
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
  display: block;
  min-width: 480px;
  box-sizing: border-box;
  transition: 100ms cubic-bezier(0.4, 1, 0.8, 1.7), border 0ms;
  cursor: pointer;
}

.searching .search__bar,
.search__bar:focus {
  min-width: 540px;
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

.searching .search__icon,
.search__bar:focus + .search__icon {
  opacity: 1;
  transform: translateY(5px) scale(1.2);
}

/* .search__icon >>> path {
  fill: #a5b4fc;
} */

.search__tip {
  margin: 0;
  padding: 15px 18px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #aaa;
  letter-spacing: 1px;
}

.search__results {
  min-width: 540px;
  margin: 0;
  padding: 0;
}

.posters {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  justify-content: center;
  padding: 15px 50px 40px;
  text-align: center;
  align-items: center;
}

.poster {
  width: 100px;
  height: 148px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 20%);
  margin: 0 0 0 30px;
  cursor: pointer;
  transition: 150ms;
}

.share {
  margin-left: 30px;
  flex: none;
  position: relative;
  cursor: pointer;
}

.share__icon {
  width: 40px;
  transition: 130ms ease;
  position: relative;
  fill: #6366f1;
}

.share--active .share__icon {
  fill: #f43f5e;
}

.share--active .share__icon {
  transform: rotate(180deg);
}

.share:not(.share--active):hover .share__icon {
  transform: scale(1.05);
}

.share--active:hover .share__icon {
  transform: scale(1.05) rotate(180deg);
}

.share::before {
  opacity: 0;
  content: "Share";
  transition: 150ms cubic-bezier(0.4, 1, 0.8, 1.7);
  position: absolute;
  left: 27px;
  top: 0;
  color: #6366f1;
  font-weight: 700;
  line-height: 44px;
  visibility: hidden;
  padding-left: 10px;
}

.share.share--active::before {
  content: "Back";
  color: #f43f5e;
  visibility: visible;
}

.share:hover::before {
  visibility: visible;
  opacity: 1;
  transform: translateX(10px);
}
/* 
.pop-enter-active {
  transition-duration: 100ms;
  transition-timing-function: cubic-bezier(0.4, 1, 0.8, 1.7);
  transition-delay: 100ms;
} */

.pop-enter-active,
.pop-leave-active {
  transition: 100ms cubic-bezier(0.4, 1, 0.8, 1.7);
}

.pop-enter, .pop-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0.5);
}

.appear-enter-active {
  transition-delay: 200ms;
  transition-duration: 100ms;
}

.appear-leave-active {
  transition: none;
}

.appear-enter {
  opacity: 0;
  transform: translateY(5px);
}

.appear-leave {
  opacity: 0;
}

.search-share-toggle-enter-active {
  /* transition: 100ms cubic-bezier(0.4, 1, 0.8, 1.7); */
  transition: 200ms ease-out;
}

.search-share-toggle-leave-active {
  transition: none;
}

.search-share-toggle-enter {
  opacity: 0;
  transform: translateY(15px);
  height: 0;
}

.search-share-toggle-leave {
  opacity: 0;
  height: 0;
}
</style>
