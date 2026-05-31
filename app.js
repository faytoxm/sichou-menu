let currentLang = 'kz';
let menuData = null;

const localization = {
    ru: {
        welcomeText: "За стенами Запретного города — изысканный пекинский стол. Новая пекинская кухня — это современное прочтение гастрономического наследия Пекина и Шаньдуна, переосмысленное в контексте новой эпохи. Мы бережно исследуем традиции столичной кухни, собирая знаковые вкусы разных времен, и представляем их через философию: Новая эпоха. Новый Пекин. Новая гастрономия. Соединяя искусство, культуру города и восточное гостеприимство, мы создаём кухню, которая отражает дух современного Пекина.",
        btnText: "Смотреть меню",
        hoursTitle: "Часы работы",
        hours: "Вторник - Воскресенье<br>с 12:00 до 14:30<br>с 18:00 до 22:30",
        allergy: "Если у вас есть аллергия или непереносимость ингредиентов, сообщите об этом персоналу.",
        service: "Обслуживание: 15%"
    },
    kz: {
        welcomeText: "Тыйым салынған қала қабырғаларының сыртындағы — талғампаз бейжің дастарқаны. Жаңа Бейжің мейрамханасы — бұл Бейжің мен Шаньдунның гастрономиялық мұрасының жаңа дәуір тұрғысынан заманауи пайымдалуы. Біз астаналық асхана дәстүрлерін ұқыпты зерттей отырып, әр кезеңнің таңдаулы дәмдерін жинап, оларды мына философия арқылы ұсынамыз: Жаңа дәуір. Жаңа Бейжің. Жаңа гастрономия. Өнерді, қала мәдениетін және шығыс қонақжайлылығын ұштастыра отырып, біз қазіргі Бейжің рухын бейнелейтін асхананы қалыптастырамыз.",
        btnText: "Менюні көру",
        hoursTitle: "Жұмыс уақыты",
        hours: "Сейсенбі - Жексенбі<br>12:00-ден 14:30-ға дейін<br>18:00-ден 22:30-ға дейін",
        allergy: "Егер сізде тағам компоненттеріне аллергия немесе төзімсіздік болса, бұл туралы қызметкерлерге хабарлаңыз.",
        service: "Қызмет көрсету: 15%"
    },
    zh: {
        welcomeText: "紫禁城外，一席京宴。新京菜是对北京和山东美食传统的现代诠释，在新时代的视角下重新构想。我们精心探索首都的餐饮传统，汇集不同时代的标志性风味，并通过“新时代。新北京。新美食”的理念呈现给您。将艺术、城市文化与东方好客之道相融合，我们创造出反映现代北京精神的美食。",
        btnText: "查看菜单",
        hoursTitle: "营业时间",
        hours: "周二至周日<br>12:00 至 14:30<br>18:00 至 22:30",
        allergy: "如果您有任何食物过敏或不耐受，请告知我们的工作人员。",
        service: "服务费: 15%"
    },
    en: {
        welcomeText: "Beyond the walls of the Forbidden City — an exquisite Beijing table. New Peking Cuisine is a contemporary interpretation of the gastronomic heritage of Beijing and Shandong, reimagined through the lens of a new era. We carefully explore the traditions of the capital's cuisine, bringing together the iconic flavors of different times and presenting them through the philosophy: A New Era. A New Beijing. A New Gastronomy. Blending art, urban culture, and Eastern hospitality, we create a cuisine that reflects the spirit of modern Beijing.",
        btnText: "View Menu",
        hoursTitle: "Operational Hours",
        hours: "Tuesday - Sunday<br>12:00 to 14:30<br>18:00 to 22:30",
        allergy: "If you have any allergies, please inform your server.",
        service: "Service fee: 15%"
    }
};

async function initApp() {
    try {
        const response = await fetch('menu.json');
        menuData = await response.json();
        
        setupLanguageButtons();
        setupWelcomeScreen();
        renderTabs();
        renderMenuContent();
        updateLocalization();
    } catch (err) {
        console.error("Ошибка инициализации приложения:", err);
    }
}

function setupLanguageButtons() {
    const mainButtons = document.querySelectorAll('.lang-btn');
    const welcomeButtons = document.querySelectorAll('.welcome-lang-btn');

    function handleLangChange(lang) {
        if (!lang) return;
        currentLang = lang;
        
        switchActiveButton(mainButtons, currentLang);
        switchActiveButton(welcomeButtons, currentLang);

        renderTabs();
        renderMenuContent();
        updateLocalization();
    }

    // ИСПРАВЛЕНО: Теперь мы берем язык точно у кнопки (btn.dataset.lang), а не у места касания пальцем
    mainButtons.forEach(btn => {
        btn.addEventListener('click', () => handleLangChange(btn.dataset.lang));
    });

    welcomeButtons.forEach(btn => {
        btn.addEventListener('click', () => handleLangChange(btn.dataset.lang));
    });
}

function switchActiveButton(buttonsList, targetLang) {
    buttonsList.forEach(btn => {
        if (btn.dataset.lang === targetLang) {
            btn.className = btn.classList.contains('welcome-lang-btn') 
                ? "welcome-lang-btn text-[#111111] font-bold cursor-pointer"
                : "lang-btn transition-colors text-[#111111] font-bold focus:outline-none cursor-pointer";
        } else {
            btn.className = btn.classList.contains('welcome-lang-btn')
                ? "welcome-lang-btn hover:text-[#111111] cursor-pointer"
                : "lang-btn transition-colors hover:text-[#111111] focus:outline-none cursor-pointer";
        }
    });
}

function setupWelcomeScreen() {
    const closeBtn = document.getElementById('close-welcome');
    const welcomeScreen = document.getElementById('welcome-screen');
    
    closeBtn?.addEventListener('click', () => {
        if (welcomeScreen) {
            // Временно отключаем плавный скролл для моментального прыжка наверх страницы
            document.documentElement.classList.remove('scroll-smooth');
            window.scrollTo(0, 0);
            
            // Возвращаем плавный скролл для работы верхнего меню
            setTimeout(() => {
                document.documentElement.classList.add('scroll-smooth');
            }, 50);

            welcomeScreen.style.transform = 'translateY(-100%)';
            setTimeout(() => welcomeScreen.remove(), 700);
        }
    });
}

function updateLocalization() {
    const langData = localization[currentLang];
    
    const welcomeTextEl = document.getElementById('welcome-text');
    const closeBtnEl = document.getElementById('close-welcome');
    if (welcomeTextEl) welcomeTextEl.textContent = langData.welcomeText;
    if (closeBtnEl) closeBtnEl.textContent = langData.btnText;
    
    document.getElementById('footer-hours-title').textContent = langData.hoursTitle;
    document.getElementById('footer-hours').innerHTML = langData.hours;
    document.getElementById('footer-allergy').textContent = langData.allergy;
    document.getElementById('footer-service').textContent = langData.service;
}

function renderTabs() {
    const nav = document.getElementById('categories-nav');
    if (!nav) return;

    nav.innerHTML = menuData.categories.map(cat => {
        const title = currentLang === 'zh' ? cat.zh : cat.name[currentLang];
        const subtitle = currentLang === 'zh' ? '' : `<span class="text-[9px] text-[#A1A1AA] tracking-widest mt-0.5 font-light">${cat.zh}</span>`;
        
        return `
        <button data-target="section-${cat.id}" class="tab-trigger flex flex-col items-center justify-center shrink-0 whitespace-nowrap group focus:outline-none text-center cursor-pointer">
            <span class="text-[11px] uppercase tracking-wider text-[#71717A] group-hover:text-[#111111] transition-colors font-medium">${title}</span>
            ${subtitle}
        </button>
        `;
    }).join('');

    document.querySelectorAll('.tab-trigger').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.target;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offset = 160; 
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function renderMenuContent() {
    const container = document.getElementById('menu-container');
    if (!container) return;

    container.innerHTML = menuData.categories.map(cat => {
        const filteredItems = menuData.items.filter(item => item.category_id === cat.id);
        if (filteredItems.length === 0) return ''; 
        
        const catTitle = currentLang === 'zh' ? cat.zh : cat.name[currentLang];
        const catSubtitle = currentLang === 'zh' ? '' : `<span class="text-[10px] tracking-[0.25em] text-[#71717A] block font-light">${cat.zh}</span>`;

        const itemsHtml = filteredItems.map(item => {
            const descriptionHtml = (item.description && item.description[currentLang]) 
                ? `<p class="text-xs text-[#71717A] font-light leading-relaxed pt-0.5 max-w-[290px]">${item.description[currentLang]}</p>` 
                : '';
                
            const itemTitle = currentLang === 'zh' ? item.zh : item.name[currentLang];
            const itemSubtitle = currentLang === 'zh' ? '' : `<div class="text-[12px] font-medium text-[#71717A] tracking-wide">${item.zh}</div>`;
                
            return `
                <div class="py-3.5 flex justify-between items-start gap-6">
                    <div class="space-y-0.5 flex-1">
                        ${itemSubtitle}
                        <h3 class="text-sm font-medium text-[#111111] leading-snug">${itemTitle}</h3>
                        ${descriptionHtml}
                    </div>
                    <div class="text-sm font-medium text-[#111111] tracking-wider pt-0.5 shrink-0">
                        ${item.price.toLocaleString('ru-RU')} ₸
                    </div>
                </div>
            `;
        }).join('');

        return `
            <section id="section-${cat.id}" class="space-y-4 pt-4">
                <div class="text-center space-y-0.5 py-2.5 border-y border-[#111111]/10 bg-[#111111]/2">
                    ${catSubtitle}
                    <h2 class="text-xs font-medium tracking-widest text-[#111111] uppercase font-brand">${catTitle}</h2>
                </div>
                <div class="divide-y divide-[#111111]/5">
                    ${itemsHtml}
                </div>
            </section>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', initApp);
