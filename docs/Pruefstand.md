# Prüfstand der ersten Umsetzung

Stand: 26.10.2026. Durchgeführt mit KI-Unterstützung in der Entwicklungsumgebung.

| Prüfung                                                    | Ergebnis                                           |
| ---------------------------------------------------------- | -------------------------------------------------- |
| TypeScript                                                 | Bestanden                                          |
| ESLint für den Anwendungscode                              | Bestanden                                          |
| Unit-Tests                                                 | 15 von 15 bestanden                                |
| Code Coverage für trip-utils.ts                            | 95,08 % Zeilen, 96,23 % Zweige, 90,00 % Funktionen |
| Web-Bündelung                                              | Bestanden                                          |
| iOS-JavaScript-Bündelung ohne Bytecode                     | Bestanden                                          |
| Android-JavaScript-Bündelung ohne Bytecode                 | Bestanden                                          |
| Browser: fünf Ansichten                                    | Geöffnet und visuell geprüft                       |
| Browser: drei Standorte und Galeriefoto erfassen           | Bestanden                                          |
| Browser: Tagebucheintrag zuordnen und nach Neuladen öffnen | Bestanden                                          |
| Browser: ausgewählten Eintrag bearbeiten                   | Bestanden                                          |
| Browser: Bearbeitung ohne Speichern abbrechen              | Bestanden                                          |
| Browser: Löschbestätigung abbrechen                        | Bestanden                                          |
| Browser: Eintrag und Reise löschen                         | Bestanden                                          |
| Browser: Querformat ohne horizontales Überlaufen           | Bestanden                                          |

Die Coverage bezieht sich nur auf die geprüften Hilfsfunktionen und nicht auf die gesamte App.

Die Browserprüfung verwendet den Browser-Speicher. Sie beweist nicht, dass SQLite und Kamerazugriff auf einem echten Gerät funktionieren. Das Kopieren der nativen Fotodateien sowie Berechtigungen, Neustart, Offline-Nutzung und native Karten sind noch auf dem iPhone und Android zu prüfen. Es wurde keine APK oder IPA erstellt und keine Veröffentlichung vorgenommen.

Die Screens orientieren sich an den genehmigten Mockups. Originalbilder wurden durch lokal gebündelte Beispielbilder ersetzt. Ein exakter 1:1-Abgleich auf dem Zielgerät steht noch aus.

## Nachprüfung nach der Vereinfachung

Am 26.10.2026 wurden die Eingabeaufbereitung in `prepareTrip` ausgelagert, die Standortänderung im Formular wiederverwendet und verschachtelte Prüfungen durch leichter lesbare Schleifen ersetzt. Die Oberfläche und der Funktionsumfang wurden dabei nicht geändert. Kommentare erläutern die Datenstruktur und den Speicherablauf.

TypeScript, ESLint und alle zehn Unit-Tests sind bestanden. Die zwei ergänzten Tests prüfen, dass die Eingabeaufbereitung den Entwurf nicht verändert, mehrere Standorte und Einträge erhält, leere optionale Notizen entfernt und beim Bearbeiten die bestehenden Eintragsdaten beibehält. Die Web-Bündelung wurde ebenfalls erneut erfolgreich durchgeführt.

Auch die Browserprüfung wurde erneut bestanden: Reise mit drei Standorten und Galeriefoto, Eintrag am dritten Standort, erneutes Laden, gezielte Bearbeitung, Abbrechen und Löschbestätigungen. Es traten keine unbehandelten JavaScript-Fehler auf. Die nativen Gerätetests bleiben offen.

## Erweiterung: Standortvorschlag

Am 26.10.2026 wurde `expo-location` ergänzt. Im Reiseformular und im Tagebucheintrag ermittelt die App auf Wunsch einmalig die Position. Sie fragt die Berechtigung an und zeigt vor der Übernahme einen Vorschlag. In Tagebucheinträgen wird ein passender Reiseort innerhalb von 1 km ausgewählt oder ein neuer Zwischenstopp vor dem Endpunkt eingefügt.

Fünf neue Unit-Tests prüfen Abstände, die nächste passende Zuordnung, weit entfernte Orte, leere Listen und unveränderte Ausgangsdaten. Zusammen mit den bisherigen Tests sind 15 Tests bestanden. TypeScript und ESLint sind ebenfalls bestanden.

Die Browserprüfung mit simulierten Positionen ist bestanden: kein automatischer GPS-Zugriff beim Öffnen, Vorschlag ohne Datenänderung, Zuordnung zum bestehenden Ort, neuer Zwischenstopp, Abbrechen, Wechsel zur manuellen Auswahl, Speichern und Neuladen. Verweigerte Berechtigung und Ortungsfehler wurden simuliert und verständlich angezeigt. Das manuelle Speichern war weiterhin möglich. Auch die Übernahme von Koordinaten im Reiseformular wurde geprüft.

Die Browserprüfung bestätigt keine echte GPS-Messung und keine native Ortsnamensuche. Auf dem Smartphone sind Freigabe und Ablehnung, deaktivierte Ortungsdienste, GPS-Empfang, Ortsnamen mit und ohne Internet sowie der Neustart der App noch manuell zu prüfen. Bei einem eigenständigen Build ist zusätzlich die Berechtigungsanzeige zu prüfen.

Auch die iOS-JavaScript-Bündelung ohne Bytecode ist nach der Erweiterung bestanden. Die ausgewertete Expo-Konfiguration enthält den deutschen iOS-Berechtigungstext und die Android-Berechtigungen für Standortzugriff im Vordergrund. Hintergrundortung und Standortdienste im Hintergrund sind nicht aktiviert. Dies ersetzt keinen Gerätetest und keinen eigenständigen App-Build.
