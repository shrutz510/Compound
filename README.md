## Compound Advisor Dashboard - Backend
This is the backend service for the Compound Advisor Dashboard, designed to provide insights into financial advisors, accounts, securities, and holdings. The API aggregates client account information, computes key financial insights, and exposes structured endpoints.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)

---

## Features
Aggregates advisors, accounts, securities, and holdings data  
Computes total portfolio value, top securities, and advisor rankings  
Modular API with separate routes for scalability  
Uses Sequelize ORM with PostgreSQL/MySQL  
JSON-based data seeding for easy testing  

---

## Technologies Used
- Node.js - Backend runtime
- Express.js - Web framework
- Sequelize - ORM for database management
- PostgreSQL / MySQL - Relational database
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
Create a `.env` file in the root directory and configure:
```
PORT=3000
DB_URI=postgres://postgres:compound@localhost:5432/advisor_db
```

### 4. Run the Server
```sh
node server.js
```

### 5. Test API with `curl` or Postman
```sh
curl -X GET http://localhost:3000/api/insights/total-value
```

---

## API Endpoints

### 1. Advisors API
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/advisors` | Get all advisors |

---

### 2. Accounts API
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/accounts` | Get all accounts |

---

### 3. Securities API
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/securities` | Get all securities |

---

### 4. Insights API
#### Total Portfolio Value
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/insights/total-value` | Get total value of all accounts |

Example Response:
```json
{
  "totalValue": "12345678.90"
}
```

#### Top 5 Securities
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/insights/top-securities` | Get top 5 securities by total units |

Example Response:
```json
[
  { "ticker": "AAPL", "totalUnits": "1500" },
  { "ticker": "MSFT", "totalUnits": "1200" }
]
```

#### Advisor Rankings by Custodian
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/insights/advisor-rankings` | Get rankings of advisors by assets under management |

Example Response:
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "custodian": "Fidelity",
    "repId": "1271",
    "totalAssets": "5000000.00"
  }
]
```

---

## Future Improvements
Add authentication for secure API access  
Optimize query performance with indexes  
Implement unit & integration tests  
Add caching for frequent queries  
