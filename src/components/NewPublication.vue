<template>


      <textarea  aria-placeholder="Enter your message here!!!" class="q-ma-lg q-pa-lg post text-h5" v-model="message" >
      </textarea>

  <div class="post-tool q-pa-sm q-ma-sm">
    <q-btn
      class="col-2 q-ma-lg"
      icon="send"
      label="Post"
      color="green"
      @click="posting()"
    >
    </q-btn>
    <q-btn
      class="col-2 q-ma-lg"
      color="red"
      icon="cancel"
      label="Erase"
      @click="erase()"
    >
    </q-btn>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, onUnmounted, onUpdated, ref, resolveTransitionHooks, watch } from "vue";
import { useUserStore } from "../stores/user";
import fetch from "../helpers/fetch";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "NewPublication",
  components:{

  } ,
  props:{

  },
  setup(props,context){
    const myUser = useUserStore();
    const $q = useQuasar();

    let message = ref<string>("");
    function posting(){
      if (message.value === ''){
        $q.notify({
          message:"Some fields are missed",
          color:"red",
          textColor: "white",
          timeout:500
        })
        return
      }

      let payload = {
        author: myUser.user.idusuario,
        stamp: stampTime(),
        content:message.value,
        likes:0
      }
      fetch.post("publications/register",payload).then((res)=>{
        $q.notify({
          message:"Post created",
          color:"green",
          textColor: "white",
          timeout:500
        })
        message.value=""
      }).catch((res)=>{
        $q.notify({
          message:"Post couldn't be created",
          color:"red",
          textColor: "white",
          timeout:500
        })
      })


    }
    function erase(){
      message.value=""
    }

    function toDate(stamp:string):string{
      let date = stamp.split("T")[0];
      let hour = stamp.split("T")[1].substring(0,8);
      return `${date} | ${hour}`
    }
    function  stampTime():string{
      let ahora = new Date(Date.now());
      return ahora.toISOString()
    }

    context.expose({})

    return{
      posting,
      erase,
      message
    }
  }
});
</script>

<style lang="scss" scoped>
.post{
  box-shadow: 1px 2px 2px 2px gray;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 300px;
  width: clamp(300px,67vw,67vw);
}
.post-tool{
  height: 100px;
  width: clamp(300px,67vw,67vw);
  margin-left: 25px;
}
</style>