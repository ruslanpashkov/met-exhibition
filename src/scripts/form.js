'use strict';

const form = document.getElementById('contact-us-form');

function handleFormSubmit(event) {
  event.preventDefault();
  form.reset();
}

form.addEventListener('submit', handleFormSubmit);
