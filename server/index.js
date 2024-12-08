import mongoose from 'mongoose';
import express from 'express';
import NoteModel from '../model/notes.js'
import pkg from 'statuses';
const {message}=pkg;

const app=express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/notekeeper').then(()=>{
    console.log('Connected to database');
    app.listen(3002, ()=> console.log("Server is running"))
});
// app.get('/',async(req,res)=>{
//     try{
//         // const notes=await NoteModel.find({});
//         // res.json(notes);
//         res.send('this is my server');
//     }catch(error){
//         console.log(error);
//     }
// })

app.get('/',async(req,res)=>{
    try{
        const notes=await NoteModel.find({});
        res.status(200).json(notes);
    }catch(error){
        console.log(error);
    }
})

app.post('/',async(req,res)=>{
    try{
        const note =new NoteModel(req.body);
        const savedNote=await note.save();
        res.status(200).json(savedNote);
    }catch(error){
        console.log(error);
    }
})

app.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedNote= await NoteModel.findByIdAndDelete(id);
        if(!deletedNote){
            return res.status(404).json({message: 'note not found'})
        }
        res.status(200).json({message:'note deleted successfully'});
    }catch(error){
        console.log(error);
    }  
})

app.put('/:id', async(req, res)=>{
    try
    {
        const {id}=req.params;
        const note=await NoteModel.findByIdAndUpdate(id, req.body);
        if(!note){
            return res.status(404).json({message:"not found"});
        }
        const updatedNote=await NoteModel.findById(id);
        res.status(200).json(updatedNote);  
    }catch(error){
        console.log(error);
    }
})
//app.delete('/notes')