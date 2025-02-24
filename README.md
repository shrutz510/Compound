### Compound Advisors Dashboard - Backend
Compound’s business runs on tools that enable financial advisors to provide a structured experience for their clients. Financial advisors can be part of an organizational group, which we refer to as a firm. This project aggregates client account information for the advisory firm, providing insights into the underlying accounts, investments, and advisor performance.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Assumptions](#assumptions)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Database Setup (PostgreSQL)](#database-setup-postgresql)
- [Running the Server](#running-the-server)
- [Testing the API](#testing-the-api)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)

---

## Features
- Aggregates advisors, accounts, securities, and holdings data
- Computes total portfolio value, top securities, and advisor rankings
- RESTful API with separate routes for scalability
- Uses Sequelize ORM for database management
- Automatically creates the database if it does not exist
- JSON-based data seeding for easy testing

---

## Technologies Used
- Node.js - JavaScript runtime for backend  
- Express.js - Web framework for API routes  
- Sequelize - ORM for database interactions  
- PostgreSQL - Relational database  
- dotenv - Manages environment variables  
- cors - Enables cross-origin resource sharing  

---

## Assumptions
1. Database Structure  
   - The database follows a relational model using PostgreSQL.  
   - There are four primary tables:
     - Advisors (`advisors`): Stores financial advisors and their custodians.  
     - Accounts (`accounts`): Stores individual investment accounts managed by advisors.  
     - Securities (`securities`): Stores information about various securities held in accounts.  
     - Holdings (`holdings`): Stores details of how many units of each security are held in a specific account.

2. Relationships  
   - One advisor can have multiple accounts.  
   - One account can hold multiple securities (via the `holdings` table).  
   - Each holding links an account to a security.  

3. Data Structure  
   - The `advisors.json` file contains an array of advisors, each having a list of custodians.  
   - The `accounts.json` file contains an array of accounts, each linked to a `repId`.  
   - The `securities.json` file contains an array of tradable securities.  
   - Holdings are derived from the accounts dataset and not stored separately in JSON.

4. Database Initialization  
   - If the database `compound_dev` does not exist, it is created automatically.  
   - If tables do not exist, Sequelize initializes them upon startup.  

5. Environment Variables  
   - The project requires a `.env` file with database connection details.  

---

## Prerequisites  
Before running this project, install the following:

### 1. Install Node.js
Check if Node.js is installed:  
```sh
node -v
```
If Node.js is missing, install it using Homebrew:  
```sh
brew install node
```

### 2. Install PostgreSQL
Check if PostgreSQL is installed:  
```sh
psql --version
```
If PostgreSQL is missing, install it:  
```sh
brew install postgresql
brew services start postgresql
```
Ensure PostgreSQL is running:  
```sh
psql -U postgres
\q
```

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone git@github.com:shrutz510/Compound.git
cd Compound
```

### 2. Install Dependencies
```sh
npm install
```
This installs all required Node.js packages.

---

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add:
```ini
PORT=3000
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=compound_dev
DB_URI=postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}
```
Replace `your_password` with the actual PostgreSQL password.

---

## Database Setup (PostgreSQL)

### 1. Start PostgreSQL
```sh
brew services start postgresql
```

### 2. Let the Program Create the Database Automatically
When you start the server, the program checks if `compound_dev` exists and creates it if necessary.

---

## Running the Server
Start the server:
```sh
node server.js
```
If everything is set up correctly, you should see:
```
Database "compound_dev" already exists.
Connected to the database successfully.
Schema "compound" ensured.
Server running on port 3000
```

---

## Testing the API
Use `curl` commands to test the API:

### 1. Check if the server is running
```sh
curl -X GET http://localhost:3000/api/advisors
```

---

## API Endpoints
### 1. Advisors API
| Method | Endpoint | Description | cURL Command |
|--------|---------|-------------|--------------|
| `GET` | `/api/advisors` | Get all advisors | `curl -X GET http://localhost:3000/api/advisors` |

---

### 2. Accounts API
| Method | Endpoint | Description | cURL Command |
|--------|---------|-------------|--------------|
| `GET` | `/api/accounts` | Get all accounts | `curl -X GET http://localhost:3000/api/accounts` |

---

### 3. Securities API
| Method | Endpoint | Description | cURL Command |
|--------|---------|-------------|--------------|
| `GET` | `/api/securities` | Get all securities | `curl -X GET http://localhost:3000/api/securities` |

---

### 4. Insights API
#### Total Portfolio Value
| Method | Endpoint | Description | cURL Command |
|--------|---------|-------------|--------------|
| `GET` | `/api/insights/total-value` | Get total value of all accounts | `curl -X GET http://localhost:3000/api/insights/total-value` |

#### Top 5 Securities
| Method | Endpoint | Description | cURL Command |
|--------|---------|-------------|--------------|
| `GET` | `/api/insights/top-securities` | Get top 5 securities by total units | `curl -X GET http://localhost:3000/api/insights/top-securities` |

#### Advisor Rankings by Custodian
| Method | Endpoint | Description | cURL Command |
|--------|---------|-------------|--------------|
| `GET` | `/api/insights/advisor-rankings` | Get rankings of advisors by assets under management | `curl -X GET http://localhost:3000/api/insights/advisor-rankings` |

---

## Future Improvements
- Add authentication for secure API access
- Optimize query performance with indexes
- Implement unit and integration tests
- Add caching for frequent queries
- Implement WebSocket support for real-time updates
