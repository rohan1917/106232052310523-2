//console.log("Hello World");
// const state = {
//     taskList: [
//         // const taskList = [
//         {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//          {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//          {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//          {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//          {
//             image: "",
//             title: "",
//             type: "",
//             description: "",
//         },
//     ]
// }


const state = {
    taskList: [],
};

// DOM 
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

console.log(taskContents);
console.log(taskModal);


const htmlTaskContent = ({id, title, description, type, url}) => `
    <div class='col-md-6 col-lg-4 mt-3'  id=${id} key=${id}>
        <div class='card shadow task__card'>
            <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
                <button type='button' class='btn btn-outline-info mr-2' name=${id}><i class='fas fa-pencil-alt'></i></button>
                <button type='button' class='btn btn-outline-danger mr-2' name=${id}><i class='fas fa-trash-alt'></i></button>
            </div>
            <div class='card-body'>
                ${
                    url && 
                     `<img src=${url} alt='card image class='card-img-top md-3 rounded-md' />`
                }
                <h4 class='card-title'>${title}</h4>
                <p class='card-text text-muted'>${description}</p>
                <div class='tags d-flex flex-wrap'>
                    <span class='badge text-white bg-primary m-1'>${type}</span>
                </div>
            </div>
           <div class='card-footer'>
                <button type='button' class='btn btn-outline-primary float-end' data-bs-toggle='modal' 
                data-bs-target='#showTask'>Open Task</button>
            </div>
        </div>
    </div>
`



const htmlModalContent = ({id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
        ${
                    url && 
                     `<img src=${url} alt='card image class='img-fluid rounded place__holder__image mb-3'  />`
                }
        <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>    
         <h4 class='my-2'>${title}</h4>  
          <p class='lead text-muted'>${description}</p>  
    </div>
    `
};


const updateLocalStorage = () => {
    localStorage.setItem('task', JSON.stringify({
        tasks:  state.taskList,
    }));
};


const loadInitialData = () => {
 const localStorageCopy = JSON.parse(localStorage.task);

 if(localStorageCopy) state.taskList = localStorageCopy.tasks;

//  <!-- beforebegin -->
// <p>
//   <!-- afterbegin -->
//   foo
//   <!-- beforeend -->
// </p>
// <!-- afterend -->
// https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML


 state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML()
 })
 
};