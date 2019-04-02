import app from "./app";
import * as socketIO from "socket.io";

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

const io = socketIO(server);

let clients = 0;
io.of("/chat").on("connection", function (socket) {
    clients++;
    console.log("A user connected " + socket.id);

    socket.on("disconnect", function () {
        console.log("A user disconnected");
        clients--;
        io.sockets.emit("broadcast", { description: clients + " clients connected!"});
    });

    socket.emit("testEvent", "Hello World!");
    socket.emit("broadcast", { description: clients + " clients connected!"});

    socket.on("createRoom", function (data) {
        socket.join(data);
    });
    console.log(socket.adapter.rooms);
});
