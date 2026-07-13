const msgs = document.querySelectorAll('.welcome-msg');
let i = 0;
setInterval(() => {
  msgs[i].style.display = 'none';
  i = (i + 1) % msgs.length;
  msgs[i].style.display = 'flex';
}, 5000);
