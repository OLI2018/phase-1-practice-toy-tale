
let addToy = false;
document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

function fetchCards()
{
fetch("http://localhost:3000/toys")
.then((resp)=>resp.json())
.then((toys)=>showCards(toys))
.catch((error)=>console.log(error))
}
fetchCards();

//the function is calling createNewCards() to create divs for all the elelemnts inside URL database
//then we loop to display all the cards from the API 
function showCards(toys)

{
  for(let i=0;i<toys.length;i++)
  {
   createNewCards(toys[i]); /// define  index for the toys[i] for the loop to run thru all toys 
  }
}
// createNewCards() will create structure of a new card so that everytime we use 
// the POST fetch, and this function will be invoked inside the .then it will create new 
//structure for new card
const toyCollection=document.getElementById("toy-collection");

function createNewCards(toys)
{
  const createDiv=document.createElement("div");
   createDiv.className="card";

  const h2=document.createElement("h2");
   h2.innerHTML=toys.name;


  const img=document.createElement("img");
   img.className="toy-avatar";
   img.src=toys.image;

  let para=document.createElement("p");
   para.innerHTML=toys.likes;

   para.id="collect-likes"


  let btn=document.createElement("button");
   btn.className="like-btn";
   btn.id=toys.id;

   btn.innerText="Like <3"


// ----------------------------

   btn.addEventListener("click",(e)=>{
     e.preventDefault();
    let collectPvalue = e.target.previousElementSibling // get the previous elements of btn that is p tag
    let likeCount = parseInt(collectPvalue.innerText)+1; // converts the value of p tag into integer
    collectPvalue.innerHTML=likeCount; // after it has fetched it should update the p tag's inner value
    fetch(`http://localhost:3000/toys/${e.target.id}`,{
     method:"PATCH",
     headers:{
       "Content-Type":"application/json",
       "Accept":"application/json"
     },
     body:JSON.stringify({
       "likes": likeCount
     })
   }).then((resp)=>resp.json())
  })
  createDiv.append(h2,img,para,btn);
  toyCollection.append(createDiv);
}
//created these IDs in the HTML file, but can be created by JS using set attribute
const forms=document.querySelector(".add-toy-form");  

forms.addEventListener("submit",(e)=>{
  const toyName=document.getElementById("toy-name");
  const toyUrl=document.getElementById("toy-url");
  e.preventDefault();
  alert("Create Toy has been clicked")
  fetch("http://localhost:3000/toys",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
      },
      body:JSON.stringify({
        "name":toyName.value,
        "image":toyUrl.value,
        "likes":0
      })
    }).
    then((resp)=>resp.json())
    .then((toy)=>createNewCards(toy))
    .catch((err)=>console.log(err))
    e.target.reset();
})
});
