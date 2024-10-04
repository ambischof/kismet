(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5608:function(e,t,s){Promise.resolve().then(s.bind(s,8441))},8441:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return u}});var n=s(9268);s(3241);var i=s(6006),o=s(4835),c=s.n(o),r=function(e,t){let s="".concat(e.gameId,"-").concat(e.scoreOptionId),i=(0,o.isUndefined)(e.score)?"":e.score;return e.isDone||!e.isStarted?(0,n.jsx)("td",{"data-id":s,"data-game":e.gameId,"data-scoreop":e.scoreOptionId,children:i},s):(0,n.jsx)("td",{className:"input-cell","data-id":s,children:(0,n.jsx)("input",{"data-game":e.gameId,"data-scoreop":e.scoreOptionId,type:"text",value:i,onChange:function(s){let n=Number(s.target.value);Number.isNaN(n)&&(n=void 0),t(e.scoreOptionId,n)}})},s)},a=[{id:0,name:"aces",scoring:"1 for each Ace",section:1},{id:1,name:"dueces",scoring:"2 for each Deuce",section:1},{id:2,name:"treys",scoring:"3 for each trey",section:1},{id:3,name:"fours",scoring:"4 for each Four",section:1},{id:4,name:"fives",scoring:"5 for each Five",section:1},{id:5,name:"sixes",scoring:"6 for each Six",section:1},{id:6,name:"2 pair - Same Color",scoring:"Total All Dice",section:1},{id:7,name:"3 of a Kind",scoring:"Total All Dice",section:2},{id:8,name:"Straight 12345 or 23456",scoring:"30",section:2},{id:9,name:"Flush: All Same Color",scoring:"35",section:2},{id:10,name:"Full House",scoring:"Total All Dice Plus 15",section:2},{id:11,name:"Full House : Same Color",scoring:"Total All Dice Plus 20",section:2},{id:12,name:"4 of a Kind",scoring:"Total All Dice Plus 25",section:2},{id:13,name:"Yarborough",scoring:"Total All Dice",section:2},{id:14,name:"Kismet: 5 of a Kind",scoring:"Total All Dice Plus 50",section:2}],l=["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"],d=function(e){let t=[[63,70,35],[71,77,55],[78,9999,75]].find(t=>{if(e>=t[0]&&e<=t[1])return!0});return t?t[2]:0};function u(){let e=function(){let e=c().times(6,c().identity),t=e.map(function(e){return{id:e,isDone:!1,isStarted:0===e,slots:a.map(e=>({id:e.id,score:void 0}))}}),[s,n]=(0,i.useState)(t),o=c().groupBy(a,"section"),r=o[1],l=o[2];function u(e){let t=s.map(t=>t.id===e.id?e:t);n(t)}function m(e){let t=s[e],i=function(e){let t=e.slots.map(e=>e.score);return c().every(t,c().isNumber)}(t);if(i&&!t.isDone){let o=c().cloneDeep(t);o.isDone=i;let r=[o];if(t.id<5){let t=c().cloneDeep(s[e+1]);t.isStarted=!0,r.push(t)}!function(e){let t=[...s];for(let s of e)t[s.id]=s;n(t)}(r)}}function f(e){let t=r.map(t=>e.slots[t.id].score);return c().sum(c().compact(t))}function h(e){let t=f(e);return d(t)}return{games:s,getBasicBaseScore:f,updateGame:u,checkDone:m,getBasicBonusScore:h,getBasicTotalScore:function(e){return f(e)+h(e)},getKismetTotalScore:function(e){let t=l.map(t=>e.slots[t.id].score);return c().sum(c().compact(t))},kismetSectionItems:l,basicSectionItems:r,scoreChangeHander:function(e,t,s){let n=c().cloneDeep(e);n.slots[t].score=s,u(n),m(n.id)}}}(),t=function(e){let{gameManager:t}=e,s=a.map(e=>t.games.map(s=>r({gameId:s.id,scoreOptionId:e.id,score:s.slots[e.id].score,isDone:s.isDone,isStarted:s.isStarted},function(e,n){t.scoreChangeHander(s,e,n)}))),i=e=>(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:e.id+1}),(0,n.jsxs)("td",{children:[(0,n.jsx)("strong",{children:e.name})," - ",(0,n.jsx)("wbr",{})," ",(0,n.jsx)("small",{children:e.scoring})]}),s[e.id]]},e.id),o=t.basicSectionItems.map(i),c=t.kismetSectionItems.map(i);function d(e,t){return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{colSpan:2,className:"results-section-label",children:e}),t]})}function u(e,t){return(0,n.jsx)("td",{children:t},e)}let m=t.games.map(e=>u(e.id,t.getBasicBaseScore(e))),f=d("Total",m),h=t.games.map(e=>u(e.id,t.getBasicTotalScore(e))),p=d("Basic Section Total",h),g=t.games.map(e=>u(e.id,t.getBasicBonusScore(e))),x=d("Bonus",g),j=t.games.map(e=>u(e.id,t.getKismetTotalScore(e))),S=d("Kismet Section Total",j),_=t.games.map(e=>{let s=t.getBasicTotalScore(e)+t.getKismetTotalScore(e);return u(e.id,s)}),y=d("Game Total",_),D=t.games.map(e=>{let t=!e.isDone&&e.isStarted?"active-game":"inactive-game";return(0,n.jsx)("col",{className:t},e.id)}),N=t.games.map(e=>(0,n.jsxs)("th",{children:[l[e.id]," Game"]},e.id));return(0,n.jsx)("div",{id:"trad-scorecard",children:(0,n.jsxs)("table",{children:[(0,n.jsxs)("colgroup",{className:"sidelabels",children:[(0,n.jsx)("col",{}),(0,n.jsx)("col",{})]}),(0,n.jsx)("colgroup",{className:"scorecols",children:D}),(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsxs)("th",{colSpan:2,children:[(0,n.jsx)("span",{className:"strong",children:"Basic Section"}),"  ",(0,n.jsx)("small",{children:"What to Score"})]}),N]})}),(0,n.jsx)("tbody",{children:o}),(0,n.jsxs)("tbody",{className:"section-results",children:[f,x,p]}),(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsxs)("th",{colSpan:2,children:[(0,n.jsx)("span",{className:"strong",children:"Kismet Section"})," ",(0,n.jsx)("small",{children:"What to Score"})]}),(0,n.jsx)("th",{colSpan:6})]})}),(0,n.jsx)("tbody",{children:c}),(0,n.jsxs)("tfoot",{className:"section-results",children:[S,p,y]})]})})}({gameManager:e});return(0,n.jsx)("main",{children:t})}},3241:function(){},3177:function(e,t,s){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=s(6006),i=Symbol.for("react.element"),o=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,r={key:!0,ref:!0,__self:!0,__source:!0};function a(e,t,s){var n,a={},l=null,d=null;for(n in void 0!==s&&(l=""+s),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(d=t.ref),t)o.call(t,n)&&!r.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:i,type:e,key:l,ref:d,props:a,_owner:c.current}}t.jsx=a,t.jsxs=a},9268:function(e,t,s){"use strict";e.exports=s(3177)}},function(e){e.O(0,[350,667,139,744],function(){return e(e.s=5608)}),_N_E=e.O()}]);