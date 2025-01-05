let originalPosts = [
    {
        title: "Ram Eater 05.01.2025",
        content: "Bu proqram hər saniyədən bir Chrome açır.",
        file: "ram_eater.exe",
        size: "19Kb"
    },
    {
        title: "Black Screen 05.01.2025",
        content: "Black Screen proqramı full screen qara ekran yaradır üzərində saytımızın adı və OK düyməsi. Proqram Windows Key, Alt, Tab, Ctrl düymələrini bloklayır və yalnız OK düyməsini basdıqda saytımız açılır və proqram bağlanır. Yüklənməsi lazım gərəkən modullar requirements.txt faylındadır sadəcə pip install -r requirements.txt yazın.",
        file: "black_screen.zip",
        size: "1Kb"
    },
    {
        title: "Freeze Screen 01.01.2025",
        content: "Adından göründüyü kimi ekranı dondurur nə mouse ilə nə də klaviatura ilə heçnə etmək olmur (windows key, alt, ctrl, alt+tab çıxmaqla). Yalnız 'esc' klavişinin köməyi ilə proqram bitir. Brauzer yükləməyi bloklasada icazə verin yükləsin proqram zərərsizdir.",
        file: "freeze_screen.exe",
        size: "20Kb"
    }
];

let posts = [...originalPosts];
let filteredPosts = [...originalPosts];  // Initially same as originalPosts
let shownPosts = [];
let postsPerPage = 2;
let currentIndex = 0; // To track the last index of loaded posts

function loadPosts() {
    let container = document.getElementById('postsContainer');
    let postsWrapper = document.getElementById('postsWrapper') || document.createElement('div');
    postsWrapper.id = 'postsWrapper';

    // Load posts from currentIndex
    for (let i = currentIndex; i < currentIndex + postsPerPage; i++) {
        if (i >= filteredPosts.length) break;
        let post = filteredPosts[i];
        let postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div>
                <span class="file-name">${post.file} ${post.size}</span>
                <a href="viruses/${post.file}" class="download-btn" download>
                    <img src="imgs/download.png" alt="Download" class="download-icon">
                </a>
            </div>
        `;
        postsWrapper.appendChild(postElement);
    }

    if (!document.getElementById('postsWrapper')) {
        container.appendChild(postsWrapper);
    }

    // Update the currentIndex to load the next set of posts on next scroll
    currentIndex += postsPerPage;
}

function checkScroll() {
    let container = document.documentElement;
    let bottom = container.scrollHeight === container.scrollTop + window.innerHeight;
    if (bottom) {
        loadPosts(); // Load more posts when near bottom
    }
}

document.getElementById('searchInput').addEventListener('input', function(event) {
    let query = event.target.value.toLowerCase();
    filteredPosts = originalPosts.filter(post => 
        post.title.toLowerCase().includes(query)
    );
    currentIndex = 0; // Reset current index when search changes
    document.getElementById('postsWrapper').innerHTML = ''; // Clear previous posts
    loadPosts(); // Load new filtered posts
});

window.addEventListener('scroll', checkScroll);

// Load initial posts on page load
loadPosts();
