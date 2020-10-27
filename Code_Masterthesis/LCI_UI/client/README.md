# Benötigte Pakete herunterladen

## 'mkdir node_modules | npm install'

# Metamask installieren

Falls Metamask noch nicht installiert wurde kann dies unter metamask.io
heruntergeladen und installiert werden. Es muss ein Wallet eingerichtet werden,
auf das Rinkeby Testnetzwerk gewechselt werden und Testether unter
https://www.rinkeby.io/#faucet angefordert werden.

# Installation MongoDB

Um Daten in MongoDB abzuspeichern muss zunächst MongoDB installiert werden, was
hier getan werden kann https://docs.mongodb.com/manual/installation/.

Wenn die Datenbank aktiv ist kann mit dem nächsten Schritt fortgefahren werden.

# Automatisches Cronjob Skript

Dieses Skript kann zum automatischen ausführen von anderen Skripten zu einer
bestimmten Zeit verwendet werden. Eines der Skripte, das automatisch ausgeführt
wird ist "app.js". Um dieses Skript auszuführen muss lediglich der folgende Befehl
in das Terminal eingegeben werden:

## 'node cronjobs.js'

Danach wird jede Minute eine Transaktion durchgeführt, jedoch läuft dieses Skript
nicht fehlerfrei ab und deshalb wird durchschnittlich nur jede zweite Transaktion
durchgeführt.

# Abfrage und abspeichern von Daten von Blockchain in MongoDB  

Dieses Skript speichert die Daten aus der Blockchain bei jeder Transaktion durch
ein Event in einer MongoDB Datenbank ab.

## 'node getEvents.js'

# UI Interaktion

## UI starten

Sie müssen ein Terminal öffnen und in den Ordner LCI_UI/client navegieren

### 'npm run start'

Es öffnet sich ein Fenster in ihrem Browser mit http://localhost:3000/

## Metamask verbinden

Wenn der vorherige Schritt durchgeführt wurde kann die graphische Oberfläche mit
Metamask verbunden werden. Beim öffnen der Seite sollte eine Notiz von Metamask
aufpoppen, die nach der Berechtigung zur Verbindung fragt. Dann auf connect drücken.

## Interaktion mit graphischer Oberfläche

Zuerst muss eine JSON-Datei ausgewählt werden. Diese können unter
LCI_UI/client/SC_testdata gefunden werden. Dann auf "upload JSON" drücken.
Warten bis Datei auf IPFS geladen wurde und Hash zurückgeliefert wird.

## Restliche Daten eintragen und Transaktion abschicken

Jetzt können die restlichen Daten eingetragen werden und auf "Send Transaction"
gedrückt werden. Es sollte ein Fenster von Metamask aufpoppen, dass zur
Bestätigung der Transaktion wartet. Auf "confirm" drücken und warten bis die
Transaktion bestätigt wurde.

# Skript zum Berechnen einer Sachbilanz

Das JavaScript-Skript retrieveDataAndCalcLCI.js wurde zur Berechnung der
Sachbilanz erstellt, jedoch ist die Berechnung nicht vollständig automatisiert,
da z.B. die Angabe der Funktionseinheit nur manuell möglich ist. Außerdem fehlt
die Automatierung von der Überprüfung zur supplyChainId und BatchID. Es lässt
sich mit dem folgenden Befehl im Terminal ausführen:

## 'node retrieveDataAndCalcLCI.js'
