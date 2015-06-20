/**
 * Created by jan on 09.05.15.
 */
var exec = require('child_process').exec;
module.exports = function() {
    this.playFile = function(file, destination, port) {
        this.file = file;
        this.destination = destination;
        this.port = port;

        console.log("playing file " + file + " started. Processing Data");
        console.log("Destination-IP: " + destination + " port: " + port);
        //Example: "tcprewrite -D 0.0.0.0/0:192.168.130.25/0 -S 0.0.0.0/0:192.168.131.141/0
        //-i static/uploads/rewritetest.pcap -o static/temp/done.pcap"

        var command = 'tcprewrite -D 0.0.0.0/0:' + destination + '/0 -S 0.0.0.0/0:' + '192.168.131.141' +
            '/0 -i ' + file + ' -o static/temp/done.pcap';

        exec(command, function(error, stdout, stderr) {
            if(error !== null)
                console.log('exec error: ', error);
            else {
                console.log("Data Processing done");
                //Start playing file
            }
        });
    };

    this.stopFile = function() {
        console.log("file-playing: " + this.file + ' to Destination-IP: ' + this.destination + ' stopped');;
        exec('killall tcpreplay');
    };
};

/*
 tcprewrite -D 0.0.0.0/0:192.168.130.25/0 -S 0.0.0.0/0:192.168.131.141/0 -i rewritetest.pcap -o temp/done.pcap
 */