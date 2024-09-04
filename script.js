document.addEventListener('DOMContentLoaded', function() {
    // Data dummy untuk demonstrasi
    const dummyData = {
        rekomendasi: Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            title: `Artikel Rekomendasi ${i + 1}`,
            author: `Penulis ${i + 1}`,
            date: `${i + 1} hari yang lalu`,
            category: 'Berita',
            views: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 100),
            likes: Math.floor(Math.random() * 500),
            avatar: 'images/unnam.jpg',
            thumbnail: 'images/example.jpg'
        })),
        terbaru: Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            title: `Artikel Terbaru ${i + 1}`,
            author: `Penulis ${i + 1}`,
            date: `${i + 1} jam yang lalu`,
            category: 'Update',
            views: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 100),
            likes: Math.floor(Math.random() * 500),
            avatar: 'images/unnam.jpg',
            thumbnail: 'images/example.jpg'
        }))
    };

    // Mengatur state untuk setiap tab
    const state = {
        rekomendasi: {
            page: 1,
            perPage: 10,
            isLoading: false,
            hasMore: true
        },
        terbaru: {
            page: 1,
            perPage: 10,
            isLoading: false,
            hasMore: true
        }
    };

    function createArticleCard(article) {
        const card = document.createElement('div');
        card.classList.add('article-card');
    
        card.innerHTML = `
            <div class="article-card__header">
                <div class="article-card__userinfo">
                    <div class="user-card-md">
                        <a href="#" class="user-card__link">
                            <div class="user-card__avatar">
                                <img src="${article.avatar}" alt="${article.author}" class="user-card__avatar-image">
                            </div>
                            <div class="user-card__info">
                                <span class="user-card__name">${article.author}</span>
                                <p class="article-card__info">
                                    <span class="article-card__date">${article.date} • ${article.category}</span>
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
                <button class="follow-button">Ikuti</button>
                <div class="article-card__actions">
                    <div class="dropdown">
                        <button class="dropdown-button">
                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item">Bagikan</a>
                            <a href="#" class="dropdown-item">Simpan</a>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#" class="article-card__link">
                <div class="article-card-title">${article.title}</div>
                <div class="article-card-preview">
                    <img src="${article.thumbnail}" alt="${article.title} - 1" class="article-preview-image">
                    <img src="${article.thumbnail}" alt="${article.title} - 2" class="article-preview-image">
                    <img src="${article.thumbnail}" alt="${article.title} - 3" class="article-preview-image">
                </div>
            </a>
            <div class="article-card__footer">
                <div class="article-card__data">
                    <div class="article-card__data-item">
                        <i class="fa fa-eye"></i>
                        <span>${article.views}</span>
                    </div>
                    <div class="article-card__data-item_clickable">
                        <a href="#" class="router-link">
                            <i class="fa fa-comment"></i>
                            <span>${article.comments}</span>
                        </a>
                    </div>
                    <div class="article-card__data-item_clickable_like">
                        <i class="fa fa-heart"></i>
                        <span>${article.likes}</span>
                    </div>
                </div>
            </div>
        `;
    
        return card;
    }    
    
    // Fungsi untuk memuat artikel
    async function loadArticles(tabName) {
        const tabState = state[tabName];
        if (tabState.isLoading || !tabState.hasMore) return;

        tabState.isLoading = true;
        const spinner = document.getElementById(`${tabName}-spinner`);
        if (spinner) spinner.classList.add('active');

        setTimeout(() => {
            const start = (tabState.page - 1) * tabState.perPage;
            const end = start + tabState.perPage;
            const articles = dummyData[tabName].slice(start, end);

            const container = document.getElementById(`${tabName}-articles`);
            articles.forEach(article => container.appendChild(createArticleCard(article)));

            tabState.page++;
            tabState.isLoading = false;
            if (spinner) spinner.classList.remove('active');

            if (end >= dummyData[tabName].length) {
                tabState.hasMore = false;
            }
        }, 1000);
    }

    // Infinite Scroll
    function handleScroll() {
        const activeTab = document.querySelector('.tab-link-active').getAttribute('href').substring(1);
        const container = document.getElementById(`${activeTab}-articles`);
        if (container && container.getBoundingClientRect().bottom <= window.innerHeight) {
            loadArticles(activeTab);
        }
    }

    // Fungsi untuk beralih tab
    function switchTab(event) {
        event.preventDefault();
        const tabName = event.target.getAttribute('href').substring(1);

        document.querySelectorAll('.tab-link').forEach(link => link.classList.remove('tab-link-active'));
        event.target.classList.add('tab-link-active');

        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');

        loadArticles(tabName);
    }

    // Event Listener untuk Infinite Scroll
    window.addEventListener('scroll', handleScroll);

    // Event Listener untuk Tab Switching
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', switchTab);
    });

    // Muat artikel pertama kali untuk tab aktif
    loadArticles('rekomendasi');

    // Menangani klik pada tombol dropdown
    document.addEventListener('click', function(event) {
        const button = event.target.closest('.dropdown-button');
        if (button) {
            const dropdownContent = button.nextElementSibling;
            
            // Toggle visibilitas dropdown
            const isVisible = dropdownContent.style.display === 'block';
            closeAllDropdowns(); // Tutup semua dropdown yang terbuka
            if (!isVisible) {
                dropdownContent.style.display = 'block';
            }
        } else {
            closeAllDropdowns(); // Menutup dropdown jika klik di luar
        }
    });

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.style.display = 'none';
        });
    }
    
});
