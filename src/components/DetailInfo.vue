<script setup>
import { defineComponent, onMounted, ref, getCurrentInstance } from "vue";
import { useUserStore } from "../stores/user";

const store = useUserStore();
const { proxy } = getCurrentInstance();
console.log(proxy.$http);
var serverStatus = ref("")
proxy.$http.get(`https://qdu-soft.syhu.com.cn/api/question/core/healthy`)
  .then((res) => {
    res.data.data.forEach(element => {
      serverStatus.value = element
    });
  });
</script>

<template>
  <div class="desc">
    <a-descriptions :column="1">
      <a-descriptions-item label="账号">{{
        store.username
      }}</a-descriptions-item>
      <a-descriptions-item label="积分">{{
        store.integral
      }}</a-descriptions-item>
      <a-descriptions-item label="服务器状态">{{
        serverStatus
      }}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<style scoped>
.desc {
  max-width: 200px;
  padding-left: 10px;
}
</style>
