import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const MyCKEditor = ({ content, setContent }) => {
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };
    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={content ? content : ""}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default MyCKEditor;
