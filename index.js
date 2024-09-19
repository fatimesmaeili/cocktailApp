import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

// Render the homepage without any cocktail data initially
app.get("/", (req, res) => {
  res.render("index.ejs", { cocktail: null });
});

app.get("/random-cocktail", async (req, res) => {
  try {
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    
    console.log("API response: ", result.data);

    // Check if the 'drinks' array exists and has at least one drink
    const drinks = result.data.drinks;
    if (drinks && drinks.length > 0) {
      const cocktail = drinks[0]; // Access the first drink in the array
      console.log("Cocktail: ", cocktail); 
      res.render("index.ejs", { cocktail });
    } else {
      // Handle case where 'drinks' is empty or undefined
      res.render("index.ejs", { cocktail: null });
    }
  } catch (error) {
    console.error("Error fetching cocktail: ", error); 
    res.status(500).send("Error retrieving cocktail");
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
