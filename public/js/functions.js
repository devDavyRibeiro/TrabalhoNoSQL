window.addEventListener("load",()=>{
    if(!localStorage.getItem('token')){
        let navBarLiks = document.querySelectorAll("li a");
        for (let i = 2; i < navBarLiks.length; i++) {
            navBarLiks[i].style.display = "none";
        }
    }
})