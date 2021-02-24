import Home from "./pages/Home.vue";
import Picks from "./pages/Picks.vue";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/picks/:id",
    component: Picks,
    name: "picks",
  },
];
