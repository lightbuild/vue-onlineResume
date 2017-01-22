import Vue from 'vue';
import AV from 'leancloud-storage';

var APP_ID = '2KqGX8Wm3l3sJmvWWW1bX4ly-gzGzoHsz';
var APP_KEY = 'y0eymsvgVU5R9G6AOHXc3L6S';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList:[],
        actionType:'signUp',
        formData:{
            username:'',
            password:''
        },
        currentUser:null,
        showName:''
    },
    methods:{
        addTodo:function(){
            if(this.newTodo.length>0){
                let now_data = new Date();
                this.todoList.push({
                    title:this.newTodo,
                    createdAt: this.format(now_data,"yyyy-MM-dd hh:mm:ss"),
                    done:false
                });
                this.newTodo = ''
                this.saveUserTodo();
            }else {
                alert("请输入你的计划")
            }
        },
        removeTodo:function(todo){
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index,1);
            this.saveUserTodo();
        },
        signUp:function(){
            var user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser)=>{
                this.currentUser = this.getCurrentUser();
            }, (error) =>{
                alert("您输入的用户名已被注册")
            });
        },
        logIn:function(){
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser)=>{
                this.currentUser = this.getCurrentUser();
            }, (error) => {
                alert("您输入的用户名或密码错误")
            });
        },
        logout:function(){
          AV.User.logOut();
          this.currentUser = null;
          window.location.reload()
        },
        getCurrentUser:function(){
            let currentUser = AV.User.current();
            if(currentUser){
                let{id,createdAt,attributes:{username}} = AV.User.current();
                this.getUserTodo();
                this.showName = username;
                return {id,createdAt,username};
            }
            else{
                return null;
            }
        },
        saveUserTodo:function(){
            let logedUser = AV.User.current();
            let todoString = JSON.stringify(this.todoList);
            logedUser.set("todoList",{todoString});
            logedUser.save();
        },
        getUserTodo:function(){
            let logedUser = AV.User.current();
            if(logedUser.get("todoList")){
                let oldTodoString = logedUser.get("todoList").todoString;
                let oldTodo = JSON.parse(oldTodoString);
                return this.todoList = oldTodo || [];
            }else {
                return this.todoList = [];
            }
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
        this.currentUser = this.getCurrentUser();
    }
})
