<template>
  <div class="com-body">
   <div class="proval">
     <div class="pro-trans">
       <transCom />
     </div>
   </div>
  </div>
</template>

<script>
  import transCom from '@/components/trans/index'
  export default {
    name: "editproval",
    components:{
      transCom
    }
  }
</script>

<style lang="scss" scoped>
.proval{
  .pro-trans{
    width: 60%;
  }
}
</style>
