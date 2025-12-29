
<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          TPbook
        </q-toolbar-title>

        <q-toolbar-title style="text-align: right">
          <q-icon name="person" class="q-mr-sm">
          </q-icon>
           <label>{{ user.name }}</label>
          <q-icon name="logout" class="q-ml-lg button-icon" @click="logout()">
          </q-icon>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
       <div class="q-pa-lg q-ml-lg" style="margin-top: 30px">
           <div class="text-h5 label-link" style="margin-top: 30px" @click="go('home')">
             <q-icon name="home"></q-icon> Home
           </div>
         <div class="text-h5 label-link"    style="margin-top: 30px" @click="go('history')">
           <q-icon name="history"></q-icon> History
         </div>
         <div class="text-h5 label-link"   style="margin-top: 30px" @click="go('profile')">
           <q-icon name="person"></q-icon>  Profile
         </div>
         <div class="text-h5 label-link"   style="margin-top: 30px" @click="go('post')">
           <q-icon name="publish"></q-icon>  Posting
         </div>
       </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/user";


export default defineComponent({
  name: "MainLogin",
  components: {},
  props: {},
  setup (){
    const myUser = useUserStore();
    let user = ref( myUser.$state.user );
    const leftDrawerOpen = ref(false)
    const router = useRouter();

    return {
      leftDrawerOpen,
      user,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      go(route){
        router.push({path:"/dashboard/"+route})
      },
      logout(){
        myUser.logout();
        router.push({path:"/login"})
      }
    }
  }

})
</script>