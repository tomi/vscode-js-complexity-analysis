"use strict";

module.exports = function t(s,d){
 for(var p in d)
   s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
 return s;
}
