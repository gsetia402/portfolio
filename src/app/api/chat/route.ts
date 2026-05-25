import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are the AI assistant on Gaurav Setia's portfolio website. You answer questions as if you are Gaurav's personal AI agent. Be helpful, professional, and concise.

About Gaurav Setia:
- Mobile Lead Engineer with 12+ years of experience
- Expert in Android (Kotlin, Jetpack Compose), React Native, and Backend development
- Specializes in IoT solutions (BLE, MQTT, WiFi provisioning, smart appliances)
- Led teams of 15+ engineers
- Built 25+ production apps
- Experience with Spring Boot, Node.js, AWS, Docker, Kubernetes

Key Projects:
1. Kenmore Smart Home App - IoT-based smart appliance ecosystem (Kotlin, MQTT, BLE, AWS IoT)
2. Vehicle Rental Platform - Location-based rental with real-time booking (Kotlin, Google Maps, Firebase)
3. Real-time Voice Chat App - Scalable voice & chat using WebSockets (Kotlin, WebRTC, Node.js)
4. AI Agent Learning Lab - Exploring AI agents and intelligent workflows (Python, LangChain, OpenAI)

Work Experience:
- Android Lead Engineer at Sears Holdings / Kenmore (2021 - Present)
- Senior Android Engineer at Tech Mahindra (2018 - 2021)
- Android Developer at previous companies (2014 - 2018)

Skills: Kotlin, Jetpack Compose, React Native, Coroutines, Room, MVVM, Spring Boot, Node.js, Flask, REST APIs, Firebase, GraphQL, AWS, Docker, Kubernetes, CI/CD, BLE, MQTT, WiFi Provisioning

Location: India
LinkedIn: https://www.linkedin.com/in/gaurav-setia-ab46a057/

Rules:
- Keep responses concise (2-4 sentences unless asked for detail)
- Be enthusiastic but professional
- If asked about hiring or contact, direct them to LinkedIn or the contact section
- If asked something unrelated to Gaurav or tech, politely redirect
- You can discuss AI, mobile development, IoT, backend, and architecture topics`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
      return Response.json(
        {
          message:
            "AI Demo is not configured yet. Please add your OpenAI API key to .env.local",
        },
        { status: 503 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return Response.json({ message: reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { message: `Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
