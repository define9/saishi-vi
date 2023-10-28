<script setup>
import { defineComponent, onMounted, defineProps, ref, getCurrentInstance } from "vue";
import { useUserStore } from "../stores/user";
import { grabQuestionTitle, getQuestionIndex } from "../plugins/utils/question";
import { Platform } from "../plugins/utils/common"

const props = defineProps({
  platform: {
    type: Number,
    required: true,
    default: 0
  }
});

const store = useUserStore();
const { proxy } = getCurrentInstance();

let data = ref({
  index: -1,
  title: "",
  answer: [],
});

function fetchAnswer(title) {
  let identifyCode = store.identifyCode

  

  return ["A.家务中日", "B.加油啊"]
}

function refreshData(index) {
  console.log("数据刷新了");
  
  data.value.index = index
  data.value.title = grabQuestionTitle()
  data.value.answer = fetchAnswer(data.value.title)

  // 自动答题
}

function checkIndexLoop() {
  let now = getQuestionIndex(props.platform)
  if (now != data.value.index) {
    refreshData(now)
  }
  setTimeout(() => {
    checkIndexLoop()
  }, 500);
}

onMounted(() => {
  checkIndexLoop()
})

function copy(content) {}
</script>

<template>
  <div class="examPage">
    <a-row>
      <div class="title">
        {{ data.index }}. {{ data.title }}
      </div>
    </a-row>
    <a-row>
      <div class="answer">
        <a-list item-layout="horizontal" :data-source="data.answer">
          <template #renderItem="{ item }">
            <a-list-item @click="copy(item)" class="item">
              {{ item }}
            </a-list-item>
          </template>
        </a-list>
      </div>
    </a-row>
  </div>
</template>

<style scoped>
.examPage {
  max-width: 200px;
}

.answer .item {
  padding: 0 5px;
  margin: 5px;
}

.answer .item:hover {
  background-color: #66b847;
  cursor: pointer;
  border-radius: 6px;
}

.title {
  font-size: 1.3em;
  font-weight: bolder;
}
</style>
