<template>

  <div
    class="row login centered-h"
  >
    <div class="modals-header">
      <h2 class="centered-v text-color">TP-Book</h2>
    </div>
    <div class="col q-pa-md justify-center">

      <div class="row justify-center">
        <label class="text-h4">Sign in</label>
      </div>

      <div class="q-pa-sm">
        <q-input
          v-model="user"
          color="black"
          debounce="500"
          label="User"
        />

        <q-input
          v-model="password"
          color="black"
          debounce="500"
          label="Password"
          type="password"
        />

      </div>

      <div class="row justify-center q-ma-md">
        <q-btn
          icon="mail"
          label="Log in"
          @click="login()"
        >
        </q-btn>
      </div>

      <div class="mb-4">
        <a class="text-color" href="/register">Register</a>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import { computed, defineComponent, ref } from "vue";
import fetch from "../helpers/fetch";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/user";

export default defineComponent({
  name: "MainLogin",
  components: {},
  props: {},
  setup(props, context) {
    const userStore = useUserStore();
    const router = useRouter();

    let user = ref<string>("andres");
    let password = ref<string>("0000");

    let rules = computed(() => {
      return {
        user: { required },
        password: { required }
      };
    });
    const $v = useVuelidate(rules, { user, password });

   async function login() {
     await $v.value.$validate().then(isValid => {
        if (isValid) {
          let payload = {
            "user": user.value,
            "password": password.value
          };

          fetch.post("user/login", payload).then((res: any) => {
                if (res?.name){
                  userStore.user = res;
                  userStore.isLogged = true;
                  router.push({path:"/dashboard/home"})
                }
          });

       } else {
         console.log("NO VALIDO");
         return;
       }
      });
    }

    context.expose({});

    return {
      user, password,
      login
    };

  }
});
</script>

<style lang="scss" scoped>
.login {
  width: clamp(321px, 20vw, 400px);
  border: 0.3px black solid;
  margin-top: 10vh !important;
}

.body {
  overflow: hidden;
}
</style>
