---
title: 'Lucky Duck gestalten: Eine Rewards-Plattform-MVP als Growth-Funktion'
description: 'Eine Produkt- und Frontend-Fallstudie zu Lucky Duck — einem MVP-Konzept für eine Verbraucher-Rewards-Plattform. Wie ich das Erlebnis um Growth Loops herum strukturiert, ein token-basiertes Designsystem für Hell & Dunkel gebaut und einen voll klickbaren Prototyp auf genau dem Stack ausgeliefert habe, auf dem das Produkt starten würde.'
pubDate: 2026-06-03
cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop'
category: 'Product & Design'
draft: false
---

# Lucky Duck gestalten: Eine Rewards-Plattform-MVP als Growth-Funktion

Das Schwierige an einem Rewards-Produkt ist nicht, einen weiteren Marktplatz zu bauen. Es ist, genug Momentum aufzubauen, damit Menschen tatsächlich zurückkommen. **Lucky Duck** ist ein klickbares, mobil-first MVP-Konzept für eine Verbraucher-Rewards- und Mitgliedschaftsplattform — end-to-end gestaltet und im Frontend umgesetzt, um genau das zu beweisen.

Du kannst [den interaktiven Prototyp hier ausprobieren](/lucky-duck). Dieser Beitrag erzählt die Geschichte dahinter.

---

## Das Problem: Retention, nicht noch ein Katalog

Es ist leicht, einen Stapel hübscher Screens zu zeichnen. Viel schwieriger ist ein Flow, in dem jeder Screen den nächsten Tap verdient. Ein Rewards-Produkt steht und fällt mit der Gewohnheitsbildung — die Designfrage lautet also nicht „Wie sieht der Katalog aus?", sondern „Was bringt jemanden morgen zurück?"

Deshalb habe ich mich geweigert, zusammenhanglose Screens zu entwerfen. Stattdessen musste jeder Screen auf einen echten **Growth Loop** einzahlen.

## Der Ansatz: Screens, die auf Loops einzahlen

Ich habe das gesamte Erlebnis um vier Kern-Loops herum strukturiert:

- **Akquise** — ein maskottchengeführtes Landing, das das Versprechen in einer Zeile verkauft: *Play More. Win More. Get More.*
- **Aktivierung** — reibungsarmes Signup, das sofort ein Credit-Wallet öffnet, plus ein Ein-Tap-Wallet-Setup mit Bonus-Credits.
- **Engagement** — Reward-Discovery mit einem Featured Deal, Kategorien und Trending-Picks, jeweils mit transparenten Gewinnchancen.
- **Retention** — ein Portfolio aus Sammlungen, Tiers und jüngsten Gewinnen, das einen Grund zur Rückkehr gibt.

Und ein Moment, der alles verbindet: eine **Celebration** — Konfetti und ein Maskottchen-Moment, der jeden Gewinn verdient anfühlen lässt.

Wenn Screens auf Loops einzahlen, hört Produktdesign auf, Fassade zu sein, und wird zu einer Growth-Funktion.

## Das Designsystem: Tokens statt Einzel-Screens

Ein Prototyp, der nicht skalieren kann, beweist nichts. Deshalb läuft Lucky Duck auf einem kleinen **Token-Set** statt auf maßgeschneiderten Screens:

- **Farbe** — Primary Yellow (`#FFD600`), Deep Purple (`#6C3CFF`), Success Green (`#22C55E`) und eine dunkle Surface-Palette, alle als eine einzige `Palette`-Abstraktion mit Hell- und Dunkel-Varianten ausgedrückt.
- **Typografie** — schwere Display-Gewichte für die großen Momente, ruhige Fließtext-Gewichte für Klarheit.
- **Komponenten** — Buttons, Pills, Fortschrittsbalken und Cards, die überall wiederverwendet werden, damit neue Features schnell ausgeliefert werden und markenkonform bleiben.

Weil die gesamte Demo aus einer Palette liest, bleiben Hell und Dunkel synchron — ändere ein Token einmal, und jeder Screen folgt.

## Der Build: Ein Prototyp auf dem echten Stack

Das ist kein flaches Mockup. Es ist ein funktionierender Prototyp auf genau dem Stack, auf dem das Produkt starten würde:

- **Astro** für eine schnelle statische Seite,
- eine **React-Insel** für die interaktive Demo,
- **Framer Motion** für die Screen-Übergänge und die Celebration,
- **Tailwind CSS** für das token-getriebene Styling.

Ein paar erwähnenswerte technische Details:

1. **Kein Theme-Flackern.** Die Demo-Insel wird `client:only` gemountet und liest das aktuelle Theme beim ersten Render, sodass Dunkelmodus-Besucher nie ein Aufblitzen der hellen Palette sehen.
2. **Eine einzige Quelle der Wahrheit für Farbe.** Die Screen-State-Machine wird von einem `Palette`-Objekt gesteuert, sodass es keinen Drift zwischen Hell und Dunkel gibt.
3. **Sauberer Backend-Übergang.** Das Frontend ist bewusst entkoppelt — die Übergabe für Payments, Credits und die Odds-Engine bleibt sauber.

## Warum es funktioniert

Ein Rewards-Produkt ist ein Retention-Problem, verkleidet als Katalog-Problem. Indem jeder Screen auf einen Growth Loop einzahlt, die Optik in einem wiederverwendbaren Designsystem verankert ist und ein echter klickbarer Prototyp ausgeliefert wird, zeigt Lucky Duck das Produktdenken *und* das Engineering — nicht nur eine statische Idee.

👉 **[Öffne den interaktiven Prototyp →](/lucky-duck)** und wechsle das Website-Theme, um die hellen und dunklen Designsysteme nebeneinander zu sehen.
