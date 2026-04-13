# Databasbaserat CV

Detta projekt är en webbapplikation utvecklad med Node.js och Express. Applikationen gör det möjligt att lagra, visa och hantera kurser i en relationsdatabas.

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

## Installation

1. Klona projektet:
