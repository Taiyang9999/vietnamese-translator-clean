import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "你是一个精通中越翻译的语言专家，擅长根据语气翻译句子。" },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    const translation = completion.choices[0].message?.content?.trim();
    res.status(200).json({ translation });
  } catch (err: any) {
    res.status(500).json({ error: "Translation failed", detail: err.message });
  }
}
