import{n as h,i as d,u as m,o as j,r as x,p as b,j as e,s as f}from"./index-7gvRnxOA.js";import{L as u}from"./LinksList-CTewe50V.js";const y={},P=()=>{const{companyid:o}=h(),r=d(),{profile:s,pending:t,error:i}=m(p=>p.companyProfile),{employeesNumberLabel:c,websiteLabel:a,descriptionLabel:l}=f,n=j("fetchCompanyProfile",o);return x.useEffect(()=>{r(b(n))},[r,n]),e.jsxs("div",{className:y.profile,children:[t&&e.jsx("h3",{children:"Loading..."}),s&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:s.companyName}),e.jsx("p",{children:s.location}),s.employeesNumber&&e.jsxs("h5",{children:[c," ",s.employeesNumber]}),s.website&&e.jsxs("h5",{children:[a," ",e.jsx("a",{href:s.website,target:"_blank",children:s.website})]}),s.description&&e.jsxs(e.Fragment,{children:[e.jsx("h5",{children:l}),e.jsx("p",{children:s.description})]}),s.jobs(e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:"Current jobs"}),e.jsx(u,{cvsOrJobs:s.jobs,type:"job"})]}))]}),i&&e.jsx("h3",{children:i})]})};export{P as default};
