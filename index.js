import express, { query } from "express"
import axios from "axios"
import bodyParser from "body-parser"
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3001;
const APIKey = process.env.OPENCAGE_API_KEY;
const APIBaseUrl = "https://api.opencagedata.com/geocode/v1/json";

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.use(express.static('public')); // helps access css static files
app.use(bodyParser.urlencoded({extended: true})); // middlewear

app.get("/", (req, res) => {
    res.render("index");
});

// Handle the POST request from the search form
app.post("/search", async (req, res) => {
    const location = req.body.query; // Get the location input from the user
    const APIURL = `${APIBaseUrl}?q=${encodeURIComponent(location)}&key=${APIKey}`; // Construct the OpenCage API URL

    try {
        // Fetch location data from OpenCage API
        const response = await axios.get(APIURL);
        const data = response.data;
        
        let locationMap = null; // Default to null
        
        // Check if the API returned valid results
        if (data.results && data.results.length > 0) {
            // Extract latitude and longitude from the first result
            const lat = data.results[0].geometry.lat;
            const lng = data.results[0].geometry.lng;
            
            // Create an object with lat, lng, and location to pass to the template
            const locationMap = { lat, lng, location };
            console.log('Location Map:', locationMap);
            // Render the EJS template (index.ejs) with the locationMap object
            res.render("index", { locationMap });
        } else {
            // If no results found, respond with a 404 status
            res.render("index", { locationMap: null });
        }
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error fetching data from OpenCage API:', error);
        res.status(500).send('Error fetching data');
    }
});


// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})