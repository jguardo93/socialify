<template>
  <div class="layout-view" >
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {

  },

  data() {
    return {
      //
    };
  },
});
</script>
<style lang="scss">
@import "styles/global/mixins.scss";

.layout-view{
    height: 100vh;
}

</style>
