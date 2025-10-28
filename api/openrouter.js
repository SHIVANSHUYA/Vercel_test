export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OpenRouter Error: ${text}`);
    }

    const data = await response.json();
    res.status(200).json({ output: data.choices[0].message.content });

  } catch (error) {
    console.error("API Route Error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
