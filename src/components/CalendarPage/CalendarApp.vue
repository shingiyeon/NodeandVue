<template>
    <div id="CalendarApp">
        <CalendarView v-bind:currentDatas="currentDatas" v-bind:currentTime="currentTime" v-on:changeCurrentTime="changeCurrentTime"></CalendarView>
    </div>
</template>

<script>
import CalendarView from './CalendarView.vue'
export default {
    data() {
        return {
            currentTime : {
                current_year : "2000",
                current_month : "01",
                current_date : "01",
            },
            currentDatas : []
        }
    },
    created: function() {
        this.currentTime.current_date = this.NumtoStr(new Date().getDate());
        this.currentTime.current_month = this.NumtoStr(new Date().getMonth()+1);
        this.currentTime.current_year = this.NumtoStr(new Date().getFullYear());
        this.loadData();

        this.$EventBus.$on('add-data', (title, body) => {
            var datekey = this.currentTime.current_year + "-" + this.currentTime.current_month + "-" + this.currentTime.current_date;
            var findkey = false;
            var temp = {};
            temp.setItem("title", title);
            temp.setItem("body", body);
            for( var i = 0; i < localStorage.length; i++) {
                if(localStorage.key(i) == datekey) {
                    localStorage.getItem(localStorage.key(i)).push(temp);
                    findkey = true;
                }
            }
            if(findkey == false){
                localStorage.setItem(datekey, [temp]);
            }
        });
    },
    methods: {
        changeCurrentTime(changed_year, changed_month, changed_date){
            this.currentTime.current_year = this.NumtoStr(changed_year);
            this.currentTime.current_month = this.NumtoStr(changed_month);
            this.currentTime.current_date = this.NumtoStr(changed_date);
            this.loadData();
        },
        loadData() {
            this.currentDatas = [];
            if(localStorage.length > 0) {
                for (var i = 0; i < localStorage.length; i++) {
                    if(localStorage.key(i)=="loglevel:webpack-dev-server") continue;
                    if(localStorage.key(i).split("-")[0] == this.currentTime.current_year &&
                    localStorage.key(i).split("-")[1] == this.currentTime.current_month) {
                        var temp = {};
                        temp[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
                        this.currentDatas.push(temp);
                    }
                }
            }
        },
        NumtoStr(number) {
            if(number < 10){
                return "0" + number.toString();
            }
            return number.toString();
        }
    },
    components: {
        "CalendarView" : CalendarView
    }
}
</script>

<style scoped>
#CalenderApp{
    min-width: 850px;
}
</style>