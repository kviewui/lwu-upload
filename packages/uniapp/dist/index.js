'use strict';

var w=Object.defineProperty;var y=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var b=(a,e,t)=>e in a?w(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,s=(a,e)=>{for(var t in e||(e={}))v.call(e,t)&&b(a,t,e[t]);if(y)for(var t of y(e))I.call(e,t)&&b(a,t,e[t]);return a};var f=(a,e,t)=>new Promise((r,c)=>{var n=o=>{try{i(t.next(o));}catch(u){c(u);}},l=o=>{try{i(t.throw(o));}catch(u){c(u);}},i=o=>o.done?r(o.value):Promise.resolve(o.value).then(n,l);i((t=t.apply(a,e)).next());});var C=a=>{var e,t,r,c,n,l,i,o;return {baseURI:a.baseURI,debug:(e=a.debug)!=null?e:!1,loading:(t=a.loading)!=null?t:!0,loadingText:(r=a.loadingText)!=null?r:"\u4E0A\u4F20\u4E2D...",before:a.before,after:a.after,header:(c=a.header)!=null?c:{},timeout:(n=a.timeout)!=null?n:6e4,name:(l=a.name)!=null?l:"file",formData:(i=a.formData)!=null?i:{},saveSuffixName:(o=a.saveSuffixName)!=null?o:"png"}};var O=a=>{uni.showLoading({title:a.title,mask:a.mask||!0});};function S(a,e,t){return {request:i=>{var d;t.debug&&console.warn(`\u3010LwuUploader Debug:\u8BF7\u6C42\u62E6\u622A\u3011${JSON.stringify(t)}`),t.loading&&O({title:(d=t.loadingText)!=null?d:"\u4E0A\u4F20\u4E2D..."});let o="";process.env.NODE_ENV!=="development"?o=t.baseURI.dev:o=t.baseURI.pro;let u=s(s({},t),i),g=`${o}${i.url}`;return u.url=g,i.before&&i.before(u),a.request(u)},response:i=>(t.debug&&console.warn(`\u3010LwuUploader Debug:\u54CD\u5E94\u62E6\u622A\u3011${JSON.stringify(i)}`),e.after&&e.after(i),i),fail:i=>(t.debug&&console.warn(`\u3010LwuUploader Debug:\u8BF7\u6C42\u62E6\u622A\u5931\u8D25\u3011${JSON.stringify(i)}`),i),complete:i=>{uni.hideLoading(),t.debug&&console.warn(`\u3010LwuUploader Debug:\u8BF7\u6C42\u62E6\u622A\u5B8C\u6210\u3011${JSON.stringify(i)}`);}}}var U=a=>/\.(png|jpeg|jpg|webp|gif)$/i.test(a);var p=class{constructor(e,t){this.config=t,this.options=e,this.timeout=(e==null?void 0:e.timeout)||1,this.maxSize=(e==null?void 0:e.maxSize)||5*1024*1024,this.securityToken="",this.accessKeyId="",this.accessKeySecret="",this.uploadDir=(e==null?void 0:e.uploadDir)||"",this.uploadImageUrl=(e==null?void 0:e.uploadImageUrl)||"",this.formData=(e==null?void 0:e.formData)||{},this.getOOSByAC=()=>e==null?void 0:e.getOOSByAC(),this.getPolicyBase64=()=>e==null?void 0:e.getPolicyBase64();}getSignature(e,t,r){return f(this,null,function*(){return yield r==null?void 0:r.getSignature(e,t)})}getOOSByACInfo(){return f(this,null,function*(){let{accessKeyId:e,accessKeySecret:t,securityToken:r}=yield this.getOOSByAC();this.accessKeyId=e,this.accessKeySecret=t,this.securityToken=r;})}getUploadParams(){return f(this,null,function*(){let e=this.getPolicyBase64(),t=yield this.getSignature(e,this.accessKeySecret,this.options);return {OSSAccessKeyId:this.accessKeyId,policy:e,signature:t,"x-oss-security-token":this.securityToken}})}uploadFile(e,t,r){return new Promise((c,n)=>f(this,null,function*(){if(!e){n({code:1,msg:"\u6587\u4EF6\u8DEF\u5F84\u4E0D\u80FD\u4E3A\u7A7A"});return}let l=t||this.uploadDir;l||n({code:1,msg:"\u4E0A\u4F20\u76EE\u5F55\u4E0D\u80FD\u4E3A\u7A7A"}),this.uploadImageUrl||n({code:1,msg:"\u4E0A\u4F20\u670D\u52A1\u5668\u57DF\u540D\u6216\u4E0A\u4F20\u7684\u7B2C\u4E09\u65B9OOS\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A"});let i=U(e)?e.split(".").pop():r==null?void 0:r.saveSuffixName,o=`${Date.now()}_${Math.floor(Math.random()*1e6)}.${i}`;r!=null&&r.genarateFileName&&(o=yield r.genarateFileName());let u=`${this.uploadImageUrl}/${l}/${o}`,g=s(s({key:`${l}/${o}`,success_action_status:200},yield this.getUploadParams()),this.formData),d=uni.uploadFile({url:this.uploadImageUrl,filePath:e,name:"file",formData:s({},g),fail:m=>{if(this.config&&this.config.debug&&console.warn(`\u3010LwuUpload Debug:\u7B2C\u4E09\u65B9oos\u8FD4\u56DE\u7ED3\u679C\u3011${JSON.stringify(m)}`),m.statusCode!==200){n({code:1,msg:"\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5",data:m.data});return}}});c({code:0,msg:"success",data:{uploadTask:d,url:u,path:`/${l}/${o}`}});}))}},h=p;var x=class{constructor(e){this.globalConfig={baseURI:{pro:"",dev:""}};this.reqConfig={url:"",files:[],filePath:"",name:""};this.globalConfig=s({},C(e)),this.reqConfig=s({url:"",files:[],filePath:"",name:""},this.globalConfig);}config(e){return this.reqConfig=s(s({},this.reqConfig),e),this}setHeader(e){return this.reqConfig.header=s({},e),this}setFormData(e){return this.reqConfig.formData=s({},e),this}upload(e){let t=s(s({},this.reqConfig),e),r=S({request:l=>(e.url=l.url,l),response:l=>l},s({},t),this.globalConfig),c=s({},t.header),n=s({},t.formData);return r.request(t),uni.uploadFile({url:e.url,files:t.files,fileType:t.fileType,file:t.file,filePath:t.filePath,name:t.name,header:c,timeout:t.timeout,formData:n,success:l=>{r.response(l),e.success&&e.success(l);},fail:l=>{r.fail(l),e.fail&&e.fail(l);},complete:l=>{r.complete(l),e.complete&&e.complete(l);}})}uploadOOSSync(e){return f(this,null,function*(){let t=new h(e,s({baseURI:{pro:"",dev:""}},this.reqConfig));return yield t.getOOSByACInfo(),yield t.uploadFile(e.filePath,e.uploadDir,e)})}uploadOOS(e){let t=new h(e,s({baseURI:{pro:"",dev:""}},this.reqConfig));t.getOOSByACInfo().then(()=>t.uploadFile(e.filePath,e.uploadDir,e));}};

exports.Uploader = x;
