<template>
  <div>
    <h1 v-if="title">{{ title }}</h1>
    <div v-for="pick in picks" :key="pick.title">
      {{ pick.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picks: [],
      title: "",
    };
  },
  methods: {
    populateData() {
      const url =
        "https://fathomless-reaches-08772.herokuapp.com/picks/" +
        this.$route.params.id;
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          this.picks = JSON.parse(res.picks);
          this.title = res.title;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.populateData();
  },
};
</script>
