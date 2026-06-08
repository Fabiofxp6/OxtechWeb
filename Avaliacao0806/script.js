const searchForm = document.getElementById('search-form');
const usernameInput = document.getElementById('username-input');
const messageContainer = document.getElementById('message-container');
const messageText = document.getElementById('message-text');
const profileContainer = document.getElementById('profile-container');
const reposSection = document.getElementById('repos-section');
const reposContainer = document.getElementById('repos-container');
const repoCount = document.getElementById('repo-count');
const loader = document.getElementById('loader');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();

    clearResults();
    hideMessage();

    if (username === '') {
        showMessage('Por favor, digite um nome de usuário antes de buscar.');
        return;
    }

    fetchGitHubData(username);
});

async function fetchGitHubData(username) {
    showLoader(true);

    try {
        const profileResponse = await fetch(`https://api.github.com/users/${username}`);

        if (profileResponse.status === 404) {
            showMessage('Perfil não encontrado. Verifique o nome digitado e tente novamente.');
            showLoader(false);
            return;
        }

        if (!profileResponse.ok) {
            throw new Error(`Erro na busca do perfil: Status ${profileResponse.status}`);
        }

        const profileData = await profileResponse.json();

        renderProfile(profileData);

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);

        if (!reposResponse.ok) {
            throw new Error(`Erro na busca de repositórios: Status ${reposResponse.status}`);
        }

        const reposData = await reposResponse.json();

        renderRepos(reposData);

    } catch (error) {
        console.error(error);
        showMessage('Ocorreu um erro ao buscar dados no GitHub. Tente novamente mais tarde.');
    } finally {
        showLoader(false);
    }
}

function renderProfile(user) {
    profileContainer.innerHTML = `
        <div class="bg-mono-card border border-mono-border p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start transition-all duration-300 hover:border-mono-borderHover shadow-lg">
            <img 
                src="${user.avatar_url}" 
                alt="Avatar de ${user.name || user.login}" 
                class="w-24 h-24 rounded-full border-2 border-mono-border object-cover shrink-0 select-none grayscale"
            >
            <div class="flex-grow text-center md:text-left min-w-0">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h2 class="text-xl font-bold text-mono-lightest break-words">${user.name || user.login}</h2>
                    <a 
                        href="${user.html_url}" 
                        target="_blank" 
                        class="text-xs text-mono-muted font-mono hover:text-mono-lightest hover:underline shrink-0"
                    >
                        @${user.login}
                    </a>
                </div>
                <p class="text-xs text-mono-light mt-3 leading-relaxed break-words">
                    ${user.bio || 'Este perfil do GitHub não possui biografia disponível.'}
                </p>
                <div class="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-4 text-[11px] font-medium text-mono-light border-t border-mono-border pt-4">
                    <div>
                        <span class="text-mono-lightest font-semibold">${user.followers}</span>
                        <span class="text-mono-muted ml-0.5">seguidores</span>
                    </div>
                    <div>
                        <span class="text-mono-lightest font-semibold">${user.following}</span>
                        <span class="text-mono-muted ml-0.5">seguindo</span>
                    </div>
                    <div>
                        <span class="text-mono-lightest font-semibold">${user.public_repos}</span>
                        <span class="text-mono-muted ml-0.5">repositórios</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    profileContainer.classList.remove('hidden');
}

function renderRepos(repos) {
    reposContainer.innerHTML = '';

    if (repos.length === 0) {
        reposContainer.innerHTML = `
            <div class="col-span-full border border-dashed border-mono-border p-8 rounded-xl text-center">
                <p class="text-xs text-mono-muted uppercase tracking-wider">Nenhum repositório público encontrado</p>
            </div>
        `;
        repoCount.textContent = '0';
        reposSection.classList.remove('hidden');
        return;
    }

    repoCount.textContent = repos.length.toString();

    repos.forEach((repo) => {
        const card = document.createElement('div');
        card.className = 'bg-mono-card border border-mono-border hover:border-mono-gray p-4 rounded-xl flex flex-col justify-between transition-all duration-300 group';

        const description = repo.description
            ? (repo.description.length > 75 ? repo.description.substring(0, 75) + '...' : repo.description)
            : 'Sem descrição disponível no repositório.';
        const languageTag = repo.language
            ? `<span class="bg-mono-border text-mono-light text-[10px] px-2 py-0.5 rounded border border-mono-border font-mono">${repo.language}</span>`
            : '';

        card.innerHTML = `
            <div class="flex flex-col gap-2">
                <div class="flex items-start justify-between gap-2">
                    <h3 class="text-sm font-semibold text-mono-lightest break-all line-clamp-1" title="${repo.name}">
                        ${repo.name}
                    </h3>
                    <div class="flex items-center gap-1 text-[10px] text-mono-muted shrink-0 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.17 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span>${repo.stargazers_count}</span>
                    </div>
                </div>
                <p class="text-xs text-mono-muted line-clamp-2 min-h-[2rem] leading-relaxed">
                    ${description}
                </p>
            </div>
            <div class="flex items-center justify-between mt-4 pt-3 border-t border-mono-border">
                ${languageTag}
                <a 
                    href="${repo.html_url}" 
                    target="_blank" 
                    class="text-xs text-mono-light group-hover:text-mono-lightest hover:underline flex items-center gap-1 font-medium transition-colors ml-auto"
                >
                    <span>Código</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        `;
        reposContainer.appendChild(card);
    });

    reposSection.classList.remove('hidden');
}

function showMessage(text) {
    messageText.textContent = text;
    messageContainer.classList.remove('hidden');
}

function hideMessage() {
    messageContainer.classList.add('hidden');
}

function showLoader(show) {
    if (show) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

function clearResults() {
    profileContainer.classList.add('hidden');
    profileContainer.innerHTML = '';
    reposSection.classList.add('hidden');
    reposContainer.innerHTML = '';
}
