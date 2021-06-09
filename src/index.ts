import express from "express"

const app = express();
const port = 1337;

app.use(express.static('build/public'));

app.listen(port, () => {
    console.log("Server is running on 1337 port!")
})