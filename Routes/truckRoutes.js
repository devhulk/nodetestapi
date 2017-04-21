var express = require('express');


var routes = function (Truck) {
    var trucksRouter = express.Router();

    trucksRouter.route('/')
        .post(function (req,res) {
            var truck = new Truck(req.body);

            truck.save();
            res.status(201).send(truck);




            console.log(truck);
            res.send(truck);
        })
        .get(function (req,res) {
            Truck.find(function (err,trucks) {
                if(err)
                    res.status(500).send(err);
                else
                    res.json(trucks);
            });

        });

    trucksRouter.use('/:_id', function (req,res,next) {
        Truck.findById(req.params._id, function (err, trucks) {
            if (err)
                res.status(500).send(err);
            else if (trucks){
                req.trucks = trucks;
                next();
            }
            else{
                res.status(404).send('no truck found')
            }
            res.json(trucks);

        });
    });
    trucksRouter.route('/:_id')
        .get(function (req,res) {
            res.json(req.trucks);

        })
        .put(function (req,res) {
           req.trucks.Name = req.body.Name;
           req.trucks.TowingCapacity = req.body.TowingCapacity;
           req.trucks.MPG = req.body.MPG;
           req.trucks.CurbWeight = req.body.CurbWeight;
           req.trucks.Dimensions = req.body.Dimensions;
           req.trucks.save(function(err){

               if(err)
                   res.status(500).send(err);
               else {res.json(req.trucks)}
           });
           res.json(req.trucks);
        })
        .patch(function (req,res) {
            if(req.body._id)
                delete req.body._id;
            for(var p in req.body){
                req.trucks[p] = req.body[p];
            }
            req.trucks.save(function(err){

                if(err)
                    res.status(500).send(err);
                else {res.json(req.trucks)}
            });
        });
    return trucksRouter;
};

module.exports = routes;