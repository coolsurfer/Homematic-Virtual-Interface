//
//  HomematicParameter.js
//  Homematic Virtual Interface Core
//
//  Created by Thomas Kluge on 20.11.16.
//  Copyright © 2016 kSquare.de. All rights reserved.
//

"use strict";
var logger = require(__dirname + "/logger.js").logger("HomematicParameter");

var HomematicParameter = function(jsonElement) {
  
  this.name = jsonElement["name"];
  this.type = jsonElement["type"];
  this.max = jsonElement["max"];
  this.min = jsonElement["min"];
  this.vdefault= jsonElement["vdefault"];
  this.control = jsonElement["control"]
  this.flags = jsonElement["flags"];
  this.operations = jsonElement["operations"];
  this.tab_order = jsonElement["tab_order"];
  this.unit = jsonElement["unit"];
  this.valuelist = jsonElement["valuelist"];
  
  if (jsonElement["value"] != undefined ) {
	  this.value =  jsonElement["value"];
  } else {
	  this.value =  this.vdefault;
  }
  //logger.debug("Adding Parameter " +  this.name);
}

HomematicParameter.prototype.getDescription = function() {
   var result = {};
   
   if (this.control != undefined ) {
   	result['CONTROL'] = this.control;
   }

   result['FLAGS'] = this.flags;
  
   result['ID'] = this.name;
   
   switch(this.type) {
     
     case "FLOAT":
	    result['MIN'] = {"explicitDouble":this.min || 0};
		result['MAX'] = {"explicitDouble":this.max || 0};
		result['DEFAULT'] = {"explicitDouble":this.vdefault || 0 };
     break;
     
     case "STRING":
	   	 result['MIN'] = this.min || "";
	   	 result['MAX'] = this.max || "";
	   	 result['DEFAULT'] = this.vdefault || "";

     break;
     
     
     default:
   	 result['MIN'] = this.min;
   	 result['MAX'] = this.max;
     result['DEFAULT'] = this.vdefault;
   }
   
   result['OPERATIONS'] = this.operations;
   result['TAB_ORDER'] = this.tab_order;
   result['TYPE'] = this.type;
   
   // Encoding WA
   
   if (this.unit == "C") {
	   this.unit = String.fromCharCode(176,67)
   }

   
   result['UNIT'] = this.unit;
   
   if (this.valuelist != undefined) {
	   result['VALUE_LIST'] = this.valuelist;
   }
   
   return result;

}

HomematicParameter.prototype.getPValue = function() {
  
  switch(this.type) {
     
     case "FLOAT":
	    return {"explicitDouble":this.value || 0 };
     break;
     
     case "BOOL":
		return (this.value == 0) ? false:true;
     break;
     
     default:
     return this.value;
   }
}


module.exports = {
  HomematicParameter : HomematicParameter
}
