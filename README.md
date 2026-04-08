# 📧 Simple Email Service

This is a full-stack application that sends emails using AWS. It uses an **asynchronous architecture**, meaning the API responds instantly while email delivery is handled in the background.

This design improves **scalability, reliability, and user experience** by decoupling request handling from email processing.

---

## 🚀 Links
* **Frontend:** [View Live Site](https://d2i2msqs752nav.cloudfront.net)
* **API:** [View API Endpoint](https://d2i2msqs752nav.cloudfront.net) <!-- Replace with API Gateway URL if different -->

---

## 🏗 Architecture
 sst.config.ts     # Infrastructure definition
└── package.json      # Dependencies

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

⚙️ Setup
1. Install Dependencies

npm install
cd web && npm install

2. Deploy to AWS

npx sst deploy --stage dev

🔐 Environment Variables

Create a .env file in the root:

AWS_REGION=your-region
SES_FROM_EMAIL=your-verified-email@example.com

🔌 API Usage

Endpoint: POST /send-email

Request Body

{
  "toEmail": "example@gmail.com",
  "subject": "Hello",
  "message": "This is a test email"
}
Response
{
  "message": "Accepted"
}
📬 SES Configuration (Important)

AWS SES starts in Sandbox Mode, so you must:

Go to SES → Identities in the AWS Console
Verify your sender email address

⚠️ In sandbox mode, you can only send emails to verified addresses.

🧪 Testing

Run tests:

npm test
Manual Curl Test
curl -X POST "<YOUR_API_URL>/send-email" \
  -H "Content-Type: application/json" \
  -d '{"toEmail": "verified-email@gmail.com", "subject": "Test", "message": "Hello"}'
🚀 Deployment
Manual
npx sst deploy --stage prod
CI/CD

A GitHub Actions workflow is included in:

.github/workflows/deploy.yml

It automatically:

Runs tests
Deploys the application on every push to main
✅ Status
 End-to-end flow working
 Emails successfully delivered
 Frontend deployed via CloudFront
 CI/CD workflow configured
