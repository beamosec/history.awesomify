/**
 * A class for finding a website’s favicon URL, if any. Requires a context, like
 * a browser extension, that allows cross-origin requests.
 * <br />
 * <br />
 * Copyright 2012, 2013 Disconnect, Inc.
 * <br />
 * <br />
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at <a
 * href="https://mozilla.org/MPL/2.0/">https://mozilla.org/MPL/2.0/</a>.
 * <br />
 * @constructor
 * @param {string} [alt] A default favicon URL, absolute or relative.
 * @author <a href="https://github.com/byoogle">Brian Kennish</a>
 */
function Favicon(t){this.getAlt=function(){return t},this.setAlt=function(e){return t=e,this},this.get=function(t,c){var s=this.getAlt();typeof s!=u&&c(s);var d=setInterval(function(){if(typeof jQuery!=u){clearInterval(d),t.indexOf("/")+1&&(f.href=t,t=f.hostname);for(var h,l=t.slice(t.indexOf(".")+1),v=0;i>v;v++)for(var p=-1;o>p;p++)for(var y=0;a>y;y++)s=e[v]+(p+1?n[p]+l:t)+r[y],jQuery.get(s,function(t,e,n){var r=n.getResponseHeader("Content-Type");!h&&r&&r.indexOf("image/")+1&&t&&(h=!0,c(s))}).bind(s)}},100);return this};var e=["http://"],n=["","www."],r=["/favicon.ico"],i=e.length,o=n.length,a=r.length,f=document.createElement("a"),u="undefined";if(typeof jQuery==u){var c=document.createElement("script");c.setAttribute("type","text/javascript"),c.setAttribute("src","vendor/jquery.js"),c.onload=function(){jQuery.noConflict()},document.head.appendChild(c)}return this}