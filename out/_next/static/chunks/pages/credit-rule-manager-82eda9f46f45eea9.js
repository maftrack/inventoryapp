(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6176],{2949:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/credit-rule-manager",function(){return r(4125)}])},5204:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});var i=r(4848);r(6540);var a=r(8331);let n=e=>{let{title:t,children:r,maxWidth:n=1200,fullWidth:d=!1}=e;return(0,i.jsx)(a.A,{title:t,bordered:!1,style:{width:"100%",maxWidth:d?"100%":n,margin:"0 auto",transition:"max-width 0.2s ease-in-out"},children:r})}},4125:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>w});var i=r(4848),a=r(6540),n=r(1565),d=r(6740),s=r(1531),o=r(878),l=r(9901),c=r(3608),u=r(1027),m=r(6715),p=r(3093);r(4338);var h=r(1303),y=r(1609),f=r(5204),x=r(5349),A=r(8899);let{Title:j}=n.A,w=()=>{(0,m.useRouter)();let[e,t]=(0,a.useState)([]),[r,n]=(0,a.useState)(!1),[w,g]=(0,a.useState)(!1),[R,C]=(0,a.useState)(null),[b]=d.A.useForm(),k=async()=>{try{let e=await fetch("".concat("http://192.168.0.104:5216/api","/creditrules"));if(!e.ok)throw Error("Failed to fetch credit rules");let r=await e.json();t(r)}catch(e){p.oR.error("Failed to fetch credit rules")}};(0,a.useEffect)(()=>{k()},[]);let E=()=>{n(!1)},v=async()=>{try{let r=await b.validateFields(),i={id:(0,h.A)(),creditrulename:r.name,description:r.description},a=await fetch("".concat("http://192.168.0.104:5216/api","/creditrules"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!a.ok){let e=await a.json();throw Error(e.message||"Failed to add credit rule")}let n=await a.json();t([...e,n]),E(),p.oR.success("Credit Rule added successfully!")}catch(e){p.oR.error(e.message||"Failed to add credit rule")}},F=async(r,i)=>{try{if(!(await fetch("".concat("http://192.168.0.104:5216/api","/creditrules/").concat(r),{method:"DELETE"})).ok)throw Error("Failed to delete credit rule");t(e.filter(e=>e.id!==r)),p.oR.success('Credit Rule "'.concat(i,'" deleted successfully!'))}catch(e){p.oR.error(e.message||"Failed to delete credit rule")}},U=e=>{C(e),g(!0),b.setFieldsValue({name:e.creditrulename,description:e.description})},N=()=>{g(!1),C(null)},I=async()=>{try{let r=await b.validateFields(),i={...R,creditrulename:r.name,description:r.description};if(!(await fetch("".concat("http://192.168.0.104:5216/api","/creditrules/").concat(R.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})).ok)throw Error("Failed to update credit rule");t(e.map(e=>e.id===i.id?i:e)),N(),p.oR.success("Credit Rule updated successfully!")}catch(e){p.oR.error("Failed to update credit rule")}},_=[{title:"Credit Rule Name",dataIndex:"creditrulename",key:"creditrulename"},{title:"Description",dataIndex:"description",key:"description"},{title:"Actions",key:"actions",render:(e,t)=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.Ay,{type:"link",onClick:()=>U(t),icon:(0,i.jsx)(x.A,{})}),(0,i.jsx)(o.A,{title:'Are you sure to delete "'.concat(t.creditrulename,'"?'),onConfirm:()=>F(t.id,t.creditrulename),okText:"Yes",cancelText:"No",children:(0,i.jsx)(s.Ay,{type:"link",danger:!0,icon:(0,i.jsx)(A.A,{})})})]})}];return(0,i.jsxs)(y.A,{children:[(0,i.jsx)(f.A,{title:"Credit Rule Management",children:(0,i.jsxs)("div",{className:"p-6",children:[(0,i.jsx)(j,{level:4,children:"Manage Credit Rules"}),(0,i.jsx)(s.Ay,{type:"primary",onClick:()=>{n(!0),b.resetFields()},style:{marginBottom:16},children:"Add Credit Rule"}),(0,i.jsx)(l.A,{dataSource:e,columns:_,rowKey:"id",bordered:!0,pagination:{pageSize:5}}),(0,i.jsx)(c.A,{title:"Add Credit Rule",visible:r,onCancel:E,onOk:v,children:(0,i.jsxs)(d.A,{form:b,layout:"vertical",children:[(0,i.jsx)(d.A.Item,{name:"name",label:"Credit Rule Name",rules:[{required:!0,message:"Please enter credit rule name"}],children:(0,i.jsx)(u.A,{})}),(0,i.jsx)(d.A.Item,{name:"description",label:"Description",children:(0,i.jsx)(u.A.TextArea,{rows:4})})]})}),(0,i.jsx)(c.A,{title:"Edit Credit Rule",visible:w,onCancel:N,onOk:I,children:(0,i.jsxs)(d.A,{form:b,layout:"vertical",children:[(0,i.jsx)(d.A.Item,{name:"name",label:"Credit Rule Name",rules:[{required:!0,message:"Please enter credit rule name"}],children:(0,i.jsx)(u.A,{})}),(0,i.jsx)(d.A.Item,{name:"description",label:"Description",children:(0,i.jsx)(u.A.TextArea,{rows:4})})]})})]})}),(0,i.jsx)(p.N9,{})]})}},6715:(e,t,r)=>{e.exports=r(8440)},1303:(e,t,r)=>{"use strict";let i;r.d(t,{A:()=>s});let a={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},n=new Uint8Array(16),d=[];for(let e=0;e<256;++e)d.push((e+256).toString(16).slice(1));let s=function(e,t,r){if(a.randomUUID&&!t&&!e)return a.randomUUID();let s=(e=e||{}).random??e.rng?.()??function(){if(!i){if("undefined"==typeof crypto||!crypto.getRandomValues)throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");i=crypto.getRandomValues.bind(crypto)}return i(n)}();if(s.length<16)throw Error("Random bytes length must be >= 16");if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t){if((r=r||0)<0||r+16>t.length)throw RangeError(`UUID byte range ${r}:${r+15} is out of buffer bounds`);for(let e=0;e<16;++e)t[r+e]=s[e];return t}return function(e,t=0){return(d[e[t+0]]+d[e[t+1]]+d[e[t+2]]+d[e[t+3]]+"-"+d[e[t+4]]+d[e[t+5]]+"-"+d[e[t+6]]+d[e[t+7]]+"-"+d[e[t+8]]+d[e[t+9]]+"-"+d[e[t+10]]+d[e[t+11]]+d[e[t+12]]+d[e[t+13]]+d[e[t+14]]+d[e[t+15]]).toLowerCase()}(s)}}},e=>{var t=t=>e(e.s=t);e.O(0,[994,1531,8331,3418,2453,5262,7239,2084,1106,8728,3067,6740,3093,1565,7078,9901,3608,3009,1609,636,6593,8792],()=>t(2949)),_N_E=e.O()}]);