import{r as o,j as e}from"./index-D5C2-dZt.js";const n="_modalWrapper_1xo9q_37",p={modalWrapper:n},m=({children:a,isOpen:s,close:c})=>{const r=o.useRef();o.useEffect(()=>{s?r.current.showModal():r.current.close()},[s]);const l=({target:t,currentTarget:d})=>{t===d&&c()};return e.jsx(e.Fragment,{children:e.jsx("dialog",{ref:r,onClick:l,children:e.jsx("div",{className:p.modalWrapper,children:a})})})};export{m as M};