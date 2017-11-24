import React from 'react';
import Textarea from 'react-textarea-autosize';
import './InputLists.css';

// class InputLists extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       canSend: false
//     }
//   }
// }

const InputLists = () => (
  <div className="InputLists-container">
    <Textarea style={{minHeight: 40}} maxRows={6} placeholder="teste" />
    <i className="material-icons">add_circle_outline</i>
  </div>
);

export default InputLists;
