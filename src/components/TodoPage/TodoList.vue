<template>
    <div class="TodoList">
        <ul>
            <li v-for="(todoItem, index) in propsdata" v-bind:key="todoItem">
                <i class="checkBtn fas fa-check"></i>
                {{ todoItem }}
                <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
                    <i class="far fa-trash-alt"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['propsdata'],
    methods: {
        removeTodo(todoItem, index){
            this.$emit('removeTodo', todoItem, index);
        }
    }
}
</script>

<style scoped>
    li {
        margin: 5px 0px;
        width: 100%;
        min-height: 50px;
        background-color: white;
        text-align: left;
        height: 50px;
        padding: 0 10px;
        border-radius: 5px;
    }
    .checkBtn {
        line-height: 45px;
        color: blue;
    }
    .removeBtn {
        color: red;
        margin-left: auto;
    }
    
</style>