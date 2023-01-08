CREATE TABLE IF NOT EXISTS "posts" (
	"id"	INTEGER DEFAULT 0,
	"author"	TEXT,
	"content"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO posts(author, content) 
VALUES ("Bill gates", "Winbows good, buy it now!");

INSERT INTO posts(author, content) 
VALUES ("Steve Jobs", "MacOS. BUY IT NOW!!!");

INSERT INTO posts(author, content) 
VALUES ("Linus Torvald", "Linux is free! Use it!");
