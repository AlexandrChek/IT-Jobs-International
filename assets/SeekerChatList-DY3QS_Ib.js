import{d as o,u as c,r as n,j as e,L as i}from"./index-BKb1bccC.js";import{f as p}from"./seekerChatSlice-Cu3XBuMd.js";const d={},l=()=>{const{seekerid:s}=o(),t=c(),a=[];return n.useEffect(()=>{t(p(s))},[t,s]),e.jsxs("div",{className:"routesWrapper",children:[e.jsx("h2",{children:"Correspondence"}),a.length===0?e.jsx("p",{children:"No correspondences yet."}):a.map(r=>e.jsx(i,{to:`/job_seeker_profile/${s}/chat/${r.id}`,className:d.chatItem,children:r.companyName},r.id))]})};export{l as default};
