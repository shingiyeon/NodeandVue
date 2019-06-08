<template>
    <div id="CalendarTodoPage">
        <header>
            <span>
            {{ SelectedTime.current_year }}년 
            {{ SelectedTime.current_month }}월 
            {{ SelectedTime.current_date }}일
            </span>
        </header>
        <body>
            <div class="input">
                <div class="content">
                    <span class="inputtitle">
                    Title : <input type="text" v-model="newTodoItemTitle" placeholder="Input the to-do title">
                    </span>
                    <span class="inputbody">
                    Content :<br><textarea rows="4" cols="50" v-model="newTodoItemBody" placeholder="Input the to-do content"> </textarea>
                    </span>
                </div>
                <div class="button">
                    <div class="addsubmit" @click="StoreData(SelectedTime, newTodoItemTitle, newTodoItemBody)">
                        <span>
                            Add
                            <i class="fas fa-plus"></i>
                        </span>
                    </div>
                    <div class="clearall" @click="clearAll()">
                        <span>
                            ClearAll
                            <i class="far fa-trash-alt"></i>
                        </span>
                    </div>
                </div>
            </div>
        </body>
        <footer>
            <ul class="todoItems">
                <li class="todoItem" v-for="(todoItem, Index) in currentDateDatas" v-bind:key="Index">
                    <div class="todoItem_content">
                        <span class="todoItem_title">
                            {{ todoItem.title }}
                        </span>
                        <br>
                        <span class="todoItem_body">
                            <br>{{ todoItem.body }}
                        </span>
                    </div>
                    <div class="todoItem_buttons">
                        <div class="remove" @click="remove(Index)">
                            <span>
                                Remove<br>
                                <i class="far fa-trash-alt"></i>
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTodoItemTitle: '',
            newTodoItemBody: ''
        }
    },
    created() {
        this.$EventBus.$on('close-popup', this.clearAll);
    },
    methods : {
        clearAll() {
            this.newTodoItemTitle = '';
            this.newTodoItemBody = '';
        },
        StoreData(time, title, body){
            this.$emit('StoreData', time, title, body);
            this.clearAll();
        },
        remove(Index) {
            this.$emit('remove', this.SelectedTime, Index);
        }
    },
    props: ['SelectedTime', 'currentDateDatas'],
    name: 'CalendarTodoPage'
}
</script>

<style scoped>
    #CalendarView{
        display: block;
        position: relative;
    }

    header {
        position: relative;
        display: block;
        text-align: center;
        margin-top: 10px;
    }

    header > span {
        font-size: 1.3rem;
    }

    .input {
        position: relative;
    }

    .content {
        margin: 5px;
        display: inline-block;
        position: relative;
        width: 80%;
    }

    .content > * {
        margin: 5px;
    }

    .inputtitle > input{
        margin-left: 5px;
        width: 85%;
        border-style: solid;
        border-color: #6f6f6f;
        border-width: 1px;
    }

    .inputtitle > input:focus, .inputbody > textarea:focus{
        outline: none;
        border-color: gold;
    }

    .inputbody > textarea{
        margin-left: 10px;
        resize: none;
        overflow-y: scroll;
        font-size: 1.1rem;
        border-style: solid;
        border-color: #6f6f6f;
        border-width: 1px;
        width: 90%;
    }

    .button {
        margin: 5px;
        position: absolute;
        display: inline-block;
        width: 15%;
        height: 90%;
        text-align: center;
    }

    .button > .addsubmit {
        cursor: pointer;
        position: relative;
        display: block;
        height: 50%;
        width: 100%;
        background-color: green;
        border-radius: 5px;
    }
    .button > .clearall {
        cursor: pointer;
        position: relative;
        display: block;
        height: 50%;
        width: 100%;
        background-color: yellow;
        border-radius: 5px;
    }
    .button > * > span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .todoItem {
        position: relative;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #7f7f7f;
        border-radius: 5px;
        margin-bottom: 3px;
    }

    .todoItem_content {
        margin: 5px;
        display: inline-block;
        position: relative;
        width: 80%;
    }
    .todoItem_title {
        position: relative;
        overflow-x: hidden;
        word-break:break-all;
    }

    .todoItem_title::before{
        content: "Title";
        background-color: darkblue;
        color: white;
        border-radius: 3px;
        padding: 0 5px;
    }

    .todoItem_body {
        position: relative;
        overflow-x: hidden;
        word-break:break-all;
    }

    .todoItem_body::before{
        content: "Content";
        background-color: darkblue;
        color: white;
        border-radius: 3px;
        padding: 0 5px;
    }

    .todoItem_buttons {
        position: absolute;
        display: inline-block;
        width: 15%;
        height: 90%;
        text-align: center;
        top: 50%;
        font-size: 0.5rem;
        transform: translateY(-50%);
    }

    .remove {
        opacity: 0.8;
        color: white;
        border-radius: 5px;
        padding: 3px;
        box-sizing: border-box;
        background-color: orangered;
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        text-align:center;
        cursor: pointer;
    }

    
</style>