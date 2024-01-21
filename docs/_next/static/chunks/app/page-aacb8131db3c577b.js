(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5498:function(e,t,s){Promise.resolve().then(s.bind(s,80))},80:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return m}});var n=s(9268),i=s(4835),o=s.n(i);s(3241);var c=s(6006),r=[{id:0,name:"aces",scoring:"1 for each Ace",section:1},{id:1,name:"dueces",scoring:"2 for each Deuce",section:1},{id:2,name:"treys",scoring:"3 for each trey",section:1},{id:3,name:"fours",scoring:"4 for each Four",section:1},{id:4,name:"fives",scoring:"5 for each Five",section:1},{id:5,name:"sixes",scoring:"6 for each Six",section:1},{id:6,name:"2 pair - Same Color",scoring:"Total All Dice",section:1},{id:7,name:"3 of a Kind",scoring:"Total All Dice",section:2},{id:8,name:"Straight 12345 or 23456",scoring:"30",section:2},{id:9,name:"Flush: All Same Color",scoring:"35",section:2},{id:10,name:"Full House",scoring:"Total All Dice Plus 15",section:2},{id:11,name:"Full House : Same Color",scoring:"Total All Dice Plus 20",section:2},{id:12,name:"4 of a Kind",scoring:"Total All Dice Plus 25",section:2},{id:13,name:"Yarborough",scoring:"Total All Dice",section:2},{id:14,name:"Kismet: 5 of a Kind",scoring:"Total All Dice Plus 50",section:2}],a=function(e){let t=[[63,70,35],[71,77,55],[78,9999,75]].find(t=>{if(e>=t[0]&&e<=t[1])return!0});return t?t[2]:0};function l(){let e=o().times(6,o().identity),t=e.map(function(e){return{id:e,isDone:!1,isStarted:0===e,slots:r.map(e=>({id:e.id,score:void 0}))}}),[s,n]=(0,c.useState)(t),i=o().groupBy(r,"section"),l=i[1],d=i[2];function u(e){let t=s.map(t=>t.id===e.id?e:t);n(t)}function m(e){let t=s[e],n=function(e){let t=e.slots.map(e=>e.score);return o().every(t,o().isNumber)}(t);if(n&&!t.isDone){let i=o().cloneDeep(t);if(i.isDone=n,u(i),t.id<5){let t=o().cloneDeep(s[e+1]);t.isStarted=!0,u(t)}}}function h(e){let t=l.map(t=>e.slots[t.id].score);return o().sum(o().compact(t))}function f(e){let t=h(e);return a(t)}return{games:s,getBasicBaseScore:h,updateGame:u,checkDone:m,getBasicBonusScore:f,getBasicTotalScore:function(e){return h(e)+f(e)},getKismetTotalScore:function(e){let t=d.map(t=>e.slots[t.id].score);return o().sum(o().compact(t))},kismetSectionItems:d,basicSectionItems:l,scoreChangeHander:function(e,t,s){let n=o().cloneDeep(e);n.slots[t].score=s,u(n),m(n.id)}}}var d=function(e,t){let s="".concat(e.gameId,"-").concat(e.scoreOptionId),o=(0,i.isUndefined)(e.score)?"":e.score;return e.isDone||!e.isStarted?(0,n.jsx)("td",{"data-id":s,"data-game":e.gameId,"data-scoreop":e.scoreOptionId,children:o},s):(0,n.jsx)("td",{className:"input-cell","data-id":s,children:(0,n.jsx)("input",{"data-game":e.gameId,"data-scoreop":e.scoreOptionId,type:"text",value:o,onChange:function(s){let n=Number(s.target.value);Number.isNaN(n)&&(n=void 0),t(e.scoreOptionId,n)}})},s)},u=["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"];function m(){let e=new l,t=r.map(t=>e.games.map(s=>d({gameId:s.id,scoreOptionId:t.id,score:s.slots[t.id].score,isDone:s.isDone,isStarted:s.isStarted},function(t,n){e.scoreChangeHander(s,t,n)}))),s=e=>(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:e.id+1}),(0,n.jsxs)("td",{children:[(0,n.jsx)("strong",{children:e.name})," - ",(0,n.jsx)("wbo",{})," ",(0,n.jsx)("small",{children:e.scoring})]}),t[e.id]]},e.id),i=e.basicSectionItems.map(s),o=e.kismetSectionItems.map(s);function c(e,t){return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{colSpan:"2",className:"results-section-label",children:e}),t]})}function a(e,t){return(0,n.jsx)("td",{children:t},e)}let m=e.games.map(t=>a(t.id,e.getBasicBaseScore(t))),h=c("Total",m),f=e.games.map(t=>a(t.id,e.getBasicTotalScore(t))),p=c("Basic Section Total",f),g=e.games.map(t=>a(t.id,e.getBasicBonusScore(t))),x=c("Bonus",g),j=e.games.map(t=>a(t.id,e.getKismetTotalScore(t))),S=c("Kismet Section Total",j),_=e.games.map(t=>{let s=e.getBasicTotalScore(t)+e.getKismetTotalScore(t);return a(t.id,s)}),v=c("Game Total",_),y=e.games.map(e=>{let t=!e.isDone&&e.isStarted?"active-game":"inactive-game";return(0,n.jsx)("col",{className:t},e.id)}),D=e.games.map(e=>(0,n.jsxs)("th",{children:[u[e.id]," Game"]},e.id));return(0,n.jsx)("main",{children:(0,n.jsx)("div",{id:"trad-scorecard",children:(0,n.jsxs)("table",{children:[(0,n.jsxs)("colgroup",{className:"sidelabels",children:[(0,n.jsx)("col",{}),(0,n.jsx)("col",{})]}),(0,n.jsx)("colgroup",{className:"scorecols",children:y}),(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsxs)("th",{colSpan:"2",children:[(0,n.jsx)("span",{className:"strong",children:"Basic Section"}),"  ",(0,n.jsx)("small",{children:"What to Score"})]}),D]})}),(0,n.jsx)("tbody",{children:i}),(0,n.jsxs)("tbody",{className:"section-results",children:[h,x,p]}),(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsxs)("th",{colSpan:"2",children:[(0,n.jsx)("span",{className:"strong",children:"Kismet Section"})," ",(0,n.jsx)("small",{children:"What to Score"})]}),(0,n.jsx)("th",{colSpan:"6"})]})}),(0,n.jsx)("tbody",{children:o}),(0,n.jsxs)("tfoot",{className:"section-results",children:[S,p,v]})]})})})}},3241:function(){},3177:function(e,t,s){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=s(6006),i=Symbol.for("react.element"),o=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,r={key:!0,ref:!0,__self:!0,__source:!0};function a(e,t,s){var n,a={},l=null,d=null;for(n in void 0!==s&&(l=""+s),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(d=t.ref),t)o.call(t,n)&&!r.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:i,type:e,key:l,ref:d,props:a,_owner:c.current}}t.jsx=a,t.jsxs=a},9268:function(e,t,s){"use strict";e.exports=s(3177)}},function(e){e.O(0,[350,667,139,744],function(){return e(e.s=5498)}),_N_E=e.O()}]);