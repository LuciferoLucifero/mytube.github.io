var oSpPOptions={sAppUrl:"http://narutox.ge",sAppUrlShow:"http://narutox.ge",sAppUrlNormal:"http://narutox.ge",sSubscribeUrl:"https://narutox.spulse.net",sSubscribeFFUrl:"https://narutox.spulse.net",bAutoSubscribe:true,bMobileEnabled:true,sAppKey:"d3f88e19c714b59a91b8057cd6fee1f3",prompt_settings:"",prompt_title:"",prompt_text:"",sServerApi:"https://pushdata.sendpulse.com:4434",sServerStatApi:"https://pushdata.sendpulse.com:4435",sSafariPushId:"web.com.sendpulse.push",jsIncludeDomain:"cdn.sendpulse.com",aBrowser:{},sBrowser:"",currentDB:null,timeSend:null,newWindow:null,pushedVariables:{},pushedInterval:!1,show_splogo:"1",spdomain_website:"https://sendpulse.com/webpush-powered-by-sendpulse?from=684125",styles_prefix:"sp",aPoweredbyLabel:{ru:"Предоставлено SendPulse",en:"Powered by SendPulse",ua:"Надано SendPulse",de:"Unterstützt von SendPulse"},aPromptMessage1:{ru:"запрашивает разрешение на:",en:"wants to:",ua:"запитує дозвіл на:",de:"bittet eine Erlaubnis"},aPromptMessage2:{ru:"Показывать оповещения",en:"Show notifications",ua:"Показувати сповіщення",de:"Benachrichtigunggen anzuzeigen"},aButtonAllowMessage:{ru:"Разрешить",en:"Allow",ua:"Дозволити",de:"Erlauben"},aButtonDenyMessage:{ru:"Блокировать",en:"Block",ua:"Блокувати",de:"Blockieren"},companyName:"SendPulse",bWasPrompt:!1,iPromptDelay:"0",sUserHostHash:"747991a0e145ac2bbe69f063a9402e69",sPushHost:"8feadacf719d74966b69e976f9e585eb",visitNumber:"1",subscriptionType:"SPTYPE:VAPID1:"};function oPromptPush(){var i=oSpPOptions.sAppUrl,t=oSpPOptions.sAppUrlShow,H=oSpPOptions.sAppUrlNormal,l=oSpPOptions.sSubscribeUrl,s=oSpPOptions.sSubscribeFFUrl,u=oSpPOptions.bAutoSubscribe,n=oSpPOptions.bMobileEnabled,c=oSpPOptions.sAppKey,z=oSpPOptions.prompt_settings,B=oSpPOptions.prompt_title,U=oSpPOptions.prompt_text,a=oSpPOptions.sServerApi,o=(oSpPOptions.sServerStatApi,oSpPOptions.sSafariPushId),V=oSpPOptions.jsIncludeDomain,p=oSpPOptions.aBrowser,d=oSpPOptions.sBrowser,r=oSpPOptions.currentDB,m=oSpPOptions.timeSend,S=oSpPOptions.newWindow,b=oSpPOptions.pushedVariables,g=oSpPOptions.pushedInterval,Y=oSpPOptions.show_splogo,R=oSpPOptions.spdomain_website,Z=oSpPOptions.styles_prefix,G=oSpPOptions.aPoweredbyLabel,F=oSpPOptions.aPromptMessage1,W=oSpPOptions.aPromptMessage2,Q=oSpPOptions.aButtonAllowMessage,J=oSpPOptions.aButtonDenyMessage,P=oSpPOptions.bWasPrompt,X=oSpPOptions.companyName,e=oSpPOptions.iPromptDelay,h=oSpPOptions.visitNumber,w=(oSpPOptions.sUserHostHash,oSpPOptions.sPushHost),D=oSpPOptions.subscriptionType,v=!1,M=new Date,q=new Date(M.getFullYear(),M.getMonth()+1,M.getDate()).getTime();q=M.getDate()+""+q,this.start=function(){if(!oSpP.detectSite())return oSpP.log("Application allowed only for "+i),!1;if("iOS"==oSpP.detectOs())return oSpP.log("Application can not work on iOS"),!1;var e=oSpP.detectOs();if(!n&&("iOS"==e||"Android"==e))return oSpP.log("Application disabled for your device"),!1;if(p=oSpP.detectBrowser(),d=p.name.toLowerCase(),("iOS"==e||"Android"==e)&&"chrome"==d&&parseFloat(p.version)<42)return oSpP.log("Application disabled for your browser version"),!1;if("chrome"==d&&parseFloat(p.version)<42)return oSpP.log("Application can not work with Crome browser version less then 42"),!1;if("firefox"==d&&parseFloat(p.version)<44)return oSpP.log("Application can not work with Firefox browser version less then 44"),!1;if(oSpP.isMobileYandexBrowser())return oSpP.log("Application can not work with mobile Yandex browser"),!1;if("firefox"==d&&(l=s),"chrome"==d||"firefox"==d||"opera"==d)if(window.addEventListener("message",function(e){e.origin.toLowerCase()==l.toLowerCase()&&"string"==typeof e.data&&("initend"==e.data?clearInterval(m):"closeme"==e.data?(S.close(),oSpP.putValueToDb("SPIDs",{type:"VapidSubscribed",value:1})):oSpP.storeSubscription(e.data))},!1),oSpP.getDbValue("SPIDs","SubscriptionId",function(e){void 0!==e.target.result&&"DENY"!=e.target.result.value&&oSpP.getDbValue("SPIDs","VapidSubscribed",function(e){void 0===e.target.result&&(v=!0,oSpP.addTransparentDiv(),oSpP.putValueToDb("SPIDs",{type:"VapidSubscribed",value:1}))})}),u)oSpP.getDbValue("SPIDs","SubscriptionId",function(e){void 0===e.target.result&&oSpP.getDbValue("SPIDs","PromptClosed",function(e){if(void 0===e.target.result)oSpP.getDbValue("SPIDs","VapidSubscribed",function(e){void 0===e.target.result&&oSpP.startDelayedSubscription(oSpP.showPrompt)});else{var t=parseInt(e.target.result.value);0==--t?(oSpP.deleteDbValue("SPIDs","PromptClosed"),oSpP.getDbValue("SPIDs","VapidSubscribed",function(e){void 0===e.target.result&&oSpP.startDelayedSubscription(oSpP.showPrompt)})):oSpP.putValueToDb("SPIDs",{type:"PromptClosed",value:t})}})});else for(var t=document.querySelectorAll("."+Z+"_notify_prompt"),o=0;o<t.length;o++)t[o].addEventListener("click",function(){oSpP.getDbValue("SPIDs","VapidSubscribed",function(e){void 0===e.target.result&&oSpP.showPopUp()})})},this.startSubscription=function(){},this.checkCookie=function(e){for(var t=e+"=",o=document.cookie.split(";"),i=0;i<o.length;i++){for(var s=o[i];" "==s.charAt(0);)s=s.substring(1);if(0==s.indexOf(t))return s.substring(t.length,s.length)}return""},this.checkSafariPermission=function(e){oSpP.log("[DD] Permissions: "+e.permission),"default"===e.permission?(P=!0,oSpP.getDbValue("SPIDs","PromptShowed",function(e){void 0===e.target.result?(oSpP.sendPromptStat("prompt_showed"),oSpP.putValueToDb("SPIDs",{type:"PromptShowed",value:1})):oSpP.sendPromptStat("prompt_showed_again")}),window.safari.pushNotification.requestPermission(a,o,{appkey:c},oSpP.checkSafariPermission)):"denied"===e.permission?P&&oSpP.sendPromptStat("prompt_denied"):"granted"===e.permission&&(oSpP.uns(),P&&oSpP.sendPromptStat("prompt_granted"),oSpP.subscribe())},this.subscribe=function(){},this.checkLocalSubsctoption=function(t){oSpP.log("[DD] subscribe :: subscriptionId: "+t),oSpP.getDbValue("SPIDs","SubscriptionId",function(e){void 0===e.target.result?(oSpP.sendSubscribeDataToServer(t,"subscribe"),oSpP.putValueToDb("SPIDs",{type:"SubscriptionId",value:t})):e.target.result.value!==t&&(oSpP.sendSubscribeDataToServer(e.target.result.value,"unsubscribe"),oSpP.sendSubscribeDataToServer(t,"subscribe"),oSpP.putValueToDb("SPIDs",{type:"SubscriptionId",value:t}))})},this.sendSubscribeDataToServer=function(e,t,o){var i=new XMLHttpRequest;i.open("POST",a,!0),i.setRequestHeader("Content-Type","application/json"),void 0===o&&((o={}).uname=oSpP.checkCookie("lgn"),o.os=oSpP.detectOs());var s=D;switch(d){case"firefox":s=""}o.variables=oSpP.getUserVariables();var n=window.location.href,r={action:"subscription",subscriptionId:e,subscription_action:t,subscription_type:s,appkey:c,browser:p,lang:oSpP.getBrowserlanguage(),url:n,custom_data:o,sPushHostHash:w};i.send(JSON.stringify(r))},this.isSafariNotificationSupported=function(){return"safari"in window&&"pushNotification"in window.safari},this.storeSubscription=function(e){oSpP.log("StoreSubscription: "+e),oSpP.putValueToDb("SPIDs",{type:"SubscriptionId",value:e})},this.clearDomain=function(e){return e.replace("://www.","://").replace("://www2.","://")},this.detectSite=function(){var e=!(-1===oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(i.toLowerCase())));return e=e||!(-1===oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(t.toLowerCase())))},this.getBrowserlanguage=function(){return navigator.language.substring(0,2)},this.getUserVariables=function(){for(var e={},t=document.querySelectorAll("input.sp_push_custom_data"),o=0;o<t.length;o++)switch(t[o].type){case"text":case"hidden":e[t[o].name]=t[o].value;break;case"checkbox":e[t[o].name]=t[o].checked?1:0;break;case"radio":t[o].checked&&(e[t[o].name]=t[o].value)}return e},this.showPopUp=function(){oSpP.removeTransparentDiv(),null!=S&&S.close(),u&&oSpP.sendPromptStat("prompt_granted");var e=580,t=580;v&&(t=e=1);var o=void 0!==window.screenLeft?window.screenLeft:screen.left,i=void 0!==window.screenTop?window.screenTop:screen.top,s=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,n=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,r=s/2-e/2+o,a=n/3-n/3+i,p=oSpP.getBrowserlanguage();""==p&&(p="en"),S=window.open(l+"/"+p+"/"+c+"/"+w,"_blank","scrollbars=yes, width="+e+", height="+t+", top="+a+", left="+r),window.focus&&S.focus(),m=setInterval(function(){S.postMessage("init",l),S.postMessage("initpage|"+window.location.href,l),S.postMessage("initvariables|"+JSON.stringify(oSpP.getUserVariables()),l)},100),u&&oSpP.closePrompt(!0)},this.addTransparentDiv=function(){var e=document.createElement("div");e.setAttribute("style","background: transparent;\nwidth: 100%;height: 100%;position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 999999;"),e.setAttribute("class",Z+"-resubscribe-div"),e.setAttribute("onclick","oSpP.showPopUp(); return false;"),document.body.insertBefore(e,document.body.firstChild)},this.removeTransparentDiv=function(){if(0<document.getElementsByClassName(Z+"-resubscribe-div").length){var e=document.getElementsByClassName(Z+"-resubscribe-div")[0];document.body.removeChild(e)}},this.showPrompt=function(){oSpP.getDbValue("SPIDs","PromptShowed",function(e){void 0===e.target.result?(oSpP.sendPromptStat("prompt_showed"),oSpP.putValueToDb("SPIDs",{type:"PromptShowed",value:1})):oSpP.sendPromptStat("prompt_showed_again")});var e=document.getElementsByTagName("head")[0],t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href="https://"+V+"/dist/css/push/"+X.toLowerCase()+"-prompt.min.css?v="+q,t.media="all",e.appendChild(t);var o,i=oSpP.getMessageLang(oSpP.getBrowserlanguage()),s=Z+"-popover",n="display:none;",r=!0;if(void 0!==Y&&0==Y&&(r=!1),0<z.length){var a='<svg style="display: none;"><symbol id="sp_bell_icon"><path d="M139.165 51.42L103.39 15.558C43.412 61.202 3.74 132.185 0 212.402h50.174c3.742-66.41 37.877-124.636 88.99-160.98zM474.98 212.403h50.173c-3.742-80.217-43.413-151.2-103.586-196.845L385.704 51.42c51.398 36.346 85.533 94.572 89.275 160.982zm-49.388 12.582c0-77-53.39-141.463-125.424-158.487v-17.09c0-20.786-16.76-37.613-37.592-37.613s-37.592 16.827-37.592 37.614v17.09C152.95 83.52 99.56 148.004 99.56 224.983v137.918L49.408 413.01v25.076h426.336V413.01l-50.152-50.108V224.984zM262.576 513.358c3.523 0 6.76-.22 10.065-1.007 16.237-3.237 29.825-14.528 36.06-29.626 2.517-5.952 4.05-12.494 4.05-19.54H212.4c0 27.593 22.582 50.174 50.174 50.174z" /></symbol></svg>';if("Sendbox"===X)var p='<img src="data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmNjEzODk7fS5jbHMtMntmaWxsOiMwMDg0ZmY7fS5jbHMtM3tmaWxsOiM0MDRhY2M7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5sb2dvLXNlbmRib3g8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMuMSw0LjE3SDguMjZhLjgyLjgyLDAsMCwwLDAtMS42NEgzLjFhLjgyLjgyLDAsMCwwLDAsMS42NFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00LjA4LDExSDMuNTNhLjgyLjgyLDAsMCwwLDAsMS42NGguNTVhLjgyLjgyLDAsMCwwLDAtMS42NFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xLjcyLDdIM0EuODIuODIsMCwwLDAsMyw1LjM5SDEuNzJBLjgyLjgyLDAsMCwwLDEuNzIsN1oiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMS40NiwxMUg2LjY4YS44Mi44MiwwLDAsMCwwLDEuNjRoNC43OGEuODIuODIsMCwwLDAsMC0xLjY0WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQuMDgsOC4yOEguODFhLjgyLjgyLDAsMCwwLDAsMS42NEg0LjA4YS44Mi44MiwwLDAsMCwwLTEuNjRaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNOC4wOCw5LjI0bC4xNi4wNy4xMywwSDguN2wuMTMsMEw5LDkuMjRIOWwyLjg2LTEuOTRBLjgyLjgyLDAsMSwwLDExLDUuOTNMOC41NCw3LjU4LDYuMSw1LjkzYS44NC44NCwwLDAsMC0xLjE2LjIuODMuODMsMCwwLDAsLjI1LDEuMTZMOCw5LjIzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE0LjE4LDIuNTNhLjgyLjgyLDAsMCwxLC44Mi44MnY4LjQ4YS44Mi44MiwwLDAsMS0uODIuODJIMTFBLjgyLjgyLDAsMCwxLDExLDExaDIuMzlWNC4xN0g3LjgzYS44Mi44MiwwLDAsMSwwLTEuNjRaIi8+PGVsbGlwc2UgY2xhc3M9ImNscy0zIiBjeD0iMTAuOTgiIGN5PSIxMS44MyIgcng9IjAuODEiIHJ5PSIwLjgyIi8+PGVsbGlwc2UgY2xhc3M9ImNscy0zIiBjeD0iNy44MyIgY3k9IjMuMzUiIHJ4PSIwLjgxIiByeT0iMC44MiIvPjwvc3ZnPg==">';else p='<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzAwQTJDMCIvPiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEzLjUwNjQgOC4wOTYzOVY4LjQzMzc0VjguNjAyNDFMMTMuNDkwMiA5SDExLjg1OUg4LjQxNTc5SDguMTIyMDZMOC4wODMyMiA4LjcwNzI1TDcuNTk3NjEgNS4zNDc1NUw1LjM5MDY0IDEzLjc0ODhMNS4zMjQ2NiAxNEg1LjA2NjI2SDMuODQ0MzJIMy41Nzg4OUwzLjUxNzgxIDEzLjc0MDNMMi4zNTA3MyA5SDAuMzM1NTA5SDBWOC43NTE3NVY3LjI2NDU3VjdIMC4zMzU1MDlIMy42MDg4OUgzLjg2MDUyTDMuODk2NjMgNy4xODc1NEw0LjQ5ODkgOS44NTM5N0w2Ljk3NDcyIDAuMjUyNjgyTDcuMDM5ODcgMEg3LjI5OTQ5SDguNTU0MDZIOC44NTExMUw4Ljg4NzEgMC4yOTY0NzdMOS43MjgxNSA3LjAxODg3SDExLjgyODlMMTIuMzE1OSA3LjAxODg2TDEyLjYzMDkgNy4wMTg4N0gxMy40OTAyTDEzLjUwNjQgNy4xODc1NFY3LjM1NjIyVjguMDk2MzlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBmaWxsPSJ3aGl0ZSIvPiAgICA8cGF0aCBkPSJNMTQuNDEyIDhDMTQuNDEyIDguOTc4MTQgMTMuNjIzMyA5Ljc3MTA4IDEyLjY1MDUgOS43NzEwOEMxMS42Nzc3IDkuNzcxMDggMTAuODg5MSA4Ljk3ODE0IDEwLjg4OTEgOEMxMC44ODkxIDcuMDIxODYgMTEuNjc3NyA2LjIyODkxIDEyLjY1MDUgNi4yMjg5MUMxMy42MjMzIDYuMjI4OTEgMTQuNDEyIDcuMDIxODYgMTQuNDEyIDhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==">';(s=(o=JSON.parse(z)).style)===Z+"-popover"&&(s=Z+"-native-popover");var l=document.createElement("div"),u=Z+"-prompt "+s;if(l.setAttribute("class",u),0<o.backgroundcolor.length&&s!=Z+"-fab"&&(n=n+"background-color: "+o.backgroundcolor+";"),l.setAttribute("style",n),(M=document.createElement("div")).setAttribute("class",Z+"-prompt-message"),(f=document.createElement("img")).setAttribute("class",Z+"-bell-icon"),f.setAttribute("width","14"),f.setAttribute("height","14"),f.setAttribute("src","https://"+V+"/img/push/icon-ring.svg"),r){(L=document.createElement("span")).setAttribute("class",Z+"-link-wrapper"),(O=document.createElement("a")).setAttribute("class",Z+"-link"),O.setAttribute("href",R),O.setAttribute("target","_blank");var c=document.createElement("span");s==Z+"-modal"&&c.setAttribute("style","color:"+o.textcolor+" !important;"),c.innerHTML=G[i],s!=Z+"-bar"&&(O.innerHTML=p),O.appendChild(c),L.appendChild(O)}if(s===Z+"-native-popover"){n=n+"color: "+o.textcolor+" !important;",l.setAttribute("style",n),void 0!==o.custom&&void 0!==o.custom.prompt_position&&(u+=" "+Z+"-pos-"+o.custom.prompt_position,l.setAttribute("class",u)),(A=document.createElement("div")).setAttribute("class",Z+"-native-info-inner "+Z+"-table-wrapper");var d=document.createElement("div");d.setAttribute("class",Z+"-cell"),f.setAttribute("src","https://"+V+o.icon),f.setAttribute("width","64"),f.setAttribute("height","64"),d.appendChild(f);var m=document.createElement("div");m.setAttribute("class",Z+"-cell");var S=document.createElement("div");S.setAttribute("class",Z+"-prompt-info "+Z+"-prompt-message-text"),S.innerHTML+=U,m.appendChild(S),A.appendChild(d),A.appendChild(m)}else if(s==Z+"-bar"){(A=document.createElement("div")).setAttribute("class",Z+"-prompt-info "+Z+"-prompt-message-text"),A.setAttribute("style","color: "+o.textcolor+" !important;"),A.innerHTML+=U;var b=document.createElement("span");M.innerHTML+=a+'<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="'+Z+'-bell-icon"><use class="'+Z+'-bell-path" style="fill: '+o.textcolor+' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>'}else if(s==Z+"-modal"||s==Z+"-safari"||s===Z+"-fab"){if((A=document.createElement("div")).setAttribute("class",Z+"-prompt-title "+Z+"-prompt-message-text"),0<o.textcolor.length&&A.setAttribute("style","color: "+o.textcolor+" !important;"),A.innerHTML=B,(b=document.createElement("div")).setAttribute("class",Z+"-prompt-info "+Z+"-prompt-message-text"),0<o.textcolor.length&&b.setAttribute("style","color: "+o.textcolor+" !important;"),b.innerHTML+=U,s==Z+"-safari"?(f.setAttribute("src","https://"+V+o.icon),f.setAttribute("width","64"),f.setAttribute("height","64"),M.appendChild(f)):s!=Z+"-fab"&&(M.innerHTML+=a+'<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="'+Z+'-bell-icon"><use class="'+Z+'-bell-path" style="fill: '+o.textcolor+' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>'),s==Z+"-fab"){if(void 0!==o.custom&&void 0!==o.custom.prompt_size&&"big"===o.custom.prompt_size){b=null,u=Z+"-prompt "+Z+"-floating-panel",l.setAttribute("class",u),M.setAttribute("style","background-color: "+o.btncolor+"; color: "+o.textcolor+" !important;"),M.setAttribute("onclick","oSpP.showPopUp(); return false;"),(A=document.createElement("div")).setAttribute("style","color: "+o.textcolor+" !important;"),A.setAttribute("class",Z+"-table-wrapper");var g=document.createElement("div");g.setAttribute("class",Z+"-cell");var P=document.createElement("a");P.innerHTML+='<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="'+Z+'-bell-icon"><use class="'+Z+'-bell-path bell-prompt-fab" style="fill: '+o.textcolor+' !important;" xlink:href="#sp_bell_icon" x="0" y="0">'+a+"</use></svg>",P.setAttribute("href","#"),g.appendChild(P);var h=document.createElement("div");h.setAttribute("class",Z+"-cell");var w=document.createElement("a");w.setAttribute("href","#"),w.innerHTML=B,h.appendChild(w),A.appendChild(g),A.appendChild(h);var D=document.createElement("div");D.setAttribute("class",Z+"-prompt-label"),(O=document.createElement("a")).setAttribute("href",R),O.setAttribute("target","_blank"),(c=document.createElement("span")).innerHTML=G[i],O.appendChild(c),D.appendChild(O)}else{var v=document.createElement("div");v.setAttribute("class",Z+"-prompt-fab"),0<o.btncolor.length&&v.setAttribute("style","background-color: "+o.btncolor+" !important;"),v.innerHTML+=a+'<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="'+Z+'-bell-icon" ><use class="'+Z+'-bell-path bell-prompt-fab" style="fill: '+o.iconcolor+' !important;" xlink:href="#sp_bell_icon" x="0" y="0" /></svg>',v.setAttribute("onclick","oSpP.showPopUp(); return false;")}void 0!==o.custom&&void 0!==o.custom.prompt_position&&(u+=" "+Z+"-fab-"+o.custom.prompt_position,l.setAttribute("class",u))}}}else{var M,A,f;(l=document.createElement("div")).setAttribute("class",Z+"-prompt "+s),l.setAttribute("style",n),(M=document.createElement("div")).setAttribute("class",Z+"-prompt-message"),(A=document.createElement("div")).setAttribute("class",Z+"-prompt-message-text"),A.innerHTML=H+" "+F[i],(b=document.createElement("div")).setAttribute("class",Z+"-prompt-info "+Z+"-prompt-message-text"),(f=document.createElement("img")).setAttribute("class",Z+"-bell-icon"),f.setAttribute("width","14"),f.setAttribute("height","14"),f.setAttribute("src","https://"+V+"/img/push/icon-ring.svg"),b.appendChild(f),b.innerHTML+=" "+W[i]}if(s!=Z+"-fab"){var I=document.createElement("div");I.setAttribute("class",Z+"-prompt-buttons");var y=document.createElement("button");y.setAttribute("class",Z+"-prompt-btn "+Z+"-accept-btn"),y.setAttribute("type","button"),y.setAttribute("onclick","oSpP.showPopUp(); return false;"),y.innerHTML=Q[i];var L,O,x=document.createElement("button");if(x.setAttribute("class",Z+"-prompt-btn "+Z+"-disallow-btn"),x.setAttribute("type","button"),x.setAttribute("onclick","oSpP.denyMessage(); return false;"),x.innerHTML=J[i],s!=Z+"-popover"&&(y.innerHTML=o.allowbtntext,x.innerHTML=o.disallowbtntext,s!=Z+"-safari"&&(y.setAttribute("style","background-color:"+o.buttoncolor+" !important;border-color:"+o.buttoncolor+" !important;"),x.setAttribute("style","color:"+o.buttoncolor+" !important;"))),0==z.length&&r)(L=document.createElement("span")).setAttribute("class",Z+"-link-wrapper"),(O=document.createElement("a")).setAttribute("class",Z+"-link"),O.setAttribute("href",R),O.setAttribute("target","_blank"),(c=document.createElement("span")).innerHTML=G[i],s==Z+"-modal"&&c.setAttribute("style","color:"+o.textcolor+" !important;"),O.appendChild(c),L.appendChild(O),I.appendChild(L);else r&&void 0!==L&&I.appendChild(L);if(s==Z+"-native-popover"){var N=document.createElement("div");N.setAttribute("class",Z+"-table-wrapper");var E=document.createElement("div");E.setAttribute("class",Z+"-cell"),r&&void 0!==L&&E.appendChild(L);var T=document.createElement("div");T.setAttribute("class",Z+"-cell"),T.appendChild(x);var C=document.createElement("div");C.setAttribute("class",Z+"-cell"),C.appendChild(y),N.appendChild(E),N.appendChild(T),N.appendChild(C),I.appendChild(N)}else I.appendChild(x),I.appendChild(y);if(r&&s==Z+"-modal"){var j=document.createElement("div");j.innerHTML="&nbsp;",I.appendChild(j)}}if(M.appendChild(A),void 0!==b&&null!=b&&s!=Z+"-native-popover"&&M.appendChild(b),s!=Z+"-fab"?(M.appendChild(I),s==Z+"-bar"&&r&&void 0!==L&&l.appendChild(L),l.appendChild(M)):void 0!==o.custom.prompt_size&&"big"===o.custom.prompt_size?(l.appendChild(M),r&&void 0!==D&&l.appendChild(D)):(r&&void 0!==L&&M.appendChild(L),l.appendChild(M),l.appendChild(v)),s!=Z+"-popover"&&s!=Z+"-safari"&&s!=Z+"-fab"){var _=document.createElement("button");_.setAttribute("class",Z+"-prompt-close"),_.setAttribute("onclick","oSpP.closePrompt(); return false;"),_.setAttribute("style","color:"+o.textcolor+" !important;"),_.innerHTML="&times;",l.appendChild(_)}if(document.body.insertBefore(l,document.body.childNodes[0]),s==Z+"-modal"){var k=document.createElement("div");k.setAttribute("class",Z+"-prompt-backdrop"),k.setAttribute("style","display:none;"),document.body.insertBefore(k,document.body.childNodes[1])}setTimeout(function(){l.className+=l.className?" show-prompt":"show-prompt"},1e3)},this.denyMessage=function(){oSpP.sendPromptStat("prompt_denied"),oSpP.storeSubscription("DENY"),oSpP.closePrompt(!0)},this.closePrompt=function(e){void 0===e&&oSpP.sendPromptStat("prompt_closed"),0<document.getElementsByClassName(Z+"-prompt").length&&document.body.removeChild(document.querySelector("."+Z+"-prompt")),0<document.getElementsByClassName(Z+"-prompt-backdrop").length&&document.body.removeChild(document.querySelector("."+Z+"-prompt-backdrop")),oSpP.putValueToDb("SPIDs",{type:"PromptClosed",value:5})},this.initDb=function(t){if(r)t();else{var e=(window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB).open(X.toLowerCase()+"_push_db",2);e.onsuccess=function(e){r=e.target.result,t()},e.onupgradeneeded=function(e){e.target.result.createObjectStore("SPIDs",{keyPath:"type"})}}},this.getDbValue=function(e,t,o){oSpP.initDb(function(){r.transaction([e],"readonly").objectStore(e).get(t).onsuccess=o})},this.putValueToDb=function(e,t){oSpP.initDb(function(){r.transaction([e],"readwrite").objectStore(e).put(t)})},this.deleteDbValue=function(e,t){oSpP.initDb(function(){r.transaction([e],"readwrite").objectStore(e).delete(t)})},this.log=function(e){},this.detectBrowser=function(){var e,t=navigator.userAgent,o=t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[],i=t.match(/(edge(?=\/))\/?\s*(\d+)/i)||[];return"Edge"===i[1]?{name:i[1],version:i[2]}:/trident/i.test(o[1])?{name:"IE",version:(e=/\brv[ :]+(\d+)/g.exec(t)||[])[1]||""}:"Chrome"===o[1]&&null!=(e=t.match(/\bOPR\/(\d+)/))?{name:"Opera",version:e[1]}:(o=o[2]?[o[1],o[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(e=t.match(/version\/(\d+)/i))&&o.splice(1,1,e[1]),{name:o[0],version:o[1]})},this.isMobileYandexBrowser=function(){var e=navigator.userAgent;e.match(/(opera|yabrowser|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);return"YaBrowser"===(e.match(/(YaBrowser(?=\/))\/?\s*(\d+)/i)||[])[1]&&("iOS"==oSpP.detectOs()||"Android"==oSpP.detectOs())},this.detectOs=function(){return-1!=navigator.userAgent.indexOf("Windows")?"Windows":-1!=navigator.userAgent.indexOf("Android")?"Android":-1!=navigator.userAgent.indexOf("Linux")?"Linux":-1!=navigator.userAgent.indexOf("iPhone")?"iOS":-1!=navigator.userAgent.indexOf("Mac")?"Mac OS":-1!=navigator.userAgent.indexOf("FreeBSD")?"FreeBSD":""},this.uns=function(){oSpP.deleteDbValue("SPIDs","SubscriptionId")},this.getMessageLang=function(e){return"ua"==(e=e.substring(0,2).toLowerCase())||"uk"==e?"ua":"ru"==e?"ru":"de"==e?"de":"en"},this.push=function(e,t){if(!oSpP.detectSite())return oSpP.log("Application allowed only for "+i),!1;b[e]=t,oSpP.getDbValue("SPIDs","SubscriptionId",function(e){void 0===e.target.result?g=g||setInterval(function(){oSpP.getDbValue("SPIDs","SubscriptionId",function(e){void 0!==e.target.result&&(oSpP.sendUpdatesToServer(e.target.result.value),clearInterval(g),g=!1)})},1e3):oSpP.sendUpdatesToServer(e.target.result.value)})},this.sendUpdatesToServer=function(e){var t=D;switch(d){case"safari":case"firefox":t=""}var o=new XMLHttpRequest;o.open("POST",a,!0),o.setRequestHeader("Content-Type","application/json");var i={action:"subscription",subscriptionId:e,subscription_type:t,subscription_action:"update_variables",appkey:c,sPushHostHash:w,custom_data:{variables:b}};o.send(JSON.stringify(i))},this.sendPromptStat=function(e){},this.getPromptDelay=function(){return parseInt(e)},this.getSettingsShowByVisitNumber=function(){return parseInt(h)},this.startDelayedSubscription=function(t){if(0<parseInt(e))var o=setInterval(function(){oSpP.getDbValue("SPIDs","PromptDelay",function(e){void 0!==e.target.result?(new Date).getTime()>=e.target.result.value&&(clearInterval(o),t()):(clearInterval(o),t())})},1e3);else t()},this.getAuthEmailFromUrl=function(){var e=window.location.href,t=new RegExp("[?&]spush(=([^&#]*)|&|#|$)").exec(e);if(t&&t[2]){var o=atob(decodeURIComponent(t[2].replace(/\+/g," ")));void 0!==o&&0<o.length&&oSpP.push("email",o)}},this.getVisitsCount=function(){var t=1;oSpP.getDbValue("SPIDs","VisitsCount",function(e){void 0===e.target.result||(t=e.target.result.value,t+=1),oSpP.putValueToDb("SPIDs",{type:"VisitsCount",value:t}),t>=oSpP.getSettingsShowByVisitNumber()&&oSpP.initPrompt()})},this.initPrompt=function(){0<oSpP.getPromptDelay()?oSpP.getDbValue("SPIDs","PromptDelay",function(e){void 0===e.target.result&&oSpP.putValueToDb("SPIDs",{type:"PromptDelay",value:(new Date).getTime()+1e3*oSpP.getPromptDelay()}),oSpP.start()}):oSpP.start(),oSpP.getAuthEmailFromUrl()}}window.addEventListener("load",function(){1<oSpP.getSettingsShowByVisitNumber()?oSpP.getVisitsCount():oSpP.initPrompt()});var oSpP=new oPromptPush;