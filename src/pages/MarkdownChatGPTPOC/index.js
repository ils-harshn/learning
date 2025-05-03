import "./marked.css";
import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { Link } from "react-router-dom";

const MarkdownStreamCharByChar = ({ handleShowByChunk }) => {
  const [markdown, setMarkdown] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const charQueue = useRef([]);
  const typingTimer = useRef(null);
  const markdownRef = useRef(null);

  const handleGoBack = () => {
    window.history.back();
  };

  // Typing animation: process one character at a time
  useEffect(() => {
    if (typingTimer.current) return;

    typingTimer.current = setInterval(() => {
      if (charQueue.current.length > 0) {
        const nextChar = charQueue.current.shift();
        setDisplayedText((prev) => prev + nextChar);
      } else {
        clearInterval(typingTimer.current);
        typingTimer.current = null;
      }
    }, 15); // speed of typing
  }, [markdown]);

  useEffect(() => {
    const eventSource = new EventSource(
      "https://dent-abyssinian-scallion.glitch.me/markdown-stream"
    );

    eventSource.onopen = () => console.log("Stream connection opened");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.v) {
        charQueue.current.push(...data.v); // break into characters
        setMarkdown((prev) => prev + data.v);
      }
    };

    eventSource.addEventListener("end", () => {
      console.log("Stream ended normally");
      eventSource.close();
    });

    eventSource.onerror = (error) => {
      console.log("Connection closed or error occurred");
      eventSource.close();
    };

    return () => {
      console.log("Cleaning up EventSource");
      eventSource.close();
      clearInterval(typingTimer.current);
    };
  }, []);

  useEffect(() => {
    if (markdownRef.current) {
      markdownRef.current.scrollTop = markdownRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <>
      <div className="absolute top-5 right-10 z-10">
        <Link to={"/"} className="mr-5 text-white">
          Home
        </Link>
        <Link
          onClick={handleShowByChunk}
          className="text-white mr-5 p-2 bg-[#0f0] rounded-md"
        >
          Char
        </Link>
        <Link onClick={handleGoBack} className="text-white">
          Back
        </Link>
      </div>
      <article
        ref={markdownRef}
        dangerouslySetInnerHTML={{ __html: marked(displayedText) }}
        className="markdown-body overflow-y-auto min-h-screen max-h-screen p-5"
      />
    </>
  );
};

const MarkdownStream = ({ handleShowByCharByChar }) => {
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
      <div className="absolute top-5 right-10">
        <Link to={"/"} className="mr-5 text-white">
          Home
        </Link>
        <Link
          onClick={handleShowByCharByChar}
          className="text-white mr-5 p-2 bg-[#f00] rounded-md"
        >
          Chunk
        </Link>
        <Link onClick={handleGoBack} className="text-white">
          Back
        </Link>
      </div>
      <article
        ref={markdownRef} // Attach the ref to the article element
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        className="markdown-body overflow-y-auto min-h-screen max-h-screen p-5"
      />
    </>
  );
};

export default function MarkdownChatGPTPOC() {
  const SHOW_BY = {
    CHAR_BY_CHAR: "CHAR_BY_CHAR",
    CHUNK: "CHUNK",
  };
  const [showBy, setShowBy] = useState(SHOW_BY.CHUNK);

  const handleShowByChunk = () => {
    setShowBy(SHOW_BY.CHUNK);
  };

  const handleShowByCharByChar = () => {
    setShowBy(SHOW_BY.CHAR_BY_CHAR);
  };

  return showBy === SHOW_BY.CHAR_BY_CHAR ? (
    <MarkdownStreamCharByChar handleShowByChunk={handleShowByChunk} />
  ) : (
    <MarkdownStream handleShowByCharByChar={handleShowByCharByChar} />
  );
}
