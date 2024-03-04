const postContainer = document.getElementById('post-container');
const latestPostsContainer = document.getElementById('latest-posts-container');
const bookMarkContainer = document.getElementById('bookmark-container');
const searchField = document.getElementById('category-field');
const loadingSpinner = document.getElementById('loading-spinner');

const loadPosts = async (categoryName = 'comedy') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts);
    displayPosts(posts);
}

const displayPosts = posts => {
    // console.log(posts);
    postContainer.textContent = '';

    posts.forEach(post => {
        // console.log(post);

        const postCard = document.createElement('div');
        postCard.classList = `flex gap-6 items-center bg-[#f3f3f5] p-10 rounded-2xl`;
        postCard.innerHTML = `<div>
        <div class="w-16 h-16 relative bottom-16">
            <img class="rounded-xl" src="${post.image}" alt="">
        </div>
        <div>
            <p id="red-green" class="bg-[#10B981] w-3 h-3 rounded-full relative left-14 bottom-32"></p>
        </div>
    </div>

    <div>
        <div class="flex flex-row gap-5 text-[#12132DCC] font-medium mb-3 font_inter">
            <p># ${post.category}</p>
            <p>Author : ${post.author.name}</p>
        </div>

        <div>
            <h3 class="font_mulish font-extrabold text-[#12132D] text-xl mb-4">${post.title}</h3>
            <p class="font_inter font-medium text-[#03071280] mb-4">${post.description}
            </p>
        </div>
        <hr>
        <div class="flex justify-between items-center mt-4">
            <div class="flex flex-row gap-7 font_inter font-medium text-[#03071280]">
                <p><i class="uil uil-comment-alt-lines"></i> ${post.comment_count}</p>
                <p><i class="uil uil-eye"></i> ${post.view_count}</p>
                <p><i class="uil uil-clock-eight"></i> ${post.posted_time} min</p>
            </div>
            <div>
                <a id="bookmark" class="btn text-white bg-[#10b981] text-xl rounded-full"><i
                        class="uil uil-envelope-open"></i></a>
            </div>
        </div>
    </div>`;

        const redGreenParagraph = postCard.querySelector('#red-green');
        if (!post.isActive) {
            redGreenParagraph.style.backgroundColor = '#FF3434';
        } else {
            redGreenParagraph.style.backgroundColor = '#10B981';
        }

        const bookmarkAnchor = postCard.querySelector('#bookmark');
        bookmarkAnchor.addEventListener('click', () => {
            const bookMarkCard = document.createElement('div');
            bookMarkCard.classList = `flex gap-16 items-center p-3 rounded-xl bg-white`;
            bookMarkCard.innerHTML = `<h3 class="font_mulish font-bold text-[#12132D]">${post.title}</h3>
            <p class="font_inter font-medium text-[#03071280]"><i class="uil uil-eye"></i> ${post.view_count}</p>`;

            const bookMarkCount = document.getElementById('bookmark-count');
            let currentValue = parseInt(bookMarkCount.textContent);

            currentValue += 1;
            bookMarkCount.textContent = currentValue;

            bookMarkContainer.appendChild(bookMarkCard);
        });

        postContainer.appendChild(postCard);
    });

    toggleLoading(false);
}

const handleSearch = () => {
    toggleLoading(true);
    const searchText = searchField.value;
    // console.log(searchText);
    loadPosts(searchText);
}

const toggleLoading = (isLoading) => {
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

const latestPosts = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        displayLatestPosts(data);
    } catch (error) {
        console.error('Error fetching latest posts:', error);
    }
}

const displayLatestPosts = posts => {
    if (!Array.isArray(posts)) {
        console.error('Invalid data format: expected an array of posts');
        return;
    }
    posts.forEach(post => {
        // console.log(post)
        const latestCard = document.createElement('div');
        latestCard.classList = `font_mulish p-6 border-solid border-2 border-[#12132D26] rounded-xl`;
        latestCard.innerHTML = `
            <div class="mb-6">
                <img class="w-72 h-60 rounded-xl" src="${post.cover_image}" alt="">
            </div>
            <p class="text-[#03071280] font-medium mb-4"><i class="fa-regular fa-calendar-check"></i> ${post.author.posted_date ? post.author.posted_date : 'No publish date'
            }</p>
            <h4 class="font-bold text-[#12132D] mb-3">${post.title}</h4>
            <p class="font-normal text-[#12132D99] mb-4">${post.description}</p>
            <div class="flex gap-4 items-center">
                <div>
                    <img class="w-14 h-14 rounded-full" src="${post.profile_image}" alt="">
                </div>
                <div>
                    <h5 class="font-bold text-[#12132D]">${post.author.name}</h5>
                    <p class="text-[#12132D99] font-normal text-[14px]">${post.author.designation ? post.author.designation : 'Unknown'}</p>
                </div>
            </div>`;

        latestPostsContainer.appendChild(latestCard);
    });
}

loadPosts();
latestPosts();