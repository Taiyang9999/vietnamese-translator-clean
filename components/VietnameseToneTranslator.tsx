import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function VietnameseToneTranslator() {
  const [inputText, setInputText] = useState("");
  const [relationship, setRelationship] = useState("lover");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = (text, tone) => {
    const toneMap = {
      lover: "爱人",
      friend: "朋友",
      family: "家人",
      bro: "兄弟朋友"
    };

    return `你是一个情感语气翻译专家，请将以下中文句子翻译成自然地道的越南语。

请根据我提供的【关系类型】来匹配合适的语气风格，例如：  
- 爱人语气：温柔、亲昵，用“anh/em”, “nhé”, “yêu”, “nhớ”等词汇表达爱意。  
- 朋友语气：轻松随和，使用“bạn”, “cậu”, “mình”，不太正式。  
- 家人语气：温暖关心，用“mẹ”, “ba”, “con”, “chị”, “em”，语言自然朴实。  
- 兄弟朋友语气：直接、有激励感，常用“mày - tao”, “ông - tôi”或“anh em”。

【关系类型】：${toneMap[tone]}  
【中文句子】：${text}

请保持原意和情感，并只输出翻译后的越南语句子。`
  };

  const handleTranslate = async () => {
    setLoading(true);
    const prompt = generatePrompt(inputText, relationship);

    const response = await fetch("/api/gpt-translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    setTranslatedText(data.translation);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">越南语情感翻译</h2>

          <Select onValueChange={setRelationship} defaultValue="lover">
            <SelectTrigger>
              <SelectValue placeholder="选择语气风格" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lover">爱人</SelectItem>
              <SelectItem value="friend">朋友</SelectItem>
              <SelectItem value="family">家人</SelectItem>
              <SelectItem value="bro">兄弟朋友</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="输入中文句子"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <Button onClick={handleTranslate} disabled={loading}>
            {loading ? "翻译中..." : "翻译"}
          </Button>

          {translatedText && (
            <div className="p-4 border rounded-md bg-gray-50">
              <p className="text-sm text-gray-700">翻译结果：</p>
              <p className="text-base font-medium mt-2">{translatedText}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
