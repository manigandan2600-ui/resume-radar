const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf-8');
const keyMatch = env.match(/GEMINI_API_KEY\s*=\s*(.*)/);
const key = keyMatch ? keyMatch[1].replace(/"/g, '').trim() : '';

async function listModels() {
  if (!key) return console.log("No key found");
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();
    console.log("AVAILABLE MODELS:", data.models?.map(m => m.name).join("\n"));
  } catch (err) {
    console.error("Failed to list models:", err);
  }
}

listModels();
