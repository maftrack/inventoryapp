(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2590],{1113:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/service-history",function(){return a(8171)}])},5204:(e,t,a)=>{"use strict";a.d(t,{A:()=>i});var n=a(4848);a(6540);var r=a(8331);let i=e=>{let{title:t,children:a,maxWidth:i=1200,fullWidth:l=!1}=e;return(0,n.jsx)(r.A,{title:t,bordered:!1,style:{width:"100%",maxWidth:l?"100%":i,margin:"0 auto",transition:"max-width 0.2s ease-in-out"},children:a})}},1017:(e,t,a)=>{"use strict";a.d(t,{F:()=>l});var n=a(4542),r=function(e){if((0,n.A)()&&window.document.documentElement){var t=Array.isArray(e)?e:[e],a=window.document.documentElement;return t.some(function(e){return e in a.style})}return!1},i=function(e,t){if(!r(e))return!1;var a=document.createElement("div"),n=a.style[e];return a.style[e]=t,a.style[e]!==n};function l(e,t){return Array.isArray(e)||void 0===t?r(e):i(e,t)}},8171:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>j});var n=a(4848),r=a(6540),i=a(1027),l=a(8728),d=a(2546),s=a(7004),c=a(1531),o=a(9901),u=a(3608),h=a(6740),m=a(6533),v=a(1609),b=a(5204);let{Search:x}=i.A,{Option:A}=l.A,{TabPane:g}=d.A,j=()=>{let[e,t]=(0,r.useState)([]),[a,j]=(0,r.useState)(!0),[C,y]=(0,r.useState)({current:1,pageSize:10}),[p,k]=(0,r.useState)(""),[N,S]=(0,r.useState)(!1),[f,w]=(0,r.useState)({transactionid:{value:"",enabled:!1},serviceName:{value:"",enabled:!1},editor:{value:"",enabled:!1},status:{value:"",enabled:!1},amount:{value:"",enabled:!1}}),[E,I]=(0,r.useState)({dateCreated:!0,transactionid:!0,serviceName:!0,amount:!0,editor:!0,status:!0,action:!0});(0,r.useEffect)(()=>{_()},[C.current,C.pageSize,p,f]),(0,r.useEffect)(()=>{let e=JSON.parse(localStorage.getItem("visibleColumns"));e&&I(e)},[]);let _=async()=>{j(!0);try{let e=await fetch("".concat("http://192.168.0.104:5216/api","/purchaseServiceHistory?page=").concat(C.current,"&pageSize=").concat(C.pageSize,"&search=").concat(p,"&transactionid=").concat(f.transactionid.enabled?f.transactionid.value:"","&serviceName=").concat(f.serviceName.enabled?f.serviceName.value:"","&editor=").concat(f.editor.enabled?f.editor.value:"","&status=").concat(f.status.enabled?f.status.value:"","&amount=").concat(f.amount.enabled?f.amount.value:""));if(!e.ok)throw Error("Network response was not ok");let a=await e.json();t(a.items),y({...C,total:a.total})}catch(e){console.error("Error fetching data:",e)}finally{j(!1)}},z=(e,t)=>{let a={...E,[e]:t};I(a),localStorage.setItem("visibleColumns",JSON.stringify(a))},D=[{title:"Time",dataIndex:"dateCreated",key:"dateCreated",render:e=>new Date(e).toLocaleString(),sorter:(e,t)=>new Date(e.dateCreated)-new Date(t.dateCreated)},{title:"Transaction ID",dataIndex:"transactionid",key:"transactionid",sorter:(e,t)=>e.transactionid.localeCompare(t.transactionid)},{title:"Service Name",dataIndex:"serviceName",key:"serviceName",sorter:(e,t)=>e.serviceName.localeCompare(t.serviceName)},{title:"Amount (Credit)",dataIndex:"amount",key:"amount",render:e=>"".concat(e," Credit"),sorter:(e,t)=>e.amount-t.amount},{title:"Editor",dataIndex:"editor",key:"editor",sorter:(e,t)=>e.editor.localeCompare(t.editor)},{title:"Status",dataIndex:"status",key:"status",sorter:(e,t)=>e.status.localeCompare(t.status)},{title:"Activity",dataIndex:"action",key:"action"}].filter(e=>E[e.key]);return(0,n.jsx)(v.A,{children:(0,n.jsx)(b.A,{title:"Service History",children:(0,n.jsxs)("div",{children:[(0,n.jsxs)(s.A,{style:{marginBottom:16},children:[(0,n.jsx)(x,{placeholder:"Search...",onSearch:e=>{k(e),y({...C,current:1})},style:{width:200}}),(0,n.jsx)(c.Ay,{type:"primary",onClick:()=>{S(!0)},children:"Advanced Filter"})]}),(0,n.jsx)(o.A,{columns:D,dataSource:e,pagination:C,loading:a,onChange:(e,t,a)=>{y(e)},rowKey:"id"}),(0,n.jsx)(u.A,{title:"Advanced Filter",visible:N,onOk:()=>{S(!1),_()},onCancel:()=>{S(!1)},width:800,children:(0,n.jsxs)(d.A,{defaultActiveKey:"1",children:[(0,n.jsx)(g,{tab:"Filters",children:(0,n.jsxs)(h.A,{layout:"vertical",onValuesChange:e=>{w(t=>({...t,...e}))},children:[(0,n.jsx)(h.A.Item,{label:"Transaction ID",children:(0,n.jsxs)(s.A,{children:[(0,n.jsx)(i.A,{placeholder:"Enter Transaction ID",onChange:e=>w({...f,transactionid:{...f.transactionid,value:e.target.value,enabled:f.transactionid.enabled}}),disabled:!f.transactionid.enabled}),(0,n.jsx)(m.A,{checked:f.transactionid.enabled,onChange:e=>w({...f,transactionid:{...f.transactionid,enabled:e.target.checked}}),children:"Enable"})]})}),(0,n.jsx)(h.A.Item,{label:"Service Name",children:(0,n.jsxs)(s.A,{children:[(0,n.jsx)(i.A,{placeholder:"Enter Service Name",onChange:e=>w({...f,serviceName:{...f.serviceName,value:e.target.value,enabled:f.serviceName.enabled}}),disabled:!f.serviceName.enabled}),(0,n.jsx)(m.A,{checked:f.serviceName.enabled,onChange:e=>w({...f,serviceName:{...f.serviceName,enabled:e.target.checked}}),children:"Enable"})]})}),(0,n.jsx)(h.A.Item,{label:"Editor",children:(0,n.jsxs)(s.A,{children:[(0,n.jsx)(i.A,{placeholder:"Enter Editor Name",onChange:e=>w({...f,editor:{...f.editor,value:e.target.value,enabled:f.editor.enabled}}),disabled:!f.editor.enabled}),(0,n.jsx)(m.A,{checked:f.editor.enabled,onChange:e=>w({...f,editor:{...f.editor,enabled:e.target.checked}}),children:"Enable"})]})}),(0,n.jsx)(h.A.Item,{label:"Status",children:(0,n.jsxs)(s.A,{children:[(0,n.jsxs)(l.A,{defaultValue:"",style:{width:120},onChange:e=>w({...f,status:{...f.status,value:e,enabled:f.status.enabled}}),children:[(0,n.jsx)(A,{value:"",children:"Select Status"}),(0,n.jsx)(A,{value:"Pending",children:"Pending"}),(0,n.jsx)(A,{value:"Confirm",children:"Confirm"}),(0,n.jsx)(A,{value:"Canceled",children:"Canceled"})]}),(0,n.jsx)(m.A,{checked:f.status.enabled,onChange:e=>w({...f,status:{...f.status,enabled:e.target.checked}}),children:"Enable"})]})}),(0,n.jsx)(h.A.Item,{label:"Amount (Credit)",children:(0,n.jsxs)(s.A,{children:[(0,n.jsx)(i.A,{placeholder:"Enter Amount",onChange:e=>w({...f,amount:{...f.amount,value:e.target.value,enabled:f.amount.enabled}}),disabled:!f.amount.enabled}),(0,n.jsx)(m.A,{checked:f.amount.enabled,onChange:e=>w({...f,amount:{...f.amount,enabled:e.target.checked}}),children:"Enable"})]})})]})},"1"),(0,n.jsx)(g,{tab:"Columns",children:(0,n.jsx)(s.A,{direction:"vertical",children:Object.keys(E).map(e=>{let t=e.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^[a-z]/,e=>e.toUpperCase());return(0,n.jsx)(m.A,{checked:E[e],onChange:t=>z(e,t.target.checked),children:t},e)})})},"2")]})})]})})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[994,1531,8331,3418,2453,5262,7239,2084,1106,8728,3067,6740,7078,9901,3608,1609,636,6593,8792],()=>t(1113)),_N_E=e.O()}]);