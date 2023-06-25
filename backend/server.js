const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const { log } = require('console');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// get all contacts
app.get('/api/contacts', (req, res) => {
    try{
        fs.readFile('./contacts.json', (err, data) => {
            if(err) throw new Error(err.message);
            res.status(200).json({
                status: 'true',
                data: JSON.parse(data)
            });
        });
    }catch(err){
        res.status(200).json({
            status: false,
            message: err?.message
        });
    }
});

// get a specific contact
app.get('/api/contacts/:id', (req, res)=>{
    try{
        const jsonDatas  = fs.readFileSync('./contacts.json', 'utf-8');
        const data = JSON.parse(jsonDatas).filter((data) => data.id == req.params.id);
        res.status(200).json({
            status: true,
            data
        });
    }catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

// create new contact
app.post('/api/contacts', (req, res) => {
    try{
        let updatedData;
        const jsonData = fs.readFileSync('./contacts.json', 'utf-8');
        const user = req.body
        if(jsonData){
            const datas = JSON.parse(jsonData);
            console.log(datas.length)
            user.id = datas.length+1
            updatedData = [...datas, user];
        }else{
            user.id = datas.length+1
            updatedData = user;
        }
        fs.writeFile('./contacts.json', JSON.stringify(updatedData), (err) => {
            if (err) throw new Error(err.message);
        });
        res.status(200).json({
            status: true,
            message: 'contact added successfully',
            data: req.body
        });
    }catch(err){
        res.status(500).json({
            status: false,
            message: err?.message
        });
    }
});

// edit a specific contact
app.put('/api/contacts/:id', (req, res)=>{
    try{
        const jsonDatas  = fs.readFileSync('./contacts.json', 'utf-8');

        const data = JSON.parse(jsonDatas).filter((data) => data.id != req.params.id);
        const user = req.body
        user.id = req.params.id
        data.push(user);

        fs.writeFile('./contacts.json', JSON.stringify(data), (err)=>{
            if(err) throw new Error(err.message);
        });
        res.status(200).json({
            staus: true,
            message: "data updated successfully",
            data: req.body
        });
    }catch(err){
        res.status(500).json({
            status: false,
            message: err?.message
        });
    }
});

// delete a specific contact
app.delete('/api/contacts/:id', (req, res)=>{
    try{
        console.log(req.params.id);
        const jsonDatas  = fs.readFileSync('./contacts.json', 'utf-8');
        const data = JSON.parse(jsonDatas).filter((data) => data.id != req.params.id);
    
        fs.writeFile('./contacts.json', JSON.stringify(data), (err)=>{
            if(err) throw new Error(err.message);
        });
        res.status(200).json({
            status: true,
            message: 'data deleted success'
        });
    }catch(err){
        res.status(500).json({
            status: false,
            message: err?.message
        });
    }
});

app.listen(4000, () => {
    console.log("server connected to port 4000");
});