import{n as v,i as w,u as P,r as m,o as N,p as g,j as e,L as t,q as L,M as _,s as C,t as F,v as M}from"./index-7gvRnxOA.js";import{M as S,a as k}from"./MyTextarea-kbG37ZWs.js";import{L as D}from"./LinksList-CTewe50V.js";const i={},$=()=>{const{companyid:o}=v(),a=w(),{profile:s,pending:d,error:l}=P(n=>n.companyProfile),{employeesNumberLabel:b,websiteLabel:u,descriptionLabel:h}=C,c=m.useRef(),p=N("fetchCompanyProfile",o);m.useEffect(()=>{a(g(p))},[a,p]);const f=async n=>{n.preventDefault();let r=new FormData(c.current);r.append("action","saveCompanyPublicInfo"),r.append("id",o);const j={method:"POST",body:r};try{await a(F(j)).unwrap(),alert(M)}catch(x){alert(x.message)}},y=()=>{window.open(`/company_profile/${o}/public`,"_blank")};return e.jsxs("div",{className:i.profile,children:[e.jsx(t,{to:"/",className:i.button,children:"Find CVs"}),e.jsx(t,{to:`/company_profile/${o}/chat_list`,className:i.button,children:"Correspondence"}),e.jsx(t,{to:`/company_profile/${o}/edit_reg_data`,className:i.button,children:"Edit registration data"}),d&&e.jsx("h3",{children:"Loading..."}),l&&e.jsx("h3",{children:l}),e.jsxs("form",{ref:c,onSubmit:f,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"employeesNumber",children:b}),e.jsx(S,{id:"employeesNumber",name:"employeesNumber",options:L,initialValue:s&&s.employeesNumber})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"website",children:u}),e.jsx(_,{type:"url",id:"website",name:"website",initialValue:s&&s.website})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"description",children:h}),e.jsx(k,{id:"description",name:"description",initialValue:s&&s.description})]}),e.jsx("button",{type:"submit",children:"Save"})]}),s.jobs&&e.jsx(D,{cvsOrJobs:s.jobs,type:"job"}),e.jsx(t,{to:`/company_profile/${o}/save_job`,className:i.button,children:"Add job"}),e.jsx("button",{onClick:y,children:"Profile preview"})]})};export{$ as default};
