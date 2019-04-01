import app from "./app";
import * as socketIO from "socket.io";

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

const io = socketIO(server);


// const users = [];
io.on("connection", function (socket) {
    console.log("A user connected" + socket.id);

    socket.on("disconnect", function () {
        console.log("A user disconnected");
    });
});
