let express = require('express');
let router = express.Router();
const dataInventor = require('./../data/Inventor');
const auth = require('../middleware/auth');

/* GET listado de inventores */
router.get('/', auth, async function(req, res, next) {
  res.json(await dataInventor.getAllInventors());
});

// GET de un inventor
// /inventors/56
router.get('/:id', async (req,res)=>{
    res.json(await dataInventor.getInventor(req.params.id));
});

// POST alta de un inventor
router.post('/',async  (req,res)=> {
    const inventor = req.body;
    await dataInventor.pushInventor(inventor);
    const inventorPersistido = await dataInventor.getInventor(inventor._id);
    res.json(inventorPersistido);
});

// PUT modificacion de un inventor
router.put('/:id', async (req,res)=>{
    const inventor = req.body;
    inventor._id = req.params.id;
    await dataInventor.updateInventor(inventor);

    res.json(await dataInventor.getInventor(req.params.id));
});

router.delete('/:id', async (req,res)=> {
    await dataInventor.deleteInventor(req.params.id);
    res.send('Inventor eliminado');
});

module.exports = router;