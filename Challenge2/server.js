require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ingredientRoutes = require('./routes/ingredientRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');






const app = express();
const PORT = 5000;

// Routes
app.use('/ingredients', ingredientRoutes);
app.use('/recipes', recipeRoutes);
app.use('/chatbot', chatbotRoutes);


// Middleware Configuration
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

// const corsOptions = {
  
//   origin: '*',
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
//   optionsSuccessStatus: 200, // Status for legacy browser support
// };

// app.use(cors(corsOptions));

// Routes
// app.use("/user", UserRoute);
// app.use("/course", CourseRoute);
// app.use("/order", OrderRoute);
// app.use("/layout", LayoutRoute);
// app.use("/notice", NoticeRoute);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to Cooking Buddy");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});