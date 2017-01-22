import Vue from 'vue';
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList:[]
    },
    methods:{
        addTodo:function(){
            let now_data = new Date();
            this.todoList.push({
                title:this.newTodo,
                createdAt: this.format(now_data,"yyyy-MM-dd hh:mm:ss"),
                done:false
            })
            this.newTodo = ''
        },
        removeTodo:function(todo){
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index,1)
        },
        format:function(data,fmt){
            var o = {
                "M+" : data.getMonth()+1,                 //月份
                "d+" : data.getDate(),                    //日
                "h+" : data.getHours(),                   //小时
                "m+" : data.getMinutes(),                 //分
                "s+" : data.getSeconds(),                 //秒
                "q+" : Math.floor((data.getMonth()+3)/3), //季度
                "S"  : data.getMilliseconds()            //毫秒
            };
            if(/(y+)/.test(fmt)){
                fmt=fmt.replace(RegExp.$1, (data.getFullYear()+"").substr(4 - RegExp.$1.length));
            };
            for(var k in o){
                if(new RegExp("("+ k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return fmt;
        }
    },
    created: function(){
        window.onbeforeunload = ()=>{
            let todoString = JSON.stringify(this.todoList);
            let inputString = JSON.stringify(this.newTodo);
            window.localStorage.setItem('myTodos', todoString)
            window.localStorage.setItem('myInput',inputString)
        }
        let oldTodoString = window.localStorage.getItem('myTodos');
        let oldInputString = window.localStorage.getItem('myInput');
        let oldTodo = JSON.parse(oldTodoString);
        let oldInput = JSON.parse(oldInputString);
        this.todoList = oldTodo || [];
        this.newTodo = oldInput || "";
    }
})

var app1 = new Vue({
    el:"#app1",
    data:{
        checked:""
}
})