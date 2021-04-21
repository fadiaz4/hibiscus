/*
preload information to local storage users
*/
function preLoadUsers() {

    var userArray = [{
        user: "ale",
        password: "123",
        role: "admin"
    }]

    localStorage.setItem("aUserArray", JSON.stringify(userArray))
}

preLoadUsers()