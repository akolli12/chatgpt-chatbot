import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const open_ai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
});

export default open_ai;
