const models = require('../models/robots.js')

function getAll(req, res, err) {
  let data = models.getAll()
  res.status(200).json({data})
}

function getOne(req, res, err) {
  let data = models.getOne(req.params.id)
  res.status(200).json({data})
}

function create(req, res, err) {
  const result = models.create(req.body)
  if (result.errors) {
    return res.json({ status: 400, error: result.errors[0] })
  }
  res.status(201).json({data : result})
}

function update(req, res, err){

  const result = models.update(req.body, req.params.id)
  if (result.errors) {
    return res.json({ status: 400, error: result.errors[0] })
  }
  res.status(201).json({data : result})
}


module.exports = {getAll, getOne, create, update}
