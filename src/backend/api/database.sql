DROP TABLE IF EXISTS Subject CASCADE;
DROP TABLE IF EXISTS Activity CASCADE;
DROP TABLE IF EXISTS User CASCADE;
DROP TABLE IF EXISTS Teacher CASCADE;


/*CREATE TABLE Subject (
    subject_code VARCHAR(10) NOT NULL PRIMARY KEY
);

/*CREATE TABLE Activity ();
CREATE TABLE Person ();
CREATE TABLE Subject_teacher ();

/*CREATE TABLE Client (
                        client_pid INTEGER NOT NULL PRIMARY KEY,
                        first_name VARCHAR(20) NOT NULL,
                        last_name VARCHAR(20) NOT NULL,
                        date_of_birth DATE NOT NULL,
                        address VARCHAR(40) NOT NULL,
                        phone_number VARCHAR(20) NOT NULL,
                        email VARCHAR(30) NOT NULL
                            CHECK(REGEXP_LIKE(
                                    email, '^[a-z]+[a-z0-9\.-]*@[a-z0-9\.-]+\.[a-z]{2,4}$', 'i'
                                )),
                        password VARCHAR(30) NOT NULL
);

CREATE TABLE Bank_employee (
                               employee_pid INTEGER NOT NULL PRIMARY KEY,
                               max_amount_to_handle DECIMAL(10,2) NOT NULL,

                               CONSTRAINT FK_bank_employee_pid
                                   FOREIGN KEY (employee_pid) REFERENCES Client(client_pid)
);

CREATE TABLE Account (
                         account_number VARCHAR(20) NOT NULL PRIMARY KEY
                             CHECK(REGEXP_LIKE(
                                     account_number, '^(?:([0-9]{1,6})-)?([0-9]{2,10})\/([0-9]{4})$'
                                 )),
                         balance DECIMAL(10,2) NOT NULL,
                         date_of_creation DATE NOT NULL,

                         owned_by INTEGER NOT NULL,
                         created_by INTEGER NOT NULL,

                         CONSTRAINT FK_account_owner
                             FOREIGN KEY (owned_by) REFERENCES Client(client_pid),

                         CONSTRAINT FK_account_creator
                             FOREIGN KEY (created_by) REFERENCES Bank_employee(employee_pid)
);

CREATE TABLE Savings_account (
                                 account_number VARCHAR(20) NOT NULL PRIMARY KEY,
                                 interest DECIMAL(10, 2) NOT NULL,

                                 CONSTRAINT FK_savings_account_number
                                     FOREIGN KEY (account_number) REFERENCES Account(account_number)
);

CREATE TABLE Checking_account (
                                  account_number VARCHAR(20) NOT NULL PRIMARY KEY,
                                  daily_limit INTEGER NOT NULL,

                                  CONSTRAINT FK_checking_account_number
                                      FOREIGN KEY (account_number) REFERENCES Account(account_number)
);

CREATE TABLE Account_Clients (
                                 account_number VARCHAR(20) NOT NULL,
                                 client_pid INTEGER NOT NULL,

                                 PRIMARY KEY (account_number, client_pid),

                                 CONSTRAINT FK_Account_Client_Account FOREIGN KEY (account_number) REFERENCES Account(account_number),

                                 CONSTRAINT FK_Account_Client_Client FOREIGN KEY (client_pid) REFERENCES Client(client_pid)
);

CREATE TABLE Transaction_ (
                              transaction_id INTEGER GENERATED AS IDENTITY NOT NULL PRIMARY KEY,
                              amount INTEGER NOT NULL,
                              operation VARCHAR(20) NOT NULL
                                  CHECK(operation IN ('withdrawal', 'deposit', 'payment')),
                              date_of_transaction DATE NOT NULL,

                              requested_by INTEGER NOT NULL,
                              made_by INTEGER NOT NULL,
                              on_account VARCHAR(20) NOT NULL,

                              CONSTRAINT FK_requested_by
                                  FOREIGN KEY (requested_by) REFERENCES Client(client_pid),

                              CONSTRAINT FK_made_by
                                  FOREIGN KEY (made_by) REFERENCES Bank_employee(employee_pid),

                              CONSTRAINT FK_on_account
                                  FOREIGN KEY (on_account) REFERENCES Account(account_number)
);*/
