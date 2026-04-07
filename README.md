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

Install dependencies:

```bash
npm install
cd web && npm install
```

Deploy:

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

## ✅ Status

* End-to-end flow working
* Emails successfully delivered



## 🧰 Tech Stack

### Backend

* TypeScript
* SST (Serverless Stack)
* AWS Lambda
* API Gateway
* EventBridge
* SQS
* SES
* Zod (validation)

### Frontend

* React (Vite)
* TypeScript

### Testing

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

## 🖥️ Frontend

A simple React UI allows users to:

* enter recipient email
* enter subject and message
* submit requests asynchronously

The UI calls the backend API using `fetch`.

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

## 🧪 Running locally

### Backend (dev mode)

```bash
AWS_PROFILE=personal npx sst dev
```

### Frontend

```bash
cd web
npm run dev
```

---

## 📬 SES Configuration

AWS SES starts in **sandbox mode**, which requires:

* verifying the sender email
* verifying the recipient email

### Steps:

1. Go to **SES → Identities**
2. Create identity (Email address)
3. Verify via email link

> In sandbox mode, both sender and recipient must be verified.

---

## 🧪 Testing

Run tests:

```bash
npm test
```

Includes:

* API validation tests
* SQS consumer behavior tests
* SES interaction mocking

---

## 🧠 Design Decisions

### Event-driven architecture

Decouples API from processing:

* scalable
* fault-tolerant
* extensible

### Asynchronous processing

API responds immediately (`202 Accepted`), improving responsiveness.

### SQS queue

Ensures:

* retries
* durability
* message buffering

---

## ⚠️ Limitations

* SES sandbox restrictions (verified emails only)
* No authentication on API
* Minimal UI validation
* No monitoring dashboard

---

## 🔮 Improvements

* Move SES out of sandbox
* Add authentication (JWT/API key)
* Add DLQ visibility
* Add metrics/alerts (CloudWatch)
* Add integration tests
* Improve UI/UX

---

## 🚀 Deployment

Frontend is deployed using SST `StaticSite`:

* built with Vite
* hosted via AWS (CloudFront)

Backend deployed with SST infrastructure.

---

## ✅ Status

✔ Backend architecture complete
✔ Frontend integrated
✔ End-to-end flow working
✔ Email delivery verified

---

## 👩‍💻 Author

Cristina Guimarães

