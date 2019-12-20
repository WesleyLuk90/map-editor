(this["webpackJsonpmap-editor"]=this["webpackJsonpmap-editor"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(6),l=n.n(i),o=(n(12),n(1)),u=n(2),c=(n(13),n(3)),s=n.n(c),f=n(4);function v(e,t){var n=null==t?0:e;return new Array((null==t?e:t)-n).fill(0).map((function(e,t){return t+n}))}var y=8,x=Math.ceil(2e3/y);function h(e){var t=e.view;if(t.scale<y)return null;var n=t.pixelToDisplay(t.nearestImagePixel(new E(0,0)));return r.a.createElement("g",null,v(x).map((function(e,a){return r.a.createElement("line",{key:a,x1:n.x+a*t.scale,y1:0,x2:n.x+a*t.scale,y2:2e3,stroke:"rgb(200,200,200)"})})),v(x).map((function(e,a){return r.a.createElement("line",{key:a,x1:0,y1:n.y+a*t.scale,x2:2e3,y2:n.y+a*t.scale,stroke:"rgb(200,200,200)"})})))}function m(e){var t=e.view,n=e.url;return r.a.createElement("g",{transform:"translate(".concat(t.point.x," ").concat(t.point.y,")")},r.a.createElement("image",{href:n,transform:"scale(".concat(t.scale,")")}))}var d=100;function p(e){var t=e.point1,n=e.point2,a=e.view,i=e.cellCount,l=e.startExtra,o=e.endExtra,u=t.sub(n).abs().divide(i).scale(a.scale),c=a.pixelToDisplay(new E(Math.min(t.x,n.x),Math.min(t.y,n.y))),s=c.divide(u).floor(),f=c.sub(s.multiply(u));function y(e){return e===s.x+l.x||e===s.x+o.x+i.x}function x(e){return e===s.y+l.y||e===s.y+o.y+i.y}return r.a.createElement("g",null,v(d).map((function(e){return r.a.createElement("line",{x1:f.x+e*u.x,x2:f.x+e*u.x,y1:0,y2:2e3,stroke:y(e)?"blue":"black"})})),v(d).map((function(e){return r.a.createElement("line",{x1:0,x2:2e3,y1:f.y+e*u.y,y2:f.y+e*u.y,stroke:x(e)?"blue":"black"})})))}function b(e){var t=e.position,n=e.view,a=e.onMouseDown,i=n.pixelToDisplay(t).add(new E(n.scale/2,n.scale/2));return r.a.createElement("g",{transform:"translate(".concat(i.x," ").concat(i.y,")"),onMouseDown:function(e){e.stopPropagation(),e.preventDefault(),a()},cursor:"move"},r.a.createElement("rect",{width:n.scale,height:n.scale,x:-n.scale/2,y:-n.scale/2,stroke:"rgb(0, 128, 256)",fill:"none"}),r.a.createElement("circle",{r:"30",stroke:"rgb(0, 128, 256)",fill:"transparent"}),r.a.createElement("line",{x1:"-50",y1:"0",x2:"50",y2:"0",stroke:"rgb(0, 128, 256)",fill:"none"}),r.a.createElement("line",{x1:"0",y1:"-50",x2:"0",y2:"50",stroke:"rgb(0, 128, 256)",fill:"none"}))}var E=function(){function e(t,n){Object(u.a)(this,e),this.x=t,this.y=n}return Object(f.a)(e,[{key:"add",value:function(t){return new e(this.x+t.x,this.y+t.y)}},{key:"sub",value:function(t){return new e(this.x-t.x,this.y-t.y)}},{key:"scale",value:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(t){return new e(this.x*t,this.y*t)}))},{key:"mod",value:function(t){return new e(this.x%t,this.y%t)}},{key:"abs",value:function(){return new e(Math.abs(this.x),Math.abs(this.y))}},{key:"multiply",value:function(t){return new e(this.x*t.x,this.y*t.y)}},{key:"divide",value:function(t){return new e(this.x/t.x,this.y/t.y)}},{key:"toString",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2;return"(".concat(this.x.toFixed(e),", ").concat(this.y.toFixed(e),")")}},{key:"floor",value:function(){return new e(Math.floor(this.x),Math.floor(this.y))}},{key:"round",value:function(){return new e(Math.round(this.x),Math.round(this.y))}}]),e}(),w=function(){function e(t,n){Object(u.a)(this,e),this.point=t,this.scale=n}return Object(f.a)(e,[{key:"move",value:function(t){return new e(this.point.add(t),this.scale)}},{key:"updateScale",value:function(t,n){var a=this.scale*(1-t/10);return new e(this.point.sub(n).scale(1/this.scale).scale(a).add(n),a)}},{key:"nearestImagePixel",value:function(e){var t=e.sub(this.point).scale(1/this.scale);return new E(Math.round(t.x),Math.round(t.y))}},{key:"containedImagePixel",value:function(e){var t=e.sub(this.point).scale(1/this.scale);return new E(Math.floor(t.x),Math.floor(t.y))}},{key:"pixelToDisplay",value:function(e){return this.point.add(e.scale(this.scale))}}]),e}();function g(e){var t=e.file,n=e.point1,i=e.setPoint1,l=e.point2,u=e.setPoint2,c=e.cellCount,s=e.startExtra,f=e.endExtra,v=Object(a.useState)(null),y=Object(o.a)(v,2),x=y[0],d=y[1],g=Object(a.useState)(!1),k=Object(o.a)(g,2),O=k[0],j=k[1],M=Object(a.useState)(!1),S=Object(o.a)(M,2),C=S[0],P=S[1],D=Object(a.useState)(null),R=Object(o.a)(D,2),I=R[0],T=R[1];Object(a.useEffect)((function(){if(null!=t){var e=URL.createObjectURL(t);return d(e),function(){URL.revokeObjectURL(e)}}d(null)}),[t]);var L=r.a.createRef(),N=Object(a.useState)(new w(new E(0,0),1)),Y=Object(o.a)(N,2),B=Y[0],U=Y[1];function X(e){if(null==L.current)return null;var t=L.current.getBoundingClientRect();return new E(e.clientX-t.left,e.clientY-t.top)}function W(){j(!1),P(!1),T(null)}return r.a.createElement("div",{className:"editor"},r.a.createElement("svg",{className:"svg",onWheel:function(e){var t=X(e);null!=t&&U(B.updateScale(e.deltaY/100,t))},ref:L,onMouseDown:function(e){T(new E(e.clientX,e.clientY))},onMouseMove:function(e){if(O){var t=X(e);if(null==t)return;i(B.containedImagePixel(t))}if(C){var n=X(e);if(null==n)return;u(B.containedImagePixel(n))}if(I){var a=new E(e.clientX,e.clientY),r=new E(e.clientX,e.clientY).sub(I);U(B.move(r)),T(a)}},onMouseUp:W,onMouseLeave:W,cursor:O||C?"move":void 0},x&&r.a.createElement(m,{url:x,view:B}),r.a.createElement(h,{view:B}),r.a.createElement(b,{position:n,view:B,onMouseDown:function(){return j(!0)}}),r.a.createElement(b,{position:l,view:B,onMouseDown:function(){return P(!0)}}),r.a.createElement(p,{point1:n,point2:l,view:B,cellCount:c,startExtra:s,endExtra:f})))}function k(e){var t=e.value,n=e.onChange;return r.a.createElement("input",{type:"number",value:t,onChange:function(e){var t=parseInt(e.target.value);isNaN(t)||n(t)}})}function O(e){var t=e.onSelect,n=e.point1,a=e.point2,i=e.cellCount,l=e.setCellCount,o=e.file,u=e.startExtra,c=e.endExtra,f=e.setStartExtra,y=e.setEndExtra,x=r.a.createRef();var h=r.a.createRef();function m(){var e=n.sub(a).abs();return new E(Math.round(e.x/i.x),Math.round(e.y/i.y))}return r.a.createElement("div",{className:"controls"},r.a.createElement("input",{type:"file",ref:x,onChange:function(){if(null!=x.current){var e=x.current.files&&x.current.files[0];e&&t(e)}}}),r.a.createElement("div",null,r.a.createElement("p",null,"Point 1: ",n.toString(0)),r.a.createElement("p",null,"Point 2: ",a.toString(0)),"X:"," ",r.a.createElement(k,{value:i.x,onChange:function(e){return l(new E(e,i.y))}}),"Y:"," ",r.a.createElement(k,{value:i.y,onChange:function(e){return l(new E(i.x,e))}}),r.a.createElement("p",null,"Output: ",m().toString(0))),r.a.createElement("div",null,r.a.createElement("div",null,"Top:",r.a.createElement(k,{value:u.y,onChange:function(e){return f(new E(u.x,e))}})),r.a.createElement("div",null,"Left:",r.a.createElement(k,{value:u.x,onChange:function(e){return f(new E(e,u.y))}})),r.a.createElement("div",null,"Bottom:",r.a.createElement(k,{value:c.y,onChange:function(e){return y(new E(c.x,e))}})),r.a.createElement("div",null,"Right:",r.a.createElement(k,{value:c.x,onChange:function(e){return y(new E(e,c.y))}}))),r.a.createElement("button",{onClick:function(){var e,t,r,l,f,y,x,d,p;return s.a.async((function(b){for(;;)switch(b.prev=b.next){case 0:if(o&&h.current){b.next=2;break}return b.abrupt("return");case 2:if(e=n.sub(a).abs(),t=m(),r=e.divide(i),l=n.add(u.multiply(r)),f=e.sub(u.multiply(r)).add(c.multiply(r)),y=i.sub(u).add(c),x=y.multiply(t),h.current.width=x.x,h.current.height=x.y,null!=(d=h.current.getContext("2d"))){b.next=14;break}return b.abrupt("return");case 14:return b.next=16,s.a.awrap(createImageBitmap(o));case 16:p=b.sent,d.drawImage(p,l.x,l.y,f.x,f.y,0,0,x.x,x.y),v(2*y.x).forEach((function(e){d.beginPath(),d.moveTo(e*t.x/2,0),d.lineTo(e*t.x/2,x.y),d.stroke()})),v(2*y.y).forEach((function(e){d.beginPath(),d.moveTo(0,e*t.y/2),d.lineTo(x.x,e*t.y/2),d.stroke()}));case 20:case"end":return b.stop()}}))}},"Render"),r.a.createElement("div",{style:{width:"100%",height:"500px",overflow:"auto"}},r.a.createElement("canvas",{ref:h,width:"1000",height:"1000"})))}var j=function(){var e=Object(a.useState)(null),t=Object(o.a)(e,2),n=t[0],i=t[1],l=Object(a.useState)(new E(100,100)),u=Object(o.a)(l,2),c=u[0],s=u[1],f=Object(a.useState)(new E(500,500)),v=Object(o.a)(f,2),y=v[0],x=v[1],h=Object(a.useState)(new E(20,20)),m=Object(o.a)(h,2),d=m[0],p=m[1],b=Object(a.useState)(new E(0,0)),w=Object(o.a)(b,2),k=w[0],j=w[1],M=Object(a.useState)(new E(0,0)),S=Object(o.a)(M,2),C=S[0],P=S[1];function D(e,t){var n=e.sub(t).abs();p(new E(Math.round(n.x/22),Math.round(n.y/22)))}return r.a.createElement("div",{className:"App"},r.a.createElement(g,{file:n,point1:c,point2:y,setPoint1:function(e){s(e),D(e,y)},setPoint2:function(e){x(e),D(c,e)},cellCount:d,startExtra:k,endExtra:C}),r.a.createElement(O,{onSelect:i,point1:c,point2:y,file:n,cellCount:d,setCellCount:p,startExtra:k,endExtra:C,setStartExtra:j,setEndExtra:P}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t,n){e.exports=n(15)}},[[7,1,2]]]);
//# sourceMappingURL=main.ad32b0bb.chunk.js.map