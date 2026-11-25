
// ================= HOME =================
window.onload = function () {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (window.location.pathname.includes("html.html")) {
        if (isLoggedIn !== "true") {
            window.location.href = "Login.html";
        } else {
            const user = JSON.parse(localStorage.getItem("user"));
            document.getElementById("welcome").innerText = "Welcome " + user.name;
        }
    }
}

// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "Login.html";
}


let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}
function orderNow(btn) {
    let carName = btn.parentElement.querySelector(".car-name").innerText;

    alert(carName + " successfully ordered");
}





const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true 
});

sr.reveal('.text', { origin: 'left' });
sr.reveal('.form-container', { delay: 600, origin: 'bottom' });
sr.reveal('.heading', { delay: 400 });
sr.reveal('.ride-container .box', { delay: 600, interval: 200 });
sr.reveal('.copyright', { delay: 400, origin: 'bottom' });

sr.reveal('.about-img', { origin: 'left', delay: 400 });
sr.reveal('.about-text', { origin: 'right', delay: 600 });
sr.reveal('.services-container .box', { interval: 200 });

const signupForm = document.getElementById('signupForm');
const signupName = document.getElementById('fullName');
const signupEmail = document.getElementById('email');
const signupPassword = document.getElementById('password');
const signupConfirm = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('termsCheckbox');
const signupMessage = document.getElementById('signupMessage');


function showSignupMessage(msg, type) {
    if (signupMessage) {
        signupMessage.innerHTML = `<div class="alert-msg alert-${type}">${msg}</div>`;
        setTimeout(() => signupMessage.innerHTML = '', 3000);
    }
}


function clearSignupErrors() {
    const errors = document.querySelectorAll('.error-msg');
    errors.forEach(el => el.textContent = '');
    const inputs = document.querySelectorAll('#signupForm input');
    inputs.forEach(el => el.classList.remove('error'));
}


function validateSignupName(name) {
    if (!name.trim()) return 'Full name is required';
    if (name.trim().length < 3) return 'Name must be at least 3 characters';
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return 'Only letters and spaces allowed';
    return '';
}


function validateSignupEmail(emailVal) {
    if (!emailVal.trim()) return 'Email is required';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(emailVal.trim())) return 'Enter a valid email address';
    return '';
}


function emailExistsInStorage(emailVal) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(u => u.email === emailVal.trim().toLowerCase());
}


function validateSignupPassword(pass) {
    if (!pass) return { isValid: false, msg: 'Password is required', strength: '' };
    if (pass.length < 6) return { isValid: false, msg: 'Password must be at least 6 characters', strength: '' };
    
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    let strengthHtml = '';
    if (score < 2) strengthHtml = '<span class="weak">🔒 Weak password</span>';
    else if (score === 2) strengthHtml = '<span class="medium">👍 Medium password</span>';
    else strengthHtml = '<span class="strong">✅ Strong password!</span>';
    
    return { isValid: true, msg: '', strength: strengthHtml };
}


if (signupPassword) {
      signupPassword.addEventListener('input', () => {
    const result = validateSignupPassword(signupPassword.value);
    const strengthDiv = document.getElementById('strengthText'); 
     if (strengthDiv) strengthDiv.innerHTML = result.strength;
     });
}


if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
e.preventDefault();
 clearSignupErrors();
 const nameVal = signupName.value;
const emailVal = signupEmail.value;
const passVal = signupPassword.value;
const confirmVal = signupConfirm.value; 
let hasError = false;
 const nameErr = validateSignupName(nameVal);
 if (nameErr) {
 document.getElementById('nameError').textContent = nameErr;
signupName.classList.add('error');
 hasError = true;
 }


const emailErr = validateSignupEmail(emailVal);
 if (emailErr) {
document.getElementById('emailError').textContent = emailErr;
signupEmail.classList.add('error');
 hasError = true;
} else if (emailExistsInStorage(emailVal)) {
    document.getElementById('emailError').textContent = 'This email is already registered';
signupEmail.classList.add('error');
hasError = true;
 }

        const passResult = validateSignupPassword(passVal);
        if (!passResult.isValid) {
            document.getElementById('passwordError').textContent = passResult.msg;
            signupPassword.classList.add('error');
            hasError = true;
        }
        

        if (!confirmVal) {
            document.getElementById('confirmError').textContent = 'Please confirm your password';
            signupConfirm.classList.add('error');
            hasError = true;
        } else if (passVal !== confirmVal) {
            document.getElementById('confirmError').textContent = 'Passwords do not match';
            signupConfirm.classList.add('error');
            hasError = true;
        }
        
       
       if (termsCheckbox && !termsCheckbox.checked) {
    document.getElementById('termsError').textContent = 'You must agree before continuing';
    hasError = true;
}
        
        if (!hasError) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({
                id: Date.now(),
                name: nameVal.trim(),
                email: emailVal.trim().toLowerCase(),
                password: passVal,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('users', JSON.stringify(users));
            
            showSignupMessage(`✅ Welcome ${nameVal.trim()}! Account created. Redirecting...`, 'success');
            signupForm.reset();
            const strengthDiv = document.getElementById('strengthText');
            if (strengthDiv) strengthDiv.innerHTML = '';
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showSignupMessage('Please fix the errors above', 'error');
        }
    });
}

const goTologin = document.getElementById('goTologin');
if (goTologin) {
    goTologin.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html';
    });
}

    window.onload = function() {
        let params = new URLSearchParams(window.location.search);
        let productName = params.get("product");

        if(productName){
            document.getElementById("product").value = productName;
        }
    }

   
    document.getElementById("orderForm").addEventListener("submit", function(e){
        e.preventDefault();

        let product = document.getElementById("product").value.trim();
        let quantity = document.getElementById("quantity").value;
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();

        
        if(product === "" || quantity === "" || phone === "" || address === ""){
            alert("❌ Please fill all fields");
            return;
        }

        if(phone.length !== 11 || !phone.startsWith("01")){
            alert("❌ Enter valid Egyptian phone number");
            return;
        }

        
        let order = {
            product,
            quantity,
            phone,
            address
        };

        localStorage.setItem("lastOrder", JSON.stringify(order));


        document.getElementById("successMsg").style.display = "block";

        document.getElementById("orderForm").reset();
    });

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailVal = document.getElementById('loginEmail').value.trim().toLowerCase();
        const passVal = document.getElementById('loginPassword').value;
        
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
      
        const user = users.find(u => u.email === emailVal && u.password === passVal);
        
        if (user) {
            alert(`Welcome back, ${user.name}!`);
      
            window.location.href = '#home';
        } else {
            alert('❌ Invalid email or password. Please try again.');
        }
    });
}
function signup(event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem(user.email, JSON.stringify(user));
    console.log("Saved user:", user);
    window.alert("Account created successfully!");
    localStorage.setItem("loggedIn", "true");
    window.location.href="html.html";
}
function clearSignupErrors() {
    const errors = document.querySelectorAll('.error-msg');
    errors.forEach(el => el.textContent = '');

    const inputs = document.querySelectorAll('#signupForm input');
    inputs.forEach(el => el.classList.remove('error'));

    document.getElementById('termsError').textContent = '';
}
// ================= LOGIN =================
function login(event) {
    event.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try{
        
        const savedUser = JSON.parse(localStorage.getItem(email));

        console.log(localStorage.getItem(email));
        if (savedUser && email === savedUser.email && password === savedUser.password) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "html.html";
        } else {
           window.alert("Wrong email or password");
        }
    }catch (error) {
        alert("No account has been found")
    } 
    
}

// ================= HOME =================
window.onload = function () {
    const isLoggedIn = localStorage.getItem("loggedIn");

        document.getElementById("logLink").innerText = "" ;
        document.getElementById("logLink").addEventListener("click", function(event) {
    event.preventDefault(); 
});
        document.getElementById("homebuttons").style.backgroundColor="#ffff";
        document.getElementById("signeLink").innerText = "" ;
document.getElementById("signeLink").addEventListener("click", function(event) {
    event.preventDefault(); 
});
    if (window.location.pathname.includes("service.html")||window.location.pathname.includes("ordernow.html")) {
        if (isLoggedIn !== "true") {
            window.location.href = "login.html";

        }//  else {
            


        // }
    }
}

// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "html.html";
}

function send (){
    const mas = document.getElementById("product").value;
    window.alert("you order is: "+mas);
}