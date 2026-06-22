const API_BASE_URL = `/api/events`

const getAllEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching events: ', error)
    }
}

const getEventsById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error fetching event ${id}: `, error)
    }
}

const getEventsByLocation = async (locationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/location/${locationId}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching events: ', error)
    }
}

export default {
    getAllEvents, getEventsById, getEventsByLocation
}