import{j as e,M as u,r as c,B as g,C as j,L as w,u as v,b as x,d as C,a as b,g as P,D as R,E as D,F as S,l as I}from"./index-BKb1bccC.js";import{E as M}from"./EmailInput-BYAUfuH9.js";import{M as O}from"./Modal-1vo9Px1F.js";import{M as k}from"./MyCheckbox-M2EsQArF.js";const q=({initialPhone:a="",isRequired:s=!1})=>e.jsxs("div",{children:[e.jsx("label",{htmlFor:"phone",children:"Phone number"}),e.jsx(u,{type:"tel",id:"phone",name:"phone",required:s,initialValue:a})]}),E=()=>{const[a,s]=c.useState(""),[h,o]=c.useState(!1),p=c.useRef(),l=c.useRef();let r="",i="";const d=()=>{r.length<3&&(s(g),o(!0))},m=()=>{r!==i&&(s(j),o(!0))},t=()=>{o(!1),a===g?p.current.focus():l.current.focus()};return e.jsxs("div",{children:[e.jsxs("label",{children:["Password",e.jsx(u,{type:"password",name:"password",ref:p,required:!0,getVal:n=>r=n.value,onBlur:d})]}),e.jsxs("label",{children:["Password (again)",e.jsx(u,{type:"password",ref:l,required:!0,getVal:n=>i=n.value,onBlur:m})]}),e.jsxs(O,{isOpen:h,close:t,children:[e.jsx("p",{children:a}),e.jsx("button",{onClick:t,children:"Ok"})]})]})},F=()=>{const a=e.jsx(w,{to:"/privacy",children:"privacy"});return e.jsxs(e.Fragment,{children:[e.jsx(k,{name:"privacyAcceptance",initialState:!0,required:!0}),"I accept the ",a," terms."]})},B=()=>{const a=v(),{regData:s,pending:h,error:o}=x(t=>t.companyRegData),p=x(t=>t.auth.userId),l=c.useRef(),{companyid:r}=C()||{},i=typeof r=="string",d=b();c.useEffect(()=>{if(i){const t=P("fetchCompanyRegData",r);a(R(t))}},[r,a]);const m=async t=>{t.preventDefault();let n=new FormData(l.current);i?(n.append("action","editCompanyRegData"),n.append("id",r)):n.append("action","signUpCompany");const y={method:"POST",body:n};try{if(await a(S(y)).unwrap(),i)d(`/company_profile/${r}`);else{const f={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"logInCompany",email:n.get("email"),password:n.get("password")})};await a(I(f)).unwrap(),d(`/company_profile/${p}`)}}catch(f){alert(f.message)}};return e.jsxs("div",{className:"routesWrapper",children:[e.jsx("h2",{children:"Registration data"}),e.jsx("p",{children:"All fields are required"}),h&&e.jsx("h3",{children:"Loading..."}),o&&e.jsx("h3",{children:o}),e.jsxs("form",{ref:l,onSubmit:m,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",children:"Company name"}),e.jsx(u,{type:"text",id:"name",name:"name",required:!0,initialValue:s&&s.name})]}),e.jsxs("fieldset",{children:[e.jsx("legend",{children:"Location of the main office"}),e.jsx(D,{initialCountry:s&&s.country,initialCity:s&&s.city,areRequired:!0})]}),e.jsx(q,{initialPhone:s&&s.phone,isRequired:!0}),e.jsx(M,{initialEmail:s&&s.email}),e.jsx(E,{}),e.jsx(F,{}),e.jsx("button",{type:"submit",children:i?"Save":"Sign Up"})]})]})};export{B as default};