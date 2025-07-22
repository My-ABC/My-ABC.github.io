document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-card[data-repo]').forEach(function(card) {
    const repo = card.getAttribute('data-repo');
    if (!repo) return;
    fetch(`https://api.github.com/repos/${repo}`)
      .then(res => res.json())
      .then(data => {
        const starSpan = card.querySelector('.star-count');
        if (starSpan) {
          if (typeof data.stargazers_count === 'number') {
            starSpan.textContent = data.stargazers_count;
          } else {
            starSpan.textContent = 0;
          }
        }
      })
      .catch(() => {
        const starSpan = card.querySelector('.star-count');
        if (starSpan) starSpan.textContent = 0;
      });
  });
});
