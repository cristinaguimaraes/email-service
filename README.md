# 📧 Email Service

A simple full-stack email service built with AWS and SST.

It exposes an API and a React UI to send emails asynchronously using EventBridge, SQS, and SES.

---

## 🚀 Live

* Frontend: `<WEB_URL>`
* API: `<API_URL>`

---

## 🧠 How it works

1. User submits a form in the UI
2. API receives the request
3. Event is published to EventBridge
4. Event goes to SQS
5. Consumer Lambda processes it
6. Email is sent via SES

---

## 🧰 Tech Stack

* TypeScript
* SST
* AWS (Lambda, API Gateway, EventBridge, SQS, SES)
* React (Vite)
* Vitest

---

## 📦 Project Structure

```txt
email-service/
├── src/              # Backend (Lambdas)
│   ├── api/
│   ├── workers/
│   └── lib/
├── web/              # Frontend (React app)
├── test/             # Tests
├── sst.config.ts     # Infrastructure
├── package.json      # Backend dependencies
└── README.md
```

---

## 🔌 API

### Endpoint

```
POST /send-email
```

### Request body

```json
{
  "toEmail": "example@gmail.com",
  "subject": "Hello",
  "message": "This is a test email"
}
```

### Response

```json
{
  "message": "Accepted"
}
```

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
cd web && npm install
```

---

### 2. Configure AWS

```bash
aws configure --profile personal
```

---

### 3. Deploy

```bash
AWS_PROFILE=personal npx sst deploy
```

---


## 🧪 Test API

```bash
curl -X POST "<API_URL>/send-email" \
  -H "content-type: application/json" \
  -d '{
    "toEmail": "your-email@gmail.com",
    "subject": "Test",
    "message": "Hello"
  }'
```

---

## 📬 SES (important)

### Steps:

1. Go to **SES → Identities**
2. Create identity (Email address)
3. Verify via email link

SES is in sandbox mode, so you must:

* verify the sender email
* verify the recipient email

---

## 🧪 Tests

Run:

```bash
npm test
```

---


## 🚀 Deployment

Frontend is deployed using SST `StaticSite`:

* built with Vite
* hosted via AWS (CloudFront)

Backend deployed with SST infrastructure.

---

## ✅ Status

* End-to-end flow working
* Emails successfully delivered
