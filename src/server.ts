import app from "./app";
import { db } from "./utils/db";

const PORT = process.env.PORT;

db.once("open", () => {
    console.log("connect mongo db success.");
});

app.listen(PORT, () => {
    console.log("server is running listening on port" + PORT);
});
