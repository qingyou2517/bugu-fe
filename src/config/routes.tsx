import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { FirstAction } from "../components/welcome/FirstAction";
import { Second } from "../components/welcome/Second";
import { SecondAction } from "../components/welcome/SecondAction";
import { Third } from "../components/welcome/Third";
import { ThirdAction } from "../components/welcome/ThirdAction";
import { Forth } from "../components/welcome/Forth";
import { ForthAction } from "../components/welcome/ForthAction";
import { Welcome } from "../views/Welcome";
import { StartPage } from "../views/StartPage";
import { StatisticsPage } from "../views/StatisticsPage";
import { ComingSoon } from "../shared/ComingSoon";
import { ItemPage } from "../views/ItemPage";
import { ItemCreate } from "../components/items/ItemCreate";
import { ItemList } from "../components/items/ItemList";
import { TagPage } from "../views/TagPage";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { SignInPage } from "../views/SignInPage";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/welcome",
    component: Welcome,
    beforeEnter: (to, from, next) => {
      localStorage.getItem("skipFeatures") === "yes" ? next("/start") : next();
    },
    children: [
      { path: "", redirect: "/welcome/1" },
      {
        path: "1",
        name: "Welcome1",
        components: { main: First, footer: FirstAction },
      },
      {
        path: "2",
        name: "Welcome2",
        components: { main: Second, footer: SecondAction },
      },
      {
        path: "3",
        name: "Welcome3",
        components: { main: Third, footer: ThirdAction },
      },
      {
        path: "4",
        name: "Welcome4",
        components: { main: Forth, footer: ForthAction },
      },
    ],
  },
  { path: "/start", component: StartPage },
  {
    path: "/items",
    component: ItemPage,
    children: [
      { path: "", component: ItemList },
      { path: "create", component: ItemCreate },
    ],
  },
  {
    path: "/tags",
    component: TagPage,
    children: [
      { path: "create", component: TagCreate },
      { path: ":id/edit", component: TagEdit },
    ],
  },
  { path: "/sign_in", component: SignInPage },
  { path: "/statistics", component: StatisticsPage },
  { path: "/export", component: ComingSoon },
  { path: "/classify", component: ComingSoon },
  { path: "/notify", component: ComingSoon },
];
