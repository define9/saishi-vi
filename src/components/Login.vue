<script setup>
import { defineComponent, ref, reactive, getCurrentInstance } from "vue";
import { useUserStore } from "../stores/user";

const store = useUserStore();
const { proxy } = getCurrentInstance();

const formState = reactive({
  identifyCode: "",
  loading: false,
});
const onFinish = (values) => {
  formState.loading = true;
  proxy.$http
    .get(
      `https://qdu-soft.syhu.com.cn/api/platform/user/userInfo/${values.identifyCode}`
    )
    .then((res) => {
      let data = res.data.data;
      data.login = res.data.code == 0;
      store.updateAll(data);
      formState.loading = false;
    });
};
const onFinishFailed = (errorInfo) => {};
</script>

<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="身份码"
      name="identifyCode"
      :rules="[{ required: true, message: '请输入身份码!' }]"
    >
      <a-input v-model:value="formState.identifyCode" />
    </a-form-item>
    <a-form-item>
      <a-button
        :loading="formState.loading"
        type="primary"
        html-type="submit"
        class="login-bt"
      >
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
.login-bt {
  width: 100%;
}
</style>
