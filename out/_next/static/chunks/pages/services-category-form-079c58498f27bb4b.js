(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2812],{9043:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/services-category-form",function(){return r(5547)}])},5204:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var a=r(4848);r(6540);var o=r(8331);let i=e=>{let{title:t,children:r,maxWidth:i=1200,fullWidth:s=!1}=e;return(0,a.jsx)(o.A,{title:t,bordered:!1,style:{width:"100%",maxWidth:s?"100%":i,margin:"0 auto",transition:"max-width 0.2s ease-in-out"},children:r})}},5547:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>w});var a=r(4848),o=r(6540),i=r(1565),s=r(6740),n=r(1531),c=r(878),d=r(9901),l=r(3608),y=r(1027),u=r(6715),g=r(3093);r(4338);var m=r(1303),p=r(1609),h=r(5204),f=r(5349),x=r(8899),A=r(4071);let{Title:j}=i.A,w=()=>{let e=(0,u.useRouter)(),[t,r]=(0,o.useState)([]),[i,w]=(0,o.useState)(!1),[N,C]=(0,o.useState)(!1),[b,k]=(0,o.useState)(null),[v]=s.A.useForm(),E=async()=>{try{let e=await fetch("".concat("http://192.168.0.104:5216/api","/categories"));if(!e.ok)throw Error("Failed to fetch categories");let t=await e.json();r(t)}catch(e){g.oR.error("Failed to fetch categories")}};(0,o.useEffect)(()=>{E()},[]);let F=()=>{w(!1)},U=async()=>{try{let e=await v.validateFields(),a={categoryid:(0,m.A)(),categoryName:e.name,description:e.description},o=await fetch("".concat("http://192.168.0.104:5216/api","/categories"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!o.ok){let e=await o.json();throw Error(e.message||"Failed to add category")}let i=await o.json();r([...t,i]),F(),g.oR.success("Category added successfully!")}catch(e){g.oR.error(e.message||"Failed to add category")}},R=async(e,a)=>{try{if(!(await fetch("".concat("http://192.168.0.104:5216/api","/categories/").concat(e),{method:"DELETE"})).ok)throw Error("Failed to delete category");r(t.filter(t=>t.categoryid!==e)),g.oR.success('Category "'.concat(a,'" deleted successfully!'))}catch(e){g.oR.error(e.message||"Failed to delete category")}},S=e=>{k(e),C(!0),v.setFieldsValue({name:e.categoryName,description:e.description})},I=()=>{C(!1),k(null)},_=async()=>{try{let e=await v.validateFields(),a={...b,categoryName:e.name,description:e.description};if(!(await fetch("".concat("http://192.168.0.104:5216/api","/categories/").concat(b.categoryid),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).ok)throw Error("Failed to update category");r(t.map(e=>e.categoryid===a.categoryid?a:e)),I(),g.oR.success("Category updated successfully!")}catch(e){g.oR.error("Failed to update category")}},D=[{title:"Category Name",dataIndex:"categoryName",key:"categoryName"},{title:"Description",dataIndex:"description",key:"description"},{title:"Actions",key:"actions",render:(t,r)=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.Ay,{type:"link",onClick:()=>S(r),icon:(0,a.jsx)(f.A,{})}),(0,a.jsx)(c.A,{title:'Warning! Deleting this category will also remove the associated services. Are you sure you want to delete "'.concat(r.categoryName,'"?'),onConfirm:()=>R(r.categoryid,r.categoryName),okText:"Yes",cancelText:"No",children:(0,a.jsx)(n.Ay,{type:"link",danger:!0,icon:(0,a.jsx)(x.A,{})})}),(0,a.jsx)(n.Ay,{type:"link",onClick:()=>e.push({pathname:"/services-category-form/detail/".concat(r.categoryid),query:{categoryName:r.categoryName}}),icon:(0,a.jsx)(A.A,{})})]})}];return(0,a.jsxs)(p.A,{children:[(0,a.jsx)(h.A,{title:"Services Form",children:(0,a.jsxs)("div",{className:"p-6",children:[(0,a.jsx)(j,{level:4,children:"Manage Service Categories"}),(0,a.jsx)(n.Ay,{type:"primary",onClick:()=>{w(!0),v.resetFields()},style:{marginBottom:16},children:"Add Category"}),(0,a.jsx)(d.A,{dataSource:t,columns:D,rowKey:"categoryid",bordered:!0,pagination:{pageSize:5}}),(0,a.jsx)(l.A,{title:"Add Category",visible:i,onCancel:F,onOk:U,children:(0,a.jsxs)(s.A,{form:v,layout:"vertical",children:[(0,a.jsx)(s.A.Item,{name:"name",label:"Category Name",rules:[{required:!0,message:"Please enter category name"}],children:(0,a.jsx)(y.A,{})}),(0,a.jsx)(s.A.Item,{name:"description",label:"Description",children:(0,a.jsx)(y.A.TextArea,{rows:4})})]})}),(0,a.jsx)(l.A,{title:"Edit Category",visible:N,onCancel:I,onOk:_,children:(0,a.jsxs)(s.A,{form:v,layout:"vertical",children:[(0,a.jsx)(s.A.Item,{name:"name",label:"Category Name",rules:[{required:!0,message:"Please enter category name"}],children:(0,a.jsx)(y.A,{})}),(0,a.jsx)(s.A.Item,{name:"description",label:"Description",children:(0,a.jsx)(y.A.TextArea,{rows:4})})]})})]})}),(0,a.jsx)(g.N9,{})]})}},6715:(e,t,r)=>{e.exports=r(8440)},1303:(e,t,r)=>{"use strict";let a;r.d(t,{A:()=>n});let o={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},i=new Uint8Array(16),s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));let n=function(e,t,r){if(o.randomUUID&&!t&&!e)return o.randomUUID();let n=(e=e||{}).random??e.rng?.()??function(){if(!a){if("undefined"==typeof crypto||!crypto.getRandomValues)throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");a=crypto.getRandomValues.bind(crypto)}return a(i)}();if(n.length<16)throw Error("Random bytes length must be >= 16");if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){if((r=r||0)<0||r+16>t.length)throw RangeError(`UUID byte range ${r}:${r+15} is out of buffer bounds`);for(let e=0;e<16;++e)t[r+e]=n[e];return t}return function(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}(n)}}},e=>{var t=t=>e(e.s=t);e.O(0,[994,1531,8331,3418,2453,5262,7239,2084,1106,8728,3067,6740,3093,1565,7078,9901,3608,3009,1609,636,6593,8792],()=>t(9043)),_N_E=e.O()}]);