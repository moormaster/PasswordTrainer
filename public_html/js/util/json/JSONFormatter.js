if (typeof require == "function")
    IJSONFormatter = require('./IJSONFormatter.js').IJSONFormatter;

class JSONFormatter extends IJSONFormatter {
    constructor() {
        super();
    }
    
    format (JSONStr) {
        if (!JSONStr)
            return "";
            
        var result = "";
        
        var indent = "";
        var startIndex = 0;
        var isInsideStringLiteral = false;
        
        while (JSONStr.length > startIndex) {
            var currentIndex = startIndex;
            
          
            while (JSONStr.length > currentIndex) {
                // skip escaped characters
                if (isInsideStringLiteral && JSONStr[currentIndex] == "\\") {
                    currentIndex += 2;
                    continue;
                }
                
                // check for string literal
                if (JSONStr[currentIndex] == "\"")
                    isInsideStringLiteral = !isInsideStringLiteral;
                
                // move cursor until first occurence of ',',  '{' or '}'
                if (!isInsideStringLiteral && ",{}".indexOf(JSONStr[currentIndex]) >= 0)
                    break;
                    
                currentIndex++;
            }
        
            result += JSONStr.substring(startIndex, currentIndex);
            startIndex = currentIndex;
            
            if (JSONStr.length <= startIndex)
                continue;
        
            switch(JSONStr[currentIndex]) {
                case ",":
                    result += JSONStr[currentIndex];
                    result += "\n" + indent;
                    
                    break;
                
                case "{":
                    indent += "\t";
                    
                    result += JSONStr[currentIndex];
                    result += "\n" + indent;
                    
                    break;
                
                case "}":
                    indent = indent.substring(0, indent.length-1);
                    result += "\n" + indent;
                    result += JSONStr[currentIndex];
                    
                    break;
            };
            
            startIndex++;
        };
        
        return result;
    }
};

if (typeof exports == "object")
    exports.JSONFormatter = JSONFormatter;
