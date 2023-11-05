        function showLoading() {
            const searchButton = document.getElementById('searchButton');
            const loadingSpinner = document.getElementById('loadingSpinner');
            searchButton.disabled = true;
            searchButton.style.cursor = 'not-allowed';
            document.getElementById('searchText').style.display = 'none';
            loadingSpinner.style.display = 'inline-block';
        }

        function hideLoading() {
            const searchButton = document.getElementById('searchButton');
            const loadingSpinner = document.getElementById('loadingSpinner');
            searchButton.disabled = false;
            searchButton.style.cursor = 'pointer';
            document.getElementById('searchText').style.display = 'inline';
            loadingSpinner.style.display = 'none';
        }

      function truncateSynopsis(text, maxLength) {
        if (text.length > maxLength) {
          const truncatedText = text.slice(0, maxLength);
          const remainingText = text.slice(maxLength);
          return `<div class="synopsis-content">${truncatedText}... <span class="read-more-btn" onclick="expandSynopsis(this)">Read more...</span><span class="remaining-text" style="display: none">${remainingText}</span></div>`;
        }
        return text;
      }

      function expandSynopsis(button) {
        const synopsisContent = button.parentElement;
        const remainingText = synopsisContent.querySelector('.remaining-text');
        synopsisContent.classList.add('expanded');
        remainingText.style.display = 'inline';
        button.style.display = 'none';
      }

        function searchanimes(query) {
            if (!query) {
                alert('Please enter a anime name before searching.');
                return;
            }

            showLoading();

            fetch(`https://api.yanzbotz.my.id/api/movie/myanime?query=${query}`)
                .then(response => response.json())
                .then(data => {
                    const animeResults = document.getElementById('animeResults');
                    animeResults.innerHTML = '';

                    data.result.forEach(anime => {
                        const genres = anime.genres.join(', ');
                        const rate = `${anime.score} / 10 ⭐️`;
                        const status = `Type: ${anime.type}`;

                      const truncatedSynopsis = truncateSynopsis(anime.synopsis, 100);

                        const card = `
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div class="card">
                                    <img src="${anime.thumbnail}" class="card-img-top" alt="${anime.title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${anime.title}</h5>
                                        <p class="card-text">Rate: ${rate}</p>
                                        <p class="card-text">Studio: ${anime.studio}</p>
                                        <p class="card-text">Genres: ${genres}</p>
                                        <p class="card-text">Season: ${anime.season}</p>
                                        <div class="card-synopsis">${truncatedSynopsis}</div>
                                        <a href="detail.html?anime=${encodeURIComponent(anime.url)}"
                                            class="btn btn-primary btn-block">Detail</a>
                                    </div>
                                </div>
                            </div>
                        `;
                        animeResults.innerHTML += card;
                    });

                    hideLoading();
                })
                .catch(error => console.error(error));
        }

        document.getElementById('searchButton').addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput');
            const query = searchInput.value;
            searchanimes(query);
        });

        document.getElementById('searchInput').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const searchInput = document.getElementById('searchInput');
                const query = searchInput.value;
                searchanimes(query);
            }
        });
