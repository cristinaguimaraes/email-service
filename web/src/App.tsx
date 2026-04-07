import { useState } from "react";
import type { SubmitEvent } from "react";

function App() {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); 
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${apiUrl}/send-email`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toEmail,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data.message || "Something went wrong");
      } else {
        setResult("Email request accepted");
        setToEmail("");
        setSubject("");
        setMessage("");
      }
    } catch {
      setResult("Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>   
      <h1>Email Service</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Recipient email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>

      {result && <p style={{ marginTop: 16 }}>{result}</p>}
    </div>
  );
}

export default App;