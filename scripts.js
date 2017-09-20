let addItems = document.querySelector('.add-items');
let itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
let selectButton = document.querySelector('#select');
let clearButton = document.querySelector('#clear');

function addItem(e) {
  e.preventDefault();
  let text = (this.querySelector('[name=item]')).value; // this = this form
  let item = {
    text: text,
    done: false
  };
  // console.log(item);
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));

  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li class="checkbox">
        <input type="checkbox" data-index=${i} id="item-${i}" ${plate.done ? 'checked' : ''} />
        <label for="item-${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) {
    return; // skip this unless it's an input
  }

  let el = e.target;
  let index = el.dataset.index;
  console.log(items);
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function selectAll() {
  items.forEach(item => {
    console.log(item);
    item.done = true;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  });
}

function clearAll() {
  items.forEach(item => {
    console.log(item);
    item.done = false;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  });
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
selectButton.addEventListener('click', selectAll);
clearButton.addEventListener('click', clearAll);

populateList(items, itemsList);
