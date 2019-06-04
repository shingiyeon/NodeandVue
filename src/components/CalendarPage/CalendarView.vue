<template>
    <div id="CalendarView" style="position: relative;">
        <header>
            <div class="titles">
                <span class="button left-button" @click="changeCurrentTime(parseInt(currentTime.current_year), parseInt(currentTime.current_month)-1, parseInt(currentTime.current_date))"><i class="fas fa-caret-left"></i></span>
                <span class="current_info"> {{currentTime.current_year}}년 {{currentTime.current_month}}월</span>
                <span class="button right-button" @click="changeCurrentTime(parseInt(currentTime.current_year), parseInt(currentTime.current_month)+1, parseInt(currentTime.current_date))"><i class="fas fa-caret-right"></i></span>
            </div>
        </header>
        <body >
            <ul class="dates row">
                <li class="cell data_not_show">SUN</li>
                <li class="cell data_not_show">MON</li>
                <li class="cell data_not_show">TUE</li>
                <li class="cell data_not_show">WED</li>
                <li class="cell data_not_show">THR</li>
                <li class="cell data_not_show">FRI</li>
                <li class="cell data_not_show">SAT</li>
                <li class="cell days" v-bind:class="{data_not_show: date == null}" v-for="date in dates" v-bind:key="date">
                    <div class="content" @click="popup(currentTime.current_year, currentTime.current_month, date)">
                        <span class="day">{{ date }}</span>
                        <ul class="datas" >
                            <li>temp2</li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div class="popup-bg"></div>
            <div class="popup">
                <div class="popup-header" @click="hiddenpopup()"><div class="popup-close"></div></div>
                <div class="popup-body">
                <CalendarTodoPage v-bind:currentDateDatas="currentDateDatas" v-bind:SelectedTime="currentTime"></CalendarTodoPage>
                </div>
            </div>
        </body>
    </div>
</template>


<script>
import CalendarTodoPage from './CalendarTodoPage.vue'
export default {
    data() {
        return {
            currentDateDatas : []
        }
    },
    name: 'CalendarView',
    props: ['currentTime', 'currentDatas'],
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
        popup(year, month, date){
            this.changeCurrentTime(parseInt(year), parseInt(month), parseInt(date));
            $('.popup').addClass('show');
            $('.popup-bg').addClass('show');
            this.loadcurrentDateData();
        },
        hiddenpopup(){
            $('.popup').removeClass('show');
            $('.popup-bg').removeClass('show');
            this.$EventBus.$emit('close-popup');
        },
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
        },
        loadcurrentDateData() {
            this.currentDateDatas = [];
            alert(this.currentDatas[0]);
            if(this.currentDatas.length >= 1){
                for(var i = 0; i < this.currentDatas.length; i++){
                    if( this.currentDatas.key(i).split("-")[2] == this.currentTime.current_date){
                        this.currentDateDatas = this.currentDatas.getItem(this.currentDatas.key(i))
                    }
                }
            }
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
    .button {
        cursor: pointer;
    }
    .cell {
        display: block;
        text-align: center;
        width: calc(100%/7 + 0.8px);
        height: 30px;
        padding: 2px;
        overflow-x: hidden;
    }
    .cell:nth-child(7n+8){
        clear: both;
    }
    .content {
        width: 100%;
        height: 100%;
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
        cursor: pointer;
    }
    .cell:nth-child(n+7){
        margin-top: -1px;
    }
    .cell:not(:nth-child(7n)){
        margin-right: -1px;
    }
    .data_not_show > * {
        display: none;
    }
    .popup {
        display: block;
        position:absolute;
        top:50%;
        left:50%;
        width:50%;
        height:80%;
        transform:translateX(-50%) translateY(-100%);
        background-color:white;
        border:3px solid black;
        opacity:0;
        visibility:hidden;
        transition:opacity .5s, visibility .5s, transform .5s;
    }
    .popup.show {
        visibility: visible;
        opacity: 1;
        transform:translateX(-50%) translateY(-50%);
    }
    .popup-bg{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0);
        visibility:hidden;
        transition: background-color .5s, visibility .5s;
    }
    .popup-bg.show{
        background-color:rgba(0,0,0,.5);
        visibility:visible;
    }
    .popup-header{
        position: absolute;
        display: inline-block;
        cursor: pointer;
        width: 45px;
        height: 45px;
        top: 0;
        right: 0;
        z-index: 1;
    }
    .popup-close {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .popup-close::before, .popup-close::after{
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
    .popup-close::after{
        transform: translateX(-50%) translateY(-50%) rotate(-45deg);
    }
    .popup-header:hover > .popup-close {
       transform:rotate(5deg);
    }
</style>