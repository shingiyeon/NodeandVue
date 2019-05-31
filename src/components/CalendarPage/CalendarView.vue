<template>
    <div id="CalendarView">
        <header>
            <div class="titles">
                <span class="button left-button" @click="changeCurrentTime(parseInt(currentTime.current_year), parseInt(currentTime.current_month)-1, parseInt(currentTime.current_date))"><i class="fas fa-caret-left"></i></span>
                <span class="current_info"> {{currentTime.current_year}}년 {{currentTime.current_month}}월</span>
                <span class="button right-button" @click="changeCurrentTime(parseInt(currentTime.current_year), parseInt(currentTime.current_month)+1, parseInt(currentTime.current_date))"><i class="fas fa-caret-right"></i></span>
            </div>
        </header>
        <body>
            <ul class="dates row">
                <li class="cell data_not_show">SUN</li>
                <li class="cell data_not_show">MON</li>
                <li class="cell data_not_show">TUE</li>
                <li class="cell data_not_show">WED</li>
                <li class="cell data_not_show">THR</li>
                <li class="cell data_not_show">FRI</li>
                <li class="cell data_not_show">SAT</li>
                <li class="cell days" v-bind:class="{data_not_show: date == null}" v-for="date in dates" v-bind:key="date">
                    <span class="day">{{ date }}</span>
                    <ul class="datas" >
                        <li>temp2</li>
                    </ul>
                </li>
            </ul>
        </body>
    </div>
</template>


<script>
import CalendarTodoPage from './CalendarTodoPage.vue'
export default {
    name: 'CalendarView',
    props: ['currentTime', 'currentData'],
    computed : {
        dates : function() {
            var date_list = [];
            var standard_date = this.currentTime.current_year +"-"+this.currentTime.current_month + "-01";
            var first_day = new Date(standard_date).getDay();
            for(var i=0; i<first_day; i++){
                date_list.push(null);
            }
            switch(parseInt(this.currentTime.current_month)){
                case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                    for(var i=1; i<=31; i++){
                        date_list.push(i);
                    }
                    break;
                case 4: case 6: case 9: case 11:
                    for(var i=1; i<=30; i++){
                        date_list.push(i);
                    }
                    break;
                case 2:
                    if(this.currentTime.current_year % 400 == 0){
                        for(var i=1; i<=29; i++){
                            date_list.push(i);
                        }
                    }
                    else if(this.currentTime.current_year % 100 == 0){
                        for(var i=1; i<=28; i++){
                            date_list.push(i);
                        }
                    }
                    else if(this.current_year % 4 == 0){
                        for(var i=1; i<=29; i++){
                            date_list.push(i);
                        }
                    }
                    else{
                        for(var i=1; i<=28; i++){
                            date_list.push(i);
                        }
                    }
            }
            return date_list;
        }
    },
    components : {
        "CalendarTodoPage" : CalendarTodoPage
    },
    methods : {
        changeCurrentTime(year, month, dates){
            if(month >= 13) {
                month = 1;
                year += 1;
            }
            else if(month <= 0){
                month = 12;
                year -= 1;
            }
            this.$emit('changeCurrentTime', year, month, dates);
        }
    }
}
</script>

<style scoped>
    #CalendarView {
        width: 80%;
        height: 60%;
        margin-left: auto;
        margin-right: auto;
    }
    header {
        text-align: center;
        background-color: aqua;
    }
    .titles::after {
        display: block;
        content: "";
        clear: both;
    }
    .titles > * {
        float: left;
    }
    .titles > .current_info {
        width: 80%;
        font-size: 1.3rem;
    }
    .titles > .button {
        width: 10%;
        font-size: 1.3rem;
    }
    .cell {
        display: block;
        text-align: center;
        width: calc(100%/7);
        height: 30px;
        padding: 2px;
    }
    .cell:nth-child(7n+8){
        clear: both;
    }
    .days {
        overflow-y: hidden;
        height: 100px;
        text-align: right;
    }
    .datas {
        text-align: center;
    }
    .cell:not(.days){
        background-color: blueviolet;
        color: white;
    }
    .cell:not(.data_not_show){
        border: 1px solid #7f7f7f;
    }
    .cell:nth-child(n+7){
        margin-top: -1px;
    }
    .cell:not(:nth-child(7n)){
        margin-right: -1px;
    }
    .data_not_show > .datas {
        display: none;
    } 

</style>