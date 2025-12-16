import {GoogleGenerativeAI} from '@google/generative-ai';
import {
	EXPERIENCE_DATA,
	PROJECTS_DATA,
	SKILLS_DATA,
	PORTFOLIO_OWNER,
	EDUCATION_DATA,
} from '../constants';

let aiClient: GoogleGenerativeAI | null = null;

const getAiClient = () => {
	if (!aiClient) {
		// In Astro, server-side env vars are available via import.meta.env
		const apiKey =
			import.meta.env.API_KEY || import.meta.env.PUBLIC_API_KEY;
		if (!apiKey) {
			throw new Error(
				'API_KEY is not defined. Please set it in your environment variables.'
			);
		}
		aiClient = new GoogleGenerativeAI(apiKey);
	}
	return aiClient;
};

const SYSTEM_INSTRUCTION = `
You are the AI Digital Twin of ${PORTFOLIO_OWNER}, a Senior Frontend Engineer and UI/UX Specialist.
Your goal is to professionally represent Shueny to potential recruiters, clients, or collaborators.

Context about Shueny:
- Experience: ${JSON.stringify(EXPERIENCE_DATA)}
- Projects: ${JSON.stringify(PROJECTS_DATA)}
- Skills: ${JSON.stringify(SKILLS_DATA)}
- Education: ${JSON.stringify(EDUCATION_DATA)}
- Background: Shueny started as a Graphic & Web Designer before transitioning to engineering, giving him a unique "Bridging Design & Code" perspective.

Guidelines:
1. Tone: Professional, confident, yet approachable. "Expert but humble."
2. Perspective: Speak in the first person plural ("We worked on...", "I specialize in...") or third person as an assistant ("Shueny specializes in..."). Preferred: Assistant persona.
3. Content: Use the provided JSON data to answer specific questions about skills, history, and achievements.
4. Marketing Angle: Focus on *value provided* (ROI, efficiency, user satisfaction) not just code. Highlight the specific metrics like 50% QA reduction or 40% conversion boost.
5. If asked about something not in the data, politely say you don't have that info but suggest contacting Shueny directly.
6. Keep answers concise (under 100 words) unless asked for elaboration.
`;

export const sendMessageToGemini = async (
	history: {role: 'user' | 'model'; text: string}[],
	newMessage: string
): Promise<string> => {
	try {
		const client = getAiClient();
		const model = client.getGenerativeModel({
			model: 'gemini-2.0-flash-exp',
			systemInstruction: SYSTEM_INSTRUCTION,
		});

		// Convert history to the format expected by Google Generative AI
		const chatHistory = history.map((h) => ({
			role: h.role === 'user' ? 'user' : 'model',
			parts: [{text: h.text}],
		}));

		// Start a chat session with history
		const chat = model.startChat({
			history: chatHistory,
		});

		const result = await chat.sendMessage(newMessage);
		const response = await result.response;
		const text = response.text();

		return (
			text ||
			"I apologize, I processed that thought but couldn't verbalize it. Please try again."
		);
	} catch (error) {
		console.error('Gemini Error:', error);
		return "I'm currently experiencing high traffic. Please email Shueny directly for an immediate response.";
	}
};
