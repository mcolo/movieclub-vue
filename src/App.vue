<template>
  <div>
    <header>
      <template v-if="$route.name === 'picks'">
        <router-link class="router-link" to="/">
          <h1 class="link-logo">
            movieclub
          </h1>
          🍿
        </router-link>
        <span class="title" v-if="title" :style="`color:${titleColor}`">{{
          title
        }}</span>
      </template>
      <template v-else>
        <h1 class="logo">movieclub 🎬</h1>
      </template>
    </header>
    <router-view @setTitle="setTitle"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      title: null,
    };
  },
  computed: {
    titleColor() {
      let colors = ["#e11d48", "#4338ca", "#06b6d4", "#10b981"];
      return colors[Math.floor(Math.random() * colors.length)];
    },
  },
  methods: {
    setTitle(title) {
      this.title = title;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Hind:wght@400;700&display=swap");
@import "./styles/reset.css";

:root {
  --gray50: #f9fafb;
  --gray200: #e5e7eb;
  --gray300: #d1d5db;
  --gray400: #9ca3af;
  --gray500: #6b7280;
  --gray900: #111827;
  --rose500: #f43f5e;
  --indigo100: #e0e7ff;
  --indigo500: #6366f1;
  --indigo800: #3730a3;
}

body {
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: var(--gray50);
  font-family: "Hind", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
}

.link-logo,
.logo {
  font-size: 16px;
  color: var(--gray900);
  text-transform: uppercase;
  display: inline-block;
  position: relative;
  border-bottom: 2px solid transparent;
  transition: 100ms;
}

.link-logo {
  margin: 0;
}

.link-logo:hover {
  border-color: black;
}

.logo {
  margin: 15px;
}

.router-link {
  text-decoration: none;
  margin: 15px;
  display: inline-block;
}

.title {
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
}

.posters::-webkit-scrollbar {
  display: none;
}
</style>
