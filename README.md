# Pin Map

Reisetagebuch für Modul 335 mit React Native, Expo und TypeScript.

## Start auf dem iPhone

In VS Code diesen Projektordner öffnen und im Terminal ausführen:

```powershell
npx.cmd expo login --no-browser
npm.cmd run start:tunnel
```

In Expo Go mit demselben Expo-Konto anmelden und den QR-Code scannen. Nach dem Hinzufügen neuer Pakete den bisherigen Server mit Strg+C beenden und neu starten. Ist Port 8082 belegt, zuerst den alten Server schliessen.

## Funktionen

Fünf Hauptansichten nach dem genehmigten Mockup, Reiseübersicht mit Suche und Filtern, Karte mit Reiseverlauf, mehrere Standorte pro Reise, mehrere Tagebucheinträge pro Standort, Kamera und Galerie, Fotos ansehen und entfernen, Bearbeiten und Löschen mit Bestätigung. Drei eindeutig gekennzeichnete Beispielreisen erscheinen nur bei der ersten Einrichtung.

Unter „Reiseverlauf“ im Formular werden Reiseende, Standorte und Reihenfolge bearbeitet. Im Detailbildschirm werden Standorte und Tagebucheinträge ausgewählt oder neue Einträge angelegt.

## Code erklären

Siehe [Code-Erklärung](docs/Code-erklaerung.md). Der Code verwendet wiederverwendbare Komponenten, einfachen lokalen State und einen gemeinsamen Context. Neue und bestehende Reisen benutzen dasselbe Formular.

## GitHub und GitLab

Der vollständige Stand liegt auf GitHub. Wie ihr einzelne Änderungen auswählt und später auf GitLab übernehmt, steht in [Git-Arbeitsweise](docs/Git-Arbeitsweise.md).

## Prüfungen

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
node --experimental-strip-types --experimental-test-coverage --test tests/*.test.mjs
```

Die Unit-Tests prüfen Datumsgrenzen, Pflichtangaben, Koordinaten, Reisezeitraum, Suche und Fotozuordnung. Coverage dieser Hilfsfunktionen ist keine Coverage der gesamten mobilen App.

## Grenzen und noch nötige Gerätetests

Der Grundaufbau orientiert sich an den gelieferten Screenshots. Die Originalfotos und eine Figma-Datei wurden nicht mitgeliefert; die lokal eingebundenen Unsplash-Beispielbilder ersetzen diese vorläufig. Native Karten sehen je nach Plattform und Kartenanbieter unterschiedlich aus. Ein pixelgenauer 1:1-Abgleich auf einem echten Gerät steht noch aus.

Kamera, Berechtigungen, echte Fotodateien, SQLite-Neustart und native Karten müssen auf dem iPhone beziehungsweise einem Android-Gerät geprüft werden. Der Browser nutzt nur für die Vorschau Browser-Speicher und OSM-Kacheln.

Die Daten werden lokal gespeichert und nicht synchronisiert. Beim Deinstallieren können sie verloren gehen. Eine installierbare APK ist noch nicht erstellt. Für Google Maps in einer eigenständigen Android-App ist vor dem Build eine passende Maps-Konfiguration mit eigenem API-Schlüssel erforderlich.

Die bestehende Expo/ngrok-Werkzeugkette meldet bei npm audit derzeit sieben Hinweise (zwei moderat, fünf hoch). Kein pauschales `npm audit fix --force` ausführen, da dies eine unpassende ältere Expo-Version vorschlägt. Vor Veröffentlichung die kompatiblen Paketupdates prüfen.

## Bildquellen

Beispielbilder von Unsplash, lokal gebündelt, damit sie offline sichtbar sind:

- https://images.unsplash.com/photo-1539037116277-4db20889f2d4
- https://images.unsplash.com/photo-1502602898657-3e91760cbb34
- https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
- https://images.unsplash.com/photo-1499856871958-5b9627545d1a

## Dokumentation der verwendeten APIs

- https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/
- https://docs.expo.dev/versions/v58.0.0/sdk/imagepicker/
- https://docs.expo.dev/versions/v58.0.0/sdk/filesystem/
- https://docs.expo.dev/versions/v58.0.0/sdk/map-view/

Die Umsetzung wurde mit KI-Unterstützung erstellt. Die Projektgruppe muss den Code verstehen und die tatsächlichen Gerätetests selbst dokumentieren.
