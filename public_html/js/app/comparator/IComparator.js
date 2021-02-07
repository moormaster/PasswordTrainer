class IComparator{
    constructor() {}
    
    /*
     * compares obj1 to obj2
     * 
     * returns
     *      -1 if obj1 is null or obj1 < obj2
     *      0  if obj1 is equally to obj2
     *      1  if obj1 > obj2 or obj2 is null
     */
    compare(obj1, obj2) {}
}

if (typeof exports == "object")
    exports.IComparator = IComparator;
