import React, { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatInterface = () => {
  const [conversationStarted, setConversationStarted] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleStartConversation = async () => {
    try {
      console.log("Attempting to start conversation by running prueba.py...");
      const response = await fetch("http://localhost:5000/api/run-prueba", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        setConversationStarted(true);
        console.log("Conversation started successfully:", data.message);
        setOutput(data.output);
      } else {
        console.error("Error from backend:", data.error);
        setOutput(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto shadow-lg">
      <div className="bg-white border-b p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <Bot className="text-blue-600" size={20} />
        </div>
        <div>
          <h1 className="font-semibold text-lg">VoiceChat Asistente</h1>
          <p className="text-xs text-gray-500">En línea</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {output && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Output:</h2>
            <pre className="bg-gray-100 p-2 rounded">{output}</pre>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t">
        {!conversationStarted ? (
          <Button
            onClick={handleStartConversation}
            variant="default"
            className="bg-blue-600 text-white w-full"
          >
            Iniciar Conversación
          </Button>
        ) : (
          <p className="text-center text-gray-500">Conversación en curso...</p>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
