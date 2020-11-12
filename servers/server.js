var express = require("express");
var fs = require('fs')
var chalk = require('chalk')
var path = require('path')
var app = express();//执行express返回封装对象
var cors = require('./middleware/cros')

var staticFile = {
    city : require('./mock/city'),
    index: require('./mock/index'),
    detail: require('./mock/detail')
}

import { routerDemoHeadler } from'./router/index'

// app.use(cors) // 处理允许跨域
// // 静态资源处理
app.use(express.static(path.resolve(__dirname, "../client/dist")))
// //处理前端get请求,req.query包含get请求参数,res.send响应请求
app.get("/todolist",function(req,res){
  fs.readFile(path.resolve(__dirname, '../client/dist/todolist.html'), function(err, content){
    res.set('Content-Type', 'text/html');
    res.status('200').send(content)
  })
})
// //处理前端get请求,req.query包含get请求参数,res.send响应请求
app.get("/routerDemo/*",function(req,res){
  fs.readFile(path.resolve(__dirname, '../client/dist/routerDemo.html'), function(err, content){
    res.set('Content-Type', 'text/html');
    res.status('200').send(content)
  })
})
app.get("/vueDemo/api/:filename",function(req, res){
  const file = req.params.filename
  res.status(200).json(staticFile[file]);
})

// app.get("/vueDemo/*",function(req,res){
//   fs.readFile(path.resolve(__dirname, '../client/dist/vueDemo.html'), function(err, content){
//     res.set('Content-Type', 'text/html; charset=utf-8');
//     res.status('200').send(content)
//   })
// })

app.get("/vueDemo/*", routerDemoHeadler)
// 处理前端post请求,req.body包含post请求参数
// app.post("/postData",function(req,res){

// })


//设置监听端口号,开启服务
app.listen(8082,function(){
    console.log("服务已开启")
})
