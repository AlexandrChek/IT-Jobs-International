import{d as v,u as w,b as P,r as m,g,t as N,j as e,L as t,y as L,M as _,v as C,z as F,A as M}from"./index-BKb1bccC.js";import{M as S,a as k}from"./MyTextarea-DW8xgObs.js";import{L as D}from"./LinksList-DATvgvkn.js";const i={},$=()=>{const{companyid:o}=v(),a=w(),{profile:s,pending:d,error:l}=P(n=>n.companyProfile),{employeesNumberLabel:b,websiteLabel:u,descriptionLabel:h}=C,c=m.useRef(),p=g("fetchCompanyProfile",o);m.useEffect(()=>{a(N(p))},[a,p]);const y=async n=>{n.preventDefault();let r=new FormData(c.current);r.append("action","saveCompanyPublicInfo"),r.append("id",o);const j={method:"POST",body:r};try{await a(F(j)).unwrap(),alert(M)}catch(x){alert(x.message)}},f=()=>{window.open(`/company_profile/${o}/public`,"_blank")};return e.jsxs("div",{className:"routesWrapper",children:[e.jsx(t,{to:"/",className:i.button,children:"Find CVs"}),e.jsx(t,{to:`/company_profile/${o}/chat_list`,className:i.button,children:"Correspondence"}),e.jsx(t,{to:`/company_profile/${o}/edit_reg_data`,className:i.button,children:"Edit registration data"}),d&&e.jsx("h3",{children:"Loading..."}),l&&e.jsx("h3",{children:l}),e.jsxs("form",{ref:c,onSubmit:y,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"employeesNumber",children:b}),e.jsx(S,{id:"employeesNumber",name:"employeesNumber",options:L,initialValue:s&&s.employeesNumber})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"website",children:u}),e.jsx(_,{type:"url",id:"website",name:"website",initialValue:s&&s.website})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"description",children:h}),e.jsx(k,{id:"description",name:"description",initialValue:s&&s.description})]}),e.jsx("button",{type:"submit",children:"Save"})]}),s.jobs&&e.jsx(D,{cvsOrJobs:s.jobs,type:"job"}),e.jsx(t,{to:`/company_profile/${o}/save_job`,className:i.button,children:"Add job"}),e.jsx("button",{onClick:f,children:"Profile preview"})]})};export{$ as default};
