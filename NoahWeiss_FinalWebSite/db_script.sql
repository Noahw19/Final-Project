DROP TABLE IF EXISTS finalstable CASCADE;
CREATE TABLE IF NOT EXISTS finalstable (
        user_id int PRIMARY KEY,
        Uni_Name VARCHAR (50) UNIQUE NOT NULL,
        Review VARCHAR (255), 
        Review_Date Date NOT NULL
);
