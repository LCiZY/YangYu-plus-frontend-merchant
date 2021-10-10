<template>
  <div style="padding: 10px; overflow: scroll; max-height: calc(100vh - 88px)">
    <div style="background: #fff; border-radius: 8px; padding: 20px">

      <courseForm>

      </courseForm>
      
    </div>
  </div>
</template>

<script>
import courseForm from '../../components/courseForm.vue'


export default {
  components: {
        courseForm
  },
  name: "addCourse",
  data() {
    return {
      
    };
  },
  mounted() {
  },
  methods: {
     
  },
};
</script>

<style scoped>

</style>
