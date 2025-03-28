const BASE_URL = "http://localhost:5000/api";

/**
 * Starts the ElevenLabs conversation session.
 * @returns A promise resolving to the success message.
 */
export async function startConversation(): Promise<string> {
    const response = await fetch(`${BASE_URL}/start-conversation`, {
        method: "POST",
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
    }

    const data = await response.json();
    return data.message;
}
