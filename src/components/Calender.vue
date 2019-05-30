
<template>
    <div class="Calender" >
        <div class="head">
            <div class="today"> {{current_year}}년 {{current_month}}월 {{current_date}}일</div>

        </div>
        <div class="body">
            <div class="month">
                <span class="button left-button" @click="previousmonth"><i class="fas fa-caret-left"></i></span>
                <div class="current_info"> {{current_year}}년 {{current_month}}월</div>
                <span class="button right-button" @click="nextmonth"><i class="fas fa-caret-right"></i></span>
            </div>
            <div class="day_wrapper">
                <ul class="row" >
                    <li class="cell" v-for="key in Days" v-bind:key="key">{{key}}</li>
                </ul>
            </div>
            <div class="day_box">
                <ul class="row">
                    <li class="cell" v-bind:class="{show: date!=0, active: date==current_date}" v-for="date in dates" v-bind:key="date">
                        {{date==0 ? " " : date}}
                        <div class="day_box_button" @click="moveActivedate(date)"></div>
                    </li>
                </ul>
            </div>
            <div class="popup" v-if="show_flag === 1">
                <div class="popup_wrapper">  
                    <div class="popup_title"><span>{{current_year}} - {{current_month}} - {{current_date}}</span></div>
                    <div class="popup_close" @click="closepopup()"></div>
                    <div class="add_list">
                        <input type="text"
                            v-model="newTask"
                            @keyup.enter="addTask"
                            placeholder = "Task를 추가해주세요."
                        >
                        <div class="button add-button" @click="addTask">
                            <i class="fas fa-plus"></i>Add
                        </div>
                    </div>
                    <div class="popup_content">
                        <ul class= "todobox">
                            <li class="todo row" v-for="(key, index) in datas[currentkey()]" v-bind:key="key">
                                <span class="cell">{{key}}</span>
                                <div class="delete-icon cell" @click="removeTask(index)">
                                    <i class="fas fa-trash"></i>Delete
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Calender',
    data(){
        return{
            current_date : "2000",
            current_month : "01",
            current_year : "01",
            Days : ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
            dates : [],
            datas : {},
            first_day : 0,
            newTask : '',
            show_flag : 0
        }
    },
    created: function() {
            this.current_date = new Date().getDate();
            this.current_month = new Date().getMonth()+1;
            this.current_year = new Date().getFullYear();
            var temp_char, current_day;
            temp_char = this.current_year + "-";
            if(this.current_month < 10){
                temp_char += "0";
            }
            temp_char += this.current_month+ "-01";
            this.first_day = new Date(temp_char).getDay();
            this.dates = [];
            for(var i=0; i<this.first_day; i++)
                this.dates.push(0);
            switch(this.current_month){
                case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                    for(var i=1; i<=31; i++){
                        this.dates.push(i);
                    }
                    break;
                case 4: case 6: case 9: case 11:
                    for(var i=1; i<=30; i++){
                        this.dates.push(i);
                    }
                    break;
                case 2:
                    if(this.current_year % 400 == 0){
                        for(var i=1; i<=29; i++){
                            this.dates.push(i);
                        }
                    }
                    else if(this.current_year % 100 == 0){
                        for(var i=1; i<=28; i++){
                            this.dates.push(i);
                        }
                    }
                    else if(this.current_year % 4 == 0){
                        for(var i=1; i<=29; i++){
                            this.dates.push(i);
                        }
                    }
                    else{
                        for(var i=1; i<=28; i++){
                            this.dates.push(i);
                        }
                    }
            }
    },
    methods: {
        initialization() {
            var temp_char, current_day;
            temp_char = this.current_year + "-";
            if(this.current_month < 10){
                temp_char += "0";
            }
            temp_char += this.current_month+ "-01";
            this.first_day = new Date(temp_char).getDay();
            this.dates = [];
            for(var i=0; i<this.first_day; i++)
                this.dates.push(0);
            switch(this.current_month){
                case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                    for(var i=1; i<=31; i++){
                        this.dates.push(i);
                    }
                    break;
                case 4: case 6: case 9: case 11:
                    for(var i=1; i<=30; i++){
                        this.dates.push(i);
                    }
                    break;
                case 2:
                    if(this.current_year % 400 == 0){
                        for(var i=1; i<=29; i++){
                            this.dates.push(i);
                        }
                    }
                    else if(this.current_year % 100 == 0){
                        for(var i=1; i<=28; i++){
                            this.dates.push(i);
                        }
                    }
                    else if(this.current_year % 4 == 0){
                        for(var i=1; i<=29; i++){
                            this.dates.push(i);
                        }
                    }
                    else{
                        for(var i=1; i<=28; i++){
                            this.dates.push(i);
                        }
                    }
            }
        },
        moveActivedate(key) {
            if (this.current_date != key && key != 0){
                $('.Calender > .body > .day_box > .row > .cell.active').removeClass('active');
                this.current_date = key;
            }
            else if(this.current_date == key && key != 0){
                this.show_flag = 1;
                if( !(this.currentkey() in this.datas) ) this.datas[this.currentkey()] = [];
            }
        },
        closepopup(){
            this.show_flag = 0;
        },
        changeActivedate(number) {
            if( this.current_date + number >= 1 && this.current_date + number <= calculateMaximumdates()) {
                $('.Calender > .body > .day_box > .row > .cell.active').removeClass('active');
                this.current_date = this.current_date + number;
            }
        },
        currentkey(){
            var temp_char, current_day;
            temp_char = this.current_year + "-";
            if(this.current_month < 10){
                temp_char += "0";
            }
            temp_char += this.current_month+ "-";
            if(this.current_date < 10){
                temp_char += "0";
            }
            temp_char += this.current_date;
            return temp_char;
        },
        removeTask(index){
            this.datas[this.currentkey()].splice(index, 1);
        },
        addTask() {
            if(this.newTask){
                var comp = 1;
                for(var value in this.datas[this.currentkey()]){
                    if(this.datas[this.currentkey()][value] == this.newTask) comp = 0;
                }
                if(comp){
                    this.datas[this.currentkey()].push(this.newTask);
                }
                this.newTask = '';
            }
        },
        calculateMaximumdates(year, month) {
            switch(month){
                case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                    return 31;
                case 4: case 6: case 9: case 11:
                    return 30;
                case 2:
                    if(year % 400 == 0){
                        return 29;
                    }
                    else if(year % 100 == 0){
                        return 28;
                    }
                    else if(year % 4 == 0){
                        return 29;
                    }
                    else{
                        return 28;
                    }
            }
        },
        previousmonth(){
            if(this.current_month == 1){
                this.current_month = 12;
                this.current_year -= 1;
                this.initialization();
            }
            else{
                if(this.current_date > this.calculateMaximumdates(this.current_year, this.current_month-1)){
                    this.current_date = this.calculateMaximumdates(this.current_year, this.current_month-1);
                }
                this.current_month -= 1;
                this.initialization();
            }
        },
        nextmonth(){
            if(this.current_month == 12){
                this.current_month = 1;
                this.current_year += 1;
                this.initialization();
            }
            else{
                if(this.current_date > this.calculateMaximumdates(this.current_year, this.current_month+1)){
                    this.current_date = this.calculateMaximumdates(this.current_year, this.current_month+1);
                }
                this.current_month += 1;
                this.initialization();
            }
        }
    }
}
</script>

<style scoped>
.Calender {
    margin: 20 20px;
    width: 500px;
    height: 300px;
    border: 5px solid wheat;
    user-select: none;
}

.Calender > .head{
    display: block;
    text-align: center;
    margin-top: 10px;
}

.Calender > .body{
    margin-top: 10px;
    display: block;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

.Calender > .body > .month{
    display: inline-block;
    position: relative;
    width: 100%;
}

.Calender > .body > .month > .current_info{
    display: block;
    position: absolute;
    text-align: center;
    padding: 0 20%;
    left: 50%;
    transform: translateX(-50%);
    white-space:nowrap;
}

.Calender > .body > .month > .current_info:hover{
    color: skyblue;
}

.Calender > .body > .month > .button{
    display: block;
    position: absolute;
    padding: 0 5px;
}

.Calender > .body > .month > .button:hover{
    color: skyblue;
}

.Calender > .body > .month > .left-button{
    left: 10px;
}

.Calender > .body > .month > .right-button{
    right: 10px;
}

.Calender > .body > .day_wrapper{
    position: relative;
    display: block;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    background-color: blue;
}

.Calender > .body > .day_wrapper > .row > .cell{
    display: block;
    width: calc(100%/7);
    text-align: center;
}

.Calender > .body > .day_box{
    display: block;
    width: 100%;
}

.Calender > .body > .day_box > .row{
    position: relative;
}

.Calender > .body > .day_box > .row > .cell{
    display: block;
    width: calc(100%/7);
    height: 25px;
    text-align:center;
    box-sizing: border-box;
    position: relative;
}

.Calender > .body > .day_box > .row > .cell.show{
    background-color: beige;
    cursor: pointer;
}

.Calender > .body > .day_box > .row > .cell.active{
    border: solid 1px red;
}

.Calender > .body > .day_box > .row > .cell:nth-child(7n+8){
    clear: both;
}

.Calender > .body > .day_box > .row > .cell > .day_box_button{
    position : absolute;
    top:0%;
    left:0%;
    width: 100%;
    height: 100%;
}

.Calender > .body > .popup{
    position: fixed;
    top:0;
    left:0;
    display: block;
    z-index: 1;
    width: 520px;
    height: 320px;
}

.Calender > .body > .popup > .popup_wrapper{
    position: absolute;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: white;
    border: 1px solid black;
    opacity: 1;
}

.Calender > .body > .popup > .popup_wrapper > .popup_title{
   position: relative;
    margin-top: 10px;
   margin-bottom: 10px;
   text-align: center;
}

.Calender > .body > .popup > .popup_wrapper > .popup_close{
    position: absolute;
    display: inline-block;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    margin-top: 10px;
    margin-right: 10px;
    translate: background-color 0.3s;
    cursor: pointer;
}

.Calender > .body > .popup > .popup_wrapper > .popup_close:hover{
    background-color: rgba(0,0,0,0.3);
}

.Calender > .body > .popup > .popup_wrapper > .popup_close::before,
.Calender > .body > .popup > .popup_wrapper > .popup_close::after
{
    content: "";
    position: absolute;
    display: block;
    width: 8px;
    height: 100%;
    top:50%;
    left:50%;
    background-color: black;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
}

.Calender > .body > .popup > .popup_wrapper > .popup_close::after{
    position: absolute;
    right: 50%;
    transform: translateX(-50%) translateY(-50%) rotate(-45deg);
    right: 0;
}

.Calender > .body > .popup > .popup_wrapper > .add_list{
    text-align: center;
}

.Calender > .body > .popup > .popup_wrapper > .add_list > *{
    display: inline-block;
}

.Calender > .body > .popup > .popup_wrapper > .add_list > .button{
    margin-left: 5px;
    background-color: skyblue;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
}
.Calender > .body > .popup > .popup_wrapper > .popup_content > .todobox > .todo{
    margin: 3px 3px;
    border-radius: 1px;
}
.Calender > .body > .popup > .popup_wrapper > .popup_content > .todobox > .todo {
    position: relative;
}
.Calender > .body > .popup > .popup_wrapper > .popup_content > .todobox > .todo > *{
    display: block;
    text-align: center;
}

.Calender > .body > .popup > .popup_wrapper > .popup_content > .todobox > .todo > span{
    border: 1px solid #4f4f4f;
    width: 75%;
    margin-right: 5px;
}

.Calender > .body > .popup > .popup_wrapper > .popup_content > .todobox > .todo > .delete-icon{
    border: 1px solid #4f4f4f;
    width: 23%;
    height: 100%;
}
</style>