import express, { query } from "express"
import axios from "axios"
import bodyParser from "body-parser"
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const APIKey = process.env.OPENCAGE_API_KEY;
const APIBaseUrl = "https://api.opencagedata.com/geocode/v1/json";

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.use(express.static('public')); // helps access css static files
app.use(bodyParser.urlencoded({extended: true})); // middlewear

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/search", async (req, res) =>{
    const location = req.body.location;
    const APIURL = `${APIBaseUrl}?q=${encodeURIComponent(location)}&key=${APIKey}`;
    try{
        const response = await axios.get(APIURL);
        if(data.results && data.results.length > 0){
            
        }
        res.render("index", {})
    }
    catch(error){
        console.error('Error fetching data from OpenCage API:', error);
        res.status(500).send('Error fetching data')
    }
});

// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})