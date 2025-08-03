import express from 'express'; 
import cors from 'cors';


const app = express();
const PORT = 5001;


const staticUsers = [
  {
    internName: "Priya Sharma",
    referralCode: "priya2025",
    totalDonations: 28500
  },
  {
    internName: "Rohan Gupta",
    referralCode: "rohan2025",
    totalDonations: 19200
  },
  {
    internName: "Anjali Mehta",
    referralCode: "anjali2025",
    totalDonations: 12500
  },
  {
    internName: "Ayush Sinha",
    referralCode: "yourname2025",
    totalDonations: 7500
  },
  {
    internName: "Vikram Singh",
    referralCode: "vikram2025",
    totalDonations: 4800
  },
  {
    internName: "Saanvi Reddy",
    referralCode: "saanvi2025",
    totalDonations: 1600
  },
  {
    internName: "Aditya Kumar",
    referralCode: "aditya2025",
    totalDonations: 950
  }
];

// --- MongoDB Connection  ---
/*
const MONGO_URI = 'YOUR_MONGODB_CONNECTION_STRING';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
*/

// --- Mongoose Schema ---
/*
const userSchema = new mongoose.Schema({
  internName: String,
  referralCode: String,
  totalDonations: Number,
});
const User = mongoose.model('User', userSchema);
*/


// --- Middleware ---
app.use(cors());
app.use(express.json());


// --- API Endpoints ---



app.get('/api/dashboard/:referralCode', (req, res) => {
  
  const { referralCode } = req.params; 
  console.log(`Searching for user with code: ${referralCode}`);

 
  const userData = staticUsers.find(user => user.referralCode === referralCode);

  if (userData) {
    res.json(userData);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/*
// Dashboard Endpoint (MongoDB )
app.get('/api/dashboard', async (req, res) => {
  try {
    const userData = await User.findOne({ referralCode: 'yourname2025' });
    if (userData) {
      res.json(userData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});
*/


app.get('/api/leaderboard', (req, res) => {
  console.log("Serving static leaderboard data");
  
  const sortedUsers = [...staticUsers].sort((a, b) => b.totalDonations - a.totalDonations);
  res.json(sortedUsers);
});

/*
// Leaderboard Endpoint (MongoDB)
app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboardData = await User.find({}).sort({ totalDonations: -1 });
        res.json(leaderboardData);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
*/


// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Static server is running on http://localhost:${PORT}`);
});