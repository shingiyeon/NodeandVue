
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