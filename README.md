# 📧 Email Service (AWS + SST)

A simple event-driven email delivery service built with AWS and SST.
The system exposes an HTTP API that accepts email requests and processes them asynchronously using EventBridge, SQS, and SES.

---

## 🚀 Architecture

```
Client → API Gateway → Lambda → EventBridge → SQS → Lambda → SES
```

### Flow:

1. Client sends a POST request to `/send-email`
2. API Lambda validates the payload and publishes an event to EventBridge
3. EventBridge routes the event to an SQS queue
4. A consumer Lambda processes messages from the queue
5. The consumer sends the email using AWS SES

---

## 🧰 Tech Stack

* **TypeScript**
* **SST (Serverless Stack)**
* **AWS Services**

  * API Gateway
  * Lambda
  * EventBridge
  * SQS
  * SES
* **Zod** (validation)

---

## 📦 API

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
```

### 2. Configure AWS credentials

Create a profile:

```bash
aws configure --profile personal
```

---

### 3. Deploy the app

```bash
AWS_PROFILE=personal npx sst deploy
```

---

## 🧪 Testing

Send a request using curl:

```bash
curl -X POST "<API_URL>/send-email" \
  -H "content-type: application/json" \
  -d '{
    "toEmail": "your-email@gmail.com",
    "subject": "Test email",
    "message": "Hello from SST 🚀"
  }'
```

---

## 📬 SES Configuration

AWS SES starts in **sandbox mode**, which requires:

* verifying the sender email
* verifying the recipient email

### Steps:

1. Go to **SES → Identities**
2. Create identity (Email address)
3. Verify your email via confirmation link

> Note: Both sender and recipient must be verified in sandbox mode.

---

## 🧠 Design Decisions

### Event-driven architecture

The system is decoupled using EventBridge and SQS, allowing:

* scalability
* fault tolerance
* easier extension (e.g. adding more consumers)

### Asynchronous processing

The API responds immediately (`202 Accepted`) while the email is processed in the background.

### Queue-based processing

SQS ensures:

* retries on failure
* durability
* no message loss

---

## ⚠️ Limitations

* SES is in sandbox mode (only verified emails allowed)
* No authentication on the API
* Minimal validation (can be extended)
* No retry DLQ handling in UI (but queue supports it)

---

## 🔮 Possible Improvements

* Move SES out of sandbox
* Add authentication (e.g. API key or JWT)
* Add frontend UI
* Add monitoring (CloudWatch dashboards)
* Add retry/DLQ visibility
* Add integration tests

---

## 🧪 Testing Strategy

Basic validation and handler logic can be tested using unit tests (e.g. Vitest).

---

## 📄 Notes

* Uses SST for infrastructure as code
* Uses AWS SDK v3
* Designed to be simple, modular, and extensible

---

## ✅ Status

✔ Core architecture implemented
✔ End-to-end email delivery working
✔ Successfully tested with AWS SES

---

## 👩‍💻 Author

Cristina Guimarães
