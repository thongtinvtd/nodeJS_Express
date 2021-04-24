const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Model = require('../models/models');
//GET
router.get('/',async (req,res) => {
    try{
        const model = await Model.find();
        res.json(model);
    } catch(err){
        res.json({message: err});
   }
})
//POST
router.post('/',async (req,res) => {
    const model = new Model({
        piece: req.body.piece,
        position: {
            posX:req.body.position.posX,
            posY:req.body.position.posY
    }});
    try {
        const savedModel = await model.save();
        res.json(savedModel);
    } catch(err){
         res.json({message: err});
    }
    });
//GET 1 
router.get('/:pieceId',async (req,res) => {
    try {
        const piece = await Model.findByID(req.params.pieceId);
        res.json(piece);
    }catch(err){
        res.json({message: err});
   }
})
//UPDATE 1
router.patch('/:pieceId', async (req,res) => {
    try {
        const updateId = await Model.updateOne(
            {_id: req.params.pieceId},
            {$set: {position: req.body.position}});
        res.json(updateId);
    }catch(err){
        res.json({message: err});
   }
})
//DELETE
router.delete('/:pieceId', async (req,res) => {
    try {
        const removeId = await Model.remove({_id:req.params.pieceId});
        res.json(removeId);
    }catch(err){
        res.json({message: err});
   }
})

module.exports = router;