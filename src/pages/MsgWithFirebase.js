import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import draftToHtml from "draftjs-to-html";
import "../css/MsgWithFirebase.css";
import db from "../db";
import { useEffect } from "react";
const { EditorState, convertToRaw } = require("draft-js");
const { useState } = require("react");
const { Editor } = require("react-draft-wysiwyg");

// API's
const SendMessageAPI = async (data) => {
  console.log("DOC REF");
  try {
    const docRef = await addDoc(collection(db, "messages"), data);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
};

const MsgContainer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setMessages(data);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="MsgWithFirebase_msg-container">
      {messages.map((data, index) => (
        <div key={index} className="MsgWithFirebase_msg-msg">
          <div className="MsgWithFirebase_msg-time"></div>
          <div
            className="MsgWithFirebase_msg-content"
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

const MsgInput = ({ editorText, setEditorText }) => {
  const handleEditorChange = (state) => {
    setEditorText(state);
  };

  const toolbarOptions = {
    options: ["inline", "link", "list"],
    inline: {
      options: ["bold", "italic", "strikethrough"],
    },
    list: {
      options: ["unordered", "ordered"],
    },
    textAlign: {
      options: ["left", "center", "right", "justify"],
    },
    link: {
      options: ["link"],
    },
  };

  const editorStyle = {
    lineHeight: "1.2",
  };

  return (
    <>
      <div className="MsgWithFirebase_input-container">
        <Editor
          placeholder="Make a note of something"
          editorState={editorText}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="MsgWithFirebase_wrapper-class"
          editorClassName="MsgWithFirebase_editor-class"
          toolbarClassName="MsgWithFirebase_toolbar-class"
          toolbar={toolbarOptions}
          editorStyle={editorStyle}
        />
      </div>
    </>
  );
};

const ExtraOptions = ({
  editorText,
  loading,
  setLoading,
  setMessages,
  setEditorText,
}) => {
  const sendMessage = async () => {
    setLoading(true);
    const message = {
      content: draftToHtml(convertToRaw(editorText.getCurrentContent())),
      createdAt: serverTimestamp(),
    };
    const msgRef = await SendMessageAPI(message);
    if (msgRef !== null) {
      setEditorText(EditorState.createEmpty());
    }
    setLoading(false);
  };
  return (
    <div className="MsgWithFirebase_extra-options">
      <div className="MsgWithFirebase_extra-options-left"></div>
      <div className="MsgWithFirebase_extra-options-right">
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

const MsgWithFirebase = () => {
  const [editorText, setEditorText] = useState(() => EditorState.createEmpty());
  // const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="MsgWithFirebase_main-container">
      <div className="MsgWithFirebase_main">
        <MsgContainer />
        <MsgInput editorText={editorText} setEditorText={setEditorText} />
        <ExtraOptions
          editorText={editorText}
          loading={loading}
          setLoading={setLoading}
          setEditorText={setEditorText}
        />
      </div>
    </div>
  );
};

export default MsgWithFirebase;
