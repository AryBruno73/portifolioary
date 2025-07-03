const showHiddenPasswordConfirm = () => {
    const inputPassword = document.getElementById("login-pass")
    const loginEye = document.getElementById("login-eye")
    const inputPasswordConfirm = document.getElementById("login-pass-confirm")
    const loginEyeConfirm = document.getElementById("login-eye-confirm");

    loginEye.addEventListener("click", () => {
        //change password to text
        if (inputPassword.type === "password") {
            //switch to text
            inputPassword.type = "text";
            loginEye.classList.remove("ri-eye-off-line");
            loginEye.classList.add("ri-eye-line");
        } else {
            inputPassword.type = "password"
            loginEye.classList.remove("ri-eye-line");
            loginEye.classList.add("ri-eye-off-line");
        }
    });

loginEyeConfirm.addEventListener("click", ()=> {
    //change password to text
    if (inputPasswordConfirm.type === "password") {
        //switch to text
        inputPasswordConfirm.type = "text"
        loginEyeConfirm.classList.remove("ri-eye-off-line");
        loginEyeConfirm.classList.add("ri-eye-line");
    }else {
        inputPasswordConfirm.type = "password";
        loginEyeConfirm.classList.remove("ri-eye-line");
        loginEyeConfirm.classList.add("ri-eye-off-line");
    }
});
};

showHiddenPasswordConfirm();







