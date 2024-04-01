import "../css/MsgWithFiles.css";
const { EditorState } = require("draft-js");
const { useState } = require("react");
const { Editor } = require("react-draft-wysiwyg");

const MsgContainer = () => {
  return <div className="MsgWithFiles_msg-container"></div>;
};

const MsgInput = () => {
  const [editorText, setEditorText] = useState(() => EditorState.createEmpty());

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
    lineHeight: '1.2',
  };

  return (
    <div className="MsgWithFiles_input-container">
      <Editor
        placeholder="Make a note of something"
        editorState={editorText}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="MsgWithFiles_wrapper-class"
        editorClassName="MsgWithFiles_editor-class"
        toolbarClassName="MsgWithFiles_toolbar-class"
        toolbar={toolbarOptions}
        editorStyle={editorStyle}
      />
    </div>
  );
};

const MsgWithFiles = () => {
  return (
    <div className="MsgWithFiles_main-container">
      <div className="MsgWithFiles_main">
        <MsgContainer />
        <MsgInput />
      </div>
    </div>
  );
};

export default MsgWithFiles;
