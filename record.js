/**
 * Created by jan on 09.05.15.
 */
var exec = require('child_process').exec;
module.exports = function() {
    this.startRecord = function(file, port) {
        this.file = file;
        this.port = port;

        console.log("file-recording: static/uploads/" + this.file + " on port: " + this.port + " started");

        //Example: tshark -f "udp port 6454" -i eth0 -w static/uploads/capture.cap
        var command = 'tshark -f "udp port ' + port + '" -i eth0 -w static/uploads/' + file;
        var tshark = exec(command);
        delete tshark;
    };

    this.stopRecord = function() {
        console.log("file-recording: static/uploads/" + this.file + " on port: " + this.port + " stopped");
        var tshark_killer = exec('killall tshark');
        delete tshark_killer;
    };
};



