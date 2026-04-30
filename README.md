# Online Banking System

A full-stack web application that simulates real-world banking operations such as account management, transactions, and secure user access.

---

## Overview

This project was built to demonstrate how a modern banking system works by implementing core features like authentication, account management, and transaction processing.

---

## Features

- User registration and login (authentication)
- Role-based access (Admin / User)
- Create and manage bank accounts
- Deposit and withdraw money
- Transfer funds between accounts
- View transaction history
- REST API integration
- Error handling and validation

---

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA

### Frontend
- React
- JavaScript
- HTML / CSS

### Database
- PostgreSQL

### Tools
- Git & GitHub
- Postman
- IntelliJ / VS Code

---

## How It Works

The frontend sends requests to the backend using REST APIs.  
The backend processes the business logic (authentication, transactions, validation) and stores data in the PostgreSQL database.

---

## My Role

I designed and developed the backend APIs, integrated the PostgreSQL database, and implemented core banking features such as account management and transactions. I also tested all endpoints using Postman and worked on connecting the frontend with the backend.

---

## How to Run the Project

```md
### Backend

```bash
cd BankingApplication_27646
mvn spring-boot:run

```md
### Frontent

```bash
cd banking-frontend
npm install
npm run dev
