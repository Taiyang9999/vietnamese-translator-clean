
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "你是一个中越情感语气翻译专家。" },
        { role: "user", content: prompt }
      ]
    });
    const translation = completion.choices[0].message?.content?.trim();
    res.status(200).json({ translation });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
