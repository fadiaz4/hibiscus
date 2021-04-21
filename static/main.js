function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
// Open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}
/*
***** login functionality begin
*/
function checkLogin() {
    var user = document.getElementById("user").value;
    var password = document.getElementById("passw").value;
    var userArray = JSON.parse(localStorage.getItem("aUserArray"));
    if (user !== null && user !== "") {
        if (password !== null && password !== "") {
            var canLogin = checkLoginInfo(user, password, userArray);
            if (canLogin === true) {
                //need a method to get the role and send it into createSessionUser below
                var role = getUserRole(user, password, userArray)
                createSessionUser(user, password, role)
                if (role == "admin") {
                    //window.location.href = "http://localhost:5000/dashboardadmin";
                    window.location.href = "https://hibiscussv.herokuapp.com/dashboardadmin";
                } else {
                    window.location.href = "https://hibiscussv.herokuapp.com/dashboardclient";
                }
            } else {
                alert("password must not be empty");
            }
        } else {
            alert("user must not be empty");
        }
    }
    function checkLoginInfo(user, password, userArray) {
        if (userArray !== null && userArray.length > 0) {
            for (var i = 0; i < userArray.length; i++) {
                if (userArray[i].user === user && userArray[i].password === password) {
                    return true;
                }
            }
        }
        return false;
    }
}

function getUserRole(pUser, pPassword, pUserArray) {
    var role = ""
    if (pUserArray !== null && pUserArray.length > 0) {
        var length = pUserArray.length
        for (var i = 0; i < length; i++) {
            if (pUserArray[i].user === pUser && pUserArray[i].password === pPassword) {
                role = pUserArray[i].role
                break
            }
        }
    }
    return role
}

function createSessionUser(user, password, role) {
    var logged_user = {
        user: user,
        password: password,
        role: role
    };

    sessionStorage.setItem("loggedUser", JSON.stringify(logged_user));
}

/*
***** login functionality end
*/


/*
*** register functionality begin
*/

function registerNewUser() {
    var reg_user = document.getElementById("user_reg").value;
    var reg_password = document.getElementById("passw_reg").value;
    var reg_role = "client";

    //alert(reg_user);
    var userArray = [];

    if (localStorage.getItem("aUserArray") !== null) {
        userArray = JSON.parse(localStorage.getItem("aUserArray"));
    }

    var current_reg = {
        user: reg_user,
        password: reg_password,
        role: reg_role
    };

    userArray.push(current_reg);

    localStorage.setItem("aUserArray", JSON.stringify(userArray));

    //window.location.href = "http://localhost:5000/login"
    window.location.href = "https://hibiscussv.herokuapp.com/login";
}

/*
*** register functionality end
*/