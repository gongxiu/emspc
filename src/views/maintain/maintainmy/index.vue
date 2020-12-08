<template>
  <div>
    <div class="scroll">
      <div class="scroll-right">
        <yearCalendar :channel="2" :showYearSelector="true" v-model="year" />
      </div>
    </div>
    <dettagliModal :pageX="pageX" :pageY="pageY" :falg="falg" />
  </div>
</template>

<script>
  import yearCalendar from "@/components/calendar/YearCalendar.vue";
  import dettagliModal from "@/components/calendar/dettagliModal.vue";
  import selectTree from "@/components/selectTree/selecttree";
  import Const from "@/utils/const";
  import Bus from "@/utils/bus.js";
  export default {
    name: "index",
    data() {
      return {
        year: "2020",
        pageY: 0,
        pageX: 0,
        falg: false,
        mechanismId: "",
        modularName: "",
        defaultProps: {
          children: "children",
          label: "title"
        },
        orgTree: Const.orgTree
      };
    },
    mounted() {
      Bus.$on("posizioneModel", data => {
        // console.log(data)
        // this.falg = data.falg;
        // this.pageY = data.pageY;
        // this.pageX = data.pageX;
      });
    },
    components: {
      yearCalendar,
      dettagliModal,
      selectTree
    },
    methods: {}
  };
</script>

<style scoped>
  .rili {
    padding: 20px 10px;
    width: calc(100% - 300px - 40px);
    height: calc(100vh - 50px - 40px);
    background: #fff;
    margin: 20px 20px 20px 0;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
  .scroll-right{
    width: 100%;
  }
</style>
