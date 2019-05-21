<template>
    <div class="TodoInput">
        <input type="text" v-model="newTodoItem" placeholder="Type what you have to do" v-on:keyup.enter="addTodo">
        <div class="addBox" v-on:click="addTodo">
            <i class="fas fa-plus"></i>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTodoItem: ''
        }
    },
    methods: {
        addTodo() {
            if(this.newTodoItem != ''){
                localStorage.setItem(this.newTodoItem, this.newTodoItem);
                this.clearInput();
            }
        },
        clearInput() {
            this.newTodoItem = '';
        }
    }


}
</script>

<style scoped>
    .TodoInput {
        background-color: white;
        height: 50px;
        border-radius: 5px;
        line-height: 50px;
    }
    .TodoInput input:focus {
        outline: none;
    }
    .TodoInput input{
        border-style: none;
        font-size: 0.9rem;
        width: 75%;
    }
    .addBox {
        float: right;
        background: #0F0F8F;
        width: 3rem;
        display: block;
    }
    .addBox > i{
        color: white;
        vertical-align: middle;
    }
</style>