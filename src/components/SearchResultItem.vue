<template>
  <li @click="$emit('addToPicks', movie)" class="search__result">
    <span class="result-year">{{ movie.year }}</span>
    <span class="result-title">{{ movie.title }}</span>
  </li>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.search__result {
  list-style-type: none;
  cursor: pointer;
  padding: 10px 18px;
  display: flex;
  align-items: center;
}

.search__result:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.search__result:hover {
  background-color: var(--indigo100);
}

.search__result:hover::after {
  content: "👈";
  float: right;
  font-size: 22px;
  margin-left: auto;
  line-height: 16px;
}

.search__result:hover .year {
  color: var(--gray900);
}

.result-year {
  margin: 0 15px 0 0;
  color: var(--gray500);
  font-family: monospace;
}

@media screen and (max-width: 600px) {
  .search__result:hover::after {
    content: none;
  }
}
</style>
