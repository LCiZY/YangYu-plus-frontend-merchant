<template>
  <div style="padding: 10px; overflow: scroll; max-height: calc(100vh - 88px)">
    <div style="background: #fff; border-radius: 8px; padding: 20px">
      <courseForm :isCreate="false" :courseId="courseId"> </courseForm>
    </div>
  </div>
</template>

<script>
import courseForm from "../../components/courseForm.vue";

export default {
  components: {
    courseForm,
  },
  name: "updateCourse",
  data() {
    return {
      courseId: "",
    };
  },
  mounted() {
    if (this.$route.params.courseId) {
      this.courseId = this.$route.params.courseId;
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>
