// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const Entries = [];

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry, index) => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        newPost.addEventListener('click', () => {
          router.setState('single-entry', newPost, index+1, false);
        });

        Entries.push(newPost);
      });
    });
});

const settings_icon = document.querySelector("[alt='settings']");

settings_icon.addEventListener('click', () => {

  router.setState('settings', null, null, false);

});

const title = document.querySelector('header > h1');

title.addEventListener('click', () => {
  
  router.setState("", null, null, false);
  
});

window.addEventListener('popstate', (event) => {
  console.log(history);
  console.log("location: " + document.location);

  let state = document.location.hash;
  if(state == "#settings"){
    router.setState('settings', null, null, true);
  }
  else if(state == ""){
    router.setState("", null, null, true);
  }
  else{
    router.setState('single-entry', Entries[state.charAt(state.length - 1) - 1], state.charAt(state.length - 1), true);
  }
});