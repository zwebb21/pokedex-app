// Get all h2s
const text = document.getElementsByTagName('h2');

// This is the trigger element
const revealTrigger = document.getElementById('revealTrigger');

// This is the hidden element
const revealText = document.getElementById('reveal');

console.log(revealText);

// Add click listener to trigger
revealTrigger.addEventListener('click', () => {
    if (revealText.style.display === 'none' || revealText.style.display === '') {
        revealText.style.display = 'block'
        revealText.style.transitionDuration = 2.5;
    } else {
        revealText.style.display = 'none';
    }
});

// Add hover effects to all h2s
for (let i = 0; i < text.length; i++) {
  text[i].addEventListener('mouseover', () => {
    text[i].style.backgroundColor = 'red';
    text[i].style.color = 'white';
    text[i].style.transition = '0.5s';
    text[i].style.transform = 'scale(1.1)';
  });

  text[i].addEventListener('mouseout', () => {
    text[i].style.backgroundColor = 'white';
    text[i].style.color = 'black';
    text[i].style.transition = '0.5s';
    text[i].style.transform = 'scale(1)';
  });
}
