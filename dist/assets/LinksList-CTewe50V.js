import{h as i,j as n}from"./index-7gvRnxOA.js";const d=({cvsOrJobs:c,type:o})=>{const r=i("/company_profile/:companyid");return n.jsx("div",{children:c.map(s=>n.jsxs("div",{children:[n.jsxs(Link,{to:o==="cv"?`/public_cv/${s.id}`:`/${s.countryId}/job/${s.id}`,children:[n.jsxs("h3",{children:[s.position," ",s.salary]}),n.jsxs("p",{children:[s.country,", ",s.city]})]}),r&&n.jsx("span",{children:s.status})]},s.id))})};export{d as L};
