import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/RichTextEditorPage.css";
const { EditorState, convertToRaw } = require("draft-js");
const { useState } = require("react");
const { Editor } = require("react-draft-wysiwyg");

const RichTextEditorPage = () => {
  const [richText, setRichText] = useState(() => EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setRichText(state);
  };

  return (
    <div className="rich-text-editor-page">
      <Editor
        editorState={richText}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <textarea
        value={draftToHtml(convertToRaw(richText.getCurrentContent()))}
      ></textarea>
    </div>
  );
};

export default RichTextEditorPage;
