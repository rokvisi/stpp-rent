import{s as $,n as u,c as w,u as b,g as I,d as L}from"../chunks/scheduler.e108d1fd.js";import{S as y,i as k,e as p,a as _,f as c,g as N,h as S,k as f,r as q,s as z,x as C,u as E,c as F,v as K,d as h,t as m,w as M}from"../chunks/index.c5e6bafe.js";import{e as d,u as O,d as P}from"../chunks/each.c0e137c1.js";function g(r,t,a){const s=r.slice();s[1]=t[a];const l=s[1].substring(s[1].lastIndexOf(".")+1);return s[2]=l,s}function v(r,t){let a,s,l;return{key:r,first:null,c(){a=N("link"),this.h()},l(n){a=S(n,"LINK",{rel:!0,href:!0,as:!0,type:!0,crossorigin:!0}),this.h()},h(){f(a,"rel","preload"),f(a,"href",s=t[1]),f(a,"as","font"),f(a,"type",l="font/"+t[2]),f(a,"crossorigin","anonymous"),this.first=a},m(n,e){_(n,a,e)},p(n,e){t=n,e&1&&s!==(s=t[1])&&f(a,"href",s),e&1&&l!==(l="font/"+t[2])&&f(a,"type",l)},d(n){n&&c(a)}}}function R(r){let t=[],a=new Map,s,l=d(r[0]);const n=e=>e[1];for(let e=0;e<l.length;e+=1){let o=g(r,l,e),i=n(o);a.set(i,t[e]=v(i,o))}return{c(){for(let e=0;e<t.length;e+=1)t[e].c();s=p()},l(e){for(let o=0;o<t.length;o+=1)t[o].l(e);s=p()},m(e,o){for(let i=0;i<t.length;i+=1)t[i]&&t[i].m(e,o);_(e,s,o)},p(e,[o]){o&1&&(l=d(e[0]),t=O(t,o,n,1,e,l,a,s.parentNode,P,v,s,g))},i:u,o:u,d(e){e&&c(s);for(let o=0;o<t.length;o+=1)t[o].d(e)}}}function j(r,t,a){let{paths:s}=t;return r.$$set=l=>{"paths"in l&&a(0,s=l.paths)},[s]}class A extends y{constructor(t){super(),k(this,t,j,R,$,{paths:0})}}function B(r){let t,a,s;t=new A({props:{paths:["/fonts/overpass/overpass-v13-latin-regular.woff2","/fonts/overpass/overpass-v13-latin-600.woff2","/fonts/overpass/overpass-v13-latin-700.woff2","/fonts/overpass/overpass-mono-v16-latin-regular.woff2"]}});const l=r[1].default,n=w(l,r,r[0],null);return{c(){q(t.$$.fragment),a=z(),n&&n.c(),this.h()},l(e){const o=C("svelte-1dafacz",document.head);E(t.$$.fragment,o),o.forEach(c),a=F(e),n&&n.l(e),this.h()},h(){document.title="Rentee"},m(e,o){K(t,document.head,null),_(e,a,o),n&&n.m(e,o),s=!0},p(e,[o]){n&&n.p&&(!s||o&1)&&b(n,l,e,e[0],s?L(l,e[0],o,null):I(e[0]),null)},i(e){s||(h(t.$$.fragment,e),h(n,e),s=!0)},o(e){m(t.$$.fragment,e),m(n,e),s=!1},d(e){e&&c(a),M(t),n&&n.d(e)}}}function D(r,t,a){let{$$slots:s={},$$scope:l}=t;return r.$$set=n=>{"$$scope"in n&&a(0,l=n.$$scope)},[l,s]}class Q extends y{constructor(t){super(),k(this,t,D,B,$,{})}}export{Q as component};