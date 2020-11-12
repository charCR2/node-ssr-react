const express = require('express')
const app = express()
const list = require('./ceshi/list')
const cors = require('../servers/middleware/cros')

app.use(cors);
app.get('/list/get', function(req, res){
    let {page, pageSize} = req.query
    if(page && pageSize){
        page = parseInt(page);
        pageSize = parseInt(pageSize)
        const firstNum = (page - 1)*pageSize;
        const lastNum = firstNum + pageSize
        let currentList = list.slice( firstNum, lastNum )
        currentList.forEach((item, index) => item.id = firstNum + index + 1)
        res.status(200).json({data: currentList})
    }else{
        list.forEach((item, index) => item.id = index)
        res.status(200).json({data: list})
    }
})

app.listen(1234)