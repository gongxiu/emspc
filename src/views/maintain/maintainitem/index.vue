<template>
  <div>
    <yearCalendar />
  </div>
</template>

<script>
import yearCalendar from "@/components/calendar/YearCalendar.vue";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    yearCalendar
  }
};
</script>

<style scoped></style>
