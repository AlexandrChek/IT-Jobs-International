import{n as h,i as l,r as m,j as s}from"./index-7gvRnxOA.js";import{a as u,s as x}from"./companyChatSlice-BNbN9939.js";const e={},y=()=>{const{companyid:t,corresp_id:n}=h(),r=l(),o=[],[c,i]=m.useState("");m.useEffect(()=>{r(u({companyid:t,corresp_id:n}))},[r,t,n]);const p=()=>{c.trim()&&(r(x({companyid:t,corresp_id:n,message:c})),i(""))};return o?s.jsxs("div",{className:e.chat,children:[s.jsxs("h2",{children:["Conversation with ",o.seekerName]}),s.jsx("div",{className:e.messages,children:o.messages.map((a,d)=>s.jsx("p",{className:a.fromCompany?e.fromCompany:e.fromSeeker,children:a.text},d))}),s.jsxs("div",{className:e.input,children:[s.jsx("input",{type:"text",value:c,onChange:a=>i(a.target.value),placeholder:"Type your message..."}),s.jsx("button",{onClick:p,children:"Send"})]})]}):s.jsx("p",{children:"Loading..."})};export{y as default};
