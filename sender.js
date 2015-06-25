/**
 * Created by jan on 09.05.15.
 */
var exec = require('child_process').exec;
var ip = require('ip');
module.exports = function() {
    this.playFile = function(file, destination, port, loop) {
        this.file = file;
        this.destination = destination;
        this.port = port;
        this.loop = loop;

        console.log("playing file " + file + " started. Processing Data");
        console.log("Destination-IP: " + destination + " port: " + port);
        //Example: "tcprewrite -D 0.0.0.0/0:192.168.130.25/0 -S 0.0.0.0/0:192.168.131.141/0
        //-i static/uploads/rewritetest.pcap -o static/temp/done.pcap"

        var cmd_rewrite = 'tcprewrite -D 0.0.0.0/0:' + destination + '/0 -S 0.0.0.0/0:' + ip.address() +
            '/0 -i ' + file + ' -o static/temp/done.pcap';

        console.log(cmd_rewrite);

        exec(cmd_rewrite, function(error, stdout, stderr) {
            if(error !== null)
                console.log('exec error: ', error);
            else {
                console.log("Data Processing done");

                setTimeout(function() {  //After 5 Seconds start playing file
                //play static/temp/done.pcap
                    var cmd_replay = 'tcpreplay --intf1=eth0 static/temp/done.pcap'
                    console.log(cmd_replay);
                    exec(cmd_replay, function(error, stdout, stderr) {
                       console.log("replay finished");
                    });
                },5000);
            }
        });
    };

    this.stopFile = function() {
        console.log("file-playing: " + this.file + ' to Destination-IP: ' + this.destination + ' stopped');;
        exec('killall tcpreplay');
    };
};