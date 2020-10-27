const cronjob = require('node-cron');
let shell = require('shelljs');

// Automatische Transaktion jede Minute

cronjob.schedule("0 * * * * *", function() {
    console.log("Sending transaction...");
    if(shell.exec("node app.js").code != 0) {
        console.log("Something went wrong");
    }
});


// Auslesen der Datenbank + Herunterladen der Daten von IPFS.
// Häufigkeit einstellbar.

// cronjob.schedule("0 * * * * *", function() {
//     console.log("Checking database and calculating LCI...");
//     if(shell.exec("node retrieveData.js").code != 0) {
//         console.log("Something went wrong");
//     }
// });
