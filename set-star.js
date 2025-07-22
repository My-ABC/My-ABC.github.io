document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-card[data-repo]').forEach(function(card) {
    const repo = card.getAttribute('data-repo');
    if (!repo) return;
    fetch(`https://api.github.com/repos/${repo}`)
      .then(res => res.json())
      .then(data => {
        // 更新 star 数量
        const starSpan = card.querySelector('.star-count');
        if (starSpan) {
          if (typeof data.stargazers_count === 'number') {
            starSpan.textContent = data.stargazers_count;
          } else {
            starSpan.textContent = 0;
          }
        }
        // 获取所有语言
        fetch(`https://api.github.com/repos/${repo}/languages`)
          .then(res => res.json())
          .then(langs => {
            const langSpan = card.querySelector('.lang');
            if (langSpan) {
              let langList = Object.keys(langs);
              // 主语言优先
              if (data.language && langList.includes(data.language)) {
                langList = [data.language, ...langList.filter(l => l !== data.language)];
              }
              langSpan.textContent = langList.length ? langList.join('/') : (data.language || '未知');
            }
          })
          .catch(() => {
            const langSpan = card.querySelector('.lang');
            if (langSpan) langSpan.textContent = data.language || '未知';
          });
      })
      .catch(() => {
        const starSpan = card.querySelector('.star-count');
        if (starSpan) starSpan.textContent = 0;
        const langSpan = card.querySelector('.lang');
        if (langSpan) langSpan.textContent = '未知';
      });
  });
});