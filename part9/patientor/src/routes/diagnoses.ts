import express from 'express'
import diagnosesService from '../services/diagnosesService'

const router = express.Router()

router.get('/', (_req, res) => {
  console.log("got here to router ")
  res.send(diagnosesService.getDiagnoses())
})

export default router