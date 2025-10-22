

// Greeting update 
const greeting = document.getElementById('greeting');
const userName = prompt("Enter your name:");
if (userName) greeting.textContent = `Hello, ${userName}!`;



// Rating stars
const stars = document.querySelectorAll('#stars span');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
   
    stars.forEach(s => s.classList.remove('active'));

   
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('active');
    }
  });
});


// Quotes (array + higher-order function)
const quotes = [
  "Keep going, you're doing great!",
  "Every day is a new beginning.",
  "Smile, it confuses people.",
  "Progress, not perfection.",
  "You are stronger than you think."
];

const quoteBtn = document.getElementById('quoteBtn');
const quoteText = document.getElementById('quoteText');

quoteBtn.addEventListener('click', () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = randomQuote;
  quoteText.style.transform = 'scale(1.1)';
  setTimeout(() => (quoteText.style.transform = 'scale(1)'), 200);
});

// Sound on click
const soundBtn = document.getElementById('soundBtn');
const clickSound = document.getElementById('clickSound');

soundBtn.addEventListener('click', () => {
  clickSound.play();
});

// Switch statement example
const hour = new Date().getHours();
let timeGreeting;

switch (true) {
  case hour < 12:
    timeGreeting = "Good morning!";
    break;
  case hour < 18:
    timeGreeting = "Good afternoon!";
    break;
  default:
    timeGreeting = "Good evening!";
}
console.log(timeGreeting);