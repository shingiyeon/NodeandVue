<template>
    <div class="TodoFooter">
        <span class="removeBtn" type="button" @click="removeAll">
            RemoveAll
            <i class="far fa-trash-alt"></i>
        </span>
    </div>
</template>

<script>
export default {
    methods : {
        removeAll() {
            this.$emit('removeAll');
        }
    }
}
</script>

<style scoped>
    .removeBtn {
        display: inline-block;
        border-radius: 5px;
        border-style: solid;
        border-color: red;
        color: red;
        border-width: 1px;
        padding: 0 5px;
        background-color: white;
        margin-top: 30px;
    }
</style>