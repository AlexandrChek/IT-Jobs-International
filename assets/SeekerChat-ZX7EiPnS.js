import{d as l,u as h,r as d,j as e}from"./index-BKb1bccC.js";import{a as u,s as x}from"./seekerChatSlice-Cu3XBuMd.js";const a={},g=()=>{const{seekerid:t,corresp_id:r}=l(),n=h(),o=[],[c,i]=d.useState("");d.useEffect(()=>{n(u({seekerid:t,corresp_id:r}))},[n,t,r]);const m=()=>{c.trim()&&(n(x({seekerid:t,corresp_id:r,message:c})),i(""))};return o?e.jsxs("div",{className:"routesWrapper",children:[e.jsxs("h2",{children:["Conversation with ",o.companyName]}),e.jsx("div",{className:a.messages,children:o.messages.map((s,p)=>e.jsx("p",{className:s.fromSeeker?a.fromSeeker:a.fromCompany,children:s.text},p))}),e.jsxs("div",{className:a.input,children:[e.jsx("input",{type:"text",value:c,onChange:s=>i(s.target.value),placeholder:"Type your message..."}),e.jsx("button",{onClick:m,children:"Send"})]})]}):e.jsx("p",{children:"Loading..."})};export{g as default};