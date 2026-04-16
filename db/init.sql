-- Skapar tabellen courses
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coursecode TEXT NOT NULL,
    coursename TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    progression TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- (Valfritt) Lägg in en testkurs
INSERT INTO courses (coursecode, coursename, syllabus, progression)
VALUES ('DT207G', 'Backend Webbutveckling', 'https://www.miun.se', 'B');