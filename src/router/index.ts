import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
const Login = () => import("../components/MainLogin.vue");
const Error404 = () => import("../components/ErrorPage.vue");

//pinia
import {useUserStore} from "../stores/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)*",
    component: Error404,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/LoginRegistration.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../components/DashBoard.vue"),
    children:[
      {
        path: "profile",
        component: () => import("../components/UserProfile.vue"),
      },
      {
        path: "home",
        component: () => import("../components/UserHome.vue"),
      },
      {
        path: "history",
        component: () => import("../components/UserHistory.vue"),
      },
      {
        path: "post",
        component: () => import("../components/NewPublication.vue"),
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to,from)=>{
  const userStore = useUserStore();
  if (userStore.isLogged === false && to.path !== "/login" && to.path !== "/register" ){
   return "/login"
  }
})

export default router;
