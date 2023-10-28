<script>
import { defineComponent, onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";
import Login from "./Login.vue";
import DetailInfo from "./DetailInfo.vue";
import ExamPage from "./ExamPage.vue";
import { Platform } from "../plugins/utils/common"

const Status = {
  None: 0,
  Examing: 1,
  Answering: 2,
};

export default defineComponent({
  components: { Login, DetailInfo, ExamPage },
  setup() {
    const store = useUserStore();

    function logout() {
      store.logout();
    }

    let data = ref({
      status: Status.None,
      platform: location.href.indexOf("/m/") > 0 ? Platform.Mobile : Platform.PC
    });

    function mobileCheckStatus() {
      console.log("使用移动端格式");
      if (document.querySelector("#btn_submit"))
        data.value.status = Status.Examing
      else
        data.value.status = Status.None
    }

    function pcCheckStatus() {
      console.log("使用PC端格式");
      if (document.querySelector("#zuoti-time")) {
        data.value.status = Status.Examing;
        return;
      } else if (document.querySelector(".jiexi-question-block")) {
        data.value.status = Status.Answering;
        return;
      }
      data.value.status = Status.None;
    }

    onMounted(() => {
      switch(data.value.platform) {
        case Platform.Mobile:
          mobileCheckStatus()
          break;
        case Platform.PC:
          pcCheckStatus();
          break;
      }
    });

    return {
      store,
      data,
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
      <a-row v-if="data.status == 0">
        <DetailInfo></DetailInfo>
      </a-row>
      <div v-if="data.status == 1">
        <ExamPage :platform="data.platform"></ExamPage>
      </div>
      <a-row>
        <a-col :span="12" :offset="7">
          <a-popconfirm
            title="确认退出?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="logout"
            @cancel="() => {}"
          >
            <a-button danger :size="small"> 退出登录 </a-button>
          </a-popconfirm>
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
