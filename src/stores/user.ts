import { defineStore } from "pinia";
import { user, userI } from "../models/user";

export const useUserStore = defineStore("user",{
    state: ():{isLogged:boolean, user:userI | null, profile:any} => {
         return {
           isLogged: false,
           user: null,
           profile: null
         };
    },
    actions:{
        logout(val?){
              this.isLogged = false;
              this.user = null;
        }
    },
    getters:{
        getUser: (state) => state.user,
   },
})