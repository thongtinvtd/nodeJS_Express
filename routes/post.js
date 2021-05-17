const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Model = require('../models/models');
const mqtt = require('mqtt');
const clientMQTT = mqtt.connect('mqtt://localhost:1883')
const { InfluxDB } = require('@influxdata/influxdb-client')
// You can generate a Token from the "Tokens Tab" in the UI
const token = 'mY2F1NoeIxQRvQFdU1FUdJFvHjCNZ3aSrtmwsWE6upDP96V9ES2RrozyEidekDzKrdlkyPJrL_FFQTE_Srxs7g=='
const org = 'thongtinvtd'
const bucket = 'thongtinvtd'
const clientInflux = new InfluxDB({ url: 'http://localhost:8086', token: token })

//GET
router.get('/', async (req, res) => {
    console.log("get All")
    try {
        const model = await Model.find();
        res.json(model);
    } catch (err) {
        res.json({ message: err });
    }
})
//POST
router.post('/', async (req, res) => {
    console.log("post successfully", req.body)
    const model = new Model({
        piece: req.body.piece,
        position: req.body.position,
    });
    try {
        const savedModel = await model.save();
        res.json(savedModel);
    } catch (err) {
        res.json({ message: err });
    }
});
//GET 1 
let pieceOj = [];
let arrayPieceX = [[],];
let arrayPieceY = [[],];
for (let i = 0; i < 24; i++) {
    pieceOj.push([]);
}

function clearArray() {
    pieceOj = [];
    arrayPieceX = [[],];
    arrayPieceY = [[],];
    for (let i = 0; i < 24; i++) {
        pieceOj.push([]);

        arrayPieceX.push([]);
        arrayPieceY.push([]);
    }
}
clearArray();
router.get('/:Id', async (req, res) => {
    if (req.params.Id == "heatmap") {
        console.log("this is route");
        //     const data = queryInflux();
        //     res.json(data);
        const arrayTime = [];
        const arrayPiece = [
            'pieceBlack0',
            'pieceBlack1',
            'pieceBlack2',
            'pieceBlack3',
            'pieceBlack4',
            'pieceBlack5',
            'pieceBlack6',
            'pieceBlack7',
            'pieceBlack8',
            'pieceBlack9',
            'pieceBlack10',
            'pieceBlack11',
            'pieceWhite0',
            'pieceWhite1',
            'pieceWhite2',
            'pieceWhite3',
            'pieceWhite4',
            'pieceWhite5',
            'pieceWhite6',
            'pieceWhite7',
            'pieceWhite8',
            'pieceWhite9',
            'pieceWhite10',
            'pieceWhite11',
        ];
        queryApi.queryRows(query, {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                console.log(
                    `${o.tag} ${o._field} ${o._value} ${o._time}`
                )
                for (let i = 0; i < arrayPiece.length; i++) {
                    if (o.tag == arrayPiece[i]) {
                        arrayTime.push(o._time)
                        if (o._field == 'posX') {
                            arrayPieceX[i].push(o._value)
                        } else
                            if (o._field == 'posY') {
                                arrayPieceY[i].push(o._value)
                            }
                        pieceOj[i] = {
                            posX: arrayPieceX[i],
                            posY: arrayPieceY[i]
                        }

                    }
                }
            },
            error(error) {
                console.error(error)
                console.log('\nFinished ERROR')
            },
            complete() {
                // console.log(pieceOj);
                console.log('\nFinished SUCCESS')
                res.json(pieceOj);
                clearArray();

            },
        })

        console.log(pieceOj);
    }

    //     try {
    //         const piece = await Model.findByID(req.params.pieceId);
    //         res.json(piece);
    //     }catch(err){
    //         res.json({message: err});
    //    }
})
//UPDATE 1
router.patch('/:pieceName', async (req, res) => {
    console.log("post successfully", req.body)
    publishMQTT(JSON.stringify(req.body));
    try {
        const updatePiece = await Model.updateOne(
            { piece: req.params.pieceName },
            { $set: { position: req.body.position } });
        res.json(updatePiece);
    } catch (err) {
        res.json({ message: err });
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
router.delete('/:pieceId', async (req, res) => {
    try {
        const removeId = await Model.remove({ _id: req.params.pieceId });
        res.json(removeId);
    } catch (err) {
        res.json({ message: err });
    }
})

clientMQTT.on("connect", function () {
    console.log("connected MQTT broker " + clientMQTT.connected);
})
clientMQTT.on("error", function (error) {
    console.log("Can't connect MQTT broker " + error);
    process.exit(1)
});

function getDataFromMongo() {
    try {
        const model = Model.find().lean();
        console.log(model);
        let modelStr = JSON.stringify(model)
        return modelStr
    } catch (err) {
        console.log(err);
    }


}
function publishMQTT(data) {
    console.log("send to topic dev/test2 ");
    if (clientMQTT.connected == true) {
        clientMQTT.publish('dev/test2', data);
    }
}

function writeInflux(_mesurement, _field1, _field2, _host, value1, value2, tag) {
    const { Point } = require('@influxdata/influxdb-client')
    const writeApi = clientInflux.getWriteApi(org, bucket)
    writeApi.useDefaultTags({ host: _host })

    const point = new Point(_mesurement)
        .tag("tag", tag)
        .intField(_field1, value1)
        .intField(_field2, value2)
    writeApi.writePoint(point)
    writeApi
        .close()
        .then(() => {
            console.log('FINISHED WRITE TO INFLUXDB')
        })
        .catch(e => {
            console.error(e)
            console.log('\\nFinished ERROR')
        })

}
const queryApi = clientInflux.getQueryApi(org)

const query = `from(bucket: "thongtinvtd")
    |> range(start: -30d)
    |> filter(fn: (r) => r._measurement == "ChessData")
    |> filter(fn: (r) => r.host == "host1")
    |> group(columns: ["_time"])
    `
// |> yield(name:"last")
// |> filter(fn: (r) => r.tag == "pieceBlack0")

// get all data heatmap 
function queryInflux() {
    const arrayTime = [];
    const arrayPieceX = [];
    const arrayPieceY = [];
    const pieceOj = [[],];
    let object1 = [];
    queryApi.queryRows(query, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row)
            console.log(
                `${o.tag} ${o._field} ${o._value} ${o._time}`
            )

            if (o.tag == 'pieceBlack0') {
                arrayTime.push(o._time)
                if (o._field == 'posX') {
                    arrayPieceX.push(o._value)
                } else
                    if (o._field == 'posY') {
                        arrayPieceY.push(o._value)
                    }
            }

            if (arrayPieceX.length == arrayPieceY.length) {
                pieceOj[0] = {
                    posX: arrayPieceX,
                    posY: arrayPieceY
                }
            }

            // console.log(JSON.stringify(o, null, 2))
        },
        error(error) {
            console.error(error)
            console.log('\nFinished ERROR')
        },
        complete() {
            console.log(pieceOj);
            console.log('\nFinished SUCCESS')
            object1 = pieceOj;

        },

    })
    return object1;
}

module.exports = router;

