<template>
    <div id="CalendarTodoPage">
        {{ SelectedTime.year }}
        {{ SelectedTime.month }}
        {{ SelectedTime.date }}
    </div>
</template>

<script>
export default {
    props: ['SelectedTime'],
    name: 'CalendarTodoPage'
}
</script>