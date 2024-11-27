const express = require('express')
const fs = require("fs")
const app = express()
const port = 4000;
const zlib = require('zlib');
const status = require("express-status-monitor");
const { stream } = require('stream');
app.use(status())
// Read the file

fs.createReadStream('./metakey.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('./metakey.zip')))

app.get("/", (req,res)=>{
    fs.readFile("./hipdf", (err,data)=>{
        res.end(data)
    })
})

app.get ("/about",(req,res)=>{
    fs.readFile("./metakey.txt",(err,data)=>{
        res.end(data)
    })
})

app.get("/streamcheck", (req,res)=>{
    const stream = fs.createReadStream("./hi pdf");
    stream.on('data',(chunk)=>res.write(chunk))
    stream.on("end",()=>res.send())
})
