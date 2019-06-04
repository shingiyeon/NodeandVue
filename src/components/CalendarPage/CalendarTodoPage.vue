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
            <div class="content">
                <ul>
                    <li v-for="todoItem in SelectedData" v-bind:key="todoItem">
                        {{ todoItem.title }}
                        {{ todoItem.body }}
                    </li>
                </ul>
            </div>

        </body>
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
            alert("emit");
            this.$EventBus.$emit('add-data', title, body);
            this.clearAll();
        }
    },
    props: ['SelectedTime', 'SelectedData'],
    name: 'CalendarTodoPage'
}
</script>

<style scoped>
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
        position: absolute;
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
        position: relative;
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
    }
    .button > .clearall {
        cursor: pointer;
        position: relative;
        display: block;
        height: 50%;
        width: 100%;
        background-color: yellow;
    }
    .button > * > span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    
</style>