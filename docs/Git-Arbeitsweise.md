# GitHub vollständig, GitLab in einzelnen Arbeitsschritten

## Der aktuelle Stand

Der vollständige Ausgangsstand ist auf GitHub gesichert:
https://github.com/marcoermel22-collab/PinMap

Im aktuellen Projektordner zeigt `origin` auf GitHub. `gitlab` bezeichnet das Schulrepository. Ein gewöhnliches `git push` geht nach dem eingerichteten Tracking auf GitHub.

## Was add, commit und push bedeuten

`git add` wählt Änderungen für den nächsten Commit aus. `git commit` erstellt daraus einen lokalen gespeicherten Stand. `git push` überträgt die noch fehlenden Commits des angegebenen Branches. Mit Push kann man keine einzelnen Dateien aus einem bereits bestehenden Commit auswählen.

Nur bestimmte Dateien aufnehmen:

```powershell
git status
git add -- src/lib/trip-utils.ts tests/trip-utils.test.mjs
git diff --cached
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
git commit -m "Datumsprüfung verbessern"
git push origin main
```

Die Dateinamen sind ein Beispiel für spätere Änderungen. `git diff --cached` zeigt genau, was in den nächsten Commit kommt. Zusammengehörige Dateien immer gemeinsam auswählen, damit der Commit funktioniert. Ein Fehler bei den Prüfungen wird vor dem Commit behoben.

Nur einzelne Abschnitte einer Datei auswählen:

```powershell
git add -p -- src/lib/trip-utils.ts
git diff --cached
```

Mit `y` einen Abschnitt übernehmen, mit `n` auslassen, mit `s` nach Möglichkeit in kleinere Abschnitte aufteilen. In VS Code ist dies auch über die Quellcodeverwaltung möglich: Datei öffnen, geänderte Zeilen markieren und „Ausgewählte Bereiche stagen“ wählen.

Versehentlich ausgewählte Dateien wieder aus der Auswahl nehmen:

```powershell
git restore --staged -- src/lib/trip-utils.ts
```

Dabei bleiben die Änderungen in der Datei erhalten.

## Einzelne Teile später auf GitLab übernehmen

Der aktuelle Branch enthält bereits die ganze App. `git push gitlab main` würde diesen vollständigen Stand samt seiner Vorgeschichte übertragen. Für die gewünschte schrittweise Übernahme verwendet ihr deshalb eine separate Arbeitskopie des Schulrepositorys.

Einmalig in einem neuen Terminal:

```powershell
Set-Location C:\Users\Taaerma0\Dev
git clone git@gitlab.ict-learnfactory.ch:ict-learnfactory/335/durchfuehrungen/335-ae-bm-24/marco_robin/pinmap.git PinMap-GitLab
Set-Location .\PinMap-GitLab
git branch --show-current
git remote -v
```

Dort ist `origin` das Schulrepository. Prüft den vorhandenen Stand und die Vorgaben des Lerncoachs. Übernehmt nur zusammengehörige Teile, die ihr an diesem Tag bearbeitet, nachvollzogen und geprüft habt. Kopiert niemals den `.git`-Ordner, `node_modules`, `.expo` oder Zugangsdaten aus dem GitHub-Projekt.

Mögliche Arbeitsschritte, abhängig vom vorhandenen Grundprojekt:

| Schritt | Inhalt                                                                            |
| ------- | --------------------------------------------------------------------------------- |
| 1       | Lauffähiges Expo-Grundprojekt mit Navigation und gemeinsamen Gestaltungselementen |
| 2       | Reisedaten, Reiseübersicht, Erfassen und lokale Speicherung                       |
| 3       | Mehrere Standorte, Reihenfolge und Kartenansicht                                  |
| 4       | Tagebucheinträge, Kamera und Galerie                                              |
| 5       | Bearbeiten, Löschen, Tests und Dokumentation                                      |

Ein Schritt kann mehrere Tage dauern. Abhängigkeiten müssen jeweils mitkommen: Ein Screen darf beispielsweise keine Komponente importieren, die erst im nächsten Commit vorhanden ist. Der komplette GitHub-Stand dient als Referenz.

Nach einem tatsächlich bearbeiteten und geprüften Schritt im **GitLab-Ordner**:

```powershell
git status
# Hier nur die passenden Dateien auswählen, z. B. mit git add -p.
git diff --cached
npm.cmd run typecheck
npm.cmd run lint
# Sobald die Tests eingerichtet sind:
npm.cmd test
git commit -m "Kurze Beschreibung des fertigen Arbeitsschritts"
git push origin HEAD
```

`git push origin HEAD` verwendet den aktuellen Branchnamen. Falls die Schule einen anderen Branch oder Merge Requests verlangt, gelten diese Vorgaben. Ein geschützter Branch muss über den vorgesehenen Ablauf aktualisiert werden.

## Datum und Nachvollziehbarkeit

Commits bekommen automatisch das tatsächliche Datum. Ihr könnt heute einen Schritt übernehmen und morgen den nächsten. Der vollständige Stand existiert bereits auf GitHub; die GitLab-Commits dokumentieren die spätere Übernahme und eure wirklichen Änderungen. Beschreibt diese Schritte entsprechend und lasst die Zeitstempel unverändert.

Wenn ihr mehrere Commits heute erstellt und erst morgen pusht, behalten sie ihr heutiges Commit-Datum. Das spätere Pushen verteilt die Arbeit nicht auf neue Commit-Daten.
