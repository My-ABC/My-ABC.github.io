document.addEventListener('DOMContentLoaded', function() {
  fetch('/projects.json')
    .then(res => res.json())
    .then(data => {
      data.repos.forEach(repoData => {
        const repoCard = document.querySelector(`.project-card[data-repo="${repoData.full_name}"]`);
        if (!repoCard) return;
        
        // 更新 star 数
        const starSpan = repoCard.querySelector('.star-count');
        if (starSpan) starSpan.textContent = repoData.stargazers_count || 0;
        
        // 更新语言（需要额外请求 /languages）
        const langSpan = repoCard.querySelector('.lang');
        if (langSpan) {
          langSpan.textContent = repoData.language || '未知';
          
          // 如果需要显示所有语言（异步加载）
          fetch(`/repos/${repoData.full_name.replace('/', '_')}.json`)
            .then(res => res.json())
            .then(details => {
              if (details.languages) {
                const langs = Object.keys(details.languages);
                langSpan.textContent = langs.join('/') || '未知';
              }
            });
        }
      });
    });
});