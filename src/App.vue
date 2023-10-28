<script setup>
import Drag from "./components/Drag.vue";
import Header from "./components/Header.vue";
import Content from "./components/Content.vue";
</script>

<template>
  <Drag target="header">
    <a-layout>
      <div class="header">
        <Header></Header>
      </div>
      <a-layout-content>
        <Content ></Content>
      </a-layout-content>
      <a-row>
        <a-col :offset="5">
          powered by
          <a href="https://qdu-soft.syhu.com.cn/" target="_blank">qdu-soft</a>
        </a-col>
      </a-row>
    </a-layout>
  </Drag>
</template>

<style scoped>
.header {
  background-color: #38a50d;
  padding: 7px;
  text-align: center;
}

.ant-layout-content {
  margin: 5px;
}
</style>
