<template>
    <div id="TodoPageApp">
        <TodoHeader></TodoHeader>
        <TodoInput v-on:addTodo="addTodo"></TodoInput>
        <TodoList v-bind:propsdata="todoItems" v-on:removeTodo="removeTodo"></TodoList>
        <TodoFooter v-on:removeAll="removeAll"></TodoFooter>
    </div>
</template>

<script>
import TodoHeader from './TodoHeader.vue'
import TodoFooter from './TodoFooter.vue'
import TodoList from './TodoList.vue'
import TodoInput from './TodoInput.vue'
export default {
  data() {
      return {
          todoItems: []
      }
  },
  created() {
      if(localStorage.length > 0){
        for (var i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i)=="loglevel:webpack-dev-server") continue;
            this.todoItems.push(localStorage.key(i));
        }
      }
  },
  methods: {
      addTodo(todoItem) {
          localStorage.setItem(todoItem, todoItem);
          this.todoItems.push(todoItem);
      },
      removeTodo(todoItem, index){
          localStorage.removeItem(todoItem);
          this.todoItems.splice(index, 1);
      },
      removeAll(){
          localStorage.clear();
          this.todoItems = [];
      }
      
  },
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
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
</style>