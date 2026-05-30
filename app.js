let currentLang = 'ru';
let menuData = null;

// Официальные тексты из оригинальных PDF-документов SICHOU
const localization = {
    ru: {
        welcomeText: "За стенами Запретного города — изысканный пекинский стол. Новая пекинская кухня — это современное прочтение гастрономического наследия Пекина и Шаньдуна, переосмысленное в контексте новой эпохи. Мы бережно исследуем традиции столичной кухни, собирая знаковые вкусы разных времен, и представляем их через философию: Новая эпоха. Новый Пекин. Новая гастрономия. Соединяя искусство, культуру города и восточное гостеприимство, мы создаём кухню, которая отражает дух современного Пекина.",
        btnText: "Смотреть меню",
        hoursTitle: "Часы работы",
        hours: "Вторник - Воскресенье<br>с 12:00 до 14:30<br>с 18:00 до 22:30",
        allergy: "Если у вас есть аллергия или непереносимость ингредиентов, сообщите об этом персоналу.",
        service: "Обслуживание 15%"
    },
    kz: {
        welcomeText: "Тыйым салынған қала қабырғаларының сыртындағы — талғампаз бейжің дастарқаны. Жаңа Бейжің мейрамханасы — бұл Бейжің мен Шаньдунның гастрономиялық мұрасының жаңа дәуір тұрғысынан заманауи пайымдалуы. Біз астаналық асхана дәстүрлерін ұқыпты зерттей отырып, әр кезеңнің таңдаулы дәмдерін жинап, оларды мына философия арқылы ұсынамыз: Жаңа дәуір. Жаңа Бейжің. Жаңа гастрономия. Өнерді, қала мәдениетін және шығыс қонақжайлылығын ұштастыра отырып, біз қазіргі Бейжің рухын бейнелейтін асхананы қалыптастырамыз.",
        btnText: "Менюні көру",
        hoursTitle: "Жұмыс уақыты",
        hours: "Сейсенбі - Жексенбі<br>12:00-ден 14:30-ға дейін<br>18:00-ден 22:30-ға дейін",
        allergy: "Егер сізде тағам компоненттеріне аллергия немесе төзімсіздік болса, бұл туралы қызметкерлерге хабарлаңыз.",
        service: "Қызмет көрсету - 15%"
    },
    en: {
        welcomeText: "Beyond the walls of the Forbidden City — an exquisite Beijing table. New Peking Cuisine is a contemporary interpretation of the gastronomic heritage of Beijing and Shandong, reimagined through the lens of a new era. We carefully explore the traditions of the capital's cuisine, bringing together the iconic flavors of different times and presenting them through the philosophy: A New Era. A New Beijing. A New Gastronomy. Blending art, urban culture, and Eastern hospitality, we create a cuisine that reflects the spirit of modern Beijing.",
        btnText: "View Menu",
        hoursTitle: "Operational Hours",
        hours: "Tuesday - Sunday<br>12:00 to 14:30<br>18:00 to 22:30",
        allergy: "If you have any allergies, please inform your server.",
        service: "Service fee - 15%"
    }
};

// Главная функция запуска приложения
async function initApp() {
    try {
        const response = await fetch('menu.json');
        menuData = await response.json();
        
        setupLanguageButtons();
        setupWelcomeScreen();
        renderTabs();
        renderMenuContent();
        updateLocalization(); // Заполняем тексты при первой загрузке
    } catch (err) {
        console.error("Ошибка инициализации приложения:", err);
    }
}

// Логика кнопок переключения языков (в меню и на приветственном экране)
function setupLanguageButtons() {
    const mainButtons = document.querySelectorAll('.lang-btn');
    const welcomeButtons = document.querySelectorAll('.welcome-lang-btn');

    function handleLangChange(lang) {
        currentLang = lang;
        
        // Синхронно меняем визуальный статус кнопок в обеих панелях
        switchActiveButton(mainButtons, currentLang);
        switchActiveButton(welcomeButtons, currentLang);

        // Перерисовываем интерфейс
        renderTabs();
        renderMenuContent();
        updateLocalization();
    }

    mainButtons.forEach(btn => {
        btn.addEventListener('click', (e) => handleLangChange(e.target.dataset.lang));
    });

    welcomeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => handleLangChange(e.target.dataset.lang));
    });
}

// Переключение стилей активной кнопки (жирный черный шрифт для выбранного языка)
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

// Управление анимацией закрытия приветственного экрана
function setupWelcomeScreen() {
    const closeBtn = document.getElementById('close-welcome');
    const welcomeScreen = document.getElementById('welcome-screen');
    
    closeBtn?.addEventListener('click', () => {
        if (welcomeScreen) {
            // Плавно смещаем экран вверх
            welcomeScreen.style.transform = 'translateY(-100%)';
            // Полностью убираем его из DOM через 700мс (после окончания анимации)
            setTimeout(() => welcomeScreen.remove(), 700);
        }
    });
}

// Обновление текстовых блоков интерфейса на лету
function updateLocalization() {
    const langData = localization[currentLang];
    
    // Блок философии бренда (если экран еще открыт)
    const welcomeTextEl = document.getElementById('welcome-text');
    const closeBtnEl = document.getElementById('close-welcome');
    if (welcomeTextEl) welcomeTextEl.textContent = langData.welcomeText;
    if (closeBtnEl) closeBtnEl.textContent = langData.btnText;
    
    // Подвал (Футер)
    document.getElementById('footer-hours-title').textContent = langData.hoursTitle;
    document.getElementById('footer-hours').innerHTML = langData.hours;
    document.getElementById('footer-allergy').textContent = langData.allergy;
    document.getElementById('footer-service').textContent = langData.service;
}

// Рендеринг верхнего таб-бара категорий (горизонтальная лента)
function renderTabs() {
    const nav = document.getElementById('categories-nav');
    if (!nav) return;

    // Фикс скролла: whitespace-nowrap держит в строку, shrink-0 запрещает сжатие
    nav.innerHTML = menuData.categories.map(cat => `
        <button data-target="section-${cat.id}" class="tab-trigger flex flex-col items-center justify-center shrink-0 whitespace-nowrap group focus:outline-none text-center cursor-pointer">
            <span class="text-[11px] uppercase tracking-wider text-[#71717A] group-hover:text-[#111111] transition-colors font-medium">${cat.name[currentLang]}</span>
            <span class="text-[9px] text-[#A1A1AA] tracking-widest mt-0.5 font-light">${cat.zh}</span>
        </button>
    `).join('');

    // Привязка плавной прокрутки
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

// Рендеринг списка категорий и блюд
function renderMenuContent() {
    const container = document.getElementById('menu-container');
    if (!container) return;

    container.innerHTML = menuData.categories.map(cat => {
        const filteredItems = menuData.items.filter(item => item.category_id === cat.id);
        if (filteredItems.length === 0) return ''; 
        
        // Отдельно собираем HTML для каждого блюда, чтобы не путать парсер редактора
        const itemsHtml = filteredItems.map(item => {
            // Выносим проверку описания в отдельную переменную
            const descriptionHtml = item.description[currentLang] 
                ? `<p class="text-xs text-[#71717A] font-light leading-relaxed pt-0.5 max-w-[290px]">${item.description[currentLang]}</p>` 
                : '';
                
            return `
                <div class="py-3.5 flex justify-between items-start gap-6">
                    <div class="space-y-0.5 flex-1">
                        <div class="text-[12px] font-medium text-[#71717A] tracking-wide">${item.zh}</div>
                        <h3 class="text-sm font-medium text-[#111111] leading-snug">${item.name[currentLang]}</h3>
                        ${descriptionHtml}
                    </div>
                    <div class="text-sm font-medium text-[#111111] tracking-wider pt-0.5 shrink-0">
                        ${item.price.toLocaleString('ru-RU')} ₸
                    </div>
                </div>
            `;
        }).join('');

        // Возвращаем собранную секцию категории
        return `
            <section id="section-${cat.id}" class="space-y-4 pt-4">
                <div class="text-center space-y-0.5 py-2.5 border-y border-[#111111]/10 bg-[#111111]/2">
                    <span class="text-[10px] tracking-[0.25em] text-[#71717A] block font-light">${cat.zh}</span>
                    <h2 class="text-xs font-medium tracking-widest text-[#111111] uppercase font-brand">${cat.name[currentLang]}</h2>
                </div>
                <div class="divide-y divide-[#111111]/5">
                    ${itemsHtml}
                </div>
            </section>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', initApp);