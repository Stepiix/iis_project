DROP TABLE IF EXISTS Subject_Teacher CASCADE;
DROP TABLE IF EXISTS Subject_Student CASCADE;
DROP TABLE IF EXISTS Subject CASCADE;
DROP TABLE IF EXISTS User CASCADE;
DROP TABLE IF EXISTS Actitivy CASCADE;
DROP TABLE IF EXISTS Block CASCADE;

CREATE TABLE User (
    user_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_firstname VARCHAR(32) NOT NULL,
    user_lastname VARCHAR(32) NOT NULL,
    user_email VARCHAR(32) NOT NULL,
    user_password VARCHAR(32) NOT NULL,
    user_role VARCHAR(32) NOT NULL
);

CREATE TABLE Subject (
    subject_code VARCHAR(32) NOT NULL PRIMARY KEY,
    subject_name VARCHAR(64) NOT NULL,
    subject_annotation TEXT,
    subject_guarantor INTEGER NOT NULL,

    CONSTRAINT FK_subject_guarantor
        FOREIGN KEY (subject_guarantor) REFERENCES User(user_id)
);

CREATE TABLE Subject_Teacher (
    subject_code VARCHAR(32) NOT NULL,
    user_id INTEGER NOT NULL,

    PRIMARY KEY (subject_code, user_id),

    CONSTRAINT FK_subject_code
        FOREIGN KEY (subject_code) REFERENCES Subject(subject_code)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT FK_user_id
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Subject_Student (
    subject_code VARCHAR(32) NOT NULL,
    user_id INTEGER NOT NULL,

    PRIMARY KEY (subject_code, user_id),

    CONSTRAINT FK_student_subject_code
        FOREIGN KEY (subject_code) REFERENCES Subject(subject_code)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT FK_student
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Activity (
    activity_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    activity_type VARCHAR(32) NOT NULL,
    activity_length TIME NOT NULL,
    activity_week VARCHAR(32) NOT NULL,
    activity_subject_code VARCHAR(32) NOT NULL,
    activity_teacher INTEGER NOT NULL,

    CONSTRAINT FK_activity_subject_code
        FOREIGN KEY (activity_subject_code) REFERENCES Subject(subject_code)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT FK_teacher
        FOREIGN KEY (activity_teacher) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE A_Block (
    a_block_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    a_block_day VARCHAR(32) NOT NULL,
    a_block_begin TIME NOT NULL,
    a_block_end TIME NOT NULL,
    a_block_activity_id INTEGER NOT NULL,
    a_block_confirmed BOOL NOT NULL,

    CONSTRAINT FK_a_block_activity_id
        FOREIGN KEY (a_block_activity_id) REFERENCES Activity(activity_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE T_Block (
    t_block_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    t_block_day VARCHAR(32) NOT NULL,
    t_block_begin TIME NOT NULL,
    t_block_end TIME NOT NULL,
    t_block_user_id INTEGER NOT NULL,

    CONSTRAINT FK_t_block_user_id
        FOREIGN KEY (t_block_user_id) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
