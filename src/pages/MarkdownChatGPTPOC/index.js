import "./marked.css";
import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { Link } from "react-router-dom";

const MarkdownStream = () => {
  const [markdown, setMarkdown] = useState("");
  const markdownRef = useRef(null); // Create a ref to the markdown container

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const eventSource = new EventSource(
      "https://dent-abyssinian-scallion.glitch.me/markdown-stream"
    );

    // Handle connection opened
    eventSource.onopen = () => {
      console.log("Stream connection opened");
    };

    // Handle incoming messages
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMarkdown((prevMarkdown) => prevMarkdown + data?.v);
    };

    // Handle the end event
    eventSource.addEventListener("end", () => {
      console.log("Stream ended normally");
      eventSource.close();
    });

    // Handle errors - this includes normal connection closures
    eventSource.onerror = (error) => {
      console.log("Connection closed or error occurred");
      eventSource.close();
    };

    return () => {
      console.log("Cleaning up EventSource");
      eventSource.close();
    };
  }, []);

  // Scroll to the bottom of the markdown container whenever markdown changes
  useEffect(() => {
    if (markdownRef.current) {
      markdownRef.current.scrollTop = markdownRef.current.scrollHeight;
    }
  }, [markdown]);

  return (
    <>
      <div className="absolute">
        <Link to={"/"} className="mr-5">
          Home
        </Link>
        <Link onClick={handleGoBack}>Back</Link>
      </div>
      <article
        ref={markdownRef} // Attach the ref to the article element
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        className="markdown-body"
        style={{
          overflowY: "auto",
          minHeight: "100vh",
          maxHeight: "100vh",
          padding: "20px",
        }} // Optional: Set a max height and overflow
      />
    </>
  );
};

export default function MarkdownChatGPTPOC() {
  return <MarkdownStream />;
}
