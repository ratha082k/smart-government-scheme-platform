import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Chatbot() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("chatHistory")) || [];
  });

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    localStorage.setItem(
      "chatHistory",
      JSON.stringify(messages)
    );
  }, [messages]);

  const askAI = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await api.post("/chatbot", {
        message: userQuestion,

        userDetails: JSON.parse(
          localStorage.getItem("user")
        ),
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      console.error("Chatbot Error:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Sorry, I couldn't process your request.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      askAI();
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-8">
        <div className="max-w-5xl mx-auto px-5">

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* Header */}

            <div className="bg-blue-700 text-white p-5 flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                🤖 SmartGov AI Assistant
              </h2>

              <button
                onClick={() => {
                  setMessages([]);
                  localStorage.removeItem("chatHistory");
                }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Clear Chat
              </button>

            </div>

            {/* Messages */}

            <div className="h-[65vh] overflow-y-auto p-6 bg-slate-50">

              {messages.length === 0 && (
                <div className="text-center mt-20">

                  <h2 className="text-3xl font-bold text-blue-700">
                    🤖 Welcome to SmartGov AI
                  </h2>

                  <p className="text-gray-600 mt-3">
                    Ask anything about Indian Government Schemes
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">

                    {[
                      "PM Kisan",
                      "Ayushman Bharat",
                      "PM Awas Yojana",
                      "Mudra Loan",
                      "National Scholarship",
                      "Startup India",
                      "Women Welfare Schemes",
                      "Farmer Schemes",
                      "Senior Citizen Pension",
                    ].map((item) => (

                      <button
                        key={item}
                        onClick={() => {
                          setQuestion(item);
                        }}
                        className="bg-white hover:bg-blue-700 hover:text-white border border-blue-600 rounded-xl p-4 shadow transition font-semibold"
                      >
                        {item}
                      </button>

                    ))}

                  </div>

                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-6 ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {msg.role === "assistant" && (
                    <div className="text-3xl mr-3">
                      🤖
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-4 shadow ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >

                    {msg.role === "assistant" ? (
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-3xl font-bold text-blue-700 mb-4">
                              {children}
                            </h1>
                          ),

                          h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold text-blue-600 mt-5 mb-3">
                              {children}
                            </h2>
                          ),

                          h3: ({ children }) => (
                            <h3 className="text-xl font-semibold mt-4 mb-2">
                              {children}
                            </h3>
                          ),

                          p: ({ children }) => (
                            <p className="mb-3 leading-7 text-gray-800">
                              {children}
                            </p>
                          ),

                          ul: ({ children }) => (
                            <ul className="list-disc ml-6 mb-3 space-y-1">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="list-decimal ml-6 mb-3 space-y-1">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li className="leading-7">
                              {children}
                            </li>
                          ),

                          strong: ({ children }) => (
                            <strong className="font-bold text-black">
                              {children}
                            </strong>
                          ),

                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 underline"
                            >
                              {children}
                            </a>
                          ),

                          code: ({ children }) => (
                            <code className="bg-gray-200 px-1 rounded">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      <p>{msg.text}</p>
                    )}

                  </div>

                  {msg.role === "user" && (
                    <div className="text-3xl ml-3">
                      👤
                    </div>
                  )}

                </div>
              ))}

              {loading && (
                <div className="flex items-center">

                  <div className="text-3xl mr-3">
                    🤖
                  </div>

                  <div className="bg-white rounded-xl px-5 py-3 shadow">

                    <div className="flex gap-2">

                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>

                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>

                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>

                    </div>

                  </div>

                </div>
              )}

              <div ref={bottomRef}></div>

            </div>

            {/* Input */}

            <div className="border-t p-5 flex gap-3 bg-white">

              <input
                className="flex-1 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask about Government Schemes..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button
                onClick={askAI}
                disabled={loading}
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 rounded-xl font-semibold"
              >
                {loading ? "..." : "Send"}
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}