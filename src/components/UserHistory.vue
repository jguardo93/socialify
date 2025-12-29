<template>
      <div class="q-ma-lg container" >
         <div v-if="!posts?.length">
           <q-icon name="sync_problem" size="50px" color="blue" label="Empty"></q-icon>  <h6>There's no post, let's create a new one:</h6>
           <h6>click on Posting</h6>
         </div>

        <q-card class="post q-pa-sm q-ma-md"  v-for="(post,index) in posts" :key="post.idpublications">
          <div class="text-h5 q-ml-xl"> {{ post.content }}</div>
          <div class="text-h6 q-ml-xl">{{ post.author }} - {{ toDate(post.stamp) }}</div>
          <div class="text-h6 q-ml-xl">
            <div>
              Likes ({{ post.likes }}) <q-icon class="button-icon" color="blue" name="favorite"  @click="like(post)"></q-icon> -
              See comments  <q-icon class="button-icon" color="blue" name="comment"  @click="seeComments(post.idpublications,index)"></q-icon>
            </div>
          </div>
          <div v-if=" isCommentVisible[index]" class="comments" v-for="comment in post.comments">
            <div>
              {{ comment.content }}
            </div>
            <div @click="seeProfile()">
              <q-icon name="person" class="q-mr-sm button-icon" color="blue"></q-icon>  {{ comment.name}} | {{toDate(comment.stamp) }}
            </div>

          </div>
          <div class="q-ma-lg">
            <div class="row justify-center q-gutter-lg q-mt-lg">
              <q-input
                class="col-6"
                v-model="newComment[index]"
                color="black"
                debounce="500"
                label="New Comment"
                @keyup.enter="posting(post.idpublications,index)"
              >

                <template v-slot:append>
                  <q-icon name="send" color="blue" class="button-icon"  @click="posting(post.idpublications,index)" />
                </template>

              </q-input>

            </div>

          </div>
        </q-card>

      </div>
</template>

<script lang="ts">

import { defineComponent, onBeforeMount, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import { postI } from "../models/post";
import fetch from "../helpers/fetch";
import { useUserStore } from "../stores/user";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "VenueDataImporter",
  components:{

  } ,
  props:{

  },
  setup(props,context){
    let posts = ref<postI[]>(null);
    let newComment = ref([])
    let isCommentVisible = ref({});
    const myUser = useUserStore();
    const $q = useQuasar();


    onBeforeMount(async ()=>{
     await fetch.get(`publications/getPublicationsById/${myUser?.user?.idusuario}`).then((res:any)=>{
        console.log(res);
        posts.value = res;
      })
    })

    function posting(id:number, messagePos:number){
      if (newComment.value[messagePos] !== "" && newComment.value[messagePos] !== undefined){

      let payload = {
        content: newComment.value[messagePos],
        stamp: stampTime(),
        autorid: myUser.user?.idusuario,
        postid: id
      }

      fetch.post("comments/register",payload).then((res)=>{
        $q.notify({
          message:"Comment Saved",
          color:"green",
          textColor:"white",
          timeout:500,
        })
        newComment.value[messagePos] = "";


        payload['name'] ="Yo";
        if (posts.value[messagePos]?.comments){
          posts.value[messagePos]['comments'] = [...posts.value[messagePos]['comments'], payload]
        }else{
          posts.value[messagePos]['comments'] = [payload]
        }

      })

      }else{
        $q.notify({
          message:"Please write something first.",
          color:"red",
          textColor:"white",
          timeout:500,
        })
      }
    }

    function  seeProfile(idAuthor:number){
      alert("See other Author")
    }

    function seeComments(idPublication:number,messagePos){
      fetch.get(`comments/getCommentsByPublication/${idPublication}`).then(res=>{
        posts.value[messagePos]['comments'] = res;
        isCommentVisible.value[messagePos] = !isCommentVisible.value[messagePos];
      })
    }

    function like(post){
      post.likes = (parseInt(post.likes) + 1).toString() ;
      fetch.put("publications/update", post);
    }

    function showComments(index):boolean{
      return isCommentVisible.value[index]
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
      posts,
      isCommentVisible,
      showComments,
      seeProfile,
      toDate,
      newComment,
      posting,
      seeComments,
      like,

    }
  }
});
</script>

<style lang="scss" scoped>
.post{
  box-shadow: 1px 2px 2px 2px gray;
  border-radius: 20px !important;
}
.comments{
  border-bottom: 0.3px gray solid ;
  margin-top: 15px;

  color: gray;
  padding: 10px;
  width: 50%;
  margin-left: 50%;
}

.container{
  overflow-y: auto;
}
</style>