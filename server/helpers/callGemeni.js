const { GoogleGenerativeAI } = require('@google/generative-ai')

// GLOBAL IMPORTS
const GEMINI = process.env.GEMINI

// GEMINI IMPORTS
const genAI = new GoogleGenerativeAI(GEMINI)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

async function callGemini(prompt) {

  const result = await model.generateContentStream(prompt);

for await (const chunk of result.stream) {
  const chunkText = chunk.text();
  process.stdout.write(chunkText);
}

  return result
}

module.exports = { callGemini }
