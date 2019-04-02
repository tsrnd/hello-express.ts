$(document).ready(function(){
    var socket = io("http://localhost:8081/chat");
    socket.on("testEvent", function(data) {
        $("#testEvent").append(data);
    });

    socket.on("broadcast", function (data) {
        $("#broadcast").append(data.description);
    });

    $("#createRoom").click(function() {
        socket.emit("createRoom", $("#txtRoom").val()); 
    });
});
