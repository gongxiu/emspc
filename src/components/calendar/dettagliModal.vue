<template>
  <div
    class="modalAll"
    :style="{
      display: falg ? 'block' : 'none',
      top: pageY + 'px',
      left: pageX + 'px'
    }"
  >
    详情弹出层
  </div>
</template>
<script>
export default {
  name: "dettagliModal",
  props: {
    falg: {
      type: Boolean,
      default: false
    },
    pageX: {
      type: Number,
      default: 0
    },
    pageY: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="scss" scoped>
.modalAll {
  width: 100px;
  height: 100px;
  background: red;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
