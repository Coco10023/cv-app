# Databasbaserat CV

Detta projekt är en webbapplikation där användaren kan lagra, visa och hantera kurser i ett databasbaserat CV. 
Applikationen är utvecklad med Node.js, Express och SQLite.

## Funktioner

- Visa alla kurser som finns lagrade i databasen
- Lägga till nya kurser via formulär
- Radera kurser
- Validering av formulärdata på serversidan

## Tekniker

- Node.js
- Express
- EJS (view engine)
- SQLite (databas)
- HTML & CSS

## Databas

Applikationen använder en SQLite-databas (`cv.db`) med tabellen `courses`.

Tabellen innehåller följande fält:

- id (primärnyckel)
- coursecode
- coursename
- syllabus
- progression
- created_at

## ER-diagram

ER-diagrammet visar tabellen `courses` och dess attribut. Diagrammet finns i mappen `/docs`.

![ER-diagram](docs/er-diagram.png)

## Installation

1. Klona projektet:
git clone https://github.com/Coco10023/cv-app.git
cd cv-app

2. Installera beroenden:
npm install

3. Starta servern:
npm start

4. Öppna i webbläsaren:
http://localhost:3000

5. Publicerad version:
https://cv-app-5s32.onrender.com/

## Slutsatser
I denna uppgift har jag lärt mig hur man bygger en serverbaserad webbapplikation
med Node.js och Express, samt hur man använder en relationsdatabas för att lagra data.

Jag har även fått erfarenhet av SQL-kommandon som SELECT, INSERT och DELETE,
samt hur man hanterar formulärdata och validerar input på serversidan.

