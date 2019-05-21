<template>
    <div id="TodoPageApp">
        <TodoHeader></TodoHeader>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFooter></TodoFooter>
    </div>
</template>

<script>
import TodoHeader from './TodoHeader.vue'
import TodoFooter from './TodoFooter.vue'
import TodoList from './TodoList.vue'
import TodoInput from './TodoInput.vue'
export default {
  components: {
    'TodoHeader' : TodoHeader,
    'TodoInput' : TodoInput,
    'TodoList' : TodoList,
    'TodoFooter' : TodoFooter
  }
}
</script>

<style>
    body{
        text-align: center;
        background-color: #F6F6F8;
    }
    input{
        border-style: groove;
        width: 200px;
    }
    button{
        border-style: groove;
    }
    .shadow{
        box-shadow:5px 10px 10px rgba(0, 0, 0, 0.03)
    }
</style>