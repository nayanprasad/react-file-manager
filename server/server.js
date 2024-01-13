import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT
console.log(process.env.PORT);

connectDB();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode.`);
})
