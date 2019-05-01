<template>
    <div class="TodoPage">
        <div class="wrapper con">
            <div class="header">
                <h1>ToDoList</h1>
                <h2>Make your TodoList.</h2>
            </div>
            <div class="body">
                <div class="buttons">
                    <div class="button add-button" @click="ShowAddTask">
                        <i class="fas fa-plus"></i>Add
                    </div>
                    <div class="button delete-button" @click="ShowDeleteTask">
                        <i class="fas fa-trash"></i>Delete
                    </div>
                </div>
                <div class="body-wrapper">
                    <div class="add-list" v-show="shows == 'add-show'">
                        <div class="input-box">
                            <input type="text"
                                class="add-list-input"
                                v-model="newTask"
                                @keyup.enter="addTask"
                                placeholder="Task를 추가해주세요."
                            >
                            <div class="button add-button" @click="addTask">
                                <i class="fas fa-plus"></i>Add
                            </div>
                        </div>
                        <div class="task-wrapper" v-show="tasks.length != 0">
                            <ul class="task-items">
                                <li class="task-item" v-for="(task, index) in tasks" v-bind:class = "task.completed" v-bind:task="task" v-bind:key="task" @click="swapCompleted(index)" >
                                    {{task.name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="delete-list" v-show="shows == 'delete-show'">
                        <div class="delete-box" @click="deleteCompleted">
                            Delete Completed All
                        </div>
                        <div class="task-wrapper" v-show=" tasks.length != 0">
                            <ul class="task-items">
                                <li class="task-item" v-for="(task, index) in tasks" v-bind:class = "task.completed" v-bind:task="task" v-bind:key="task" >
                                    <div class="task-item-describe">
                                        {{task.name}}
                                    </div>
                                    <div class="delete-icon" @click="removeTask(index)">
                                        <i class="fas fa-trash"></i>Delete
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    name: 'TodoPage',
    data(){
        return {
            tasks: [],
            newTask : '',
            shows: "add-show"
        }
    },
    methods: {
        addTask() {
            if (this.newTask) {
                this.tasks.push({
                    name: this.newTask,
                    completed: "not-completed"
                });
                this.newTask = '';
            }
        },
        ShowAddTask(){
            this.shows = "add-show";
        },
        ShowDeleteTask(){
            this.shows = "delete-show";
        },
        removeTask(index){
            this.tasks.splice(index, 1);
        },
        swapCompleted(index){
            if(this.tasks[index].completed=="not-completed")
                this.tasks[index].completed = "completed";
            else
                this.tasks[index].completed = "not-completed";
        },
        deleteCompleted(){
            var num = 0;
            var length = this.tasks.length;
            for(var index = 0; index < length; index++){
                if(this.tasks[index-num].completed=="completed"){
                    this.tasks.splice(index-num, 1);
                    num = num + 1;
                }
            }
        }
    }
}
</script>