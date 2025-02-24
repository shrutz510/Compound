# Compound Advisor Dashboard - Backend
This is the backend service for the Compound Advisor Dashboard, designed to provide insights into financial advisors, accounts, securities, and holdings. The API aggregates client account information, computes key financial insights, and exposes structured endpoints.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Database Setup (PostgreSQL)](#database-setup-postgresql)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)

---

## Features
- Aggregates advisors, accounts, securities, and holdings data
- Computes total portfolio value, top securities, and advisor rankings
- Modular API with separate routes for scalability
- Uses Sequelize ORM with PostgreSQL
- JSON-based data seeding for easy testing

---

## Technologies Used
- Node.js - Backend runtime
- Express.js - Web framework
- Sequelize - ORM for database management
- PostgreSQL - Relational database
- dotenv - Environment variable management
- cors - Enables cross-origin resource sharing

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

### 3. Setup Environment Variables
Create a `.env` file in the root directory and configure it as follows:

```env
PORT=3000
DB_URI=postgres://postgres:compound@localhost:5432/advisor_db
DB_NAME=advisor_db
```

---

## Database Setup (PostgreSQL)

### 1. Start PostgreSQL (if not running)
```sh
sudo systemctl start postgresql
```

### 2. Login to PostgreSQL CLI
```sh
psql -U postgres
```

### 3. Create the Database
```sql
CREATE DATABASE advisor_db;
```

### 4. Grant Privileges
Ensure the database user has the correct permissions:
```sql
ALTER DATABASE advisor_db OWNER TO postgres;
```

### 5. Exit PostgreSQL
```sql
\q
```

### 6. Run Sequelize Migrations and Seed Data
Once the database is created, run:
```sh
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

## Running the Server

To start the backend server, run:
```sh
node server.js
```
or using `nodemon`:
```sh
npm run dev
```

### Testing API
Test with `curl`:
```sh
curl -X GET http://localhost:3000/api/insights/total-value
```
Or use Postman to test API endpoints.

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
- Implement unit & integration tests
- Add caching for frequent queries
- Implement WebSocket support for real-time updates
