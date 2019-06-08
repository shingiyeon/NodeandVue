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
            currentDatas : {}
        }
            temp.setItem("title", title);
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
            temp["title"] = title;
            temp["body"] = body;
            for( var i = 0; i < localStorage.length; i++) {
                if(localStorage.key(i) == datekey) {
                    var list_temp = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    list_temp.push(temp);
                    localStorage.setItem(datekey, JSON.stringify(list_temp));
                    findkey = true;
                    this.currentDatas[datekey].push(temp);
                }
            }
            if(findkey == false){
                localStorage.setItem(datekey, JSON.stringify([temp]));
                this.currentDatas[datekey] = [temp];
            }
        });

        this.$EventBus.$on('remove-data', (SelectedTime, Index) => {
            var DateKey = SelectedTime.current_year+"-"+SelectedTime.current_month+"-"+SelectedTime.current_date;
            var value = JSON.parse(localStorage.getItem(DateKey));
            value.splice(Index, 1);
            localStorage.setItem(DateKey, JSON.stringify( value ) );
            this.currentDatas[DateKey] = value;
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
            this.currentDatas = {};
            if(localStorage.length > 0) {
                for (var i = 0; i < localStorage.length; i++) {
                    if(localStorage.key(i)=="loglevel:webpack-dev-server") continue;
                    if(localStorage.key(i).split("-")[0] == this.currentTime.current_year &&
                    localStorage.key(i).split("-")[1] == this.currentTime.current_month) {
                        this.currentDatas[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i)));
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
#CalendarApp{
    min-width: 1000px;
    overflow-x : auto;
}
</style>