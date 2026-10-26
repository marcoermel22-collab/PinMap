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

## Die wichtigsten Funktionen selbst erklären

`prepareTrip` bereitet die Formulareingaben vor. Es entfernt überflüssige Leerzeichen und leere optionale Notizen. Bei einer neuen Reise bekommt die erste Erinnerung das gewählte Startdatum. Beim Bearbeiten bleiben die individuellen Eintragsdaten erhalten.

`validateTrip` prüft nacheinander Titel, Zeitraum, Standorte und Einträge. Beim ersten Fehler liefert es einen verständlichen Text zurück. Sind die Daten gültig, kommt `null` zurück. Beide Formulare verwenden dieselbe Prüfung.

`updateStop` ersetzt nur den Standort mit der passenden ID. Die gleiche Funktion bedient das Hauptformular und die Liste der Standorte. So steht dieselbe Änderung nicht zweimal im Code.

`updateEntry` verändert die Notiz oder Fotos des ausgewählten Eintrags. `EntryEditor` verwendet für neue und bestehende Tagebucheinträge ebenfalls ein gemeinsames Formular. Wird der Standort eines Eintrags gewechselt, entfernt es ihn am alten Ort und fügt ihn am neuen ein.

`tripPhotos` sammelt die Fotopfade aller Einträge. Die eigentlichen Bilder liegen im App-Speicher; in der Reise stehen nur ihre Pfade.

`filterTrips` prüft zuerst den aktiven Filter und durchsucht danach Titel, Orte und Tagebuchtexte. Die Suche vergleicht alles in Kleinschreibung.

## Häufige Schreibweisen

`map` erzeugt aus einer Liste eine neue Liste, beispielsweise mit einem geänderten Standort. `filter` behält nur die passenden Elemente, beispielsweise alle Reisen ausser der gelöschten. `find` sucht ein einzelnes Element anhand seiner ID. `flatMap` fasst Listen zusammen, hier die Einträge aller Standorte.

`...current` übernimmt die bisherigen Eigenschaften eines Objekts. Die nachfolgende Eigenschaft ersetzt gezielt einen Wert. React bekommt dadurch ein neues Objekt und kann die Änderung anzeigen.

`setDraft((current) => ...)` arbeitet mit dem neuesten Formularstand. `Partial<Stop>` bedeutet, dass nur die zu ändernden Standortfelder übergeben werden müssen. TypeScript prüft diese Typen während der Entwicklung; die Eingabeprüfung übernimmt weiterhin `validateTrip`.

`try` führt den Speichervorgang aus. `catch` behandelt einen Fehler. `finally` beendet den Ladezustand auch bei einem Fehler. `void save()` startet die asynchrone Funktion im Button; die Fehlerbehandlung steht innerhalb von `save`.

## Übung für das Fachgespräch

Verfolge eine Reise vom Eingabefeld über `prepareTrip`, `validateTrip` und `saveTrip` bis zu `writeTrip`. Erkläre danach, warum beim Abbrechen nichts gespeichert wird, warum Fotos dauerhaft kopiert werden und wie eine ID beim Bearbeiten den richtigen Standort erkennt. Ändere anschliessend selbst eine kleine Sache und prüfe das Ergebnis.

Die Anleitung für getrennte Arbeitsschritte steht in [Git-Arbeitsweise](Git-Arbeitsweise.md).
