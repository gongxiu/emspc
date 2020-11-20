<template>
  <div>
    <yearCalendar :showYearSelector="true" v-model="year" />
  </div>
</template>

<script>
import yearCalendar from "@/components/calendar/YearCalendar.vue";
export default {
  name: "index",
  data() {
    return {
      year: "2020"
    };
  },
  components: {
    yearCalendar
  }
};
</script>

<style scoped></style>
