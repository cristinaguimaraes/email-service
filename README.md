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
1. Install Dependencies
Bash
npm install
cd web && npm install
2. Deploy to AWS
Bash
npx sst deploy --stage dev
🔐 Environment Variables
Create a .env file in the root if needed for local configuration:

Plaintext
AWS_REGION=your-region
SES_FROM_EMAIL=your-verified-email@example.com

---

## 🔌 API Usage
Endpoint: POST /send-email

Request Body:

JSON
{
  "toEmail": "example@gmail.com",
  "subject": "Hello",
  "message": "This is a test email"
}
Response:

JSON
{
  "message": "Accepted"
}

---

## 📬 SES Configuration (Important)
AWS SES starts in Sandbox Mode, so you must:

Go to SES → Identities in the AWS Console.

Verify your sender email address via the link sent to your inbox.

Note: In sandbox mode, you can only send emails to other verified addresses.

---

## 🧪 Testing
Run Automated Tests
Bash
npm test
Manual Curl Test
Bash
curl -X POST "<YOUR_API_URL>/send-email" \
  -H "Content-Type: application/json" \
  -d '{"toEmail": "verified-email@gmail.com", "subject": "Test", "message": "Hello"}'
🚀 Deployment
Manual: npx sst deploy --stage prod

CI/CD: A GitHub Actions workflow is included in .github/workflows/deploy.yml. It automatically runs tests and deploys the application on every push to the main branch.

---

## ✅ Status
[x] End-to-end flow working

[x] Emails successfully delivered

[x] Frontend deployed via CloudFront

[x] CI/CD workflow configured
