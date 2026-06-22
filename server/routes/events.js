import express from 'express'
// import controllers for events and locations
import { getAllEvents, getEvent, getEventsByLocation } from '../controllers/events.js'


const eventsRouter = express.Router()

// define routes to get events and locations
eventsRouter.get('/', getAllEvents)
eventsRouter.get('/location/:location_id', getEventsByLocation)
eventsRouter.get('/:id', getEvent)


export default eventsRouter