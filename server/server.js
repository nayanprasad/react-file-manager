import app from "./app.js"

const PORT = process.env.PORT
console.log(process.env.PORT);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode.`);
})
