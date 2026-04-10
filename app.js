const express = require("express"); 
const path = require("path"); 
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// Koppla databasen 
const db = new sqlite3.Database("./db/cv.db"); 

// Skapar tabell

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

// Visa alla kurser
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

// Lägg till kurs
app.post("/add", (req, res) => {
    const { coursecode, coursename, syllabus, progression } = req.body;
    
    let errors = [];

    if (!coursecode) errors.push("Kurskod saknas");
    if (!coursename) errors.push("Kursnamn saknas");
    if (!syllabus) errors.push("Kursplan saknas"); 
    if (!progression) errors.push("Progression saknas");

    if (errors.length > 0) {
        return res.render("add-course", { errors, formData: req.body });
    }

    db.run(
        `INSERT INTO courses (coursecode, coursename, syllabus, progression)
        VALUES (?, ?, ?, ?)`,
        [coursecode, coursename, syllabus, progression],
        (err) => {
            if (err) {
                return res.send("Fel vid sparande");
            }
            res.redirect("/");
        }
    );
});

// Radera kurs 
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
