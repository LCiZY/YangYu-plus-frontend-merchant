<template>
    <div style="padding: 10px; overflow: scroll; max-height: calc(100vh - 88px)" id="course">
        <div style="background: #fff; border-radius: 8px; padding: 20px">
            查看消息
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
    name: 'msg',
}
</script>

<style scoped>

</style>
