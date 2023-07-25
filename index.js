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
                <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
                <i class='fas fa-trash-alt'></i></button>
            </div>
            <div class='card-body'>
                ${
                    url ?
                     `<img src=${url} alt='card image class='card-img-top md-3 rounded-md' />`
                     :
                     `<img src="https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180" alt='card image class='card-img-top md-3 rounded-md' />`
                }
                <h4 class='card-title'>${title}</h4>
                <p class='card-text text-muted'>${description}</p>
                <div class='tags d-flex flex-wrap'>
                    <span class='badge text-white bg-primary m-1'>${type}</span>
                </div>
            </div>
           <div class='card-footer'>
                <button type='button' class='btn btn-outline-primary float-end' data-bs-toggle='modal' 
                data-bs-target='#showTask' id=${id} onclick='openTask.apply(this, arguments)'>Open Task</button>
            </div>
        </div>
    </div>
`



const htmlModalContent = ({id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
        ${
                    url ?
                     `<img src=${url} alt='card image class='img-fluid rounded place__holder__image mb-3'  />`
                     :
                       `<img src="https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180" alt='card image class='card-img-top md-3 rounded-md' />`
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
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
 });
};


const handleSubmit = () =>{
    const id = `${Date.now()}`
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        type: document.getElementById('tags').value,
    };

    if(input.title === '' || input.description=== '' || input.type===''){
        return alert("Please fill out the all the necessary fileds!");
    }
    taskContents.insertAdjacentHTML(
        "beforeend", htmlTaskContent({...input, id, })
    );

    state.taskList.push({...input, id});
    updateLocalStorage();
}


// Default img
// https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180



// Opening modal from the cards
const openTask = (e) => {
    if(!e) e = window.event;
    
    //console.log("event" , e);

    const getTask = state.taskList.find(({id}) => id === e.target.id);
     taskModal.innerHTML= htmlModalContent(getTask)
}



// CRUD => Delete Operation
const deleteTask = (e) => {
    if(!e) e = window.event;
    const targetID = e.target.getAttribute("name");
    // console.log(e.target);
    const type = e.target.tagName;
    console.log(type);
    const removeTask = state.taskList.filter(({id}) => id !== targetID);
    // console.log(removeTask);
    state.taskList = removeTask;
    
    console.log("updated arr", state.taskList);

    updateLocalStorage();
// I was 
    if(type === "BUTTON"){
        // console.log(e.target.parentNode.parentNode.parentNode);
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    }else if(type==="I"){
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
        );
        }
//  updateLocalStorage();
}