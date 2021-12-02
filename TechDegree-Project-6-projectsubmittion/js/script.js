/*
Treehouse Techdegree: Data Pagination and Filtering
*/
const header = document.querySelector('header');
const ulStudentList = document.querySelector('.student-list');
const uLlinkList = document.querySelector('.link-list');
const itemsPerPage = 9; //now you can easily adjust the number of items you want per page
/** 
*Create the `showPage` function
*This function will create and insert/append the elements needed to display a "page" of nine students.
*It takes in an array of objects and a number as arguements. The array of objects contains the information
* for the students and the number is the page number those students will be displayed on. Only 9 students 
* can be displayed per page. So the first 9 students will be displayed on page 1 and the next 9 students on the
* second page and so on. 
* @param {array} list  - takes in an array of objects
* @param {number} page - takes in a number to be used as the page number 
**/
function showPage(list,page){
   ulStudentList.innerHTML = '';
   const startIndex = ((page * itemsPerPage) - itemsPerPage);
   const endIndex = (page * itemsPerPage);
   for(let i =0; i < list.length;i++){
      if(i >= startIndex && i < endIndex){
         const studentList = `<li class="student-item cf">
                                 <div class="student-details">
                                    <img class="avatar" src=${list[i].picture.thumbnail} alt='Profile Picture'>
                                    <h3>${list[i].name.first} ${list[i].name.last}</h3>
                                    <span class="email">${list[i].email}</span>
                                 </div>
                                 <div>
                                    <span class="date">Joined ${list[i].registered.date}</span>
                                 </div>
                              </li>`;
         ulStudentList.insertAdjacentHTML('beforeend',studentList);
      }
   }
}

/** 
*Create the `addPagination` function
*This function will create and insert/append the elements needed for the pagination buttons.
*It first creates the pagination btns for the page. It takes the length of the array passed in 
* and divides it by the desired items per page. In this orginal file this is 42 / 9 and while 42/9 
* is only 4.6. Since there is a remainder, it adds an addition btn to include the few items that are left over.
*Then is calls the showPage function passing in the same arguement that was passed into this function and passing 
* in the textcontent of the selcted pagination btn which would be a number from 1 to (length of array / items per page)
* @param {array} list  - takes in an array of objects
**/
function addPagination(list){
   uLlinkList.innerHTML = '';
   const numOfPagination = (list.length / itemsPerPage);
   for(let i =0; i < numOfPagination; i++){
      const paginationBtn =  `<li>
                                 <button type='button'>${i+1}</button>
                              </li>`;
      uLlinkList.insertAdjacentHTML('beforeend',paginationBtn);
   }
   uLlinkList.firstElementChild.firstElementChild.className = 'active';
   
   uLlinkList.addEventListener('click',(e)=>{
      const btnClicked = e.target;
      const paginationLi = uLlinkList.children;
      if(btnClicked.tagName === 'BUTTON'){
         for(const li of paginationLi){
            li.children[0].className = '';
         }
         showPage(list,e.target.textContent);
         btnClicked.className = 'active';
      }
   });
   
}


// Call functions
/**
*the data array[] from the js file data.js and the number 1 is passed into the showPage function
*The purpose of this is to have the initial 9 items(profiles) displayed on the page.
**/
showPage(data,1);
/**
 * the data array[] from the js file data.js is passed into the addPagination function
 * The purpose of this is too have the pagination created and be ready to be clicked by the user
 */
addPagination(data);


/**
 * Search Bar
 * This creates the search element that is displayed on the page. 
 * The purpose of creating every element individually and not simply using a templete
 * literal was just to have multiple ways of creating elements with JavaScript
 */
const span = document.createElement('span');
span.textContent = 'Search by name';
const input = document.createElement('input');
input.id = 'search';
input.placeholder = 'Search by name...';
const button = document.createElement('button');
button.type = 'submit';
const img = document.createElement('img');
img.src = 'img/icn-search.svg';
img.alt = 'Search icon';
const label =document.createElement('label');
label.htmlFor = 'search';
label.className = 'student-search';
const form = document.createElement('form');
form.action = '#';
form.method = 'get';
form.id = 'searchStudents';
label.appendChild(span);
label.appendChild(input);
button.appendChild(img);
label.appendChild(button);
form.appendChild(label);
header.appendChild(form);


/**
 * Search Button functionality
 * The reason the search input and search btn are defined here and not the top is 
 * because they have just been created and did not exist at the begining of the js file
 * so it was cause an error
 */
const search = document.getElementById('search');
const searchBtn = search.nextElementSibling;
//personal styling decisions
searchBtn.style.backgroundColor = 'purple';
search.style.backgroundColor = 'lightpink';
/**
 * `searchResults` function 
 * Takes in an array of objects and check if the first or last name of the students 
 *  in the array has any characters that match the text the user has entered in the search bar.
 * If so add that student to an array[] along with any other students that matched the text
 *  in the search bar.
 * Then call the showPage function and display those students
 * If not then get rid of the students on the page and display text indicating no results were found
 * Then it creates pagination btns depending on the number of items displayed on the page
 * @param {array} list - an array of objects 
 */
function searchResults(list){
   //gets rid of the No results found text. Without this evertime no results are found
   //the text will be displayed on the screen along with everything else. 
   header.nextElementSibling.textContent = '';
   const newList = [];
   const searched = search.value.toLowerCase();
   for(let i = 0; i < list.length;i++){
      const userFullName = list[i].name.first.toLowerCase() + list[i].name.last.toLowerCase();
      if (userFullName.includes(searched)) {
         newList.push(list[i]);
      }
   }
   if (newList.length) {
      showPage(newList,1);
   } else {
      showPage(newList,1);
      const noResults = `<h3 class='no-results'>No results found...</h3>`;
      header.insertAdjacentHTML('afterend',noResults);
   }
   addPagination(newList);
}

/**
 * event listener for when text is in the search box and either "Enter" is clicked
 * on the keyboard or the search icon on the screen is clicked
 */
searchBtn.addEventListener('click',(e)=>{ searchResults(data) });
/**
 * same as the previous event listener but runs everytime a key is clicked and released
 * This results on constant update on the screen for every character typed
 */
search.addEventListener('keyup',(e)=>{ searchResults(data) });

