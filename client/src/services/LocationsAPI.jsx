const API_BASE_URL = `/api/locations`

const getAllLocations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching locations: ', error)
    }
}

const getLocationById = async (locationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${locationId}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching locations: ', error)
    }
}

export default {
    getAllLocations, getLocationById
}