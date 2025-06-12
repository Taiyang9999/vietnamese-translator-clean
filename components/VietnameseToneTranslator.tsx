import React, { useState } from "react";
export default function VietnameseToneTranslator() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    const prompt = `将这句中文翻译为越南语并使用地道口吻：${inputText}`;
    const response = await fetch("/api/gpt-translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    setTranslatedText(data.translation);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>越南语翻译器</h1>
      <textarea rows={4} value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={handleTranslate} disabled={loading}>
        {loading ? "翻译中..." : "翻译"}
      </button>
      {translatedText && <div><strong>翻译结果：</strong><p>{translatedText}</p></div>}
    </div>
  );
}
