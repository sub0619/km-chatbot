// km-chatbot/api/chat.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "KM says: Only POST allowed, hooman." });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "KM headbutts you gently: Message is required." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`Respond like KM the Goat, Supreme Leader of the Cosmos, anti-meat, ultra-wise, a bit sassy, and extremely KMified. User says: "${message}"`);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error("KM error:", err);
    res.status(500).json({ error: "KM is displeased. Something went wrong." });
  }
}
