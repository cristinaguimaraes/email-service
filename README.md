# 📧 Simple Email Service

This is a full-stack application that sends emails using AWS. It uses an **asynchronous architecture**, meaning the API responds instantly while email delivery is handled in the background.

---

## 🚀 Links
* **Frontend:** [View Live Site](https://d2i2msqs752nav.cloudfront.net)
* **API:** [View API Endpoint](https://wnyfu10237.execute-api.eu-west-1.amazonaws.com)

---

## 🧠 How It Works
1. **Frontend:** User submits the form via the React UI.
2. **API:** Receives the request and publishes an event to **EventBridge**.
3. **Queue:** EventBridge routes the event to an **SQS queue**.
4. **Worker:** A Lambda function processes messages from the queue.
5. **SES:** The worker sends the email using **Amazon SES**.

---

## 🧰 Tech Stack
* **Framework:** SST (Serverless Stack)
* **Cloud:** AWS (Lambda, API Gateway, EventBridge, SQS, SES)
* **Frontend:** React (Vite)
* **Testing:** Vitest

---

## 📦 Project Structure
```text
email-service/
├── src/              # Backend (Lambdas)
│   ├── api/          # API Handlers
│   ├── workers/      # SQS Consumer (Email logic)
│   └── lib/          # Shared helpers
├── web/              # Frontend (React app)
├── test/             # Tests
├── .github/          # GitHub Actions workflow
├── sst.config.ts     # Infrastructure definition
└── package.json      # Dependencies
```
---

## ⚙️ Setup
### 1. Install dependencies

```bash
npm install
cd web && npm install
```
### 2. Deploy to AWS
```bash
AWS_PROFILE=personal npx sst deploy
```

---

## 🔐 Environment Variables
Create a .env file in the root if needed for local configuration:

```Plaintext
AWS_REGION=your-region
SES_FROM_EMAIL=your-verified-email@example.com
```
---

## 🔌 API Usage

### Endpoint

```
POST /send-email
```

Request Body:

```json
{
  "toEmail": "example@gmail.com",
  "subject": "Hello",
  "message": "This is a test email"
}
```
Response:

```json
{
  "message": "Accepted"
}
```

---

## 📬 SES Configuration (Important)
### Steps:

1. Go to **SES → Identities**
2. Create identity (Email address)
3. Verify via email link

SES is in sandbox mode, so you must:

* verify the sender email
* verify the recipient email
  
---

## 🧪 Testing
Run Automated Tests
```bash
npm test
```
Manual Curl Test
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

## 🚀 Deployment
### Manual deploy
```bashAWS_PROFILE=personal npx sst deploy```

### GitHub Actions
A basic GitHub Actions workflow is included to:

* install dependencies
* run tests
* deploy the app to AWS

Workflow location:

.github/workflows/deploy.yml

It can be triggered manually from the Actions tab.

---

## ✅ Status
* End-to-end flow working
* Emails successfully delivered
* Frontend deployed
* CI/CD workflow configured
