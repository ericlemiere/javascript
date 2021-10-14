// bring in the express server and create app
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo');

// use the express Router object
let router = express.Router();

// configure middleware to support JSON data parsing in request object
app.use(express.json());


// create GET to return a list of all pies
router.get('/', function(req, res, next) {
    pieRepo.get(function(data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});

router.get('/search', function (req, res, next) {
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    pieRepo.search(searchObject, function(data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});


router.get('/:id', function(req, res, next) {
    pieRepo.getById(req.params.id, function(data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Pie " + req.params.id + " retrieved",
                "data": data
            });
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "Pie " + req.params.id + " not found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "Pie " + req.params.id + " not found."
                }
            });
        }
    }, function(err) {
        next(err);
    });
});

router.post('/', function(req, res, next) {
    pieRepo.insert(req.body, function(data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Pie Added",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});

// configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// create server to listen on port 5000
var server = app.listen(5000, function() {
    console.log('Node server running on http://localhost:5000..');
});