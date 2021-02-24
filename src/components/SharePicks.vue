<template>
  <section class="share-section">
    <div v-if="shareUrl" class="share-card">
      <h2>Share the link below to show people your picks.</h2>
      <a target="_blank" :href="shareUrl" class="share-link">{{ shareUrl }}</a>
    </div>
    <div v-else class="share-card">
      <h2>Give your picks a title!</h2>
      <input
        type="text"
        v-model="title"
        placeholder="Max's Picks – March 2021"
        :class="{ error: titleError }"
      />
      <button class="get-link" @click="sharePicks">Share</button>
    </div>
  </section>
</template>

<script>
import { setPicks } from "../services/picks-service";
import confetti from "canvas-confetti";
import cheer from "../assets/cheer.mp3";

export default {
  props: {
    picks: {
      type: Array,
      required: true,
    },
  },
  name: "SharePicks",
  data() {
    return {
      title: "",
      shareUrl: "",
      titleError: false,
    };
  },
  methods: {
    async sharePicks() {
      if (!this.title) {
        this.titleError = true;
        setTimeout(() => (this.titleError = false), 400);
        return;
      }
      const existingId = sessionStorage.getItem("pickId");
      const data = {
        title: this.title,
        picks: this.picks,
        id: existingId,
      };
      const { id } = await setPicks(data);
      if (!id) return;
      /**
       * TODO
       * add error message in UI
       */
      this.shareUrl = window.location.origin + "/picks/" + id;
      sessionStorage.setItem("pickId", id);

      // this is for fun
      if (!existingId) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        const audio = new Audio(cheer);
        audio.play();
      }
    },
  },
};
</script>

<style scoped>
.share-section {
  width: 50%;
  margin: 0 auto;
  min-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.share-card {
  min-width: 400px;
  position: relative;
  background: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #eee;
  transition: 100ms cubic-bezier(0.4, 1, 0.8, 1.7);
  padding: 20px 40px 40px;
}

.share-link {
  font-size: 20px;
  display: block;
  text-align: center;
}

h2 {
  margin-bottom: 40px;
  text-align: center;
}

label {
  font-weight: 700;
  color: #444;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

input {
  border: 1px solid #ddd;
  outline: none;
  border-radius: 8px;
  line-height: 1;
  padding: 10px 15px;
  font-size: 20px;
  width: 100%;
  display: block;
  box-sizing: border-box;
  margin-bottom: 20px;
}

input::placeholder {
  font-style: italic;
  color: #aaa;
}

input.error {
  animation: shake 75ms alternate infinite;
  animation-iteration-count: 3;
  border-color: red;
}

button {
  width: 100%;
  display: block;
  cursor: pointer;
  border: none;
  background-color: #6366f1;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  padding: 15px 0;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  transition: 100ms;
}

button:hover {
  background-color: #3730a3;
}

@keyframes shake {
  from {
    transform: translateX(-10px) rotate(-1deg);
  }
  to {
    transform: translateX(10px) rotate(1deg);
  }
}
</style>
