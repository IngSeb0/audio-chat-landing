
import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, User, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hola, ¿en qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    // This function would be replaced with actual AI processing
    const responses = [
      "Entiendo. ¿Puedes contarme más sobre eso?",
      "Interesante. ¿Cómo puedo ayudarte con eso?",
      "Gracias por compartir. ¿Hay algo específico que quieras saber?",
      "Estoy procesando tu mensaje. ¿Puedes proporcionar más detalles?",
      "¿Hay algo más en lo que pueda ayudarte hoy?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // This would integrate with Web Speech API or similar
    if (!isRecording) {
      console.log("Started recording voice input");
    } else {
      console.log("Stopped recording voice input");
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto shadow-lg">
      {/* Chat Header */}
      <div className="bg-white border-b p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <Bot className="text-blue-600" size={20} />
        </div>
        <div>
          <h1 className="font-semibold text-lg">VoiceChat Asistente</h1>
          <p className="text-xs text-gray-500">En línea</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "mb-4 max-w-[80%] flex flex-col",
              message.sender === "user"
                ? "ml-auto items-end"
                : "mr-auto items-start"
            )}
          >
            <div className="flex items-end gap-2">
              {message.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                  <Bot className="text-blue-600" size={16} />
                </div>
              )}
              
              <div
                className={cn(
                  "p-3 rounded-lg",
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                )}
              >
                {message.content}
              </div>
              
              {message.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mb-1">
                  <User className="text-white" size={16} />
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {formatTime(message.timestamp)}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="flex-1 resize-none"
            rows={1}
          />
          <div className="flex gap-2">
            <Button
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              className={cn(
                "rounded-full",
                isRecording && "animate-pulse"
              )}
            >
              <Mic />
            </Button>
            <Button
              onClick={handleSendMessage}
              variant="default"
              size="icon"
              className="rounded-full bg-blue-600"
              disabled={inputMessage.trim() === ""}
            >
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
