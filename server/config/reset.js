import { pool } from './database.js'
import './dotenv.js'

const createTables = async () => {

    const createLocationsTable = `

        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            image TEXT
        );
    `

    const createEventsTable = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            time VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            location_id INTEGER NOT NULL REFERENCES locations(id)
        );
    `

    const locations = [
        ['Location #1', 'address', 'city', 'state', 'zip', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F6a96e783-5aa1-424b-ad89-aa59ee788ff4%2Fdlu9dvv-a7e3cbb3-0360-41af-88f6-3ad51625642e.jpg%2Fv1%2Ffill%2Fw_1095%2Ch_730%2Cq_70%2Cstrp%2Ftadc_ep_9_thumbnail_redraw_by_pappard_elle_dlu9dvv-pre.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODUzIiwicGF0aCI6Ii9mLzZhOTZlNzgzLTVhYTEtNDI0Yi1hZDg5LWFhNTllZTc4OGZmNC9kbHU5ZHZ2LWE3ZTNjYmIzLTAzNjAtNDFhZi04OGY2LTNhZDUxNjI1NjQyZS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.xUHXmNjiloTuePdnfssQb-5ZHW8wOemSjy8VnpkV7I8&f=1&nofb=1&ipt=a1cdf1ed4a121b2aa11f48aa1c0a428f0236017c382fe27bfdb82ba6589a2760'],
        ['Location #2', 'address', 'city', 'state', 'zip', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F6a96e783-5aa1-424b-ad89-aa59ee788ff4%2Fdlu9dvv-a7e3cbb3-0360-41af-88f6-3ad51625642e.jpg%2Fv1%2Ffill%2Fw_1095%2Ch_730%2Cq_70%2Cstrp%2Ftadc_ep_9_thumbnail_redraw_by_pappard_elle_dlu9dvv-pre.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODUzIiwicGF0aCI6Ii9mLzZhOTZlNzgzLTVhYTEtNDI0Yi1hZDg5LWFhNTllZTc4OGZmNC9kbHU5ZHZ2LWE3ZTNjYmIzLTAzNjAtNDFhZi04OGY2LTNhZDUxNjI1NjQyZS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.xUHXmNjiloTuePdnfssQb-5ZHW8wOemSjy8VnpkV7I8&f=1&nofb=1&ipt=a1cdf1ed4a121b2aa11f48aa1c0a428f0236017c382fe27bfdb82ba6589a2760'],
        ['Location #3', 'address', 'city', 'state', 'zip', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F6a96e783-5aa1-424b-ad89-aa59ee788ff4%2Fdlu9dvv-a7e3cbb3-0360-41af-88f6-3ad51625642e.jpg%2Fv1%2Ffill%2Fw_1095%2Ch_730%2Cq_70%2Cstrp%2Ftadc_ep_9_thumbnail_redraw_by_pappard_elle_dlu9dvv-pre.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODUzIiwicGF0aCI6Ii9mLzZhOTZlNzgzLTVhYTEtNDI0Yi1hZDg5LWFhNTllZTc4OGZmNC9kbHU5ZHZ2LWE3ZTNjYmIzLTAzNjAtNDFhZi04OGY2LTNhZDUxNjI1NjQyZS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.xUHXmNjiloTuePdnfssQb-5ZHW8wOemSjy8VnpkV7I8&f=1&nofb=1&ipt=a1cdf1ed4a121b2aa11f48aa1c0a428f0236017c382fe27bfdb82ba6589a2760'],
        ['Location #4', 'address', 'city', 'state', 'zip', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F6a96e783-5aa1-424b-ad89-aa59ee788ff4%2Fdlu9dvv-a7e3cbb3-0360-41af-88f6-3ad51625642e.jpg%2Fv1%2Ffill%2Fw_1095%2Ch_730%2Cq_70%2Cstrp%2Ftadc_ep_9_thumbnail_redraw_by_pappard_elle_dlu9dvv-pre.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODUzIiwicGF0aCI6Ii9mLzZhOTZlNzgzLTVhYTEtNDI0Yi1hZDg5LWFhNTllZTc4OGZmNC9kbHU5ZHZ2LWE3ZTNjYmIzLTAzNjAtNDFhZi04OGY2LTNhZDUxNjI1NjQyZS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.xUHXmNjiloTuePdnfssQb-5ZHW8wOemSjy8VnpkV7I8&f=1&nofb=1&ipt=a1cdf1ed4a121b2aa11f48aa1c0a428f0236017c382fe27bfdb82ba6589a2760'],
    ]

    const events = [
        ['Event #1', 'date #1', 'time #1', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff5%2F25%2F03%2Ff525037a4081edd64955bac784e9a5c8.jpg&f=1&nofb=1&ipt=a2afaa3af49dba5547f690648e562ce682324c1a75d7aad044248eb00116760e'],
        ['Event #2', 'date #2', 'time #2', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff5%2F25%2F03%2Ff525037a4081edd64955bac784e9a5c8.jpg&f=1&nofb=1&ipt=a2afaa3af49dba5547f690648e562ce682324c1a75d7aad044248eb00116760e'],
        ['Event #3', 'date #3', 'time #3', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff5%2F25%2F03%2Ff525037a4081edd64955bac784e9a5c8.jpg&f=1&nofb=1&ipt=a2afaa3af49dba5547f690648e562ce682324c1a75d7aad044248eb00116760e'],
        ['Event #4', 'date #4', 'time #4', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff5%2F25%2F03%2Ff525037a4081edd64955bac784e9a5c8.jpg&f=1&nofb=1&ipt=a2afaa3af49dba5547f690648e562ce682324c1a75d7aad044248eb00116760e'],
        ['Event #5', 'date #5', 'time #5', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff5%2F25%2F03%2Ff525037a4081edd64955bac784e9a5c8.jpg&f=1&nofb=1&ipt=a2afaa3af49dba5547f690648e562ce682324c1a75d7aad044248eb00116760e'],
        ['Event #6', 'date #6', 'time #6', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff5%2F25%2F03%2Ff525037a4081edd64955bac784e9a5c8.jpg&f=1&nofb=1&ipt=a2afaa3af49dba5547f690648e562ce682324c1a75d7aad044248eb00116760e'],
        ['Event #7', 'date #7', 'time #7', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff5%2F25%2F03%2Ff525037a4081edd64955bac784e9a5c8.jpg&f=1&nofb=1&ipt=a2afaa3af49dba5547f690648e562ce682324c1a75d7aad044248eb00116760e'],
        ['Event #8', 'date #8', 'time #8', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff5%2F25%2F03%2Ff525037a4081edd64955bac784e9a5c8.jpg&f=1&nofb=1&ipt=a2afaa3af49dba5547f690648e562ce682324c1a75d7aad044248eb00116760e'],
    ]

    try {
        await pool.query(createLocationsTable)
       
        const locationIds = []

        for (const [name, address, city, state, zip, image] of locations) {
            const result = await pool.query({
                text: `INSERT INTO locations (name, address, city, state, zip, image)
                       VALUES ($1, $2, $3, $4, $5, $6)
                       RETURNING id`,
                values: [name, address, city, state, zip, image]
            })

            locationIds.push(result.rows[0].id)
        }
        console.log('🌱 locations table seeded')



        for (let i = 0; i < events.length; i++) {
            const [name, date, time, image] = events[i]

            await pool.query({
                text: `INSERT INTO events (name, date, time, image, location_id)
            VALUES ($1,$2,$3,$4,$5)`,
            values: [name, date, time, image, locationIds[i % locationIds.length]]
            })

            // await pool.query(createEventsTable)
            // for (const [name, date, time, image, location_id] of events) {
            //     await pool.query({
            //         text: `INSERT INTO events (name, date, time, image, location_id)
            //             VALUES ($1, $2, $3, $4, $5)`,
            //         values: [name, date, time, image, location_id]
            //     })
            // }
        }
        console.log('🌱 events table seeded')
    } catch (err) {
        console.error('reset failed:', err)
    } finally {
        await pool.end()
    }
}

createTables()