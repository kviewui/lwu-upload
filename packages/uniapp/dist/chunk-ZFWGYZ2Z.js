'use strict';

var m=Object.defineProperty;var h=Object.getOwnPropertySymbols;var n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;var i=(c,b,a)=>b in c?m(c,b,{enumerable:!0,configurable:!0,writable:!0,value:a}):c[b]=a,p=(c,b)=>{for(var a in b||(b={}))n.call(b,a)&&i(c,a,b[a]);if(h)for(var a of h(b))o.call(b,a)&&i(c,a,b[a]);return c};var q=(c,b,a)=>new Promise((j,g)=>{var k=d=>{try{e(a.next(d));}catch(f){g(f);}},l=d=>{try{e(a.throw(d));}catch(f){g(f);}},e=d=>d.done?j(d.value):Promise.resolve(d.value).then(k,l);e((a=a.apply(c,b)).next());});

exports.a = p;
exports.b = q;
