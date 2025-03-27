import React, { useState } from "react";
import { generateQuestions, evaluateAnswer } from "../api";

const InterviewForm: React.FC = () => {
    const [role, setRole] = useState("");
    const [interviewType, setInterviewType] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");
    const [questions, setQuestions] = useState<string[]>([]);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleGenerateQuestions = async () => {
        try {
            const generatedQuestions = await generateQuestions(role, interviewType, experienceLevel);
            setQuestions(generatedQuestions);
        } catch (error) {
            console.error("Error generating questions:", error);
        }
    };

    const handleEvaluateAnswer = async () => {
        try {
            const evaluationFeedback = await evaluateAnswer(answer);
            setFeedback(evaluationFeedback);
        } catch (error) {
            console.error("Error evaluating answer:", error);
        }
    };

    return (
        <div>
            <h1>Interview Preparation</h1>
            <div>
                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Interview Type"
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Experience Level"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                />
                <button onClick={handleGenerateQuestions}>Generate Questions</button>
            </div>
            <div>
                <h2>Questions</h2>
                <ul>
                    {questions.map((question, index) => (
                        <li key={index}>{question}</li>
                    ))}
                </ul>
            </div>
            <div>
                <textarea
                    placeholder="Your Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button onClick={handleEvaluateAnswer}>Evaluate Answer</button>
            </div>
            <div>
                <h2>Feedback</h2>
                <p>{feedback}</p>
            </div>
        </div>
    );
};

export default InterviewForm;
