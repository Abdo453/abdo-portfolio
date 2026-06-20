function checkQuiz(btn, selectedOption) {
  var container = btn.closest('.quiz-container');
  var correctOption = container.getAttribute('data-correct');
  
  // Disable all buttons in this quiz
  var buttons = container.querySelectorAll('.quiz-option');
  buttons.forEach(function(b) {
    b.disabled = true;
    b.style.opacity = '0.7';
  });
  
  if (selectedOption === correctOption) {
    btn.style.background = 'var(--success)';
    btn.innerHTML += ' ✅ Correct!';
  } else {
    btn.style.background = 'var(--error)';
    btn.innerHTML += ' ❌ Incorrect';
    
    // Highlight the correct one
    buttons.forEach(function(b) {
      if (b.getAttribute('onclick').includes("'" + correctOption + "'")) {
        b.style.background = 'var(--success)';
        b.style.opacity = '1';
      }
    });
  }
}
