var express = require("express");
var fs = require('fs')

var path = require('path')
var app = express();//执行express返回封装对象

var city = require('./mock/city')
var index = require('./mock/index')
var detail = require('./mock/detail')
//静态资源处理
app.use(express.static(path.resolve(__dirname, "../client/dist")))
//处理前端get请求,req.query包含get请求参数,res.send响应请求
app.get("/todolist",function(req,res){
  fs.readFile(path.resolve(__dirname, '../client/dist/todolist.html'), function(err, content){
    res.set('Content-Type', 'text/html');
    res.status('200').send(content)
  })
})
//处理前端get请求,req.query包含get请求参数,res.send响应请求
app.get("/routerDemo/*",function(req,res){
  fs.readFile(path.resolve(__dirname, '../client/dist/routerDemo.html'), function(err, content){
    res.set('Content-Type', 'text/html');
    res.status('200').send(content)
  })
})
app.get("/vueDemo/api/*",function(req, res){
  console.log(req.baseUrl, 1111)
  res.status(200).json(city);
})

app.get("/vueDemo/*",function(req,res){
  fs.readFile(path.resolve(__dirname, '../client/dist/vueDemo.html'), function(err, content){
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.status('200').send(content)
  })
})

//处理前端post请求,req.body包含post请求参数
app.post("/postData",function(req,res){

})

//设置监听端口号,开启服务
app.listen(8080,function(){
    console.log("服务已开启")
})