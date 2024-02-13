// contentScript.js

// Function to create the copy button
function createCopyButton(element) {
  var button = document.createElement('button');
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.998 1h-13.998c-1.099 0-1.994.895-1.994 1.994v17.012c0 1.099.895 1.994 1.994 1.994h13.998c1.099 0 1.994-.895 1.994-1.994v-17.012c0-1.099-.895-1.994-1.994-1.994zm-3.009 17.01l-4.991-4.987-4.989 4.989v-12.01h9.979v12.008z"/></svg>';
  button.style.backgroundColor = 'red';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.padding = '5px';
  // button.style.marginLeft = '10px';
  // button.style.marginRight = '10px'; // Position to the right
  button.style.cursor = 'pointer';
  button.style.right = '10px';
  button.style.position = 'absolute';
  button.onclick = function (event) {
    event.stopPropagation();
    var content = element.textContent;
    copyToClipboard(content, button);
  };
  element.appendChild(button);
}

// Function to copy text to clipboard
function copyToClipboard(text, button) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.998 1h-13.998c-1.099 0-1.994.895-1.994 1.994v17.012c0 1.099.895 1.994 1.994 1.994h13.998c1.099 0 1.994-.895 1.994-1.994v-17.012c0-1.099-.895-1.994-1.994-1.994zm-3.009 17.01l-4.991-4.987-4.989 4.989v-12.01h9.979v12.008z"/></svg>';
  button.style.backgroundColor = 'green'; // Change background color to indicate success
  setTimeout(function() {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.998 1h-13.998c-1.099 0-1.994.895-1.994 1.994v17.012c0 1.099.895 1.994 1.994 1.994h13.998c1.099 0 1.994-.895 1.994-1.994v-17.012c0-1.099-.895-1.994-1.994-1.994zm-3.009 17.01l-4.991-4.987-4.989 4.989v-12.01h9.979v12.008z"/></svg>';
    button.style.backgroundColor = 'red'; // Revert background color after a delay
  }, 2000); // Revert back to original icon and color after 2 seconds
}

// MutationObserver to detect changes in the DOM
var observer = new MutationObserver(function(mutationsList, observer) {
  for(var mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Check if any new target elements have been added
      var newElements = document.querySelectorAll('.p-4.overflow-y-auto:not(:has(button))');
      newElements.forEach(function(newElement) {
        createCopyButton(newElement);
      });
    }
  }
});

// Start observing changes in the DOM
observer.observe(document.body, { childList: true, subtree: true });
