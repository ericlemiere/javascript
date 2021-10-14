
function checkVal() {
    var inpObj = document.getElementById("id1");
    if (!inpObj.checkValidity()) {
        document.getElementById("numVal").innerHTML = inpObj.validationMessage;
    }
}