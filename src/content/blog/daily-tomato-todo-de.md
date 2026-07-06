---
title: 'Daily Tomato Todo gestalten: Wenn Todo-Liste und Timer ein Produkt sind'
description: 'Eine Produkt- und Frontend-Fallstudie zu Daily Tomato Todo — einem Vue-3-Tagesplaner mit Pinia und Vollbild-Pomodoro. Warum Tagesplanung und fokussiertes Arbeiten dieselbe Bewegung sein sollten und wie vier Designentscheidungen die ganze App tragen.'
pubDate: 2026-07-06
cover: '/images/blog/daily-tomato-todo-banner.svg'
category: 'Product & Design'
lang: 'de'
draft: false
---

# Daily Tomato Todo gestalten: Wenn Todo-Liste und Timer ein Produkt sind

Die meisten Todo-Apps behandeln Zeit als Label und Fokus als Nebensache: Aufgaben stapeln sich in einer endlosen Liste, und der Pomodoro-Timer lebt in einer Ecke, die man ignoriert. **Daily Tomato Todo** ist ein Vue-3-Tagesplaner mit Pinia, der auf einer anderen Prämisse aufbaut — Tagesplanung und das Fokussieren auf eine Aufgabe sollten dieselbe Bewegung sein, nicht zwei getrennte Apps.

Du kannst [die Live-App hier ausprobieren](https://shueny.github.io/vue-daily-tomato-todo/) und den Code auf [GitHub](https://github.com/shueny/vue-daily-tomato-todo) ansehen. Dieser Beitrag ist die Designgeschichte dahinter.

---

## Das Problem: eine endlose Liste, ein ignorierter Timer

Eine einzige scrollende Liste beantwortet „Was habe ich zu tun?", aber nie „Was mache ich *heute*?". Und ein Timer in der Bildschirmecke konkurriert mit genau der Liste, die er eigentlich zum Schweigen bringen soll. Die Designfrage war nie „Wie füge ich ein Pomodoro-Feature hinzu?" — sondern „Wie sieht die App aus, wenn Tag, Aufgabe und Fokus-Session ein Objekt sind?"

## Vier Entscheidungen, die das Design tragen

Alles in der App hängt an vier Entscheidungen. Jede entfernt entweder einen Tap oder eine Ablenkung.

### 1. Der Kalender versteckt sich hinter dem Kopfzeilendatum

Kein neuer Button. Das große Datum, auf das Nutzer ohnehin schauen, wird zum Einstiegspunkt: antippen, und der ganze Monat klappt auf. Kleine Status-Punkte fassen jeden Tag zusammen — offen, überfällig, alles erledigt — und **jeder Tag ist antippbar**, auch leere, die einfach blasser dargestellt werden.

### 2. Der Datums-Chip folgt dem Tag, den du gerade ansiehst

Die Eingabeleiste trägt einen Datums-Chip, dessen Standardwert immer **der gerade sichtbare Tag** ist. Wer auf der Morgen-Karte tippt, legt eine Aufgabe für morgen an — null zusätzliche Taps im Normalfall. Der Chip öffnet Schnellauswahlen (heute, morgen, nächster Montag) plus einen vollständigen Datepicker.

### 3. Eine Karte pro Tag, Wischen zum Reisen

Die Liste ist eine horizontale Schiene aus Tageskarten, gebaut mit purem **CSS Scroll-Snap** — ohne Abhängigkeiten, mit nativer Trägheit, Tage werden bei Bedarf erzeugt. Tages-Pills leuchten mit der Scroll-Position auf, und wer heute verlässt, bekommt eine Zurück-zu-heute-Abkürzung.

### 4. Ein gestarteter Pomodoro übernimmt den ganzen Bildschirm

Play auf einer Aufgabe drücken, und ein Fokus-Overlay bedeckt alles: Countdown, Fortschrittsring, Aufgabenname, Pause und Stopp. Die Liste lässt sich nicht scrollen. Aufgaben lassen sich nicht anlegen. **Ablenkung zu blockieren ist das Feature, keine Einschränkung.** Nach dem Tomaten-Ende übernimmt ein Pausenbildschirm in ruhigerem Grün und gibt dich dann an die Liste zurück.

## Die langweiligen Entscheidungen, die zählen

Drei kleine Produktentscheidungen prägten das Datenmodell:

- **Aufgaben ohne Datum landen auf heute.** Eine einfache Regel schlägt einen separaten „Ungeplant"-Eimer, an den man denken muss.
- **Unerledigtes rollt nicht automatisch weiter.** Es bleibt als ehrliche Aufzeichnung auf seinem Tag, und die Heute-Karte zeigt einen roten Hinweis, um es mit einem Tap zu verschieben. Die Historie bleibt wahr; die Korrektur bleibt billig.
- **Fälligkeitsdatum und geplantes Datum sind ein Konzept.** Zwei Datumsfelder an einem persönlichen Todo sind ein Datenmodell auf Problemsuche.

## Der Build: kleine App, echte Architektur

- **Vue 3 + Pinia, ein Store.** Scroll-Position des Karussells, Kopfzeilendatum, Tages-Pills und Kalenderauswahl lesen und schreiben denselben Store — keine Event-Spaghetti zwischen Geschwistern.
- **Kalenderpunkte sind abgeleiteter Zustand.** Offen, überfällig und erledigt werden aus demselben Store berechnet, der die Karten rendert — Zusammenfassung und Detail können sich nie widersprechen.
- **Der Pomodoro ist eine State Machine.** Idle, focus, paused, break — als Vollbild-Overlay mit SVG-Fortschrittsring. Die Pause explizit zu modellieren (statt am Interval zu hacken) macht das Overlay vertrauenswürdig.
- **Karussell ohne Abhängigkeiten.** CSS Scroll-Snap liefert native Wischphysik gratis; der Scroll-Listener macht nur Indexrechnung.

## Warum es funktioniert

Dieses Projekt begann vor Jahren als meine erste Vue-Lernübung. Es mit Vue 3 und Pinia neu zu bauen war eine bewusste Übung in Zurückhaltung: Das mutigste Feature ist das, das Optionen entfernt statt hinzuzufügen, und der klügste Code ist der, der zugunsten einer CSS-Eigenschaft gelöscht wurde. Kleines Produkt, echtes Produktdenken.

👉 **[Live-App öffnen →](https://shueny.github.io/vue-daily-tomato-todo/)** und bei einer Aufgabe auf Play drücken, um den Vollbild-Fokusmodus zu erleben.
