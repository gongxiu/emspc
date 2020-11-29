<template>
  <div class="body">
    <transCom type="2" titleLeft="可选项目" titleRight="已选设备"/>
  </div>
</template>

<script>
  import transCom from '@/components/trans/index'
  export default {
    components:{
      transCom
    },
    name: "distribu"
  }
</script>

<style lang="scss" scoped>
.body{
  margin: 20px;
  padding: 20px;
  background: #fff;
  width: 100vw;
}
</style>
