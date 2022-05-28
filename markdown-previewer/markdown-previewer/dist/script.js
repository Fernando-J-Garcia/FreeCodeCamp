import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import { marked } from "https://cdn.skypack.dev/marked@4.0.16";
import * as prismjs from "https://cdn.skypack.dev/prismjs@1.28.0";
const { useState } = React;
const App = () => {
  const defaultText = `# this is a header
## this is a h2 tag...
[this is a link](https://www.freecodecamp.org)

This is **bolded** text
  
here is some code \`<div></div>\`, in a box

\`\`\`
function add(num1, num2){
  return num + num;
}
\`\`\`

this is a list
- item 1
  - item 2
    - item 3
    
> This is a Block Quote!

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
  const [text, setText] = useState(defaultText);
  const handleChange = e => {
    setText(e.target.value);
  };
  const renderMarkDown = new marked.Renderer();
  marked.setOptions({
    breaks: true,
    highlight: function (code) {
      return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    } });

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "editor-wrapper" }, /*#__PURE__*/
    React.createElement("p", { className: "header" }, "Editor"), /*#__PURE__*/
    React.createElement("textarea", { id: "editor", value: text, onChange: handleChange })), /*#__PURE__*/

    React.createElement("div", { id: "preview-wrapper" }, /*#__PURE__*/
    React.createElement("p", { className: "header" }, "Preview"), /*#__PURE__*/
    React.createElement("div", { id: "preview",
      dangerouslySetInnerHTML: { __html: marked(text, { renderer: renderMarkDown }) } }))));




};
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#root'));