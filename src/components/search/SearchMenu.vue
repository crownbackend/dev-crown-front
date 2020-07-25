<template>
    <div>
        <i class="fas fa-search fa-2x" @click="showModal"></i>
    </div>
</template>

<script>
    export default {
        name: "searchMenu",
        methods: {
            showModal() {
                this.$router.push('search')
            }
        }
    }
</script>