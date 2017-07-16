const router = require('express').Router();
const messService = require('../../services/message');

router.get('/', (req, res, next) => {
    messService.findAll((err, data) => {
        if (!err){
            res.data = data;
            res.json(res.data);
        } else {
            res.status(400);
            res.end();
        }
    });
});

router.get('/:id', (req, res, next) => {
    messService.findOne(Number(req.params.id), (err, data) => {
        if (!err){
            res.data = data;
            res.json(res.data);
        } else {
            res.status(400);
            res.end();
        }
    });
});

router.post('/', (req, res, next) => {
    const obj = req.body;
    messService.add(obj, (err, data) => {
    res.send(obj);
    });
});

router.delete('/:id', (req, res, next) => {
    messService.findOneAndDelete(Number(req.params.id), (err, data) => {
        if (!err){
            res.json(res.data);
        } else {
            res.status(400);
            res.end();
        }
    });
});

router.put('/:id', (req, res, next) => {
    const obj = req.body;
    messService.findOneAndUpdate(Number(req.params.id), obj, (err, data) => {
        if (!err){
            res.json(res.data);
        } else {
            res.status(400);
            res.end();
        }
    });
    
});

module.exports = router;