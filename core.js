
// fetchParentWithClass traverses parents until it finds one
// that contains the specified class or else returns undefined
let fetchParentWithClass = function(element, className) {
  while (element && !element.classList.contains(className)) {
    element = element.parentElement;
  }
  return element;
}

let form = document.querySelector('form');

let colexpButton = document.createElement('input');
colexpButton.setAttribute('type', 'button');
colexpButton.value = 'exp/col parent';

colexpButton.addEventListener('click', function(){
  let toHide = document.querySelectorAll('img:not([width="0"])');
  for (img of toHide) {
    let commentRow = fetchParentWithClass(img, 'comtr');
    if(commentRow) {
      commentRow.classList.toggle('noshow');
    }
  }
  //alert('lala');
});


// Adds a space afer the "add comment" button
form.appendChild( document.createTextNode( '\u00A0' ) );
form.appendChild(colexpButton)



// Process anchor toggles
let commHeads = document.querySelectorAll('.comhead');
for (chead of commHeads) {
  let childExpandToggle = document.createElement('a');
  childExpandToggle.classList.add('togg');
  childExpandToggle.innerHTML = '[*]'
  childExpandToggle.setAttribute('href', 'javascript:void(0)');

  childExpandToggle.addEventListener('click', function() {
    let parent = fetchParentWithClass(this.parentElement,'comtr');
    if (parent) {
      let sibling = parent.nextElementSibling;
      while (sibling) {
        // Found the next parent post, break loop
        if(sibling.querySelectorAll('img[width="0"]').length > 0) {
          break;
        }
        sibling.classList.toggle('noshow');
        sibling = sibling.nextElementSibling;
      }
    }
  });
  chead.appendChild(childExpandToggle);
}

chrome.storage.sync.get(['toggleValue'], function(items) {
  if (items.toggleValue == true) {
    colexpButton.click()
  }
});