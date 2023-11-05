        function fetchanimeDetail() {
            const urlParams = new URLSearchParams(window.location.search);
            const url = urlParams.get("url");

            if (!url) {
                alert('Invalid anime detail request.');
                return;
            }

            fetch(`https://api.yanzbotz.my.id/api/movie/myanimedl?url=${url}`)
                .then(response => response.json())
                .then(data => {
                    const animeDetail = document.getElementById('animeDetail');
                    animeDetail.innerHTML = '';

                    const animeData = data.result.infoData;
                    const episodes = data.result.episodes;

                    const card = `
                        <div class="col-12">
                            <div class="card">
                                <div class="anime-img-container">
                                    <img src="${animeData.thumbnail}" class="anime-img" alt="${animeData.title}">
                                    <div class="anime-details">
                                        <h5 class="card-title glass-title">${animeData.title}</h5>
                                        <p class="card-text">Type: ${animeData.type}</p>
                                        <p class="card-text">Japanese Title: ${animeData.japaneseTitle}</p>
                                        <p class="card-text">Status: ${animeData.status}</p>
                                        <p class="card-text">Rating: ${animeData.rating} / 10 ⭐</p>
                                        <p class="card-text">Viewed Count: ${animeData.viewedCount}</p>
                                        <p class="card-text">Duration: ${animeData.duration}</p>
                                        <p class="card-text">Broadcast Time: ${animeData.broadcastTime}</p>
                                    </div>
                                </div>
                                <div class="row">
    ${episodes.map(episode => `
        <div class="col-12 col-md-4 episode-card">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title glass-title">${episode.title}</h5>
                    <div class="d-flex flex-wrap">
                        ${episode.downloadLinks.map(link => `
                            <a href="${link.url}" target="_blank" class="card-link">
                                <button type="button" class="btn btn-info btn-md mt-2 mb-2 mr-2">${link.text}</button>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('')}
</div>`;

                    animeDetail.innerHTML = card;
                })
                .catch(error => console.error(error));
        }

        fetchanimeDetail();
