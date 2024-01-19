import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/RichTextEditorPage.css";
const { EditorState, convertToRaw } = require("draft-js");
const { useState } = require("react");
const { Editor } = require("react-draft-wysiwyg");

const RichTextEditorPage = () => {
  const [editorText, setEditorText] = useState(() => EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorText(state);
  };

  return (
    <div className="rich-text-editor-page">
      <Editor
        editorState={editorText}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div className="rich-text-container">
        {draftToHtml(convertToRaw(editorText.getCurrentContent()))}
      </div>
    </div>
  );
};

export default RichTextEditorPage;
