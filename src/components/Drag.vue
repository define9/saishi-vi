<script setup>
import { ref } from "vue";

const props = defineProps({
  disabled: { type: Boolean, default: false },
  target: { type: String, default: '' },
});

const dragPos = {
  hasMoved: false,
  x: 0, // right
  y: 0, // bottom
  top: 0,
  left: 0,
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
};

const dragBoxPos = ref({ x: null, y: null });
const dragBoxRef = ref();

const setPosition = (dragX, dragY) => {
  [dragX, dragY] = _getSafeAreaXY(dragX, dragY);
  dragPos.x = dragX;
  dragPos.y = dragY;
  dragBoxPos.value.x = dragX;
  dragBoxPos.value.y = dragY;
};

const _getSafeAreaXY = (x, y) => {
  const docWidth = Math.max(
    document.documentElement.offsetWidth,
    window.innerWidth
  );
  const docHeight = Math.max(
    document.documentElement.offsetHeight,
    window.innerHeight
  );
  // 检查屏幕边缘
  if (x + dragBoxRef.value.offsetWidth > docWidth) {
    x = docWidth - dragBoxRef.value.offsetWidth;
  }
  if (y + dragBoxRef.value.offsetHeight > docHeight) {
    y = docHeight - dragBoxRef.value.offsetHeight;
  }
  if (x < 0) {
    x = 0;
  }
  // iOS底部的安全区域
  if (y < 20) {
    y = 20;
  }
  return [x, y];
};

const onTouchStart = (e) => {
  if (props.disabled) return;
  dragPos.startX = e.touches[0].pageX;
  dragPos.startY = e.touches[0].pageY;
  dragPos.hasMoved = false;
};

const onTouchEnd = (e) => {
  if (props.disabled) return;
  if (!dragPos.hasMoved) return;
  dragPos.startX = 0;
  dragPos.startY = 0;
  dragPos.hasMoved = false;
  setPosition(dragPos.endX, dragPos.endY);
};

const onTouchMove = (e) => {
  if (props.disabled) return;
  if (e.touches.length <= 0) return;
  const offsetX = e.touches[0].pageX - dragPos.startX,
    offsetY = e.touches[0].pageY - dragPos.startY;
  let x = Math.floor(dragPos.x - offsetX),
    y = Math.floor(dragPos.y - offsetY);
  [x, y] = _getSafeAreaXY(x, y);
  dragBoxPos.value.x = x;
  dragBoxPos.value.y = y;
  dragPos.endX = x;
  dragPos.endY = y;
  dragPos.hasMoved = true;
  e.preventDefault();
};

const onMousedown = (e) => {
  if (props.disabled)
    return;
  //设置事件对象
  let event1 = e || window.event;
  let clz = e.target.className.split(' ')
  clz = clz.concat(e.target.parentElement.className.split(' '))
  if (clz.indexOf(props.target) < 0)
    return;

  //鼠标移动事件调用函数
  let move = function (e) {
    //设置时间对象
    let event = e || window.event;

    dragPos.left = Math.max(event.clientX - event1.offsetX, 0);
    dragPos.top = Math.max(event.clientY - event1.offsetY, 0);

    const width = dragBoxRef.value.offsetWidth;
    const height = dragBoxRef.value.offsetHeight;
    const right = window.innerWidth - (dragPos.left + width)
    const buttom = window.innerHeight - (dragPos.top + height)
    setPosition(right, buttom)
  };

  //解决拖动会选中文字的问题
  document.onselectstart = () => false;

  //当按下时  对document设置鼠标移动事件
  document.addEventListener("mousemove", move);

  //鼠标抬起事件
  document.addEventListener("mouseup", function (e) {
    //删除鼠标移动事件
    document.removeEventListener("mousemove", move);

    //解决拖动会选中文字的问题
    document.onselectstart = () => true;
  });
};
</script>

<template>
  <div
    ref="dragBoxRef"
    class="drag-box"
    :class="{ disabled: disabled }"
    :style="
      disabled ? '' : `right: ${dragBoxPos.x}px; bottom: ${dragBoxPos.y}px;`
    "
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchmove="onTouchMove"
    @mousedown="onMousedown"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.drag-box:not(.disabled) {
  position: fixed;
  bottom: 30px;
  right: 30px;
  overflow: hidden;
  z-index: 99;
  border-radius: 5px;
}

</style>

