<script>
import { defineComponent, ref, computed } from "vue";
import { useUserStore } from "../stores/user"

export default defineComponent({
  setup() {
    const store = useUserStore()

    // 计算属性基本使用
    const username = computed(() => {
      return store.login ? '欢迎, ' + store.username : '未登录'
    })

    return {
      store,
      username,
    }
  },
})
</script>

<template>
  <div class="title">
    {{ username }}
  </div>
</template>

<style scoped>

.title {
  font-size: 1em;
}

</style>
