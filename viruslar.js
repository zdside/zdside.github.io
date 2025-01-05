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
let postsPerPage = 3;
let currentIndex = 0;

function loadPosts(isInitialLoad = false) {
    let container = document.getElementById('postsContainer');
    let postsWrapper = document.getElementById('postsWrapper') || document.createElement('div');
    postsWrapper.id = 'postsWrapper';
    
    if (isInitialLoad) {
        postsWrapper.innerHTML = ''; // Clear previous posts on initial load
        currentIndex = 0; // Reset the index on initial load
    }

    for (let i = currentIndex; i < currentIndex + postsPerPage; i++) {
        if (i >= posts.length) break;
        let post = posts[i];
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
    
    currentIndex += postsPerPage;

    // Show or hide the "Show More" button based on remaining posts
    if (currentIndex >= posts.length) {
        document.getElementById('loadMoreBtn').style.display = 'none';
    } else {
        document.getElementById('loadMoreBtn').style.display = 'block';
    }
}

document.getElementById('loadMoreBtn').addEventListener('click', () => loadPosts());

// Load initial posts
loadPosts(true);
