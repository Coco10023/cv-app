// Importerar paket som behövs
const express = require("express"); 
const path = require("path"); 
const sqlite3 = require("sqlite3").verbose();

// Skapar Express-app
const app = express();
const PORT = 3000;

// Kopplar upp SQLite-databasen 
const db = new sqlite3.Database("./db/cv.db"); 

// Skapar tabell om den inte redan finns
db.run(`
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coursecode TEXT NOT NULL,
        coursename TEXT NOT NULL,
        syllabus TEXT NOT NULL,
        progression TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
        
`);     

// Inställningar 
app.set("view engine",  "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes

// Hämtar alla kurser från databasen och visar på startsidan
app.get("/", (req, res) => {
    db.all("SELECT * FROM courses ORDER BY created_at DESC", (err, rows) => {
        if (err) {
            return res.send("Databasfel");
        }
        res.render("index", { courses: rows });
    });
});

// Visa formulär 
app.get("/add", (req, res) => {
    res.render("add-course", { errors: [], formData: {}});
});

// Tar emot formulärdata och sparar en ny kurs
app.post("/add", (req, res) => {
    const { coursecode, coursename, syllabus, progression } = req.body;
    
let errors = [];

if (!coursecode || coursecode.trim() === "") {
    errors.push("Kurskod saknas");
}

if (!coursename || coursename.trim() === "") {
    errors.push("Kursnamn saknas");
}

if (!syllabus || syllabus.trim() === "") {
    errors.push("Kursplan saknas");
} else if (!syllabus.startsWith("http")) {
    errors.push("Kursplan måste vara en giltig URL");
}

if (!progression || progression.trim() === "") {
    errors.push("Progression saknas");
} else if (!["A", "B", "C"].includes(progression.toUpperCase())) {
    errors.push("Progression måste vara A, B eller C");
}

    db.run(
        `INSERT INTO courses (coursecode, coursename, syllabus, progression)
        VALUES (?, ?, ?, ?)`,
        [coursecode.trim(), coursename.trim(), syllabus.trim(), progression.trim().toUpperCase()],
        (err) => {
            if (err) {
                return res.send("Fel vid sparande");
            }
            res.redirect("/");
        }
    );
});

// Validering av url
if (!syllabus.startsWith("http")) {
    errors.push("Kursplan måste vara en giltig URL");
}

// Validering av Progression
if (!["A", "B", "C"].includes(progression.toUpperCase())) {
    errors.push("Progression måste vara A, B eller C");
}

// Tar bort en kurs baserat på ID
app.post("/delete/:id", (req, res) => {
    db.run("DELETE FROM courses WHERE id = ?", [req.params.id], () => {
        res.redirect("/");
    });
});

// Om sida 
app.get("/about", (req, res) => {
    res.render("about");
});

// Starta server
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
}); 
