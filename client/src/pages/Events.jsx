import { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        })()
    }, [])

    return (
        <div className='events-page'>
            <h1>All Events</h1>
            <main className='main-circle'>
                <div className='abc'>

                    
                    {
                        events && events.length > 0 ? events.map((event) =>
                            <Event
                                key={event.id}
                                id={event.id}
                                title={event.name}
                                date={event.date}
                                time={event.time}
                                image={event.image}
                            />
                        ) : <h2>No events available</h2>
                    }
                </div>
            </main>
        </div>
    )
}

export default Events