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

<style scoped>
.TodoPage {
    background-color: 	#F0FFFF;
}

.TodoPage > .wrapper{
    display: block;
    margin-top: 20px;
    background-color: white;
}

.TodoPage .header {
    display: block;
    text-align: center;
    margin-top: 20px;
}

.TodoPage .header > h1{
    display: block;
    letter-spacing: -2px;
    margin: 0px;
}

.TodoPage .header > h2{
    display: block;
    font-size: 1.3rem;
    color: rgba(0,0,0,0.6);
    letter-spacing: -1px;
    margin: 0px;
}

.TodoPage .body{
    display: block;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    background-color: aliceblue;
}

.TodoPage .body > .buttons{
    display: block;
    text-align: center;
}

.TodoPage .body > .buttons > .button{
    display: inline-block;
    width: 100px;
    cursor: pointer;
    border-radius: 5px;
}

.TodoPage .body > .buttons .add-button{
    border: solid 2px rgba(155, 17, 17, 0.87);
    background-color: rgba(224, 173, 173, 0.945);
}

.TodoPage .body > .buttons .delete-button{
    border: solid 2px rgba(17, 17, 155, 0.87);
    background-color: rgba(173, 173, 224, 0.945);
}

.TodoPage .body > .buttons > .button{
    font-weight: 500;
}

.TodoPage .body > .body-wrapper {
    margin-top: 10px;
}

.TodoPage .body > .buttons .add-button:hover{
    background-color: rgba(219, 66, 66, 0.945);
}

.TodoPage .body > .buttons .delete-button:hover{
    background-color: rgba(66, 66, 219, 0.945);
}

.TodoPage .body .add-list > .input-box{
    margin-top: 10px;
    display: block;
    position: relative;
}

.TodoPage .body .add-list > .input-box > input{
    display: inline-block;
    box-sizing: border-box;
    padding: 10px;
    width: 80%;
    outline: none;
}

.TodoPage .body .add-list > .input-box > input:focus{
    border-color: black;
    outline: none;
}


.TodoPage .body .add-list > .input-box > .add-button{
    display: inline-block;
    position: absolute;
    border: 1px solid blue;
    border-radius: 3px;
    background-color: skyblue;
    cursor: pointer;
    box-sizing: border-box;
    right: 0;
    top: 50%;
    margin-right: 10px;
    transform: translateY(-50%);
}

.TodoPage .body .add-list > .input-box > .add-button:hover{
    background-color: slateblue;
}

.TodoPage .body .task-wrapper{
    margin: 0 10px;
    margin-top: 10px;
    border: 1px solid seagreen;
}

.TodoPage .body .task-wrapper .task-item{
    display: block;
    box-sizing: border-box;
    position: relative;
    border: 1px solid aquamarine;
    border-radius: 2px;
    margin: 2.5px 10px;
    cursor: pointer;
}

.TodoPage .body .add-list .task-wrapper .task-item:hover{
    background-color: aquamarine;
}

.TodoPage .body .task-wrapper .task-item.completed, 
.TodoPage .body .task-wrapper .task-item.completed .task-item-describe{
    text-decoration: line-through;

}

.TodoPage .body .delete-list .task-item-describe{
    display: inline-block;
    width: 80%;
}

.TodoPage .body .task-wrapper .task-item > .delete-icon{
    display: inline-block;
    position: absolute;
    text-align: center;
    box-sizing: border-box;
    top:50%;
    transform: translateY(-50%);
    right: 0;
    width: 20%;
    font-size: 0.5rem;
    border: 1px solid red;
    border-radius: 2px;
    cursor: pointer;
}

.TodoPage .body .delete-list .delete-box{
    margin-top: 10px;
    border : 1px red solid;
    text-align: center;
    background-color: salmon;
    font-weight: bold;
    cursor: pointer;
}

.TodoPage .body .delete-list .delete-box:hover{
    background-color: darksalmon;
}

.TodoPage .con{
    max-width: 500px;
}

</style>