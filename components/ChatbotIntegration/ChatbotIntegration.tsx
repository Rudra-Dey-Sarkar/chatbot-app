"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";


function ChatbotIntegration() {
    const [copied, setCopied] = useState(false);
    const language = "html"
    const code = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Website</title>

      <!-- Chatbot SDK Script -->
      <script type="text/javascript">
      (function () {
      var chatbotScript = document.createElement("script");
      chatbotScript.src = "https://dummy-chatbot-example.com/sdk.js"; // SDK URL
      chatbotScript.async = true;
      chatbotScript.onload = function () {
        if (typeof initializeChatbot === "function") {
          initializeChatbot(); // Initialize chatbot after loading
        }
      };
      document.head.appendChild(chatbotScript);
    })();
    </script>

   </head>
   <body>
   <!-- Your website content here -->
   </body>
   </html>`;
    const ControlCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="px-2">
            <p className="text-[2rem] font-bold">Instructions To Integrate Chatbot</p>
            <p className="text-[1rem] font-semibold">Copy paste the code in the header section of your code to integrate Chatbot in your Website </p>
            <div className="relative w-full p-4 bg-gray-100 rounded-lg shadow-md">
                <button
                    className="absolute top-10 right-10 p-2 bg-white border rounded-md hover:bg-gray-200 z-50"
                    onClick={ControlCopy}
                >
                    {copied ? <Check className="text-green-500" size={18} /> : <Copy size={18} />}
                </button>

                <SyntaxHighlighter language={language} style={materialLight} wrapLongLines>
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}


export default ChatbotIntegration