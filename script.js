const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const favFood = [
  "chicken murg mussalam",
  "chicken tikka",
  "chicken tandoori",
  "chilly chicken",
  "fried fish",
  "magaj",
  "matar paneer",
  "butter chicken",
  "chicken masala",
  "chilly paneer",
  "momos",
];

//store list items
const listItems = [];

let dragStartIndex;
createList();

//Insert list items into DOM
function createList() {
  [...favFood]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((food, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `<span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="food-name">${food}</p>
        </div>
        `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}
function dragOver(e) {
  e.preventDefault();
  // console.log("over");
}
function dragDrop() {
  this.classList.remove("over");
  dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  // console.log("drop");
}
// swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragLeave() {
  this.classList.remove("over");
}
function dragEnter() {
  this.classList.add("over");
}

//check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const foodName = listItem.querySelector(".draggable").innerText.trim();
    console.log(foodName, favFood[index]);
    if (foodName !== favFood[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
