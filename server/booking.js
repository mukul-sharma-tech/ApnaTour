const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Supported Indian cities
const cities = [
    { id: 1, name: 'Mumbai', code: 'BOM', state: 'Maharashtra' },
    { id: 2, name: 'Delhi', code: 'DEL', state: 'Delhi' },
    { id: 3, name: 'Bangalore', code: 'BLR', state: 'Karnataka' },
    { id: 4, name: 'Hyderabad', code: 'HYD', state: 'Telangana' },
    { id: 5, name: 'Chennai', code: 'MAA', state: 'Tamil Nadu' },
    { id: 6, name: 'Kolkata', code: 'CCU', state: 'West Bengal' },
    { id: 7, name: 'Pune', code: 'PNQ', state: 'Maharashtra' },
    { id: 8, name: 'Jaipur', code: 'JAI', state: 'Rajasthan' },
    { id: 9, name: 'Ahmedabad', code: 'AMD', state: 'Gujarat' },
    { id: 10, name: 'Goa', code: 'GOI', state: 'Goa' },
    { id: 11, name: 'Lucknow', code: 'LKO', state: 'Uttar Pradesh' },
    { id: 12, name: 'Kochi', code: 'COK', state: 'Kerala' },
    { id: 13, name: 'Patna', code: 'PAT', state: 'Bihar' },
    { id: 14, name: 'Bhopal', code: 'BHO', state: 'Madhya Pradesh' },
    { id: 15, name: 'Chandigarh', code: 'IXC', state: 'Chandigarh' },
    { id: 16, name: 'Uttarakhand', code: 'DHM', state: 'Uttarakhand' },
];

// Mock database for bookings
let bookings = [];

// Get all supported cities
app.get('/api/cities', (req, res) => {
    res.json(cities);
});

// Search for available options
app.post('/api/search', (req, res) => {
    const { from, to, date, mode } = req.body;
    
    if (!from || !to || !date || !mode) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Validate cities
    const fromCity = cities.find(c => c.id == from || c.code === from);
    const toCity = cities.find(c => c.id == to || c.code === to);
    
    if (!fromCity || !toCity) {
        return res.status(400).json({ error: 'Invalid city codes' });
    }

    // Generate mock results based on mode
    let results = [];
    const basePrice = Math.floor(Math.random() * 5000) + 1000;
    const departureTime = new Date(date);
    departureTime.setHours(Math.floor(Math.random() * 24));
    departureTime.setMinutes(Math.floor(Math.random() * 60));

    switch(mode.toLowerCase()) {
        case 'flight':
            results = generateFlights(fromCity, toCity, departureTime, basePrice * 2);
            break;
        case 'train':
            results = generateTrains(fromCity, toCity, departureTime, basePrice / 2);
            break;
        case 'bus':
            results = generateBuses(fromCity, toCity, departureTime, basePrice / 3);
            break;
        case 'cab':
            results = generateCabs(fromCity, toCity, departureTime, basePrice / 10);
            break;
        default:
            return res.status(400).json({ error: 'Invalid travel mode' });
    }

    res.json({
        from: fromCity,
        to: toCity,
        date: date,
        mode: mode,
        results: results
    });
});

// Helper functions to generate mock data
function generateFlights(from, to, departureTime, basePrice) {
    const airlines = [
        { id: 1, name: 'Air India', code: 'AI' },
        { id: 2, name: 'IndiGo', code: '6E' },
        { id: 3, name: 'SpiceJet', code: 'SG' },
        { id: 4, name: 'Vistara', code: 'UK' },
        { id: 5, name: 'GoAir', code: 'G8' }
    ];

    return Array(5).fill(0).map((_, i) => {
        const airline = airlines[i % airlines.length];
        const duration = Math.floor(Math.random() * 4) + 1; // 1-5 hours
        const arrivalTime = new Date(departureTime);
        arrivalTime.setHours(departureTime.getHours() + duration);
        
        return {
            id: `FL${Math.floor(Math.random() * 10000)}`,
            airline,
            flightNumber: `${airline.code}${Math.floor(Math.random() * 1000)}`,
            departure: departureTime.toISOString(),
            arrival: arrivalTime.toISOString(),
            duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
            price: Math.floor(basePrice * (1 + Math.random() * 0.5)), // 1-1.5x base price
            seatsAvailable: Math.floor(Math.random() * 50) + 10
        };
    });
}

function generateTrains(from, to, departureTime, basePrice) {
    const trainTypes = ['Rajdhani', 'Shatabdi', 'Duronto', 'Garib Rath', 'Jan Shatabdi'];
    
    return Array(5).fill(0).map((_, i) => {
        const duration = Math.floor(Math.random() * 20) + 5; // 5-25 hours
        const arrivalTime = new Date(departureTime);
        arrivalTime.setHours(departureTime.getHours() + duration);
        
        return {
            id: `TR${Math.floor(Math.random() * 10000)}`,
            trainNumber: `${Math.floor(Math.random() * 20000) + 10000}`,
            trainName: `${trainTypes[i % trainTypes.length]} Express`,
            departure: departureTime.toISOString(),
            arrival: arrivalTime.toISOString(),
            duration: `${duration}h`,
            classes: [
                { type: 'SL', price: Math.floor(basePrice * 0.7), available: true },
                { type: '3A', price: Math.floor(basePrice * 1.2), available: true },
                { type: '2A', price: Math.floor(basePrice * 1.8), available: true },
                { type: '1A', price: Math.floor(basePrice * 2.5), available: i < 3 }
            ]
        };
    });
}

function generateBuses(from, to, departureTime, basePrice) {
    const busOperators = [
        'RedBus', 'VRL Travels', 'SRS Travels', 'KPN Travels', 'Orange Tours'
    ];
    
    return Array(5).fill(0).map((_, i) => {
        const duration = Math.floor(Math.random() * 15) + 5; // 5-20 hours
        const arrivalTime = new Date(departureTime);
        arrivalTime.setHours(departureTime.getHours() + duration);
        
        return {
            id: `BS${Math.floor(Math.random() * 10000)}`,
            operator: busOperators[i % busOperators.length],
            busType: ['Sleeper', 'Seater', 'AC Sleeper', 'Non-AC'][i % 4],
            departure: departureTime.toISOString(),
            arrival: arrivalTime.toISOString(),
            duration: `${duration}h`,
            price: Math.floor(basePrice * (0.8 + Math.random() * 0.4)), // 0.8-1.2x base price
            seatsAvailable: Math.floor(Math.random() * 20) + 5
        };
    });
}

function generateCabs(from, to, departureTime, basePrice) {
    const cabTypes = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Shared'];
    const cabCompanies = ['Ola', 'Uber', 'Meru', 'FastTrack', 'Drivezy'];
    
    return Array(5).fill(0).map((_, i) => {
        const duration = Math.floor(Math.random() * 10) + 2; // 2-12 hours
        const distance = Math.floor(duration * 50 * (0.8 + Math.random() * 0.4)); // ~50km/h with variation
        
        return {
            id: `CB${Math.floor(Math.random() * 10000)}`,
            provider: cabCompanies[i % cabCompanies.length],
            vehicleType: cabTypes[i % cabTypes.length],
            estimatedDuration: `${duration}h`,
            distance: `${distance} km`,
            price: Math.floor(basePrice * distance * (0.9 + Math.random() * 0.2)), // based on distance
            available: true
        };
    });
}

// Create a booking
app.post('/api/book', (req, res) => {
    const { userId, optionId, mode, travelers, paymentInfo } = req.body;
    
    if (!userId || !optionId || !mode || !travelers || !paymentInfo) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const booking = {
        id: `BK${Date.now()}`,
        userId,
        optionId,
        mode,
        travelers,
        paymentInfo,
        status: 'confirmed',
        bookingDate: new Date().toISOString()
    };

    bookings.push(booking);
    res.json(booking);
});

// Get booking details
app.get('/api/booking/:id', (req, res) => {
    const booking = bookings.find(b => b.id === req.params.id);
    
    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
});

// Start server
app.listen(PORT, () => {
    console.log(`Travel Booking API running on http://localhost:${PORT}`);
});