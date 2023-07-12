// selectors
const toggles = document.querySelectorAll(".settings [type='checkbox']");

// event listeners
toggles.forEach((toggle) => {
  toggle.addEventListener("change", (e) => {
    console.log(e.target);
  });
});
