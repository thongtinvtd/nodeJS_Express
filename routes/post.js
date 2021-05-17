const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Model = require('../models/models');
const mqtt = require('mqtt');
const clientMQTT = mqtt.connect('mqtt://localhost:1883')
const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI
const token = '6p24PaS5G-H1LCMMMy5FSLR6uhR-YDdLeej4qI5Gdj-JYIYM6r9PM47gIVeGrpQduUklGZhRbZ5Pji8ce5yUuA=='
const org = 'thongtinvtd'
const bucket = 'thongtinvtd'
const clientInflux = new InfluxDB({url: 'http://localhost:8086', token: token})

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
    console.log("post successfully",req.body)
    const model = new Model({
        piece: req.body.piece,
        position: req.body.position,
    });
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
router.patch('/:pieceName', async (req,res) => {
    console.log("post successfully",req.body)
    publishMQTT(JSON.stringify(req.body));
    try {
        const updatePiece = await Model.updateOne(
            {piece: req.params.pieceName},
            {$set: {position: req.body.position}});
        res.json(updatePiece);
    }catch(err){
        res.json({message: err});
   }
    let _measurement = "ChessData";
    let _host = "host1";
    let tag = String(req.params.pieceName)
    // let posX = String(req.params.pieceName) + "posX";
    // let posY = String(req.params.pieceName) + "posY";
    let posX = "posX";
    let posY = "posY";
    //    let value = JSON.stringify(req.body.position);

    let valuePosX = req.body.position.posX;
    let valuePosY = req.body.position.posY;
    writeInflux(_measurement, posX, posY, _host, valuePosX, valuePosY, tag);
    

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

clientMQTT.on("connect",function(){	
    console.log("connected MQTT broker "+clientMQTT.connected);
})
clientMQTT.on("error",function(error){
    console.log("Can't connect MQTT broker " + error);
    process.exit(1)});

function getDataFromMongo(){
    try{
        const model = Model.find().lean();
        console.log(model);
        let modelStr =JSON.stringify(model)
        return modelStr
    } catch(err){
        console.log(err);
    }


}
function publishMQTT(data){
    console.log("send to topic dev/test2 ");
    if(clientMQTT.connected==true){
        clientMQTT.publish('dev/test2',data);   
}
}

function writeInflux(_mesurement,_field1,_field2,_host,value1,value2,tag){
    const {Point} = require('@influxdata/influxdb-client')
    const writeApi = clientInflux.getWriteApi(org, bucket)
    writeApi.useDefaultTags({host: _host})
    // jsonToSend =[{
    //     measurement: nameMesurement,
    //     time: "",
    //     fields: {
    //       position:position
    //     }
    //   }]
  
    const point = new Point(_mesurement)
        .tag("tag",tag)
        // .stringField(_field,value)
        .intField(_field1,value1)
        .intField(_field2,value2)
        // .intField(_field,position[1])
        // .tagField('test Tag field',2)
    writeApi.writePoint(point)
    writeApi
        .close()
        .then(() => {
            console.log('FINISHED')
        })
        .catch(e => {
            console.error(e)
            console.log('\\nFinished ERROR')
        })

    }
module.exports = router;

