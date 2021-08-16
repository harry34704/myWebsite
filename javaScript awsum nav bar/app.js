const sections = document.querySelectorAll('section');
const bubble = document.querySelector('.bubble');
const gradients = [
    "linear-gradient(to right top, #f46b45, #eea849)",
    "linear-gradient(to right top, #005c97, #363795)",
    "linear-gradient(to right top, #e53935, #e35d5b)"
];
//intersection observer

const options = {
    threshold: 0.7
};

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries){
    entries.forEach(entry =>{

    const className= entry.target.className;
    const activeAnchor = document.querySelector(`[data-page = ${className}]`);
    const gradientIndex = entry.target.getAttribute('data-index');
    const cords = activeAnchor.getBoundingClientRect();
    const directions= {
        height: cords.height,
        width: cords.width,
        top: cords.top,
        left: cords.left,
    };
    if (entry.isIntersecting){
        bubble.style.setProperty('left',`${directions.left}px`);
        bubble.style.setProperty('top',`${directions.top}px`);
        bubble.style.setProperty('width',`${directions.width}px`);
        bubble.style.setProperty('height',`${directions.height}px`);
        bubble.style.background= gradients[gradientIndex];
    };
    });

}

sections.forEach(section =>{
    observer.observe(section);
});
function showMessage(input, message,type){
//get the small element and set the message
const msg =input.parentNode.querySelector("small");
msg.innerText= message;
//update class for the input

input.className=type ? "success":"error";
return type;
}
function showError(input,message){
    return showMessage(input,massage,false);
}

function showSuccess(input){
    return showMessage(input,",true");
}
function hasValue(input,message){
    if (input.value.trim() ===""){
        return showError(input,message);
    }
    return showSuccess(input);
}
function validateEmail(input, requiredMsg, invalidMsg){
    //check if the value is not empty
    if (!hasValue(input.requiredMsg)){
        return false;
    }
    // validate email format
    const emailRegex=
    /^(([^<>()\[\]\\.,,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z]{2,}))$/;

    const email = input.value.trim();
    if (!emailRegex.test(email)){
        return showError(input,invalidMsg);
    }
    return true;

}
const form = document.querySelector("#signup");

const NAME_REQUIRED = "please enter your name";
const EMAIL_REQUIRED = "please enter your email";
const EMAIL_INVALID = "please enter a correct email address format";

form.addEventListener("submit", function (event){

    event.preventDefault();

    let nameValid= hasValue(form.elements["name"],NAME_REQUIRED);
    let emailValid= validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);

    if (nameValid && emailValid){
        alert("Demo only. No form was posted.");
    }
});
