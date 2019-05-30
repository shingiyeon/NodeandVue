<template>
    <div id="CalenderApp">
        <CalenderView v-bind:currentTime="currentTime" v-on:changeCurrentTime="changeCurrentTime"></CalenderView>
    </div>
</template>

<script>
import CalenderView from './CalenderView.vue'
export default {
    data() {
        return {
            currentTime : {
                current_year : "2000",
                current_month : "01",
                current_date : "01",
            },
            datas : []
        }
    },
    created: function() {
        this.currentTime.current_date = this.NumtoStr(new Date().getDate());
        this.currentTime.current_month = this.NumtoStr(new Date().getMonth()+1);
        this.currentTime.current_year = this.NumtoStr(new Date().getFullYear());
        this.loadData();
    },
    methods: {
        changeCurrentTime(changed_year, changed_month, changed_date){
            this.currentTime.current_year = this.NumtoStr(changed_year);
            this.currentTime.current_month = this.NumtoStr(changed_month);
            this.currentTime.current_date = this.NumtoStr(changed_date);
            this.loadData();
        },
        loadData() {
            this.datas = [];
            if(localStorage.length > 0) {
                for (var i = 0; i < localStorage.length; i++) {
                    if(localStorage.key(i)=="loglevel:webpack-dev-server") continue;
                    if(localStorage.key(i).split("-")[0] == this.currentTime.current_year &&
                    localStorage.key(i).split("-")[1] == this.currentTime.current_month) {
                        temp = {};
                        temp[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
                        this.datas.push(temp);
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
        "CalenderView" : CalenderView
    }
}
</script>