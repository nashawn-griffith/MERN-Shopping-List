const express = require('express');
const item = require('../models/itemModel');
const router = express.Router();

/*get Items*/
router.get('/', async (req, res, next) => {
  try {
    let items = await item.find();
    if (items.length === 0) {
      return res.status(204).json({});
    }

    body = {
      meta: {statusCode: 200},
      data: {items},
      err: null
    };

    return res.status(200).json(body);
  } catch (error) {
    body = {
      meta: {statusCode: 500},
      data: null,
      err: error.message
    };
    return res.status(500).json(body);
  }
});

/*Add item*/
router.post('/add', async (req, res, next) => {
  try {
    const {name} = req.body;

    let newItem = new item({
      name
    });

    const result = await newItem.save();

    const body = {
      meta: {statusCode: 201},
      data: result,
      error: null
    };

    return res.status(201).json(body);
  } catch (error) {
    const body = {
      meta: {statusCode: 422},
      data: null,
      error: 'Bad Input'
    };

    return res.status(422).json(body);
  }
});

/*Delete Item*/
router.post('/delete/', async (req, res, next) => {
  const {id} = req.body;

  try {
    let product = await item.findOne({_id: id});

    if (product) {
      await product.delete();

      const body = {
        meta: {statusCode: 200},
        data: {message: 'Item removed successfully'},
        error: null
      };

      return res.status(200).json(body);
    }
  } catch (error) {
    const body = {
      meta: {statusCode: 400},
      data: null,
      error: 'Item could not be deleted'
    };
    return res.status(400).json(body);
  }
});

module.exports = router;
