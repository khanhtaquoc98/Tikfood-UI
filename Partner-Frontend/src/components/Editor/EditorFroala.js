import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js'


// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditor from 'react-froala-wysiwyg';

const config =  {
  placeholderText: 'Nhập text',
  language: 'vi',
  height: 300,
  fullPage: false,     // for email message
  useClasses: true,  // for email message
  toolbarButtons: [
      'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
      'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
      'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|',
      'insertLink', 'insertImage', 'embedly', 'insertTable', '|',
      'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
      'spellChecker', 'help', '|', 'undo', 'redo'],
  fontFamilySelection: true,
  imageEditButtons: [
      'imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|',
      'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'
  ],
  imageUpload: true,
  imageDefaultAlign: 'left',
  imageAllowedTypes: ['jpeg', 'jpg', 'png'],
  events : {
    'image.beforeUpload': function(images) {
      // Before image is uploaded
      var editor = this;
      if (images.length) {
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        const data = new FormData();
        data.append('file', images[0]);
        axios.post('http://localhost:8080/api/v2/uploadimage', data, config)
        .then(res => {
          editor.image.insert(res.data.data, null, null, editor.image.get());
        }).catch(err => {
          console.log(err);
        });
      }

      editor.popups.hideAll();
      // Stop default upload chain.
      return false;
    }
  }
};

export default class EditorFrola extends React.Component {
    constructor() {
        super();
    
        this.state = {
          content: '<span>My Document\'s Title</span>'
        };
    
      }
    
      handleModelChange = (model) => {   
      //  console.log(model)
        this.props.handleChange(model)
      }
    
      render () {
        //console.log(this.props.content)
        return(
          <div className="sample">
            <FroalaEditor
              model={this.props.content}
              config={config}
              onModelChange={(model) => this.handleModelChange(model)}
            />
          </div>
        );
      }
}