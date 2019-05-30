<template>
    <div id="CalenderView">
        <header>
            <div class="titles">
                <span class="button left-button" @click="changeCurrentTime(parseInt(currentTime.current_year), parseInt(currentTime.current_month)-1, parseInt(currentTime.current_date))"><i class="fas fa-caret-left"></i></span>
                <span class="current_info"> {{currentTime.current_year}}년 {{currentTime.current_month}}월</span>
                <span class="button right-button" @click="changeCurrentTime(parseInt(currentTime.current_year), parseInt(currentTime.current_month)+1, parseInt(currentTime.current_date))"><i class="fas fa-caret-right"></i></span>
            </div>
        </header>
        <body>
            <ul class="dates row">
                <li class="cell">SUN</li>
                <li class="cell">MON</li>
                <li class="cell">TUE</li>
                <li class="cell">WED</li>
                <li class="cell">THR</li>
                <li class="cell">FRI</li>
                <li class="cell">SAT</li>
                <li class="cell days" v-for="date in dates" v-bind:key="date">
                    <span class="day">{{ date }}</span>
                </li>
            </ul>
        </body>
    </div>
</template>


<script>
import CalenderTodoPage from './CalenderTodoPage.vue'
export default {
    name: 'CalenderView',
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
        "CalenderTodoPage" : CalenderTodoPage
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
    #CalenderView {
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
    }
    .cell:nth-child(7n+8){
        clear: both;
    }
    .days {
        overflow-y: hidden;
        height: 100px;
    }
    .days > .day {
        text-align: right;
    }
    .cell:not(.days){
        background-color: blueviolet;
        color: white;
    }
</style>