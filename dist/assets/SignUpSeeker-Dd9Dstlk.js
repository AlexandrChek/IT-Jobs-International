import{d as f,u as h,a as y,b as x,r as c,j as e}from"./index-BKb1bccC.js";import{f as k,u as j}from"./seekerProfileSlice-CvhmprSl.js";const v=()=>{const{seekerid:i}=f(),l=h(),p=y(),t=x(r=>r.seekerProfile.profile),[a,u]=c.useState({firstName:"",lastName:"",email:"",country:"",city:"",skills:""});c.useEffect(()=>{t?u({firstName:t.firstName,lastName:t.lastName,email:t.email,country:t.country,city:t.city,skills:t.skills.join(", ")}):l(k(i))},[l,t,i]);const s=r=>{const{name:n,value:m}=r.target;u(o=>({...o,[n]:m}))},d=async r=>{r.preventDefault();const n={...a,skills:a.skills.split(",").map(o=>o.trim())};(await l(j({seekerid:i,updatedProfile:n}))).meta.requestStatus==="fulfilled"&&p(`/job_seeker_profile/${i}`)};return e.jsxs("div",{className:"routesWrapper",children:[e.jsx("h2",{children:"Edit Registration Data"}),e.jsxs("form",{onSubmit:d,children:[e.jsx("input",{type:"text",name:"firstName",value:a.firstName,onChange:s,placeholder:"First Name",required:!0}),e.jsx("input",{type:"text",name:"lastName",value:a.lastName,onChange:s,placeholder:"Last Name",required:!0}),e.jsx("input",{type:"email",name:"email",value:a.email,onChange:s,placeholder:"Email",required:!0}),e.jsx("input",{type:"text",name:"country",value:a.country,onChange:s,placeholder:"Country",required:!0}),e.jsx("input",{type:"text",name:"city",value:a.city,onChange:s,placeholder:"City",required:!0}),e.jsx("input",{type:"text",name:"skills",value:a.skills,onChange:s,placeholder:"Skills (comma separated)",required:!0}),e.jsx("button",{type:"submit",children:"Save Changes"})]})]})};export{v as default};