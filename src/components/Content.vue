<script>
import { defineComponent, ref } from "vue";
import { useUserStore } from "../stores/user";
import Login from "./Login.vue";
import DetailInfo from "./DetailInfo.vue";

export default defineComponent({
  components: { Login, DetailInfo },
  setup() {
    const store = useUserStore();

    function logout() {
      store.logout();
    }

    return {
      store,
      logout,
    };
  },
});
</script>

<template>
  <div class="title">
    <div v-if="!store.login">
      <login> </login>
    </div>
    <div v-if="store.login">
      <a-row>
        <DetailInfo> </DetailInfo>
      </a-row>
      <a-row>
        <a-col :span="12" :offset="7">
          <a-button danger @click="logout"> 退出登录 </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 2em;
}
</style>
