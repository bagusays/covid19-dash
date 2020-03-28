const UniversalVariable = {}

let UniversalFunction = {}

UniversalFunction.addComma = function(n) {
    if(n == null) {
        return "";
    }

    let val = n;
    if(val != "") {
        let valArr = val.split(',');
        valArr[0] = (parseInt(valArr[0],10)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        val = valArr.join(',');
    }

    return val;
}

export { UniversalFunction, UniversalVariable };