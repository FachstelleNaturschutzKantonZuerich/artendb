# arteigenschaften.ch

[![js-standard-style](https://img.shields.io/badge/license-ISC-brightgreen.svg)](https://github.com/FNSKtZH/artendb/blob/master/License.md)

<a name="top"></a>
Die Arten- und Lebensraumdatenbank (auch bekannt als "ArtenDb") enthält naturschutzrelevante Informationen über Arten aus den Gruppen Fauna, Flora, Moose, Pilze und von Lebensräumen. Sie ermöglicht das Nachschlagen, Importieren und Exportieren der Informationen sowie den direkten Zugriff aus Drittapplikationen.

Ihre Stärke ist der einfache Import und Export von Daten. Die Absicht dahinter: Alle benötigten Daten können, sofern nicht schon enthalten, rasch ergänzt und für Auswertungen kombiniert werden.

# Dieses Projekt wurde abgelöst

Dies hier ist die Version, die von 2012 bis Juni 2018 aktiv war. Sie wurde abgelöst durch: [https://github.com/FNSKtZH/ae2](https://github.com/FNSKtZH/ae2)

## Inhalt ##
* <a href="#Ziele">Ziele</a>
* <a href="#Konzept">Fachliches Konzept</a>
* <a href="#ui">Benutzeroberfläche</a>
* <a href="#Umsetzung">Technische Umsetzung</a>
* <a href="#Zeitplan">Realisierung</a>
* <a href="#OpenSource">Open source</a>

<a name="Ziele"></a>
# Ziele
### Ausgangspunkt
...sind Erfahrungen, welche in der Fachstelle Naturschutz mit früheren Datenbanken gemacht wurden:

- Bezieht man Daten aus anderen Quellen, ist es schwierig, sie vollständig, fehlerfrei und aktuell zu (er-)halten
- Entscheidend für die Aktualität der Datenbank ist es, die Informationen einfach und mit geringem Aufwand importieren und danach direkt nutzen zu können
- Art- und Lebensraumeigenschaften interessieren nicht nur die Fachstelle Naturschutz des Kantons Zürich. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank. Oder realistischer: Ein Ort, an dem frei zugängliche Daten mit wenig Aufwand vereint werden können
- Die aktuelle Datenbank basiert auf Microsoft Access. Eine sinnvolle Weiterentwicklung im Sinne der nachfolgend dargelegten Ideen ist damit nicht möglich

### Was zeichnet arteigenschaften.ch aus?
Die wichtigsten Merkmale dürften sein:

- Die verwendeten Begriffe und Datenstrukturen sind auf Eigenschaften von Arten und Lebensräumen zugeschnitten
- Daten können einfach und rasch importiert werden...
- ...weshalb prinzipiell alle beteiligten Stellen ihre Daten an einem Ort und in einem gemeinsamen Format anbieten könnten. Das mag etwas naiv und utopisch sein. Zumindest aber kann man innert Minuten anderswo verfügbare Daten in arteigenschaften.ch vereinen und in Auswertungen mit anderen Daten kombinieren
- Daten können einfach und rasch kombiniert und exportiert werden, um anschliessend mit ihrer Hilfe Auswertungen durchzuführen

### Wozu wird arteigenschaften.ch benutzt?
##### Nachschlagen
Man kann arteigenschaften.ch benutzen, um Informationen nachzuschlagen. Das dürfte sogar der häufigste Anwendungszweck sein. Da die Benutzeroberfläche dynamisch aus flexiblen Datenstrukturen generiert wird und arteigenschaften.ch (bisher) keine Bilder enthält, ist die Darstellung aber eingeschränkt. Anwendungen mit statischer Datenstruktur können Informationen benutzerfreundlicher darstellen. Hilfreich könnte allerdings sein, wenn der einfache Import (wie erhofft) dazu führen sollte, dass arteigenschaften.ch besonders umfassende und aktuelle Informationen enthält.

##### Auswerten
arteigenschaften.ch wurde entwickelt, um mit Hilfe der darin enthaltenen Daten Auswertungen durchzuführen. Meist in Kombination mit Artbeobachtungen oder Lebensraumkartierungen. Beispiele:

- In einer Liste von Artbeobachtungen die wertvollsten Arten identifizieren, z.B. mithilfe des Artwerts, der nationalen Priorität oder des Rote-Liste-Status
- Aus Vegetationsaufnahmen Zeigerwerte berechnen
- In Zeitreihen Veränderungen von ausgewählten Parametern darstellen (z.B. Artwerte, Rote-Liste-Arten, Spätblüher, Magerkeitszeiger, störungsempfindliche Arten...)
- Für eine Region, Lebensraum, Förderprogramm oder Massnahme geeignete/prioritäre Arten bestimmen
- Aus Kartierungen und/oder physikalischen Modellen für bestimmte Arten/Förderprogramme prioritäre Flächen identifizieren
- Modellieren, z.B. den Einfluss der Klimaerwärmung auf Arten und Schutzprioritäten

Besonders geeignet ist arteigenschaften.ch, wenn in einem Projekt eigene Art- oder Lebensraumeigenschaften erhoben und mit anderen für die Auswertung kombiniert werden sollen.

##### Daten für andere Anwendung abholen
Andere Anwendungen können Daten aus arteigenschaften.ch direkt abholen und nutzen. Mehr Infos [hier](#Schnittstellen).

##### Nutzungsbedingungen
arteigenschaften.ch ist ein Werkzeug der Fachstelle Naturschutz des Kantons Zürich (FNS). arteigenschaften.ch steht frei zur Verfügung, inklusive der Importmöglichkeiten (Logins erhalten Sie von [Alex](alex@gabriel-software.ch)). Die FNS behält sich vor, mit DatenimporteurInnen die optimale Integration ihrer Daten in arteigenschaften.ch zu besprechen und allenfalls Einfluss darauf zu nehmen. Es können nur Daten akzeptiert werden, deren Eigner mit der Veröffentlichung einverstanden sind.

arteigenschaften.ch ist <a href="#OpenSource">open source</a>. Es steht allen frei, die Anwendung zu kopieren und selber zu betreiben, ohne allfälligen Einfluss der FNS oder mit Daten, die man nicht veröffentlichen will.

### Das Zielpublikum
...befasst sich mit Arten und Lebensräumen. Es arbeitet primär in den Sachbereichen Naturschutz, Jagd und Fischerei, Gewässer, Wald, Landwirtschaft und Problemarten. Angesprochen sein dürften Fachstellen bei Bund, Kantonen, Gemeinden, Forschungseinrichtungen und freischaffende Fachleute bzw. Ökobüros.

### Ziele für die Benutzerin

- Die Anwendung ist einfach zu bedienen,
- die Datenflut überschaubar,
- möglichst selbsterklärend,
- gut verfügbar:
  - von jedem Gerät im Internet
  - als Export im <a href="http://de.wikipedia.org/wiki/CSV_(Dateiformat)">csv-Format</a> (ev. weitere)
  - über [Schnittstellen](#Schnittstellen) für GIS, [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content), [EvAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content), [EvAB mobile](https://github.com/barbalex/EvabMobile), beliebige Apps
- und kann über alle Artengruppen hinweg exportiert werden

### Ziele für Datenpfleger und Systemverantwortliche

- Daten können in wenigen Minuten importiert werden.<br>Es werden keine besonderen technischen Fähigkeiten vorausgesetzt
- Die Datenstruktur ist bereits in den Rohdaten sichtbar und verständlich
- Der Code ist offen und dokumentiert. Nutzer können eigene Erweiterungen entwickeln (lassen) und/oder arteigenschaften.ch gemeinsam weiter entwickeln

<a href="#top">&#8593; top</a>

<a name="Konzept"></a>
# Fachliches Konzept
### Der Grundgedanke
Die bisherige Access-Datenbank ist über zehn Jahre gewachsen. Nach und nach entstand ein komplexes Instrument. Es ist schwer zu verstehen und zu unterhalten und stösst an diverse technische Grenzen.

Ist etwas schwer verständlich, passieren Fehler. Wird es nicht verstanden, nützt es (früher oder später) nichts.

Der Grundgedanke hinter arteigenschaften.ch ist daher: Komplexität minimieren. Es gibt ein paar (nachfolgend erklärte) Grundbegriffe. Daraus leiten sich lediglich drei Grundstrukturen ab: Objekte, ihre Eigenschaften- und Beziehungssammlungen.

### Taxonomien
[Taxonomien](http://de.wikipedia.org/wiki/Taxonomie) klassifizieren <a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> (in arteigenschaften.ch: Arten und Lebensräume) mit einer [Hierarchie](http://de.wikipedia.org/wiki/Hierarchie). Darauf bauen alle Eigenschaftensammlungen, Beziehungssammlungen und deren [Eigenschaften](http://de.wikipedia.org/wiki/Eigenschaft) auf. Die Entwicklung von Taxonomien und der Umgang mit unterschiedlichen und sich laufend verändernden Taxonomien sind höchst anspruchsvoll.

Andere geläufige Begriffe: Nomenklatur, Index, Flora, Kartierschlüssel, Lebensraumschlüssel.

Beispiele: Indizes der nationalen Artdatenzentren, "Flora der Schweiz (Ausgabe 2012)", "Lebensraumkartierung Neeracher Riet 2009", "Flora Europaea (Ellenberg, 1991)".

Die Benutzerin soll die Arten wahlweise nach allen in den Daten enthaltenen Taxonomien darstellen können (noch nicht realisiert). Im Standard wird bei Arten die Hierarchie der vom zuständigen nationalen Zentrum verwendeten Taxonomie angezeigt.

Im Idealfall enthielte die aktuell vom nationalen Zentrum verwendete Taxonomie nur "offizielle" Arten und z.B. keine Synonyme. Stattdessen würden Beziehungen zwischen offiziellen Arten und Arten anderer Taxonomien beschrieben. Da die Daten von den nationalen Zentren unseres Wissens (noch?) nicht so erhältlich sind, ist das in arteigenschaften.ch nicht realisiert aber im Design vorgesehen und bei Vorliegen entsprechender Daten direkt umsetzbar.

### Objekte
<a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> bilden die Grundeinheit der Taxonomie. In arteigenschaften.ch sind das Arten oder Lebensräume. Letztere Begriffe werden in der Benutzeroberfläche verwendet. "Objekte" ist eher von technischer und konzeptioneller Bedeutung.

### Gruppen
Arten werden in Gruppen eingeteilt: Fauna, Flora, Moose und Pilze. Die nationalen Artdatenzentren sind so organisiert. Es hat sich eingebürgert und bewährt. Lebensräume bilden eine eigene Gruppe.

### Eigenschaftensammlungen
Systematische Informationen über Arten kommen in ganzen Eigenschaftensammlungen, z.B. „Flora Indicativa 2010“. Solche Eigenschaftensammlungen haben gemeinsame Eigenschaften wie z.B.:

- Dieselbe Herkunft (Autoren, Publikation, Publikationsdatum)
- Denselben Zweck: Die Eigenschaftensammlung wurde in der Regel für einen bestimmten Zweck erarbeitet. Für das Verständnis der Daten kann diese Information sehr hilfreich sein
- Bezug auf eine bestimmte Taxonomie
- Meist eine bestimmte Artgruppe (z.B. Flora, Fauna, Schmetterlinge…)
- Innerhalb der Artgruppe eine definierte Auswahl bearbeiteter Arten
- Definierte Methodik und Auswahl erfasster Informationen

Statt "Eigenschaftensammlung" könnte auch der Begriff "Publikation" verwendet werden. Damit würde klar:

- Dass arteigenschaften.ch an Eigenschaftensammlungen minimale Qualitätsansprüche stellt. Es muss nicht eine prominent publizierte wissenschaftliche Publikation sein aber die fachliche Qualität sollte dem definierten Zweck entsprechen
- Dass eine aktualisierte Version einer bestehenden Eigenschaftensammlung in der Regel als neue Eigenschaftensammlung zu behandeln ist

Eigenschaftensammlungen sollten nur durch die Autoren nachgeführt werden (nicht zu verwechseln mit: importiert).

Um Arten- und Lebensraumeigenschaften verstehen und verwalten zu können, ist es wichtig, Eigenschaftensammlungen als wesentlichen Teil der Struktur zu behandeln. In arteigenschaften.ch sind sie Eigenschaften der Objekte. Sie erleichtern dem Benutzer, die Übersicht über die riesige Menge von Eigenschaften zu gewinnen.

arteigenschaften.ch kann auch Eigenschaftensammlungen von synonymen Objekten anzeigen und exportieren.

In fast allen Fällen ist es sinnvoll, Eigenschaften und Beziehungen pro Eigenschaftensammlung darzustellen. Z.B. bei der Anzeige in der Anwendung oder wenn Daten für Exporte ausgewählt werden.

<a name="zusammenfassende_datensammlungen"></a>
### Zusammenfassende Eigenschaftensammlungen
Für bestimmte Zwecke ist zusätzlich das Gegenteil interessant: Daten aus verschiedenen Eigenschaftensammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will. Er steckt in diversen Eigenschaftensammlungen, da er häufig pro Artengruppe separat publiziert wird.

Das geht so:

- In den jeweiligen Objekten wird eine zusätzliche Eigenschaftensammlung mit Eigenschaft "zusammenfassend" geschaffen
- Die entsprechenden Daten werden zwei mal importiert:
 - Ein mal in die Ursprungs-Eigenschaftensammlung
 - Ein mal in die zusammenfassende
- Die zusammenfassende Eigenschaftensammlung kann genau gleich wie alle anderen Eigenschaftensammlungen in der Anwendung angezeigt, exportiert oder über eine Schnittstelle angezapft werden

Beispiel: Für Heuschrecken wird eine neue Rote Liste publiziert:

- Es wird eine neue Eigenschaftensammlung geschaffen, z.B. "BAFU (2012): Rote Liste der Heuschrecken", und die Eigenschaften importiert
- Die alte Eigenschaftensammlung bleibt bestehen, z.B. "BUWAL (1985): Rote Liste der Heuschrecken"
- Die Eigenschaften werden nochmals in die zusammenfassende Eigenschaftensammlung "Rote Listen (aktuell)" importiert. Dabei werden bisherige Rote-Listen-Angaben der entsprechenden Heuschrecken überschrieben
- Falls einige 1985 beschriebene Arten 2012 nicht mehr beschrieben wurden, bleibt der Rote-Liste-Status von 1985 erhalten. Um dies kenntlich zu machen, soll in der zusammenfassenden Eigenschaftensammlung in einem zusätzlichen Feld immer der Name der Ursprungs-Eigenschaftensammlung mitgeliefert werden

### Art- und Lebensraumeigenschaften
...beschreiben einzelne Objekte. Beispiele: Artwert, Rote-Liste-Status, nationale Priorität.

### Beziehungssammlungen
Beziehungen beschreiben das Verhältnis zwischen zwei oder mehr Objekten. Beispiele: Bindung von Arten an Biotope, Frasspflanzen von Insekten, Wirte von Parasiten, Beutespektrum von Räubern. Aber auch taxonomische Beziehungen wie "synonym". Die eine Beziehung beschreibenden Attribute sind spezielle Art- und Lebensraumeigenschaften und wie diese (oft gemeinsam mit ihnen) Teil von Eigenschaftensammlungen. Sammlungen von Beziehungen werden in Analogie zu Eigenschaftensammlungen "Beziehungssammlungen" genannt. Sie sind Spezialfälle von Eigenschaftensammlungen und werden separat behandelt, weil sie eine leicht abweichende Datenstruktur erfordern.

### Gruppen vereinen
In der bisherigen, relationalen Datenbank werden die Gruppen (Flora, Fauna, Moose, Pilze, Lebensräume) in unterschiedlichen Tabellen verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden, d.h. bis zu 10-fach. Und in Auswertungen mittels Union-Abfragen wieder zusammengeführt werden.

Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes (32) erreicht ist und jede Beziehung einen Index voraussetzt. Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255) und an der maximalen Datenmenge pro Datensatz (2KB).

### Daten decodieren
Traditionell werden Daten häufig codiert erfasst. Bis 2012 waren auch viele Daten in der bisherigen arteigenschaften.ch codiert. Die entsprechenden Felder enthielten für Menschen unverständliche Codes. Sie wurden in einer Codierungstabelle aufgelöst. Damit die Daten verständlich dargestellt werden konnten, mussten sie für Darstellung und Export decodiert werden. Dieses System ist sehr kompliziert und leistungshungrig. Die Rohdaten sind für Menschen nicht mehr lesbar. Deshalb sind codierte Informationen zu vermeiden.

###E igenschaftensammlungen aktualisieren
Wie soll eine bestehende Eigenschaftensammlung aktualisiert werden? Zu bedenken sind u.a.:

- Müssen frühere Auswertungen nachvollzogen bzw. wiederholt werden können? Wenn ja, sollten frühere Datenstände (=Eigenschaftensammlungen) unverändert erhalten bleiben
- Wird eine Eigenschaftensammlung periodisch teilweise aktualisiert (im Gegensatz zu vollständig)? Und soll ersichtlich sein, welche Eigenschaften welchen Datenstand haben?

Wenn eine von beiden obigen Fragen mit ja beantwortet wurde, kann z.B. folgendermassen vorgegangen werden:

- Neue Daten als neue Eigenschaftensammlung erfassen. Z.B. "ZH Artwert (2013)", wobei es schon "ZH Artwert (aktuell)" gibt und ev. weitere
- Für die Auswertung unter Einbezug aller Artwerte eine zusammenfassende Eigenschaftensammlung schaffen, z.B. "ZH Artwert (aktuell)"

<a href="#top">&#8593; top</a>

<a name="ui"></a>
# Benutzeroberfläche
### Erscheinungsbild

<img src="http://barbalex.ch/artendb/objekt.png" alt="Beispiel Aconitum napellus auct." width="100%">

**Hauptelemente**

Mit den schwarzen Schaltflächen wird die Gruppe gewählt. Danach erscheinen darunter ein Suchfeld und ein Hierarchiebaum. Rechts werden die Informationen zum Objekt angezeigt. Navigiert werden kann mit dem Hierarchiebaum und mit dem Suchfeld. Zusätzlich sind alle Verweise zu Objekten verlinkt.

**Filterfeld**

Gefiltert werden kann nach dem vollständigen Namen (Lateinisch und Deutsch) bzw. Teilen davon.

**Hierarchiebaum**

Im Baum wird die Hierarchie der Objekte dynamisch aufgebaut - soweit sie in der betreffenden Gruppe vorliegt.

**Formular**

Klickt man auf den Namen einer Taxonomie, Eigenschaften- oder Beziehungssammlung, werden die dazugehörigen Eigenschaften angezeigt: Zuoberst die Beschreibung der Taxonomie, Eigenschaften- oder Beziehungssammlung. Darunter die Eigenschaften des Objekts.<br>Hier ein Beispiel einer Eigenschaftensammlung:
<img src="http://barbalex.ch/artendb/datensammlung_.png" alt="Beispiel Aconitum napellus auct., Eigenschaftensammlung Blaue Liste" width="100%">

...und eine Beziehungssammlung:
<img src="http://barbalex.ch/artendb/beziehungssammlung_.png" alt="Beispiel Aconitum napellus auct., Lebensraumbeziehungen eines Synonyms" width="100%">

Aus der [JSON-Struktur](http://de.wikipedia.org/wiki/JavaScript_Object_Notation) des Dokuments erzeugt arteigenschaften.ch dynamisch eine simple Liste aller Felder. true/false Werte werden mit einer Checkbox dargestellt. Text unter 50 Zeichen mit einem Textfeld, darüber mit einer "Textarea" (ein Feld, das mit dem Text wächst), Zahlen in einem Zahlenfeld.

**Menu**

Das Menu ermöglicht:

- Exporte
- Importe
- Bildersuche in Google
- Suche in Wikipedia
- Informationen über arteigenschaften.ch: Projektbeschrieb, letze Änderungen an der Anwendung, Link auf GitHub zur Code-Ablage
- Rückmeldungen an den Entwickler

**Mobilfähigkeit**

arteigenschaften.ch ist nicht für schwache Prozessoren und kleine Bildschirme optimiert. Immerhin wechselt die Darstellung unter 1000px Bildschirmbreite von zweispaltig auf einspaltig, womit arteigenschaften.ch auf meinem iPad ganz brauchbar ist. Da für iOS und Android auch Versionen von CouchDb existieren, kann prinzipiell für Mobilgeräte eine netzunabhängige App erstellt werden. Das ist momentan nicht geplant. Vermutlich wird aber künftig die Ressourcennutzung reduziert, die Fingerbedienbarkeit und die Darstellung verbessert, damit arteigenschaften.ch auch auf Smartphones brauchbar ist (wenn man unbedingt will, klappt es schon heute).

### Neue Eigenschaftensammlungen hinzufügen
Importiert werden können:

* Taxonomien (noch nicht umgesetzt)
* Eigenschaften
* Beziehungen

Will jemand zum Beispiel neue Arteigenschaften ergänzen, geht das so:

1. Die Benutzerin meldet sich an (erstellt beim ersten Mal ein Konto)
2. Sie beschreibt die Eigenschaftensammlung
3. Sie lädt eine vorbereitete csv-Datei mit den Eigenschaften
4. Sie bezeichnet die für die Verknüpfung der Daten benötigten ID's
5. Der Import wird ausgeführt

fertig! Siehe auch den [screencast](http://youtu.be/nqd-v6YxkOY).

Die Datenfelder in der Benutzeroberfläche, Exporten und Schnittstellen werden dynamisch aus den für die Art gespeicherten Attributen aufgebaut. Somit können neu importierte Eigenschaften anschliessend direkt angezeigt, exportiert und via Schnittstelle zugegriffen werden.

Neue Eigenschaftensammlungen sind in der aktuellen Access-Datenbank viel umständlicher hinzuzufügen. Das liegt u.a. an der komplizierten relationalen Datenstruktur, den vielfach erreichten Leistungsgrenzen von Access, der Tatsache, dass in Access die Steuerung nicht in ein paar gut kommentierten Codezeilen erfolgt sondern über Code, Benutzeroberfläche und Abfragen verteilt ist, und weil immer auch die Benutzeroberfläche angepasst werden muss. Das kann ich kaum jemand anderem zumuten. Nicht gut!

### Daten exportieren

1. Die Benutzerin wählt die gewünschten Objekte. Sie kann dabei nach jedem in den gewählten Gruppen existierenden Feld filtern und dazu Vergleichsoperatoren verwenden.<br>Standardmässig werden auch Informationen von synonymen Objekten exportiert. Diese Option kann ausgeschaltet werden
2. Sie wählt die gewünschten Eigenschaften.<br>Standardmässig werden nur Datensätze exportiert, die Informationen zu den gewählten Eigenschaften enthalten. Diese Option kann ausgeschaltet werden
4. Die Datei wird generiert und im .csv-Format heruntergeladen

Bei Beziehungssammlungen kann die Benutzerin pro Beziehung eine neue Zeile exportieren (dafür nur die Informationen einer Beziehungssammlung). Oder die Informationen eines Felds aus mehreren Beziehungen kommagetrennt hintereinander im selben Feld exportieren (dafür die Informationen aus beliebig vielen Beziehungen gleichzeitig). Es können beliebige Informationen aus Taxonomie und Eigenschaftensammlungen hinzugefügt werden.

Der Export wird auch in [diesem screencast](http://youtu.be/J13wS88pYC8) demonstriert.

### Felder für die Auswertung mit dem Artenlistentool auswählen

Mit dem [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content) der Fachstelle Naturschutz Kt. ZH kann man Artbeobachtungen räumlich auswerten. Die Resultate können in ein Excel-File exportiert werden. Der Benutzer kann sich ab ca. Ende 2014 auf eine für diesen Zweck angepasste Version der Export-Seite von arteigenschaften.ch leiten lassen. Hier kann er Felder auswählen. Er erhält eine URL, die er dem Artenlistentool übergibt. Anschliessend werden die gewählten Felder gemeinsam mit den Daten der Beobachtungen vom Artenlistentool exportiert und stehen für die weitere Auswertung zur Verfügung.

### Daten bearbeiten
Grundsätzlich müssen keine Daten in arteigenschaften.ch bearbeitet werden können. Alle Arteigenschaften werden von den Autoren in eigener Software entwickelt (meist einfache Excel-Listen) und in die arteigenschaften.ch importiert.

Ausnahme sind die Lebensräume: Externe Auftragnehmer der Fachstelle Naturschutz des Kantons Zürich müssen Lebensraumschlüssel in arteigenschaften.ch erfassen. Damit wird eine hierarchisch schlüssige Struktur gewährleistet. Zu oft ist die Hierarchie von Lebensraumschlüsseln älterer Kartierungen lückig und nicht (vollständig) nachvollziehbar.

<a href="#top">&#8593; top</a>

<a name="Umsetzung"></a>
# Technische Umsetzung
### Verwendete Technologien
Eingesetzt werden:

- Die Datenbank [CouchDb](http://couchdb.apache.org/)...
- ...in Form einer [CouchApp](http://couchapp.org). So kann die Anwendung:
 - lokal installiert...
 - und mit anderen ArtenDb's (Instanzen von arteigenschaften.ch) synchronisiert werden
 - und sie ist ihr eigener Webserver: die lokale, synchronisierte Version kann genau so wie diejenige im Web verwendet werden, bloss ist sie leistungsfähiger und netzunabhängig
 - dies ermöglicht es auch, Daten zu integrieren, die man nicht oder nur selektiv teilen möchte
- [JavaScript](http://de.wikipedia.org/wiki/JavaScript) und [jQuery](http://jquery.com/) für die Programmierung
- [HTML5](http://de.wikipedia.org/wiki/HTML5), [CSS](http://de.wikipedia.org/wiki/Cascading_Style_Sheets), [Bootstrap](http://twitter.github.com/bootstrap/) und [jsTree](http://jstree.com/) für die Benutzeroberfläche

arteigenschaften.ch wird primär auf Google Chrome entwickelt und getestet, sollte aber auf jedem modernen Browser funktionieren. Ausnahmen: Importe und Exporte benutzen sehr neue Funktionen aus HTML5. Sie funktionieren z.T. in anderen Browsern noch nicht. Für die Exporte wurde zusätzlich eine zuverlässige aber langsame Variante implementiert. Auf dem Internet Explorer funktioniert arteigenschaften.ch erst ab Version 9 leidlich.

### Dokumenten-Datenbank
In der relationalen Datenbank sieht die ideale Datenstruktur von Arteigenschaften so aus: Für jede Eigenschaftensammlung existiert eine eigene Tabelle. Sie wird 1:1 mit der Taxonomie verbunden. Fasst man in einer Abfrage verschiedene Eigenschaftensammlungen zusammen, enthalten nur noch wenige Felder Informationen. Diese Struktur ist für eine traditionelle, tabellenbasierte Datenbank wenig geeignet. Für eine Dokumenten-Datenbank hingegen ist sie ideal.

Eine Dokumenten-Datenbank speichert jeden Datensatz in einem eigenen Dokument. Daten werden statt in starren Tabellen mit einer definierten Schreibweise (<a href="http://de.wikipedia.org/wiki/JavaScript_Object_Notation">JSON</a>) frei erfasst. Man kann sich das wie eine Karteikarte vorstellen, auf der die Informationen notiert werden. Dieses System eignet sich hervorragend, um ohne Einbezug des Systemadministrators zuvor nicht geplante neue Felder zu ergänzen. Und das ist genau, was beim Import von Eigenschaftensammlungen geschieht.

Eine Dokumenten-Datenbank ist auch ideal, um alle Arten gleich zu verwalten und Gruppen (Flora, Fauna, Moose, Pilze, Flechten, sogar die Lebensräume) nur aufgrund eines Attributs zu unterscheiden (natürlich enthalten die jeweiligen Eigenschaftensammlungen je nach Gruppe spezifische Eigenschaften). Beziehungen zwischen Objekten gestalten sich entsprechend einfach. Und sie können genau gleich, sozusagen "in der Karteikarte notiert" werden. Simpel, oder?

Mit CouchDb können einem Objekt beliebige Dateien ähnlich wie in einem email angefügt werden, z.B. Bilder, Tonaufnahmen, Videos, Berichte (noch nicht umgesetzt).

### Datenstruktur
#### Objekte

Die durch die taxonomische Einheit definierten Objekte (Arten und Lebensräume) werden als Dokumente im [JSON-Format](http://de.wikipedia.org/wiki/JavaScript_Object_Notation) gespeichert. Sie enthalten eine id ([GUID](http://de.wikipedia.org/wiki/Globally_Unique_Identifier)). Nachfolgend der noch beinahe leere Rohbau eines Objekts ohne Eigenschaftensammlungen. Alle Beispiele stammen von der Europäischen Sumpfschildkröte.
```javascript
{
    "_id": "2B945AD0-F66B-48AD-810C-C2A84BFF6C3E",
    "Gruppe": "Fauna"
}
```
- _id ist die id, eine [GUID](http://de.wikipedia.org/wiki/Globally_Unique_Identifier)
- Gruppe ist "Fauna", "Flora", "Moose", "Macromycetes" oder "Lebensräume"

#### Taxonomie
Die Taxonomie enthält sich selbst beschreibende Felder, z.B.:

- Name: obligatorisch, muss eineindeutig sein, Schreibweise angelehnt an Literaturzitate aber möglichst kurz
- Allgemeine Beschreibung: Vor allem, was für das Verständnis der Daten erforderlich ist
- Datenstand (Datum, als die Daten bezogen wurden)
- Link

Ihre Eigenschaften sind unter "Eigenschaften" aufgelistet:
```javascript
"Taxonomie": {
        "Name":"CSCF (2009)",
        "Beschreibung":"Index der Info Fauna (2009). Eigenschaften von 21542 Tierarten",
        "Datenstand":"2009",
        "Link":"http://www.cscf.ch/",
        "Eigenschaften": {
            "Taxonomie ID": 70150,
            "Klasse":"Reptilia",
            "Ordnung":"Chelonii",
            "Familie":"Emydidae",
            "Gattung":"Emys",
            "Art":"orbicularis",
            "Autor":"Linnaeus, 1758",
            "Artname":"Emys orbicularis Linnaeus, 1758",
            "Artname vollständig":"Emys orbicularis Linnaeus, 1758 (Europ. Sumpfschildkröte)",
            "Name Deutsch":"Europ. Sumpfschildkröte",
            "Name Französisch":"Cistude d&#39;Europe",
            "Name Italienisch":"Emide europea",
            "Name Romanisch":"Tartaruga da palì",
            "Name Englisch":"European pond terrapin",
            "Schutz CH":"Schutz gemäss NHG"
        }
}
```
Lebensraumschlüssel werden auch als Taxonomien behandelt und bezeichnet. Bloss werden im Hierarchiebaum alle gleichzeitig angezeigt. Das ist hier nützlicher, weil es bei Lebensräumen sehr viele Taxonomien gibt und man meistens nicht mit einer Standard-Taxonomie arbeitet.

#### Eigenschaftensammlungen
Die JSON-Eigenschaft "Eigenschaftensammlungen" enthält alle Eigenschaftensammlungen des Objekts. Eigenschaftensammlungen sind genau gleich aufgebaut wie die Taxonomie.

Hier ein Auszug mit nur einer Eigenschaftensammlung:
```javascript
"Eigenschaftensammlungen": [
    {
        "Name":"CH Agroscope Zielart (2008)",
        "Beschreibung":"Agroscope (2008). Eigenschaften von 207 Tierarten",
        "Datenstand":"2008",
        "Link":"http://www.agroscope.admin.ch",
        "Eigenschaften": {
            "1_1 West-Jura": false,
            "1_2 Nord-Jura": false,
            "1_3 Nordostschweiz": false,
            "2_1 West-Mittelland": true,
            "2_2 Ost-Mittelland": true,
            "3_1 West-Nordalpen": true,
            "3_2 Ost-Nordalpen": false,
            "4_1 West-Zentralalpen": false,
            "4_2 Ost-Zentralalpen": false,
            "4_3 Engadin": false,
            "5 Südalpen": true,
            "Collin": true,
            "Montan": false,
            "Subalpin": false,
            "Alpin": false,
            "Rote Liste CH":"ausgestorben oder verschollen",
            "Aufwand für Erfolg":"sehr gross",
            "Beobachtbarkeit":"Die Art ist relativ einfach nachweisbar",
            "Verbreitung Lebensraum Massnahmen":"Unterhalb 500-600 m; der Status der Sumpfschildkröte in der Schweiz ist nicht vollständig geklärt, da es immer wieder Aussetzungen und Umsiedlungen gab, allerdings werden einige Vorkommen als autochthon betrachtet; sich reproduzierende Populationen gibt es in den Kantonen GE, AG, TG. Lebensraum: stehende Gewässer mit starker Ufer- und Wasservegetation und schlammigem Untergrund; Kleinseen, Weiher und Altwässer mit deckungsreicher Ufervegetation. Massnahmen sollten in Absprache mit Fachpersonen (KARCH) erfolgen. Hinweis: Aussetzungen, Wiederansiedlungen und Umsiedlungen sind bewilligungspflichtig! In Regionen, die für eine offizielle Wiederansiedlung geeignet sein könnten, ist sie als Zielart durchaus denkbar, z.B. Gebiete mit vielen stehenden Gewässern und Feuchtzonen."
        }
    }
]
```

#### Beziehungssammlungen
Beziehungssammlungen werden ähnlich aufgebaut wie Eigenschaftensammlungen. Hier ein Auszug mit nur einer Beziehung:
```javascript
"Beziehungssammlungen": [
    {
        "Name":"ZH AP FM (2010): Art ist an Lebensraum gebunden",
        "Beschreibung":"Aktionsplan Flachmoore des Kantons Zürich (2010). Eigenschaften von 728 Tierarten, 3500 Pflanzenarten, 57 Moosarten und 60 Lebensräumen. 10219 Beziehungen zwischen Tierarten und Lebensräumen. 664 Beziehungen zwischen Pflanzenarten und Lebensräumen. 79 Beziehungen zwischen Moosarten und Lebensräumen",
        "Datenstand":"2010",
        "Link":"http://www.naturschutz.zh.ch",
        "Art der Beziehungen":"Art ist an Lebensraum gebunden",
        "Beziehungen": [
            {
                "Beziehungspartner": [
                    {
                        "Gruppe":"Lebensräume",
                        "Taxonomie":"ZH FNS (1977): Feuchtgebietskartierung, Lebensräume",
                        "Name":"02: Röhricht",
                        "GUID":"BF31ECDD-A540-4BA9-956C-BE51C3AA346E"
                    }
                ],
                "Biotopbindung":"7"
            }
        ]
    }
]

```
Unterschiede zwischen Beziehungssammlung und (gewöhnlicher) Eigenschaftensammlung:

- Anstatt "Eigenschaften" enthält sie "Beziehungen"
- Jede Beziehung enthält im Feld "Beziehungspartner" beliebig viele beteiligte Objekte. Daneben kann sie wie gewöhnliche Eigenschaftensammlungen weitere beschreibende Felder enthalten. Der Begriff "Beziehungspartner" wird anstelle von "Objekt" verwendet, weil er im Kontext der Beziehung verständlicher ist
- Enthält eine Eigenschaftensammlung mehrere Arten von Beziehungen, werden ihre Beziehungen in mehrere Beziehungssammlungen gepackt. Der Name der Beziehungssammlung weist auf die Art der enthaltenen Beziehungen hin. So wird die Übersichtlichkeit der Daten verbessert. Beispielsweise könnte es neben der Beziehungssammlung "CH Delarze (2008): Art charakterisiert Lebensraum" eine weitere Beziehungssammlung "CH Delarze (2008): Art ist Zielart im Lebensraum" geben
- Beziehungssammlungen taxonomischer Art wie z.B. "synonym" erhalten einen Typ "taxonomisch". So können sie separat angesprochen werden, z.B. für den Aufbau eines Beziehungsbaums oder die Darstellung auf dem Bildschirm

#### Beispiel des vollständigen Objekts
<a name="JsonBeispiel"></a>
```javascript
{
    "_id":"2B945AD0-F66B-48AD-810C-C2A84BFF6C3E",
    "_rev":"12-4bde606882a8e9c4f449166c3849963e",
    "Gruppe":"Fauna",
    "Typ":"Objekt",
    "Taxonomie":{
        "Name":"CSCF (2009)",
        "Beschreibung":"Index der Info Fauna (2009). Eigenschaften von 21542 Tierarten",
        "Datenstand":"2009",
        "Link":"http://www.cscf.ch/",
        "Eigenschaften":{
            "Taxonomie ID": 70150,
            "Klasse":"Reptilia",
            "Ordnung":"Chelonii",
            "Familie":"Emydidae",
            "Gattung":"Emys",
            "Art":"orbicularis",
            "Autor":"Linnaeus, 1758",
            "Artname":"Emys orbicularis Linnaeus, 1758",
            "Artname vollständig":"Emys orbicularis Linnaeus, 1758 (Europ. Sumpfschildkröte)",
            "Name Deutsch":"Europ. Sumpfschildkröte",
            "Name Französisch":"Cistude d&#39;Europe",
            "Name Italienisch":"Emide europea",
            "Name Romanisch":"Tartaruga da palì",
            "Name Englisch":"European pond terrapin",
            "Schutz CH":"Schutz gemäss NHG"
        }
    },
    "Eigenschaftensammlungen": [
        {
            "Name":"CH Agroscope Zielart (2008)",
            "Beschreibung":"Agroscope (2008). Eigenschaften von 207 Tierarten",
            "Datenstand":"2008",
            "Link":"http://www.agroscope.admin.ch",
            "Eigenschaften":{
                "1_1 West-Jura": false,
                "1_2 Nord-Jura": false,
                "1_3 Nordostschweiz": false,
                "2_1 West-Mittelland": true,
                "2_2 Ost-Mittelland": true,
                "3_1 West-Nordalpen": true,
                "3_2 Ost-Nordalpen": false,
                "4_1 West-Zentralalpen": false,
                "4_2 Ost-Zentralalpen": false,
                "4_3 Engadin": false,
                "5 Südalpen": true,
                "Collin": true,
                "Montan": false,
                "Subalpin": false,
                "Alpin": false,
                "Rote Liste CH":"ausgestorben oder verschollen",
                "Aufwand für Erfolg":"sehr gross",
                "Beobachtbarkeit":"Die Art ist relativ einfach nachweisbar",
                "Verbreitung Lebensraum Massnahmen":"Unterhalb 500-600 m; der Status der Sumpfschildkröte in der Schweiz ist nicht vollständig geklärt, da es immer wieder Aussetzungen und Umsiedlungen gab, allerdings werden einige Vorkommen als autochthon betrachtet; sich reproduzierende Populationen gibt es in den Kantonen GE, AG, TG. Lebensraum: stehende Gewässer mit starker Ufer- und Wasservegetation und schlammigem Untergrund; Kleinseen, Weiher und Altwässer mit deckungsreicher Ufervegetation. Massnahmen sollten in Absprache mit Fachpersonen (KARCH) erfolgen. Hinweis: Aussetzungen, Wiederansiedlungen und Umsiedlungen sind bewilligungspflichtig! In Regionen, die für eine offizielle Wiederansiedlung geeignet sein könnten, ist sie als Zielart durchaus denkbar, z.B. Gebiete mit vielen stehenden Gewässern und Feuchtzonen."
            }
        },
        {
            "Name":"CH Prioritäten (2011)",
            "Beschreibung":"BAFU (2011): Liste der National Prioritären Arten. Eigenschaften von 607 Tierarten, 2595 Pflanzenarten, 934 Pilzarten und 415 Moosarten",
            "Datenstand":"2012.01",
            "Link":"http://www.bafu.admin.ch/publikationen/publikation/01607/index.html?lang=de",
            "Eigenschaften":{
                "Priorität":"hoch",
                "Gefährdung":"vom Aussterben bedroht",
                "Verantwortung":"geringe Verantwortung",
                "Massnahmenbedarf":"klar",
                "Bestände überwachen":"nötig",
                "Kenntnisse vorhanden":"ausreichend",
                "Techniken bekannt":"erfolgreiche Techniken sind bekannt",
                "Verbreitung Jura":"nicht vorhanden",
                "Verbreitung Mittelland":"(aktuell) nicht beurteilbar: bisher kein Fund in der betreffenden Region/Kanton/Höhenstufe nachgewiesen",
                "Verbreitung Nordalpen":"nicht vorhanden",
                "Verbreitung westliche Zentralalpen":"nicht vorhanden",
                "Verbreitung östliche Zentralalpen":"nicht vorhanden",
                "Verbreitung Südalpen":"(aktuell) nicht beurteilbar: bisher kein Fund in der betreffenden Region/Kanton/Höhenstufe nachgewiesen",
                "Verbreitung kollin":"letzter Fund aus den Jahren 2000 bis 2010",
                "Verbreitung montan":"nicht vorhanden",
                "Verbreitung subalpin":"nicht vorhanden",
                "Verbreitung alpin":"nicht vorhanden",
                "Verbreitung Kt Zürich":"nicht vorhanden"
            }
        },
        {
            "Name":"CH Rote Listen (unterschiedliche Jahre)",
            "Beschreibung":"Aktuellster Stand pro Artengruppe der Roten Listen. Eigenschaften von 2284 Tierarten",
            "Datenstand":"unterschiedlich",
            "Eigenschaften":{
                "Europa Smaragd": true,
                "Europa":"potentiell gefährdet (NT)",
                "Schweiz aktuell":"vom Aussterben bedroht (CR)",
                "Schweiz Kriterien":"B2a, B2b(iii)",
                "Nordschweiz":"ausgestorben oder verschollen",
                "Kt Zürich":"ausgestorben oder verschollen",
                "Quelle":"BAFU 2005 (CH), älter (Regionen)"
            }
        },
        {
            "Name":"ZH AP FM (2010)",
            "Beschreibung":"Aktionsplan Flachmoore des Kantons Zürich (2010). Eigenschaften von 728 Tierarten, 3500 Pflanzenarten, 57 Moosarten und 60 Lebensräumen. 10219 Beziehungen zwischen Tierarten und Lebensräumen. 664 Beziehungen zwischen Pflanzenarten und Lebensräumen. 79 Beziehungen zwischen Moosarten und Lebensräumen",
            "Datenstand":"2010",
            "Link":"http://www.naturschutz.zh.ch",
            "Eigenschaften":{
                "Art ist für AP FM relevant": true,
                "Bindung an Flachmoore": 7,
                "Artwert AP FM": 18,
                "An Strukturen gebunden": true,
                "Bemerkungen":"Ob die Art im Kanton Zürich noch autochthone Bestände besitzt, bleibt nach wie vor fraglich. Die meisten der beobachteten Tiere sind vermutlich auf illegale Aussetzungen zurückzuführen. Nach heutigem Kenntnisstand ist es dennoch nicht ganz auszuschliessen, dass vereinzelt autochthone (Teil-) Populationen oder vereinzelte Individuen überlebt haben könnten.\nAnzahl Populationen: Es ist nach wie vor unbekannt, ob reproduktionsfähige Populationen existieren (eher nicht) und ob noch autochthone Individuen überlebt haben (möglich aber eher unwahrscheinlich).",
                "Artwertberechnung Areal weltweit":"mittel (2 Punkte)",
                "Artwertberechnung Anteil am CH-Bestand":"mittel: 1/4-1/2 (2 Punkte)",
                "Artwertberechnung Gefährdung EU Punkte": 0,
                "Artwertberechnung Gefährdung CH Punkte": 4,
                "Artwertberechnung Gefährdung ZH Punkte": 3,
                "Artwertberechnung neuer Artwert": 11,
                "Artwertberechnung verwendeter Artwert": 11,
                "Ansprüche ans Moor":"Kein eigentlicher Moorbewohner, obwohl sehr gern (v.a. als Jungtier fast obligat) im Schilfröhricht. Eiablagestellen nur an mikroklimatisch begünstigten Stellen (v.a. Böschungen mit xerothermophiler, lückiger Vegetation).",
                "Kleine überlebensfähige Populationen, Anzahl angestrebt":"5+",
                "Ansprüche für Kriterium überlebensfähig":"regelmässige Reproduktion",
                "Regional fördern": true,
                "Regional fördern wo":" Glatt, Thur, Greifensee, Päffikersee, Katzensee",
                "Massnahmen":"Spezialprogramm (muss noch definiert werden)."
            }
        },
        {
            "Name":"ZH AP Grundlagen (1995)",
            "Beschreibung":"Einstufung von Arten im Kanton Zürich. Eigenschaften von 682 Tierarten und 3156 Pflanzenarten",
            "Datenstand":"ca. 1995",
            "Link":"http://www.naturschutz.zh.ch",
            "Eigenschaften":{
                "Dringlichkeit Aktionsplan":"nicht beurteilt",
                "Priorität nach Naturschutz-Gesamtkonzept 1990":"nicht beurteilt",
                "Bestandesentwicklung 1985-2000":"Abnahme",
                "Keine Bestandesabnahme aber Population bedroht":"nicht beurteilt",
                "Fördermassnahmen bekannt":"ja",
                "Geeignete Lebensräume vohanden oder herstellbar":"nein",
                "Überlebensfähige Populationen vorhanden":"nein",
                "Etablierungs-Potential gut":"nein",
                "Ausbreitungs-Potential gut":"ja",
                "Erfolgsaussichten vorhanden":"ja",
                "Nationales Artenschutzprogramm":"nicht beurteilt",
                "Höchste Dringlichkeit":"nicht beurteilt",
                "Verhältnis Aufwand-Ertrag günstig":"nicht beurteilt",
                "Umbrella- oder flagship-species":"nicht beurteilt",
                "Bereits irgendwo Artenschutzprogramme":"nicht beurteilt",
                "Dringlichkeit":"nicht beurteilt",
                "Schutz":"Schutz gemäss Bundesgesetz über die Jagd"
            }
        },
        {
            "Name":"ZH Artengruppen",
            "Beschreibung":"Artengruppen Kt. Zürich. Eigenschaften von allen Arten",
            "Datenstand":"2012",
            "Link":"http://www.naturschutz.zh.ch",
            "Eigenschaften":{
                "GIS-Layer":"Reptilien",
                "Artengruppen-ID in EvAB": 12
            }
        },
        {
            "Name":"ZH Artwert (aktuell)",
            "Beschreibung":"Artwerte für den Kanton Zürich. Eigenschaften von 1530 Tierarten, 2763 Pflanzenarten und 34 Moosarten",
            "Datenstand":"ca. 1995",
            "Link":"http://www.naturschutz.zh.ch",
            "Eigenschaften":{
                "Artwert": 11,
                "Artwertberechnung Areal weltweit":"gross (0 Punkte)",
                "Artwertberechnung Anteil am CH-Bestand":"klein: <1/4 (0 Punkte)"
            }
        },
        {
            "Name":"ZH GIS",
            "Beschreibung":"GIS-Layer und Projektrelevanzen im Kanton Zürich. Eigenschaften von allen Arten",
            "Datenstand":"2012",
            "Link":"http://www.naturschutz.zh.ch",
            "Eigenschaften":{
                "Betrachtungsdistanz (m)": 500,
                "Kriterien für Bestimmung der Betrachtungsdistanz":"5 (500m als Minimalwert zugeteilt)"
            }
        }
    ],
    "Beziehungssammlungen": [
        {
            "Name":"CH Agroscope Zielart (2008): Ziel-/Leitart für Lebensraum",
            "Beschreibung":"Agroscope (2008). Eigenschaften von 207 Tierarten",
            "Datenstand":"2008",
            "Link":"http://www.agroscope.admin.ch",
            "Art der Beziehungen":"Ziel-/Leitart für Lebensraum",
            "Beziehungen": [
                {
                    "Beziehungspartner": [
                        {
                            "Gruppe":"Lebensräume",
                            "Taxonomie":"CH Agroscope (2008): Ziel- und Leitarten",
                            "Name":"06: Weiher, Tümpel, Pfütze",
                            "GUID":"98DDA55D-7C24-4590-BEDE-9A1B02D77592"
                        }
                    ]
                }
            ]
        },
        {
            "Name":"ZH AP FM (2010): Art ist an Lebensraum gebunden",
            "Beschreibung":"Aktionsplan Flachmoore des Kantons Zürich (2010). Eigenschaften von 728 Tierarten, 3500 Pflanzenarten, 57 Moosarten und 60 Lebensräumen. 10219 Beziehungen zwischen Tierarten und Lebensräumen. 664 Beziehungen zwischen Pflanzenarten und Lebensräumen. 79 Beziehungen zwischen Moosarten und Lebensräumen",
            "Datenstand":"2010",
            "Link":"http://www.naturschutz.zh.ch",
            "Art der Beziehungen":"Art ist an Lebensraum gebunden",
            "Beziehungssammlungen": [
                {
                    "Beziehungspartner": [
                        {
                            "Gruppe":"Lebensräume",
                            "Taxonomie":"ZH FNS (1977): Feuchtgebietskartierung, Lebensräume",
                            "Name":"02: Röhricht",
                            "GUID":"BF31ECDD-A540-4BA9-956C-BE51C3AA346E"
                        }
                    ],
                    "Biotopbindung":"7"
                }
            ]
        },
        {
            "Name":"ZH AP Grundlagen (1995): Art kommt in Lebensraum vor",
            "Beschreibung":"Einstufung von Arten im Kanton Zürich. Eigenschaften von 682 Tierarten und 3156 Pflanzenarten",
            "Datenstand":"ca. 1995",
            "Link":"http://www.naturschutz.zh.ch",
            "Art der Beziehungen":"Art kommt in Lebensraum vor",
            "Beziehungssammlungen": [
                {
                    "Beziehungspartner": [
                        {
                            "Gruppe":"Lebensräume",
                            "Taxonomie":"ZH FNS (1995)",
                            "Name":"03: Seen",
                            "GUID":"A0FC1442-784E-44BA-9FAD-8749AF9D7DCA"
                        }
                    ]
                },
                {
                    "Beziehungspartner": [
                        {
                            "Gruppe":"Lebensräume",
                            "Taxonomie":"ZH FNS (1995)",
                            "Name":"04: Weiher, Teiche",
                            "GUID":"8B07E4E6-E768-4CE9-84D6-E490432FD140"
                        }
                    ]
                }
            ]
        }
    ]
}
```
Das kann auch ein Laie direkt lesen, obwohl es maschinenlesbare Rohdaten sind. Man muss bloss einen Editor verwenden, der die Struktur von JSON-Daten optisch umsetzt.

Versuchen Sie einmal, diese Informationen aus einer relationalen Datenbank abzufragen und so übersichtlich darzustellen. Es wäre nur schon eine Kunst, die diversen Felder nicht anzuzeigen, in denen für diese Art keine Informationen enthalten sind (die aber existieren, weil andere Arten mit ihnen beschrieben werden). Die Zusammenfassung aller Eigenschaftensammlungen in einer einzigen Zeile vernichtet jede strukturelle Information und ist schlecht lesbar. Und dann darf man sich noch mit so interessanten Problemen rumschlagen wie: Wie wird garantiert, dass jeder Feldname _über alle Eigenschaftensammlungen hinweg_ eindeutig ist? In JSON ist das kein Problem, da die Felder aufgrund der vorhandenen Hierarchie eindeutig sind.

Verglichen mit der Datenstruktur in der relationalen Datenbank wird Komplexität (dutzende verknüpfter Tabellen mit Schlüsseln und Fremdschlüsseln) durch Redundanz ersetzt:

- Eigenschaftensammlungen werden in jedem Objekt beschrieben, für welches sie Informationen haben
- Beziehungen werden in allen beteiligten Objekten beschrieben

### Hierarchien
Die Hierarchien werden momentan folgendermassen aufgebaut:

- Flora: über Familie und Gattung
- Fauna: über Klasse, Ordnung und Familie
- Moose: über Klasse, Familie und Gattung
- Pilze: über die Gattung
- Lebensräume: Jedes Objekt kennt seine Position in der Hierarchie. Hier zum Beispiel das Schneidbinsenried nach Delarze:

```javascript
"Hierarchie": [
   {
       "Name": "CH Delarze (2008): Lebensräume",
       "GUID": "69D34753-445B-4C55-B3B7-E570F7DC1819"
   },
   {
       "Name": "2: Vegetation der Ufer und der Feuchtgebiete",
       "GUID": "1525DE7D-5B59-4844-BA46-BFA16B8C2574"
   },
   {
       "Name": "2.2: Flachmoore",
       "GUID": "21ED7965-F325-4F85-8793-EE908BCA2B99"
   },
   {
       "Name": "2.2.1: Grossseggenbestände",
       "GUID": "7755D60C-100D-4405-A0E7-7B11D3930F40"
   },
   {
       "Name": "2.2.1.2: Schneidbinsenried",
       "GUID": "8913C6B2-007A-4190-AA69-8CB6EC9F0576"
   }
]
```
Langfristig sollen in allen Gruppen die Objekte ihre Position in der Hierarchie speichern, siehe [diese Idee](https://github.com/FNSKtZH/artendb/wiki/Objekte-von-Taxonomien-entkoppeln). So ist es möglich, beliebig hierarchisch organisierte Taxonomien zu importieren und anzuzeigen. Vorläufig ist das aber nur bei Lebensräumen nötig.

<a name="Schnittstellen"></a>
### Schnittstellen
Einzelne Datensätze können direkt über die URL mit ihrer GUID angesprochen werden, [hier zum Beispiel die Daten der Erdkröte](http://arteigenschaften.ch/artendb/979233B6-9013-4820-9F7D-8ED9D826C2D3).

CouchDb liefert seine im JSON-Format vorliegenden Daten mittels "views". Diese werden über die URL aufgerufen. [Hier als Beispiel die ganze Floraliste](http://arteigenschaften.ch/artendb/_design/artendb/_view/filtere_art?startkey=[%22Flora%22]&endkey=[%22Flora%22,{}]).

Wie views werden auch "lists" über die URL aufgerufen. Lists sind views, deren Daten durch Code auf dem Server umgewandelt wird. Im Gegensatz zu views kann so praktisch jedes denkbare Datenformat erstellt werden. Dafür muss man auf sie warten, da die Umwandlung Zeit braucht.

[Hier als Beispiel ein Export für das Artenlistentool](http://arteigenschaften.ch/_list/export_alt_mit_synonymen_direkt/all_docs_mit_synonymen_fuer_alt?include_docs=true) als Download (der sich technisch nur geringfügig vom Direktzugriff unterscheidet).

Gibt es für die gewünschten Daten einen GUID, einen view oder eine list und kennt man deren URL, kann man die Daten entsprechend einfach abholen. Damit views und lists als öffentliche Schnittstellen benutzt werden können, müssen sie daher bloss beschrieben und fixiert werden.

Bisher realisierte Schnittstellen:

- Artenlisten und Artgruppen für [artbeobachtungen.ch](http://artbeobachtungen.ch/index.html)
- [Arteigenschaften](http://arteigenschaften.ch/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true) für das [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content)
  - Zusätzlich kann der Nutzer sich vom Artenlistentool auf [diese URL in arteigenschaften.ch](http://arteigenschaften.ch/index.html?exportieren_fuer_artenlistentool=true) leiten lassen, um selber Eigenschaften zu wählen, welche anschliessend im Artenlistentool mit der Beboachtungsliste exportiert werden
- [Taxonomien](http://arteigenschaften.ch/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true) für [EvAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content)
- Arteigenschaften für [apflora.ch](https://github.com/FNSKtZH/apflora)

Wollen Sie mit Ihrer Anwendung auf die Daten von arteigenschaften.ch greifen? <a href="mailto:alex@gabriel-software.ch">Mailen Sie mir</a>, und wir vereinbaren eine geeignete Schnittstelle.

<a href="#top">&#8593; top</a>

<a name="Zeitplan"></a>
# Realisierung
### Zeitplan
Aktueller Stand: [http://arteigenschaften.ch](http://arteigenschaften.ch) hat die frühere Access-Anwendung 2015 abgelöst.

### Was kann man mit der aktuellen Version machen?

Arten suchen:

- Mit einem Filterfeld
- Manuell im hierarchischen Verwandschaftsbaum

Eigenschaften anzeigen:

- Für über 40'000 Arten (aus den Gruppen Fauna, Flora, Moose, Pilze) und Lebensräume
- Auch Eigenschaften- und Beziehungssammlungen von synonymen Objekten werden angezeigt
- Eigenschaften- und Beziehungssammlungen sind beschrieben
- Beziehungen zwischen Objekten sind verlinkt
- Felder, die nur einen Web-Link enthalten, werden als Hyperlink angezeigt

Daten importieren:

- Eigenschaftensammlungen (auch zusammenfassende)
- Beziehungssammlungen (auch zusammenfassende)
- mit Unterstützung einer Anleitung und eines Screencasts

Daten exportieren:

- Objekte inklusive Taxonomien, Eigenschaftensammlungen und Beziehungssammlungen
- Zuerst werden die gewünschten Gruppen gewählt
- Es kann nach jedem (!) in diesen Gruppen existierenden Feld gefiltert werden
- Dabei können Vergleichsoperatoren verwendet werden (=, >, >=, <, <=)
- In einer übersichtlichen Liste werden die gewünschten Felder gewählt
- Informationen von synonymen Arten können mit exportiert werden
- Wenn gewünscht, werden nur Datensätze geliefert, für die Informationen in den gewählten Eigenschaftensammlungen existieren
- Bei Beziehungssammlungen kann man wahlweise:
  - pro Beziehung eine Zeile erstellen
  - pro Objekt eine Zeile erstellen und die Informationen aller Beziehungen kommagetrennt hintereinander ins entsprechende Feld schreiben
- Vor dem Herunterladen kann man die getroffene Wahl in einer Vorschau-Tabelle überprüfen

Lebensräume in der Anwendung bearbeiten:

- Ist erst grob implementiert. Muss noch getestet und verbessert werden

**Ideen für die Zukunft**

- [Schreibrechte für Organisationen und Benutzer gestalten](https://github.com/FNSKtZH/artendb/wiki/Schreibrechte:-Organisationen-und-Benutzer) (bald)
- [In Eigenschaften- und Beziehungssammlungen Nutzungsbedingungen festlegen](https://github.com/FNSKtZH/artendb/wiki/In-Datensammlungen-Nutzungsbedingungen-festlegen) (bald)
- Exporte und Importe direkt nach und von .xlsx-Formate (Probleme von Excel umgehen)
- Taxonomien bearbeiten (mittel prioritär)
- Taxonomien importieren (wenig prioritär)
- [Objekte von Taxonomien entkoppeln](https://github.com/FNSKtZH/artendb/wiki/Objekte-von-Taxonomien-entkoppeln) = alternative Taxonomien verwalten und darstellen (grundlegend)
- Eigenschaften- und Beziehungssammlungen: Beschreiben, mit Bezug auf welche Taxonomie die Eigenschaften- oder Beziehungssammlung ursprünglich erstellt wurde  
- Nach beliebigem Text suchen können
- Listen von Beobachtungen/Lebensräumen mit Eigenschaften verknüpfen:
  - Benutzerin lädt eine Tabelle mit ihren Beobachtungen oder Lebensräumen (wie bei Importen)
  - Sie wählt, mit welcher ID diese Daten mit Eigenschaften verknüpft werden sollen (wie bei Importen)
  - Anwendung meldet, wie erfolgreich die Verknüpfung ist (wie bei Importen)
  - Benutzer wählt Eigenschaften (wie bei Exporten)
  - Benutzer lädt Ergebnis herunter (wie bei Exporten)

<a href="#top">&#8593; top</a>

<a name="OpenSource"></a>
# Open source
Die für die Anwendung verwendete [Lizenz](https://github.com/FNSKtZH/artendb/blob/master/License.md) ist sehr freizügig. Eine Weiterverbreitung der in der Anwendung enthaltenen Daten ist aber nur mit Einverständnis der Autoren zulässig.

<a href="#top">&#8593; top</a>
