import{d as o,u as c,r as n,j as s,L as p}from"./index-BKb1bccC.js";import{f as i}from"./companyChatSlice-05r2l26l.js";const m={},l=()=>{const{companyid:e}=o(),t=c(),a=[];return n.useEffect(()=>{t(i(e))},[t,e]),s.jsxs("div",{className:"routesWrapper",children:[s.jsx("h2",{children:"Correspondence"}),a.length===0?s.jsx("p",{children:"No correspondences yet."}):a.map(r=>s.jsxs(p,{to:`/company_profile/${e}/chat/${r.corresp_id}`,className:m.chatLink,children:["Conversation with ",r.seekerName]},r.corresp_id))]})};export{l as default};
