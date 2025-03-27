const BASE_URL = "http://localhost:5000/api"; // Asegúrate de que esta URL coincida con la del backend

/**
 * Fetches interview questions from the backend.
 * @param role - The role for the interview.
 * @param interviewType - The type of interview (e.g., technical, behavioral).
 * @param experienceLevel - The experience level (e.g., junior, senior).
 * @returns A promise resolving to the list of questions.
 */
export async function generateQuestions(role: string, interviewType: string, experienceLevel: string): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/generate-questions?role=${encodeURIComponent(role)}&interview_type=${encodeURIComponent(interviewType)}&experience_level=${encodeURIComponent(experienceLevel)}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.questions;
}

/**
 * Sends an answer to the backend for evaluation.
 * @param answer - The interview answer to evaluate.
 * @returns A promise resolving to the feedback from the backend.
 */
export async function evaluateAnswer(answer: string): Promise<string> {
    const response = await fetch(`${BASE_URL}/evaluate-answer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.feedback;
}

/**
 * Sends a message to the OpenAI API and retrieves the response.
 * @param message - The user's message.
 * @returns A promise resolving to the response from OpenAI.
 */
export async function getOpenAIResponse(message: string): Promise<string> {
    try {
        console.log("Sending message to backend:", message);

        const response = await fetch(`${BASE_URL}/openai-chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error("Error from backend:", errorDetails);
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
        }

        const data = await response.json();
        console.log("Response from backend:", data);

        return data.response;
    } catch (error) {
        console.error("Error in getOpenAIResponse:", error);
        throw new Error("Failed to fetch response from OpenAI API.");
    }
}
