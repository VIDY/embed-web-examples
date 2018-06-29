// imported file ~> vidy/embed.js/dist/embed.es.js
var TOKEN_KEY="vidy:sdk:token",TOKEN=getToken();function headers(){var e={};return TOKEN&&(e.authorization="Bearer "+TOKEN),e["content-type"]="application/json;charset=UTF-8",e}function send(e,t,n,a){return(a=a||{}).method=e,a.headers=headers(),n&&(a.body=JSON.stringify(n)),fetch("https://api.vidy.sh/"+t,a)}var get=send.bind(null,"get"),post=send.bind(null,"post"),put=send.bind(null,"put");function getToken(){return localStorage.getItem(TOKEN_KEY)||!1}function setToken(e){localStorage.setItem(TOKEN_KEY,TOKEN=e)}function isUser(){return!!TOKEN}var DOC=document,create=DOC.createElement.bind(DOC),append=function(e,t){return e.appendChild(t)},NS=DOC.createElementNS.bind(DOC,"http://www.w3.org/2000/svg"),AVA_URI="https://tinyfac.es/data/avatars/",AVATARS=["A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-200w.jpeg","03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-200w.jpeg","E0B4CAB3-F491-4322-BEF2-208B46748D4A-200w.jpeg","852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg","2DDDE973-40EC-4004-ABC0-73FD4CD6D042-200w.jpeg","BA0CB1F2-8C79-4376-B13B-DD5FB8772537-200w.jpeg","5F8C5D50-DDB6-4F06-AA15-ACB30D8D910D-200w.jpeg","FBEBF655-4886-455A-A4A4-D62B77DD419B-200w.jpeg","7E570445-25F0-4276-8E8F-084ABA2C8FB8-200w.jpeg","B3CF5288-34B0-4A5E-9877-5965522529D6-200w.jpeg","26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg"];function acceptNode(e){return!/script|style/i.test(e.parentNode.nodeName)}function toEntry(e){var t=e.phrase.split("/");return{id:e.id,text:t[0],count:parseInt(t[1],10),regexp:RegExp(t[0],"gi")}}function toLocation(e,t,n){return 0==n?e.indexOf(t):e.indexOf(t,toLocation(e,t,--n)+1)}function toCenterCoords(){return{clientX:window.innerWidth/2,clientY:window.innerHeight/2-60}}function index(e){var t,n,a,i,o,r,s,c,d,l,p,u,v,m,f,g,E,h,A=this;if(!(e=e||{}).appid||!e.postid)return console.error('[VIDY] An "appid" and a "postid" are required!');function C(e){r.style.visibility=e?"visible":"hidden"}function D(e){var t=e.clientY;t=t>210?t-210:t+20,s.style.transform=d.style.transform="translate("+(e.clientX-100)+"px,"+t+"px)"}function N(){m.pause(),clearTimeout(o),o=null,r.removeEventListener("click",y),l.className="vidy-login",r.className="vidy",setTimeout(C,250),v.removeAttribute("style"),f.textContent=""}function y(e){e.target.classList.contains("vidy")&&(r.className+=" exit",setTimeout(N,600))}function _(e){e.target.removeEventListener("mousemove",D),N()}function b(e){var t=e.target.closest(".vlink");D(w),r.classList.add("swipe",t._type),d.removeAttribute("style"),r.addEventListener("click",y),f.textContent=t._views_total.toLocaleString()+" views",t.removeEventListener("mousemove",D),t.removeEventListener("mouseleave",_)}var w=toCenterCoords();A.nodes=function(e){for(var t,n=[],a=DOC.createTreeWalker(e,4,{acceptNode:acceptNode});t=a.nextNode();)t.data.trim().length>0&&n.push(t);return n},A.after=function(e,t){e.parentNode.insertBefore(t,e.nextSibling)},A.init=function(n){return A.appid=e.appid,A.postid=n||e.postid,s||((r=create("div")).className="vidy",(s=create("div")).className="vidy-player",(t=create("div")).className="vidy-mask circle",append(t,m=create("video")),append(s,t),(t=create("div")).className="vidy-social",append(t,f=create("figure")),append(t,p=socials()),append(s,t),p._comment.onclick=function(e){if(!isUser())return l.enter();console.log("> TODO: comment")},p._like.onclick=function(e){if(!isUser())return l.enter();var t=p.classList;put("clips/"+p._clip+"/likes",{value:!t.contains("liked")}).then(function(e){return e.json()}).then(function(e){t.toggle("liked",m._vlink._user_likes=e.value)})},append(r,s),(d=create("div")).className="vidy-profile",(t=create("div")).className="vidy-avatar",append(append(t,NS("svg")),v=NS("circle")),append(t,u=create("img")),append(d,t),append(r,d),m.pause=m.pause.bind(m),m.play=m.play.bind(m),m.ontimeupdate=function(){v.style.strokeDashoffset=Math.max(100*(1-m.currentTime/m.duration),0)},h||(m.onpause=function(){console.log("> video paused",1e3*m.currentTime),post(E+"/views",{embed:m._embed,duration:1e3*m.currentTime}),!isUser()&&/advert/.test(r.className)&&console.log("> PROMPT LOGIN/REGISTER :: CLAIM CREDITS FOR ADVERTISEMENT")},m.onended=function(){console.log("> video ended; manual loop"),m._vlink.classList.add("viewed")},(c=create("div")).className="vidy-avatar vidy-account",append(c,t=create("img")),isUser()?t.src=AVA_URI+AVATARS[0]:(t.src="#",append(r,l=form()),l.onsubmit=function(e){e.preventDefault();var t=l.elements;post("auth/login",{email:t[0].value,password:t[1].value}).then(function(e){return e.json()}).then(function(e){c.firstChild.src=AVA_URI+AVATARS[0],l.className="vidy-login",setToken(e.data.token),l.reset()})}),append(r,c)),append(DOC.body,r)),get(E="apps/"+A.appid+"/content/"+A.postid).then(function(t){return t.json().then(function(t){var n,o,r;if((a=t.data||[]).forEach(function(e){e.clip&&(e.clip.account.avatar=AVA_URI+AVATARS[Math.floor(Math.random()*AVATARS.length)])}),i=a.map(toEntry),!h&&a.length)return post("history",{embeds:a.map(function(e){return e.id})}).then(function(t){return t.json().then(function(t){i.forEach(function(e){for(o in n=t.data[e.id])for(r in n[o])e[r+"_"+o]=n[o][r]}),e.autoload&&A.load()})});(h||e.autoload)&&A.load()})})},A.draw=function(e,i,s){var c=i.text,d=toLocation(e.data,c,s||0),l=i.embed||a.find(function(e){return e.id===i.id}),v=l.clip;console.time('draw "'+c+'"');var f=e.data.substring(d+c.length),g=create("span");if(g.className="vlink",i.user_views>=v.duration&&(g.className+=" viewed"),g._embed=l.id,g._type=v.sponsored?"advert":"social",g._views_total=i.total_views||0,g._likes_total=i.total_likes||0,g._user_likes=!!i.user_likes,g.onmouseenter=function(e){D(e),m._vlink=g,g.addEventListener("mouseleave",_),p._clip=v.id,p.classList.toggle("liked",g._user_likes),m._embed=p._embed=g._embed,u.src=v.account.avatar,m.src=v.files.landscapeVideo240.url,m.poster=v.files.landscapeImage240.url,o=setTimeout(function(){C(!0),r.classList.add("hover"),clearTimeout(o),o=null,g.addEventListener("mousemove",D),h||g.addEventListener("click",b),setTimeout(m.play,250)},250)},(t=create("span")).innerText=c,append(g,t),append(g,create("i")),e.data=e.data.substring(0,d),A.after(e,g),f.length>0){var E=n.indexOf(e)+1,N=DOC.createTextNode(f);A.after(g,N),n.splice(E,0,N)}return console.timeEnd('draw "'+c+'"'),g},A.load=function(){n=A.nodes(A.base=DOC.querySelector(e.content||"body")),console.time("load");for(var t,a,o,r=0,s=0;i.length>0;)for(a=i.shift(),r=0;r<n.length&&(t=n[r],!(a.count<0));r++)if(o=t.data.match(a.regexp))for(s=0;s<o.length;s++)if(--a.count<0){A.draw(t,a,s);break}console.timeEnd("load")},(g=DOC.referrer)&&((t=create("a")).href=g,h="https://demo-dash-jbdigsngwo.now.sh"===(g=t.origin)),this.init()}function form(){var e,t=create("form");return t.className="vidy-login",t.onsubmit=prevent,append(t,input("email","Email Address")),append(t,input("password")),(e=create("button")).type="submit",e.textContent="Login",append(t,e),t.enter=function(){t.className+=" show",setTimeout(function(){t.elements[0].focus()},150)},t}function input(e,t){var n,a=create("div");return a.className="v-input",(n=create("label")).textContent=t||e,append(a,n),(n=create("input")).name=n.type=e,append(a,n),a}function socials(){var e=create("div");return e.className="vidy-btns",append(e,e._like=create("button")).className="v-like",append(e,e._comment=create("button")).className="v-comment",append(e,e._share=create("button")).className="v-share",e}function prevent(e){e.preventDefault(),e.stopPropagation()}export default index;
