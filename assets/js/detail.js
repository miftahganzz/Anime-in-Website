      function fetchAnimeDetail() {
          const urlParams = new URLSearchParams(window.location.search);
          const anime = urlParams.get("anime");

          if (!anime) {
              alert('Invalid anime detail request.');
              return;
          }

          fetch(`https://api.yanzbotz.my.id/api/movie/myanime-detail?url=${anime}`)
              .then(response => response.json())
              .then(data => {
                  const animeDetail = document.getElementById('animeDetail');
                  animeDetail.innerHTML = '';

                  if (data.result && data.result.result) {
                      const animeData = data.result.result;
                      const animeData2 = data.result.seriesInfo;
                      const alone = data.result.genreList;
                      const episodes = data.result.episodeList;
                      const infoList = data.result.seriesInfo.infoList;

                      const infoListItems = infoList.map(item => {
                          return `<p class="card-text">${item.label}: ${item.value}</p>`;
                      }).join('');

                      const card = `
                          <div class="col-12">
                              <div class="card">
                                  <div class="anime-img-container">
                                      <img src="${animeData.thumbnail}" class="anime-img" alt="${animeData.seriesTitle}">
                                      <div class="anime-details">
                                          <h5 class="card-title glass-title">${animeData.seriesTitle}</h5>
                                          <p class="card-text">Type: ${animeData.seriesType}</p>
                                          <p class="card-text">Series: ${animeData.seriesTitleJapanese}</p>
                                          <p class="card-text">Status: ${animeData.seriesStatus}</p>
                                          <p class="card-text">Rating: ${animeData.ratingValue} / 10 ⭐</p>
                                          <p class="card-text">Favorite Count: ${animeData.favoriteCount}</p>
                                          <p class="card-text">Synopsis: ${animeData.synopsis}</p>
                                      </div>
                                  </div>
                                  <hr />
                                  <h5 class="card-title glass-title"><i class="bi bi-info-lg"></i> Series Info</h5>
                                  <p class="card-text">Title: ${animeData2.title}</p>
                                  <p class="card-text">Japanese Title: ${animeData2.japaneseTitle}</p>
                                  <p class="card-text">Status: ${animeData2.status}</p>
                                  <p class="card-text">Rate: ${animeData2.rating}</p>
                                  <p class="card-text">Favorite: ${animeData2.favoritesCount}</p>
                                  ${infoListItems}
                                  <p class="card-text">Genre: ${alone.join(', ')}</p>
                              </div>
                          </div>
                      `;

                      const episodeCards = episodes.map((episode, index) => `
                          <div class="col-12 col-md-4 episode-card">
                              <div class="card">
                                  <div class="card-body">
                                      <h5 class="card-title glass-title">${episode.episodeTitle}</h5>
                                      <p class="card-text">Episode: ${episode.episodeNumber}</p>
                                      <p class="card-text">Date: ${episode.episodeDate}</p>
                                      <a href="${episode.episodeLink}" target="_blank" class="card-link"><button type="button" class="btn btn-info btn-md">Watch Episode</button></a>
                                  </div>
                              </div>
                          </div>
                      `).join('');

                      animeDetail.innerHTML += card;

                      const downloadLinks = data.result.result.downloadLinks;
                      if (downloadLinks) {
                          const downloadCard = `
                              <div class="col-12">
                                  <div class="card">
                                      <div class="card-body">
                                          <h5 class="card-title glass-title">Download</h5>
                                          <p class="card-text">Type: Episode</p>
                                          <a href="${downloadLinks.Episode ? `download.html?url=${encodeURIComponent(downloadLinks.Episode)}` : '#'}" class="card-link">
                                              <button type="button" class="btn btn-info btn-md">${downloadLinks.Episode ? 'Download Episode' : 'Tidak Tersedia'}</button>
                                          </a>
                                          <p class="card-text">Type: Batch</p>
                                          <a href="${downloadLinks.Batch ? `download.html?url=${encodeURIComponent(downloadLinks.Batch)}` : '#'}" class="card-link">
                                              <button type="button" class="btn btn-info btn-md">${downloadLinks.Batch ? 'Download Batch' : 'Tidak Tersedia'}</button>
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          `;
                          animeDetail.innerHTML += downloadCard;
                      }

                      animeDetail.innerHTML += episodeCards;
                  }
              })
              .catch(error => console.error(error));
      }

      fetchAnimeDetail();
