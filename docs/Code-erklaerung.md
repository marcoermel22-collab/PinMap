# Pin Map verständlich erklären

## Was die App macht

Pin Map speichert Reisen mit Startpunkt, Zwischenstopps und Endpunkt. Jeder Standort kann mehrere Tagebucheinträge mit Text und Fotos enthalten. Die fünf Hauptansichten folgen dem genehmigten Mockup. Für mehrere Standorte und Einträge gibt es zusätzliche Auswahlfenster.

## Welche Datei macht was

| Datei                            | Aufgabe                                                             |
| -------------------------------- | ------------------------------------------------------------------- |
| `src/app/index.tsx`              | Reiseübersicht, Suche und Filter                                    |
| `src/app/map.tsx`                | Karte und Auswahl einer Reise oder eines Standorts                  |
| `src/app/create.tsx`             | Öffnet das gemeinsame Formular zum Erfassen                         |
| `src/app/trip/[id].tsx`          | Zeigt die Reise, Standorte und Tagebucheinträge                     |
| `src/app/trip/edit.tsx`          | Öffnet dasselbe Formular mit bestehenden Daten                      |
| `src/components/TripForm.tsx`    | Formular für neue und bestehende Reisen                             |
| `src/components/EntryEditor.tsx` | Formular für einen Tagebucheintrag                                  |
| `src/components/UI.tsx`          | Gemeinsame Buttons, Navigation und Bildschirmrahmen                 |
| `src/components/Photos.tsx`      | Kamera-/Galeriebuttons, Bilderübersicht und Bildbetrachter          |
| `src/components/TripMap.tsx`     | Native Karte mit Markern und Verbindungslinien                      |
| `src/types/trip.ts`              | Beschreibt Reise, Standort und Tagebucheintrag als TypeScript-Typen |
| `src/state/TripContext.tsx`      | Gemeinsamer Zustand und Speichervorgänge                            |
| `src/lib/database.ts`            | Lesen, Speichern und Löschen in SQLite                              |
| `src/lib/photos.ts`              | Bilder auswählen, dauerhaft kopieren und entfernen                  |
| `src/lib/trip-utils.ts`          | Datumsprüfung, Validierung, Suche und Bildzuordnung                 |
| `src/lib/theme.ts`               | Gemeinsame Farben und Formatierungen                                |

## Beispiel: Eine Reise speichern

1. Die Person tippt im Formular. `useState` hält diese Eingaben als Entwurf fest.
2. Beim Speichern prüfen `parseDate` und `validateTrip` die Pflichtangaben, den Zeitraum und die Standorte.
3. Das Formular ruft `saveTrip` aus dem gemeinsamen Zustand auf.
4. Eigene Fotos werden aus dem temporären Bereich in den dauerhaften App-Speicher kopiert. Das Kopieren wird mit `await` abgewartet.
5. `writeTrip` speichert die vollständige Reise in SQLite.
6. Erst nach erfolgreichem Speichern wird die sichtbare Reiseliste aktualisiert. Bei einem Fehler bleiben die bisherigen Daten erhalten.
7. Expo Router öffnet die Reisedetails.

## KISS

Wir verwenden einfache TypeScript-Objekte, `useState` für Formulare und einen React Context für die gemeinsame Reiseliste. Es gibt keinen eigenen Server, keine Benutzerverwaltung und keine zusätzliche Zustandsbibliothek.

Eine Reise wird als JSON in einer SQLite-Zeile gespeichert. Für die kleine lokale App ist das einfach und ausreichend. Die Struktur mit Standorten und Einträgen bleibt im JSON erhalten. Für grössere Datenmengen und komplexe SQL-Abfragen wären getrennte Tabellen eine mögliche spätere Erweiterung.

## DRY

Das gleiche `TripForm` dient zum Erfassen und Bearbeiten. Buttons, Navigation, Fotofunktionen, Karte und Validierung werden wiederverwendet. Dadurch muss eine Änderung an diesen Bausteinen nur einmal vorgenommen werden.

## Wichtige Begriffe im Fachgespräch

**Props:** Informationen, die eine Komponente von einer anderen erhält. Beispielsweise bekommt `TripForm` die bestehende Reise beim Bearbeiten.

**State:** Veränderbare Daten, die auf dem Bildschirm angezeigt werden. Ändert sich der State, aktualisiert React die Ansicht.

**Context:** Stellt die Reiseliste und die Speicherfunktionen allen Ansichten bereit, ohne sie durch jede Zwischenkomponente weiterzureichen.

**async und await:** Ein Vorgang wie Speichern oder Kopieren braucht Zeit. `await` wartet auf sein Ergebnis, bevor der nächste Schritt ausgeführt wird.

**Persistenz:** SQLite und der App-Speicher erhalten Daten nach dem Schliessen der App. React State allein würde dafür nicht ausreichen.

**Abbrechen:** Das Formular arbeitet auf einer Kopie. Nicht gespeicherte Änderungen verändern deshalb die ursprüngliche Reise nicht.

## Was du selbst auf dem Handy prüfen musst

Kameraberechtigung erlauben und verweigern, ein echtes Foto aufnehmen, Bilder aus der Galerie hinzufügen, die App vollständig schliessen und erneut öffnen, Offline-Anzeige der gespeicherten Inhalte und die native Karte. Die Hintergrundkarte benötigt eventuell Internet.

Die Browser-Vorschau verwendet statt SQLite den Browser-Speicher und eine separate Webkarte. Sie ersetzt diese Gerätetests nicht.
