import { useEffect } from 'react';

function ChatBot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "3ZU2oQEeRBvBrF6Ff1jNj";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);
  }, []);

  return null; // No UI, just injects the bot script
}

export default ChatBot;
