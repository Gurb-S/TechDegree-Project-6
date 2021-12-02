/************************************************
Gurbakhash Sandhu
Project 5 - Data Pagination and Filtering

v1 - 12-01-21

v2 - ???
*************************************************/

const overlay = document.getElementById('overlay');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const login = document.getElementById('login');
/**
 * has the user login to be able to access the rest of the site
 */
login.addEventListener('click',(e) =>{
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    const emailRegex = /^[^@]+\@[^@.]+\.[a-z]+$/i.test(emailValue);
    const passwordRegex = /\d{3}[a-z]{3}./i.test(passwordValue);
    if(emailRegex && passwordRegex){
        showPage(data,1);
        addPagination(data);
        overlay.remove();
    }
});