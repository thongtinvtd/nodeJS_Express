function t(){const t=new TextDecoder("utf-8");return{concat(t,e){const r=new Uint8Array(t.length+e.length);return r.set(t),r.set(e,t.length),r},copy(t,e,r){const s=new Uint8Array(r-e);return s.set(t.subarray(e,r)),s},toUtf8String:(e,r,s)=>t.decode(e.subarray(r,s))}}function e(e,r){const s=null!=r?r:t();let n,i=!1,o=!1;return{next(t){if(!i)try{!function(t){let r,l=0;for(n?(t=s.concat(n,t),r=n.length):r=0;r<t.length;){const n=t[r];if(10===n){if(!o){const n=r>0&&13===t[r-1]?r-1:r;if(i)return;e.next(s.toUtf8String(t,l,n)),l=r+1}}else 34===n&&(o=!o);r++}n=l<r?s.copy(t,l,r):void 0}(t)}catch(t){this.error(t)}},error(t){i||(i=!0,e.error(t))},complete(){i||(n&&e.next(s.toUtf8String(n,0,n.length)),i=!0,e.complete())},useCancellable(t){if(e.useCancellable){const r=this;e.useCancellable({cancel(){t.cancel(),n=void 0,r.complete()},isCancelled:()=>t.isCancelled()})}}}}class r{constructor(){this._reuse=!1}get reuse(){return this._reuse}set reuse(t){t&&!this.reusedValues&&(this.reusedValues=new Array(10)),this._reuse=t}withReuse(){return this.reuse=!0,this}splitLine(t){if(null==t)return this.lastSplitLength=0,[];let e=0,r=0;const s=this._reuse?this.reusedValues:[];let n=0;for(let i=0;i<t.length;i++){const o=t[i];if(","===o){if(e%2==0){const o=this.getValue(t,r,i,e);this._reuse?s[n++]=o:s.push(o),r=i+1,e=0}}else'"'===o&&e++}const i=this.getValue(t,r,t.length,e);return this._reuse?(s[n]=i,this.lastSplitLength=n+1):(s.push(i),this.lastSplitLength=s.length),s}getValue(t,e,r,s){return e===t.length?"":0===s?t.substring(e,r):2===s?t.substring(e+1,r-1):t.substring(e+1,r-1).replace(/""/gi,'"')}}class s{}function n(){return new s}function i(t){var e,r;const n=new s;return n.label=String(t.label),n.dataType=t.dataType,n.group=Boolean(t.group),n.defaultValue=null!==(e=t.defaultValue)&&void 0!==e?e:"",n.index=null!==(r=t.index)&&void 0!==r?r:0,n}const o=[404,408,425,429,500,502,503,504];function l(t){return o.includes(t)}class a extends Error{constructor(t){super(t),this.name="IllegalArgumentError",Object.setPrototypeOf(this,a.prototype)}}class u extends Error{constructor(t,e,r,s,n,i){if(super(),this.statusCode=t,this.statusMessage=e,this.body=r,this.contentType=n,Object.setPrototypeOf(this,u.prototype),i)this.message=i;else if(r){if(null==n?void 0:n.startsWith("application/json"))try{this.json=JSON.parse(r),this.message=this.json.message,this.code=this.json.code}catch(t){}this.message||(this.message=`${t} ${e} : ${r}`)}else this.message=`${t} ${e}`;this.name="HttpError",this.setRetryAfter(s)}setRetryAfter(t){"string"==typeof t&&/^[0-9]+$/.test(t)?this._retryAfter=parseInt(t):this._retryAfter=0}canRetry(){return l(this.statusCode)}retryAfter(){return this._retryAfter}}const h=["ECONNRESET","ENOTFOUND","ESOCKETTIMEDOUT","ETIMEDOUT","ECONNREFUSED","EHOSTUNREACH","EPIPE"];function c(t){return!!t&&("function"==typeof t.canRetry?!!t.canRetry():!(!t.code||!h.includes(t.code)))}function f(t,e){if(t){let r;return"function"==typeof t.retryAfter?t.retryAfter():(r=0,e&&e>0?r+Math.round(Math.random()*e):r)}return 0}class d extends Error{constructor(){super(),Object.setPrototypeOf(this,d.prototype),this.name="RequestTimedOutError",this.message="Request timed out"}canRetry(){return!0}retryAfter(){return 0}}class p extends Error{constructor(){super(),this.name="AbortError",Object.setPrototypeOf(this,p.prototype),this.message="Response aborted"}canRetry(){return!0}retryAfter(){return 0}}const g=t=>t,y={boolean:t=>"true"===t,unsignedLong:t=>""===t?null:+t,long:t=>""===t?null:+t,double:t=>""===t?null:+t,string:g,base64Binary:g,duration:t=>""===t?null:t,"dateTime:RFC3339":t=>""===t?null:t};function m(){y["dateTime:RFC3339"]=t=>""===t?null:new Date(Date.parse(t))}function w(){y["dateTime:RFC3339"]=t=>""===t?null:Date.parse(t)}function b(){y["dateTime:RFC3339"]=t=>""===t?null:t}class x{constructor(t){t.forEach((t,e)=>t.index=e),this.columns=t}column(t){for(let e=0;e<this.columns.length;e++){const r=this.columns[e];if(r.label===t)return r}throw new a(`Column ${t} not found!`)}toObject(t){var e;const r={};for(let s=0;s<this.columns.length&&s<t.length;s++){let n=t[s];const i=this.columns[s];""===n&&i.defaultValue&&(n=i.defaultValue),r[i.label]=(null!==(e=y[i.dataType])&&void 0!==e?e:g)(n)}return r}}function v(t){return new x(t)}function O(t){const e=(new r).withReuse();let s,i,o=!0,l=0;return{error(e){t.error(e)},next(r){if(""===r)o=!0,s=void 0;else{const a=e.splitLine(r),u=e.lastSplitLength;if(o){if(!s){s=new Array(u);for(let t=0;t<u;t++)s[t]=n()}if(a[0].startsWith("#")){if("#datatype"===a[0])for(let t=1;t<u;t++)s[t].dataType=a[t];else if("#default"===a[0])for(let t=1;t<u;t++)s[t].defaultValue=a[t];else if("#group"===a[0])for(let t=1;t<u;t++)s[t].group="t"===a[t][0]}else{""===a[0]?(l=1,s=s.slice(1)):l=0;for(let t=l;t<u;t++)s[t-l].label=a[t];i=v(s),o=!1}}else t.next(a.slice(l,u),i)}},complete(){t.complete()},useCancellable(e){t.useCancellable&&t.useCancellable(e)}}}function T(t,e){let r=!1,s=0,n=0;for(;n<t.length;){const i=t.charCodeAt(n);if(10===i){if(!r){const r=n>0&&13===t.charCodeAt(n-1)?n-1:n;e.next(t.substring(s,r)),s=n+1}}else 34===i&&(r=!r);n++}s<n&&e.next(t.substring(s,n)),e.complete()}const R={timeout:1e4},S={retryJitter:200,minRetryDelay:5e3,maxRetryDelay:18e4,exponentialBase:5},E={batchSize:1e3,flushInterval:6e4,writeFailed:function(){},writeSuccess:function(){},maxRetries:3,maxBufferLines:32e3,retryJitter:200,minRetryDelay:5e3,maxRetryDelay:18e4,exponentialBase:5,gzipThreshold:1e3};function j(t,e){return function(r){let s="",n=0,i=0;for(;i<r.length;){const o=t.indexOf(r[i]);o>=0&&(s+=r.substring(n,i),s+=e[o],n=i+1),i++}return 0==n?r:(n<r.length&&(s+=r.substring(n,r.length)),s)}}const C={measurement:j(", \n\r\t",["\\,","\\ ","\\n","\\r","\\t"]),quoted:function(t,e){const r=j(t,e);return t=>'"'+r(t)+'"'}('"\\',['\\"',"\\\\"]),tag:j(", =\n\r\t",["\\,","\\ ","\\=","\\n","\\r","\\t"])};function D(t){return!1}let $=Date.now(),A=0;function B(){{const t=Date.now();t!==$?($=t,A=0):A++;const e=String(A);return String(t)+"000000000".substr(0,6-e.length)+e}}function _(){return String(Date.now())+"000000000".substr(0,3)}function P(){return String(Date.now())}function L(){return String(Math.floor(Date.now()/1e3))}const F={s:L,ms:P,us:_,ns:B,seconds:L,millis:P,micros:_,nanos:B},M={s:t=>""+Math.floor(t.getTime()/1e3),ms:t=>""+t.getTime(),us:t=>t.getTime()+"000",ns:t=>t.getTime()+"000000"},q={error(t,e){console.error("ERROR: "+t,e||"")},warn(t,e){console.warn("WARN: "+t,e||"")}};let z=q;const H={error(t,e){z.error(t,e)},warn(t,e){z.warn(t,e)}};function I(t){const e=z;return z=t,e}const N=Symbol("FLUX_VALUE");class U{constructor(t){this.fluxValue=t}toString(){return this.fluxValue}[N](){return this.fluxValue}}function k(t){if(null==t)return"";t=t.toString();let e=void 0,r=0;function s(){void 0===e&&(e=t.substring(0,r))}for(;r<t.length;r++){const n=t.charAt(r);switch(n){case"\r":s(),e+="\\r";break;case"\n":s(),e+="\\n";break;case"\t":s(),e+="\\t";break;case'"':case"\\":s(),e=e+"\\"+n;break;case"$":if(r+1<t.length&&"{"===t.charAt(r+1)){s(),r++,e+="\\${";break}null!=e&&(e+=n);break;default:null!=e&&(e+=n)}}return void 0!==e?e:t}function V(t){return new U(`"${k(t)}"`)}function W(t){if("number"==typeof t){if(!isFinite(t))throw new Error("not a flux float: "+t);return t.toString()}const e=String(t);let r=!1;for(const t of e)if("."!==t){if("."!==t&&"-"!==t&&(t<"0"||t>"9"))throw new Error("not a flux float: "+e)}else{if(r)throw new Error("not a flux float: "+e);r=!r}return e}function J(t){return new U(W(t))}function G(t){const e=W(t);for(const t of e)if("."===t)throw new Error("not a flux integer: "+e);return new U(e)}function K(t){return new U(function(t){return`time(v: "${k(t)}")`}(t))}function Q(t){return new U(`duration(v: "${k(t)}")`)}function X(t){return`regexp.compile(v: "${k(t)}")`}function Y(t){return new U(X(t))}function Z(t){return new U("true"===t||"false"===t?t:(!!t).toString())}function tt(t){return new U(String(t))}function et(t){if(void 0===t)return"";if(null===t)return"null";if("boolean"==typeof t)return t.toString();if("string"==typeof t)return`"${k(t)}"`;if("number"==typeof t)return W(t);if("object"==typeof t){if("function"==typeof t[N])return t[N]();if(t instanceof Date)return t.toISOString();if(t instanceof RegExp)return X(t);if(Array.isArray(t))return`[${t.map(et).join(",")}]`}return et(t.toString())}function rt(t,...e){if(1==t.length&&0===e.length)return tt(t[0]);const r=new Array(t.length+e.length);let s=0;for(let i=0;i<t.length;i++){const o=t[i];if(r[s++]=o,i<e.length){const l=e[i];let a;if(o.endsWith('"')&&i+1<t.length&&t[i+1].startsWith('"'))a=k(l);else if(a=et(l),""===a&&("object"!=typeof(n=l)||"function"!=typeof n[N]))throw new Error(`Unsupported parameter literal '${l}' at index: ${i}, type: ${typeof l}`);r[s++]=a}else if(i<t.length-1)throw new Error("Too few parameters supplied!")}var n;return tt(r.join(""))}const st="function"==typeof Symbol&&Symbol.observable||"@@observable";class nt{constructor(t){this.tags={},this.fields={},t&&(this.name=t)}measurement(t){return this.name=t,this}tag(t,e){return this.tags[t]=e,this}booleanField(t,e){return this.fields[t]=e?"T":"F",this}intField(t,e){if("number"!=typeof e){let r;if(isNaN(r=parseInt(String(e))))throw new Error(`Expected integer value for field ${t}, but got '${e}'!`);e=r}return this.fields[t]=Math.floor(e)+"i",this}floatField(t,e){if("number"!=typeof e){let r;if(isNaN(r=parseFloat(e)))throw new Error(`Expected float value for field ${t}, but got '${e}'!`);e=r}return this.fields[t]=String(e),this}stringField(t,e){return null!=e&&("string"!=typeof e&&(e=String(e)),this.fields[t]=C.quoted(e)),this}timestamp(t){return this.time=t,this}toLineProtocol(t){if(!this.name)return;let e="";if(Object.keys(this.fields).sort().forEach(t=>{if(t){const r=this.fields[t];e.length>0&&(e+=","),e+=`${C.tag(t)}=${r}`}}),0===e.length)return;let r="";const s=t&&t.defaultTags?Object.assign(Object.assign({},t.defaultTags),this.tags):this.tags;Object.keys(s).sort().forEach(t=>{if(t){const e=s[t];e&&(r+=",",r+=`${C.tag(t)}=${C.tag(e)}`)}});let n=this.time;return t&&t.convertTime&&(n=t.convertTime(n)),`${C.measurement(this.name)}${r} ${e}${void 0!==n?" "+n:""}`}toString(){const t=this.toLineProtocol(void 0);return t||"invalid point: "+JSON.stringify(this,void 0)}}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function it(t,e,r,s){return new(r||(r=Promise))((function(n,i){function o(t){try{a(s.next(t))}catch(t){i(t)}}function l(t){try{a(s.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(o,l)}a((s=s.apply(t,e||[])).next())}))}class ot{constructor(t){this.options=Object.assign(Object.assign({},S),t),this.success()}nextDelay(t,e){const r=f(t);if(r&&r>0)return r+Math.round(Math.random()*this.options.retryJitter);if(e&&e>0){let t=this.options.minRetryDelay;for(let r=1;r<e&&(t*=this.options.exponentialBase,!(t>=this.options.maxRetryDelay));r++);return Math.min(Math.max(t,1),this.options.maxRetryDelay)+Math.round(Math.random()*this.options.retryJitter)}return this.currentDelay?this.currentDelay=Math.min(Math.max(this.currentDelay*this.options.exponentialBase,1)+Math.round(Math.random()*this.options.retryJitter),this.options.maxRetryDelay):this.currentDelay=this.options.minRetryDelay+Math.round(Math.random()*this.options.retryJitter),this.currentDelay}success(){this.currentDelay=void 0}}class lt{constructor(t,e){this.maxLines=t,this.retryLines=e,this.size=0,this.nextRetryTime=0,this.closed=!1,this._timeoutHandle=void 0}addLines(t,e,r){if(this.closed)return;if(!t.length)return;const s=Date.now()+r;if(s>this.nextRetryTime&&(this.nextRetryTime=s),this.first&&this.size+t.length>this.maxLines){const e=this.size,r=.7*e;do{const t=this.first.next;this.size-=this.first.lines.length,this.first=t}while(this.first&&this.size+t.length>r);H.error(`RetryBuffer: ${e-this.size} oldest lines removed to keep buffer size under the limit of ${this.maxLines} lines`)}const n={lines:t,retryCount:e};this.last?(this.last.next=n,this.last=n):(this.first=n,this.last=n,this.scheduleRetry(r)),this.size+=t.length}removeLines(){if(this.first){const t=this.first;return this.first=this.first.next,this.size-=t.lines.length,this.first||(this.last=void 0),t}}scheduleRetry(t){this._timeoutHandle=setTimeout(()=>{const t=this.removeLines();t?this.retryLines(t.lines,t.retryCount).then(()=>{this.scheduleRetry(1)}).catch(t=>{this.scheduleRetry(this.nextRetryTime-Date.now())}):this._timeoutHandle=void 0},t)}flush(){return it(this,void 0,void 0,(function*(){let t;for(;t=this.removeLines();)yield this.retryLines(t.lines,t.retryCount)}))}close(){return this._timeoutHandle&&(clearTimeout(this._timeoutHandle),this._timeoutHandle=void 0),this.closed=!0,this.size}}class at{constructor(t,e,r){this.maxChunkRecords=t,this.flushFn=e,this.scheduleSend=r,this.length=0,this.lines=new Array(t)}add(t){0===this.length&&this.scheduleSend(),this.lines[this.length]=t,this.length++,this.length>=this.maxChunkRecords&&this.flush().catch(t=>{})}flush(){const t=this.reset();return t.length>0?this.flushFn(t):Promise.resolve()}reset(){const t=this.lines.slice(0,this.length);return this.length=0,t}}class ut{constructor(t,e,r,s,n){this.transport=t,this.closed=!1,this._timeoutHandle=void 0,this.httpPath=`/api/v2/write?org=${encodeURIComponent(e)}&bucket=${encodeURIComponent(r)}&precision=${s}`,this.writeOptions=Object.assign(Object.assign({},E),n),this.currentTime=F[s],this.dateToProtocolTimestamp=M[s],this.writeOptions.defaultTags&&this.useDefaultTags(this.writeOptions.defaultTags),this.sendOptions={method:"POST",headers:Object.assign({"content-type":"text/plain; charset=utf-8"},null==n?void 0:n.headers),gzipThreshold:this.writeOptions.gzipThreshold};var i;this.writeBuffer=new at(this.writeOptions.batchSize,t=>(this._clearFlushTimeout(),this.sendBatch(t,this.writeOptions.maxRetries+1)),()=>{this.writeOptions.flushInterval>0&&(this._clearFlushTimeout(),this.closed||(this._timeoutHandle=setTimeout(()=>this.sendBatch(this.writeBuffer.reset(),this.writeOptions.maxRetries+1).catch(t=>{}),this.writeOptions.flushInterval)))}),this.sendBatch=this.sendBatch.bind(this),this.retryStrategy=(i=this.writeOptions,new ot(i)),this.retryBuffer=new lt(this.writeOptions.maxBufferLines,this.sendBatch)}sendBatch(t,e){const r=this;return!this.closed&&t.length>0?new Promise((s,n)=>{let i;const o={responseStarted(t,e){i=e},error(i){const o=r.writeOptions.maxRetries+2-e,l=r.writeOptions.writeFailed.call(r,i,t,o);if(l)l.then(s,n);else{if(!r.closed&&e>1&&(!(i instanceof u)||i.statusCode>=429))return H.warn(`Write to InfluxDB failed (remaining attempts: ${e-1}).`,i),r.retryBuffer.addLines(t,e-1,r.retryStrategy.nextDelay(i,o)),void n(i);H.error("Write to InfluxDB failed.",i),n(i)}},complete(){if(204==i||null==i)r.writeOptions.writeSuccess.call(r,t),r.retryStrategy.success(),s();else{const t=`204 HTTP response status code expected, but ${i} returned`,e=new u(i,t,void 0,"0");e.message=t,o.error(e)}}};this.transport.send(this.httpPath,t.join("\n"),this.sendOptions,o)}):Promise.resolve()}_clearFlushTimeout(){void 0!==this._timeoutHandle&&(clearTimeout(this._timeoutHandle),this._timeoutHandle=void 0)}writeRecord(t){if(this.closed)throw new Error("writeApi: already closed!");this.writeBuffer.add(t)}writeRecords(t){if(this.closed)throw new Error("writeApi: already closed!");for(let e=0;e<t.length;e++)this.writeBuffer.add(t[e])}writePoint(t){if(this.closed)throw new Error("writeApi: already closed!");const e=t.toLineProtocol(this);e&&this.writeBuffer.add(e)}writePoints(t){if(this.closed)throw new Error("writeApi: already closed!");for(let e=0;e<t.length;e++){const r=t[e].toLineProtocol(this);r&&this.writeBuffer.add(r)}}flush(t){return it(this,void 0,void 0,(function*(){if(yield this.writeBuffer.flush(),t)return yield this.retryBuffer.flush()}))}close(){return this.writeBuffer.flush().finally(()=>{const t=this.retryBuffer.close();t&&H.error(`Retry buffer closed with ${t} items that were not written to InfluxDB!`,null),this.closed=!0})}dispose(){return this._clearFlushTimeout(),this.closed=!0,this.retryBuffer.close()+this.writeBuffer.length}useDefaultTags(t){return this.defaultTags=void 0,Object.keys(t).forEach(e=>{(this.defaultTags||(this.defaultTags={}))[e]=C.tag(t[e])}),this}convertTime(t){return void 0===t?this.currentTime():"string"==typeof t?t.length>0?t:void 0:t instanceof Date?this.dateToProtocolTimestamp(t):String("number"==typeof t?Math.floor(t):t)}}function ht(t){const e={};return t.headers.forEach((t,r)=>{const s=e[r];void 0===s?e[r]=t:Array.isArray(s)?s.push(t):e[r]=[s,t]}),e}class ct{constructor(e){this.connectionOptions=e,this.chunkCombiner=t(),this.requestDecorator=function(){},this.defaultHeaders={"content-type":"application/json; charset=utf-8"},this.connectionOptions.token&&(this.defaultHeaders.Authorization="Token "+this.connectionOptions.token),this.url=String(this.connectionOptions.url),this.url.endsWith("/")&&(this.url=this.url.substring(0,this.url.length-1)),this.url.endsWith("/api/v2")&&(this.url=this.url.substring(0,this.url.length-"/api/v2".length),H.warn(`Please remove '/api/v2' context path from InfluxDB base url, using ${this.url} !`))}send(t,e,r,s){const n=function(t={}){let e=0;return{next:r=>{0===e&&t.next&&null!=r&&t.next(r)},error:r=>{0===e&&(e=1,t.error&&t.error(r))},complete:()=>{0===e&&(e=2,t.complete&&t.complete())},responseStarted:(e,r)=>{t.responseStarted&&t.responseStarted(e,r)}}}(s);let i=!1,o=r.signal;if(s&&s.useCancellable){const t=new AbortController;o||(o=t.signal,r=Object.assign(Object.assign({},r),o)),s.useCancellable({cancel(){i=!0,t.abort()},isCancelled:()=>i||o.aborted})}this.fetch(t,e,r).then(t=>it(this,void 0,void 0,(function*(){if((null==s?void 0:s.responseStarted)&&n.responseStarted(ht(t),t.status),t.status>=300)return t.text().then(e=>{if(!e){const r=t.headers.get("x-influxdb-error");r&&(e=r)}n.error(new u(t.status,t.statusText,e,t.headers.get("retry-after"),t.headers.get("content-type")))}).catch(e=>{H.warn("Unable to receive error body",e),n.error(new u(t.status,t.statusText,void 0,t.headers.get("retry-after"),t.headers.get("content-type")))});if(t.body){const e=t.body.getReader();let r;do{r=yield e.read(),n.next(r.value)}while(!r.done)}else if(t.arrayBuffer){const e=yield t.arrayBuffer();n.next(new Uint8Array(e))}else{const e=yield t.text();n.next((new TextEncoder).encode(e))}}))).catch(t=>{i||n.error(t)}).finally(()=>n.complete())}request(t,e,r,s){var n,i;return it(this,void 0,void 0,(function*(){const o=yield this.fetch(t,e,r),{status:l,headers:a}=o,h=a.get("content-type")||"";if(s&&s(ht(o),o.status),l>=300){let t=yield o.text();if(!t){const e=a.get("x-influxdb-error");e&&(t=e)}throw new u(l,o.statusText,t,o.headers.get("retry-after"),o.headers.get("content-type"))}const c=null!==(i=null===(n=r.headers)||void 0===n?void 0:n.accept)&&void 0!==i?i:h;return c.includes("json")?yield o.json():c.includes("text")||c.startsWith("application/csv")?yield o.text():void 0}))}fetch(t,e,r){const{method:s,headers:n}=r,i=function(t,e){var r={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(r[s]=t[s]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(s=Object.getOwnPropertySymbols(t);n<s.length;n++)e.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(t,s[n])&&(r[s[n]]=t[s[n]])}return r}(r,["method","headers"]),o=`${this.url}${t}`,l=Object.assign({method:s,body:"GET"===s||"HEAD"===s?void 0:"string"==typeof e?e:JSON.stringify(e),headers:Object.assign(Object.assign({},this.defaultHeaders),n),credentials:"omit"},i);return this.requestDecorator(l,r,o),fetch(o,l)}}function ft(t,e){return e.toObject(t)}class dt{constructor(t,e){this.isClosed=!1;try{e({next:e=>{t.next(e)},error:e=>{this.isClosed=!0,t.error(e)},complete:()=>{this.isClosed=!0,t.complete()},useCancellable:t=>{this.cancellable=t}})}catch(e){this.isClosed=!0,t.error(e)}}get closed(){return this.isClosed}unsubscribe(){var t;null===(t=this.cancellable)||void 0===t||t.cancel(),this.isClosed=!0}}function pt(){}class gt{constructor(t,e){this.executor=t,this.decorator=e}subscribe(t,e,r){const s=function(t){const{next:e,error:r,complete:s}=t;return{next:e?e.bind(t):pt,error:r?r.bind(t):pt,complete:s?s.bind(t):pt}}("object"!=typeof t||null===t?{next:t,error:e,complete:r}:t);return new dt(this.decorator(s),this.executor)}[st](){return this}}const yt={header:!0,delimiter:",",quoteChar:'"',commentPrefix:"#",annotations:["datatype","group","default"]},mt=t=>t;class wt{constructor(t,e){this.transport=t,this.options="string"==typeof e?{org:e}:e}with(t){return new wt(this.transport,Object.assign(Object.assign({},this.options),t))}lines(t){return new gt(this.createExecutor(t),mt)}rows(t){return new gt(this.createExecutor(t),t=>O({next(e,r){t.next({values:e,tableMeta:r})},error(e){t.error(e)},complete(){t.complete()}}))}queryLines(t,e){this.createExecutor(t)(e)}queryRows(t,e){this.createExecutor(t)(O(e))}collectRows(t,e=ft){const r=[];return new Promise((s,n)=>{this.queryRows(t,{next(t,s){const n=e.call(this,t,s);void 0!==n&&r.push(n)},error(t){n(t)},complete(){s(r)}})})}collectLines(t){const e=[];return new Promise((r,s)=>{this.queryLines(t,{next(t){e.push(t)},error(t){s(t)},complete(){r(e)}})})}queryRaw(t){const{org:e,type:r,gzip:s,headers:n}=this.options;return this.transport.request("/api/v2/query?org="+encodeURIComponent(e),JSON.stringify(this.decorateRequest({query:t.toString(),dialect:yt,type:r})),{method:"POST",headers:Object.assign({accept:"text/csv","accept-encoding":s?"gzip":"identity","content-type":"application/json; encoding=utf-8"},n)})}createExecutor(t){const{org:r,type:s,gzip:n,headers:i}=this.options;return o=>{this.transport.send("/api/v2/query?org="+encodeURIComponent(r),JSON.stringify(this.decorateRequest({query:t.toString(),dialect:yt,type:s})),{method:"POST",headers:Object.assign({"content-type":"application/json; encoding=utf-8","accept-encoding":n?"gzip":"identity"},i)},e(o,this.transport.chunkCombiner))}}decorateRequest(t){var e;return"function"==typeof this.options.now&&(t.now=this.options.now()),t.type=null!==(e=this.options.type)&&void 0!==e?e:"flux",t}}class bt{constructor(t){var e;if("string"==typeof t)this._options={url:t};else{if(null===t||"object"!=typeof t)throw new a("No url or configuration specified!");this._options=t}const r=this._options.url;if("string"!=typeof r)throw new a("No url specified!");r.endsWith("/")&&(this._options.url=r.substring(0,r.length-1)),this.transport=null!==(e=this._options.transport)&&void 0!==e?e:new ct(this._options)}getWriteApi(t,e,r="ns",s){return new ut(this.transport,t,e,r,null!=s?s:this._options.writeOptions)}getQueryApi(t){return new wt(this.transport,t)}}export{p as AbortError,R as DEFAULT_ConnectionOptions,S as DEFAULT_RetryDelayStrategyOptions,E as DEFAULT_WriteOptions,N as FLUX_VALUE,u as HttpError,a as IllegalArgumentError,bt as InfluxDB,r as LineSplitter,H as Logger,nt as Point,d as RequestTimedOutError,c as canRetryHttpCall,e as chunksToLines,q as consoleLogger,i as createFluxTableColumn,v as createFluxTableMetaData,t as createTextDecoderCombiner,F as currentTime,M as dateToProtocolTimestamp,C as escape,rt as flux,Z as fluxBool,K as fluxDateTime,Q as fluxDuration,tt as fluxExpression,J as fluxFloat,G as fluxInteger,Y as fluxRegExp,V as fluxString,f as getRetryDelay,l as isStatusCodeRetriable,O as linesToTables,n as newFluxTableColumn,W as sanitizeFloat,m as serializeDateTimeAsDate,w as serializeDateTimeAsNumber,b as serializeDateTimeAsString,I as setLogger,T as stringToLines,st as symbolObservable,et as toFluxValue,y as typeSerializers,D as useProcessHrtime};
//# sourceMappingURL=index.browser.mjs.map