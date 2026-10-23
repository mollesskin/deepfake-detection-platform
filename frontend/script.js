// Add backend API URL after the backend is ready!
// like const API_ENDPOINT = "http://127.0.0.1:8000/predict";

const API_ENDPOINT = "http://127.0.0.1:8000/predict";;
const API_FILE_FIELD = "image";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const translations = {
  en: {
    navHow: "How it works",
    navAbout: "About",
    eyebrow: "AI image verification",
    heroTitleOne: "Look closer.",
    heroTitleTwo: "Know what you see.",
    heroDescription: "Upload a photo to check whether it may be AI-generated. Clear, simple, and designed for everyone.",
    cardLabel: "IMAGE CHECK",
    stepLabel: "STEP 1 OF 2",
    uploadTitle: "Upload your image",
    uploadDescription: "Choose a photo from your device, or drag it here.",
    chooseButton: "Choose image",
    uploadHint: "JPG or PNG · Up to 10 MB",
    imageSelected: "IMAGE SELECTED",
    analyzeButton: "Analyze image",
    removeImage: "Remove image",
    privacyNote: "Only upload images you have permission to use.",
    noFile: "Choose an image first.",
    invalidType: "Please choose a JPG or PNG image.",
    tooLarge: "This image is larger than 10 MB. Please choose a smaller file.",
    fileReady: "Image selected and ready to analyze.",
    apiNotConnected: "The image is ready, but the detection API is not connected yet. Set API_ENDPOINT at the top of script.js to your backend route.",
    analyzing: "Analyzing image…",
    apiError: "The analysis request failed. Check that the backend is running and the API endpoint is correct.",
    badResponse: "The API responded, but the result format was not recognized. Check the fields returned by your backend.",
    checkAnother: "Check another image",
    confidenceLabel: "Model confidence",
    resultDisclaimer: "AI detection can be wrong. Treat this result as an estimate, not proof.",
    resultAI: "Likely AI-generated",
    resultReal: "Likely a real image",
    resultUnknown: "Analysis complete",
    resultAIExplanation: "The model classified this image as likely AI-generated.",
    resultRealExplanation: "The model classified this image as likely real.",
    resultKicker: "DETECTION RESULT",
    heroFootnote: "A simpler way to question what you see online.",
    howKicker: "HOW IT WORKS",
    howTitle: "Three simple steps.",
    howDescription: "No complicated settings. Just choose an image and review the result.",
    stepOneTitle: "Upload a photo",
    stepOneDescription: "Select a JPG or PNG image from your device.",
    stepTwoTitle: "Run the check",
    stepTwoDescription: "The connected detection model analyzes the image.",
    stepThreeTitle: "Review the result",
    stepThreeDescription: "See the model's prediction and confidence, when provided by the API.",
    aboutKicker: "WHY DEEPCHECK",
    aboutTitle: "Images can be convincing. Checking should be simple.",
    aboutDescription: "DeepCheck is designed to make AI-image verification easier to understand, with clear language and a focused experience.",
    aboutDisclaimer: "The model may make mistakes, especially with edited, compressed, or unfamiliar images. Always consider the source and context too.",
    sampleTag: "ILLUSTRATIVE EXAMPLE",
    sampleCaption: "Artwork only — not an actual detection result.",
    footerText: "Built to help people approach online images with care.",
    buttonWorking: "Analyzing…",
    statusIdle: ""
  },

  ru: {
    navHow: "Как это работает",
    navAbout: "О проекте",
    eyebrow: "Проверка изображений с помощью ИИ",
    heroTitleOne: "Посмотрите внимательнее.",
    heroTitleTwo: "Узнайте, что перед вами.",
    heroDescription: "Загрузите фотографию, чтобы проверить, может ли она быть создана ИИ. Понятный интерфейс для каждого.",
    cardLabel: "ПРОВЕРКА ИЗОБРАЖЕНИЯ",
    stepLabel: "ШАГ 1 ИЗ 2",
    uploadTitle: "Загрузите изображение",
    uploadDescription: "Выберите фотографию на устройстве или перетащите её сюда.",
    chooseButton: "Выбрать изображение",
    uploadHint: "JPG или PNG · До 10 МБ",
    imageSelected: "ИЗОБРАЖЕНИЕ ВЫБРАНО",
    analyzeButton: "Проверить изображение",
    removeImage: "Удалить изображение",
    privacyNote: "Загружайте только изображения, которые разрешено использовать.",
    noFile: "Сначала выберите изображение.",
    invalidType: "Выберите изображение в формате JPG или PNG.",
    tooLarge: "Файл больше 10 МБ. Выберите изображение меньшего размера.",
    fileReady: "Изображение выбрано и готово к проверке.",
    apiNotConnected: "Изображение готово, но API модели ещё не подключён. Укажите адрес backend в переменной API_ENDPOINT в начале script.js.",
    analyzing: "Идёт проверка изображения…",
    apiError: "Не удалось выполнить проверку. Убедитесь, что backend запущен и адрес API указан правильно.",
    badResponse: "API ответил, но формат результата не распознан. Проверьте поля, которые возвращает backend.",
    checkAnother: "Проверить другое изображение",
    confidenceLabel: "Уверенность модели",
    resultDisclaimer: "ИИ может ошибаться. Считайте этот результат оценкой, а не доказательством.",
    resultAI: "Вероятно, создано ИИ",
    resultReal: "Вероятно, настоящее изображение",
    resultUnknown: "Проверка завершена",
    resultAIExplanation: "Модель классифицировала изображение как вероятно созданное ИИ.",
    resultRealExplanation: "Модель классифицировала изображение как вероятно настоящее.",
    resultKicker: "РЕЗУЛЬТАТ ПРОВЕРКИ",
    heroFootnote: "Простой способ критичнее относиться к изображениям в интернете.",
    howKicker: "КАК ЭТО РАБОТАЕТ",
    howTitle: "Всего три шага.",
    howDescription: "Никаких сложных настроек: выберите изображение и посмотрите результат.",
    stepOneTitle: "Загрузите фото",
    stepOneDescription: "Выберите файл JPG или PNG на своём устройстве.",
    stepTwoTitle: "Запустите проверку",
    stepTwoDescription: "Подключённая модель анализирует изображение.",
    stepThreeTitle: "Посмотрите результат",
    stepThreeDescription: "Вы увидите прогноз модели и её уверенность, если API их возвращает.",
    aboutKicker: "ПОЧЕМУ DEEPCHECK",
    aboutTitle: "Изображения могут выглядеть убедительно. Проверка должна быть простой.",
    aboutDescription: "DeepCheck помогает понятнее проверять изображения, созданные искусственным интеллектом, без сложного интерфейса.",
    aboutDisclaimer: "Модель может ошибаться, особенно при обработке, сжатии или анализе незнакомых изображений. Учитывайте источник и контекст.",
    sampleTag: "ИЛЛЮСТРАТИВНЫЙ ПРИМЕР",
    sampleCaption: "Это иллюстрация, а не реальный результат проверки.",
    footerText: "Помогаем внимательнее относиться к изображениям в интернете.",
    buttonWorking: "Проверяем…",
    statusIdle: ""
  },

  kz: {
    navHow: "Қалай жұмыс істейді",
    navAbout: "Жоба туралы",
    eyebrow: "AI суреттерін тексеру",
    heroTitleOne: "Мұқият қараңыз.",
    heroTitleTwo: "Не көріп тұрғаныңызды біліңіз.",
    heroDescription: "Суретті жүктеп, оның AI көмегімен жасалған болуы мүмкін екенін тексеріңіз. Барлығына түсінікті интерфейс.",
    cardLabel: "СУРЕТТІ ТЕКСЕРУ",
    stepLabel: "1 / 2 ҚАДАМ",
    uploadTitle: "Суретті жүктеңіз",
    uploadDescription: "Құрылғыңыздан суретті таңдаңыз немесе осы жерге сүйреп әкеліңіз.",
    chooseButton: "Суретті таңдау",
    uploadHint: "JPG немесе PNG · 10 МБ дейін",
    imageSelected: "СУРЕТ ТАҢДАЛДЫ",
    analyzeButton: "Суретті тексеру",
    removeImage: "Суретті өшіру",
    privacyNote: "Тек пайдалануға рұқсатыңыз бар суреттерді жүктеңіз.",
    noFile: "Алдымен суретті таңдаңыз.",
    invalidType: "JPG немесе PNG форматындағы суретті таңдаңыз.",
    tooLarge: "Файл көлемі 10 МБ-тан үлкен. Басқа суретті таңдаңыз.",
    fileReady: "Сурет таңдалды және тексеруге дайын.",
    apiNotConnected: "Сурет дайын, бірақ анықтау API әлі қосылмаған. Backend мекенжайын script.js файлының басындағы API_ENDPOINT айнымалысына енгізіңіз.",
    analyzing: "Сурет тексеріліп жатыр…",
    apiError: "Тексеру орындалмады. Backend жұмыс істеп тұрғанын және API мекенжайын тексеріңіз.",
    badResponse: "API жауап берді, бірақ нәтиже форматы танылмады. Backend қайтарған өрістерді тексеріңіз.",
    checkAnother: "Басқа суретті тексеру",
    confidenceLabel: "Модель сенімділігі",
    resultDisclaimer: "AI анықтауы қателесуі мүмкін. Нәтижені дәлел емес, болжам ретінде қабылдаңыз.",
    resultAI: "AI жасаған болуы мүмкін",
    resultReal: "Шынайы сурет болуы мүмкін",
    resultUnknown: "Тексеру аяқталды",
    resultAIExplanation: "Модель бұл суретті AI жасаған болуы мүмкін деп жіктеді.",
    resultRealExplanation: "Модель бұл суретті шынайы болуы мүмкін деп жіктеді.",
    resultKicker: "ТЕКСЕРУ НӘТИЖЕСІ",
    heroFootnote: "Интернеттегі суреттерге сыни көзқараспен қараудың оңай жолы.",
    howKicker: "ҚАЛАЙ ЖҰМЫС ІСТЕЙДІ",
    howTitle: "Үш қарапайым қадам.",
    howDescription: "Күрделі баптаулар қажет емес. Суретті таңдап, нәтижені қараңыз.",
    stepOneTitle: "Суретті жүктеңіз",
    stepOneDescription: "Құрылғыңыздан JPG немесе PNG файлын таңдаңыз.",
    stepTwoTitle: "Тексеруді бастаңыз",
    stepTwoDescription: "Қосылған анықтау моделі суретті талдайды.",
    stepThreeTitle: "Нәтижені қараңыз",
    stepThreeDescription: "API қайтарса, модель болжамы мен сенімділігін көресіз.",
    aboutKicker: "DEEPCHECK ТУРАЛЫ",
    aboutTitle: "Суреттер шынайы көрінуі мүмкін. Тексеру оңай болуы керек.",
    aboutDescription: "DeepCheck AI жасаған суреттерді түсінікті түрде тексеруге көмектесу үшін жасалған.",
    aboutDisclaimer: "Модель қателесуі мүмкін, әсіресе өңделген, сығылған немесе таныс емес суреттерде. Суреттің дереккөзі мен мәнмәтінін де ескеріңіз.",
    sampleTag: "КӨРНЕКІ МЫСАЛ",
    sampleCaption: "Бұл — иллюстрация, нақты тексеру нәтижесі емес.",
    footerText: "Интернеттегі суреттерге мұқият қарауға көмектесеміз.",
    buttonWorking: "Тексерілуде…",
    statusIdle: ""
  }
};

const languageButton = document.getElementById("languageButton");
const languageMenu = document.getElementById("languageMenu");
const fileInput = document.getElementById("fileInput");
const dropArea = document.getElementById("dropArea");
const uploadState = document.getElementById("uploadState");
const previewState = document.getElementById("previewState");
const previewImage = document.getElementById("previewImage");
const fileName = document.getElementById("fileName");
const fileMeta = document.getElementById("fileMeta");
const chooseButton = document.getElementById("chooseButton");
const removeImageButton = document.getElementById("removeImageButton");
const analyzeButton = document.getElementById("analyzeButton");
const statusMessage = document.getElementById("statusMessage");
const resultCard = document.getElementById("resultCard");
const checkAnotherButton = document.getElementById("checkAnotherButton");

let selectedFile = null;
let previewUrl = null;
let currentLanguage = getSavedLanguage();

function getSavedLanguage() {
  try {
    const saved = localStorage.getItem("deepcheck-language");
    return saved && translations[saved] ? saved : "en";
  } catch {
    return "en";
  }
}

function t(key) {
  return translations[currentLanguage]?.[key] ??
         translations.en[key] ??
         key;
}

function setLanguage(language) {
  if (!translations[language]) return;

  currentLanguage = language;
  document.documentElement.lang = language === "kz" ? "kk" : language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[language][key] !== undefined) {
      element.textContent = translations[language][key];
    }
  });

  languageButton.firstChild.textContent = language.toUpperCase() + " ";
  languageButton.setAttribute("aria-expanded", "false");
  languageMenu.classList.add("hidden");

  try {
    localStorage.setItem("deepcheck-language", language);
  } catch {

  }

  if (selectedFile) {
    analyzeButton.querySelector("span").textContent = t("analyzeButton");
  }

  if (!analyzeButton.disabled && analyzeButton.classList.contains("is-loading")) {
    analyzeButton.querySelector("span").textContent = t("buttonWorking");
  }
}


languageButton.addEventListener("click", () => {
  const open = languageMenu.classList.contains("hidden");
  languageMenu.classList.toggle("hidden", !open);
  languageButton.setAttribute("aria-expanded", String(open));
});

languageMenu.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".language-switcher")) {
    languageMenu.classList.add("hidden");
    languageButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    languageMenu.classList.add("hidden");
    languageButton.setAttribute("aria-expanded", "false");
  }
});


function setStatus(message, kind = "info") {
  statusMessage.textContent = message;
  statusMessage.className =
    "status-message" + (message ? ` is-${kind}` : "");
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function validateFile(file) {
  if (!file) return t("noFile");

  const extensionOk = /\.(jpe?g|png)$/i.test(file.name);

  if (!ALLOWED_TYPES.includes(file.type) && !extensionOk) {
    return t("invalidType");
  }

  if (file.size > MAX_FILE_SIZE) {
    return t("tooLarge");
  }

  return "";
}

function handleFile(file) {
  const error = validateFile(file);

  if (error) {
    setStatus(error, "error");
    return;
  }

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  selectedFile = file;
  previewUrl = URL.createObjectURL(file);

  previewImage.src = previewUrl;
  fileName.textContent = file.name;
  fileMeta.textContent = formatBytes(file.size);

  uploadState.classList.add("hidden");
  previewState.classList.remove("hidden");
  analyzeButton.disabled = false;
  resultCard.classList.add("hidden");

  setStatus(t("fileReady"), "success");
  fileInput.value = "";
}

function resetImage() {
  selectedFile = null;

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  previewUrl = null;

  previewImage.removeAttribute("src");
  fileName.textContent = "";
  fileMeta.textContent = "";

  uploadState.classList.remove("hidden");
  previewState.classList.add("hidden");

  analyzeButton.disabled = true;
  analyzeButton.classList.remove("is-loading");
  analyzeButton.querySelector("span").textContent = t("analyzeButton");

  resultCard.classList.add("hidden");
  setStatus("");
}


chooseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  fileInput.click();
});

dropArea.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  if (event.target === fileInput) return;

  fileInput.click();
});

dropArea.addEventListener("keydown", (event) => {
  if (event.target !== dropArea) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    fileInput.click();
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput.files?.[0]) {
    handleFile(fileInput.files[0]);
  }
});


["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.add("drag-over");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.remove("drag-over");
  });
});

dropArea.addEventListener("drop", (event) => {
  const file = event.dataTransfer?.files?.[0];

  if (file) {
    handleFile(file);
  }
});

removeImageButton.addEventListener("click", resetImage);
checkAnotherButton.addEventListener("click", resetImage);


function normalizeLabel(data) {
  const raw =
    data?.prediction ??
    data?.label ??
    data?.result ??
    data?.classification ??
    data?.class ??
    data?.status;

  if (typeof data?.is_ai_generated === "boolean") {
    return data.is_ai_generated ? "ai" : "real";
  }

  if (typeof data?.is_fake === "boolean") {
    return data.is_fake ? "ai" : "real";
  }

  if (typeof data?.is_real === "boolean") {
    return data.is_real ? "real" : "ai";
  }

  if (typeof raw === "boolean") {
    return raw ? "ai" : "real";
  }

  const value = String(raw ?? "")
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

  if ([
    "ai",
    "fake",
    "deepfake",
    "ai_generated",
    "synthetic",
    "generated",
    "artificial",
    "fake_image"
  ].includes(value)) {
    return "ai";
  }

  if ([
    "real",
    "genuine",
    "authentic",
    "original",
    "real_image",
    "not_fake"
  ].includes(value)) {
    return "real";
  }

  return null;
}

function normalizeConfidence(data) {
  let value =
    data?.confidence ??
    data?.probability ??
    data?.score ??
    data?.confidence_score;

  if (value && typeof value === "object") {
    value =
      value.ai_generated ??
      value.fake ??
      value.real ??
      value.score;
  }

  if (value === undefined || value === null || value === "") {
    return null;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return Math.round(
    Math.max(0, Math.min(100, number <= 1 ? number * 100 : number))
  );
}

function showResult(data) {
  const label = normalizeLabel(data);

  if (!label) {
    throw new Error("unrecognized-response");
  }

  const confidence = normalizeConfidence(data);
  const isAI = label === "ai";

  const resultBadge = document.getElementById("resultBadge");
  const resultSymbol = document.getElementById("resultSymbol");
  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");

  resultBadge.textContent = t("resultKicker");
  resultBadge.className = "result-badge" + (isAI ? " is-ai" : " is-real");

  resultSymbol.textContent = isAI ? "!" : "✓";
  resultSymbol.className = "result-symbol" + (isAI ? " is-ai" : "");

  resultTitle.textContent = t(isAI ? "resultAI" : "resultReal");
  resultDescription.textContent =
    t(isAI ? "resultAIExplanation" : "resultRealExplanation");

  document.getElementById("confidenceValue").textContent =
    confidence === null ? "—" : `${confidence}%`;

  document.getElementById("confidenceBar").style.width =
    confidence === null ? "0%" : `${confidence}%`;

  resultCard.classList.remove("hidden");
  setStatus("");

  resultCard.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}


async function analyzeSelectedImage() {
  if (!selectedFile) {
    setStatus(t("noFile"), "error");
    return;
  }

  if (!API_ENDPOINT.trim()) {
    setStatus(t("apiNotConnected"), "error");
    return;
  }

  const buttonLabel = analyzeButton.querySelector("span");

  analyzeButton.disabled = true;
  analyzeButton.classList.add("is-loading");
  buttonLabel.textContent = t("buttonWorking");

  setStatus(t("analyzing"), "info");
  resultCard.classList.add("hidden");

  try {
    const formData = new FormData();

    formData.append(
      API_FILE_FIELD,
      selectedFile,
      selectedFile.name
    );

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    showResult(data);

  } catch (error) {
    console.error("DeepCheck analysis error:", error);

    setStatus(
      error.message === "unrecognized-response"
        ? t("badResponse")
        : t("apiError"),
      "error"
    );

  } finally {
    analyzeButton.disabled = !selectedFile;
    analyzeButton.classList.remove("is-loading");
    buttonLabel.textContent = t("analyzeButton");
  }
}

analyzeButton.addEventListener("click", analyzeSelectedImage);



document.getElementById("currentYear").textContent =
  new Date().getFullYear();

setLanguage(currentLanguage);


(() => {
  "use strict";

  const canvas = document.getElementById("cipherReachBackground");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const ART_COLS = 96;

  const MAP = [
    "..........................................................................................okc8k8",
    "........................................................................................48okgkl9",
    "........................................................................................hecookcd",
    "..................................................................................vulckgir.oogdd",
    "................................................................................vqilgg.kihgg8c9g",
    "...........................................................................wtskppmvphcggh.d44gca",
    "........................................................................xpgkkkppmvvl555678754.gd",
    "......................................................................okskkhkslhmvi95444a854..4g",
    "........v8.4cg.k.ccy................................................ys.ksxxskokkkpako5889a5654g.",
    ".....8uppk.89gpdhpklk.c8g8cggokx.................................yklyyloolkhkko9d.9bk448kl.c8845",
    "....4c.hvktokokkakpplkohdgkkkklqx.........................xxkcgoymmmmmlhl8kokks8d....c545855..5.",
    "..qg8.hvu.ggkoptkdo.sshkklok5klkgx......................kskmpklmmmtddchxlk8wwok9c...95599.54444.",
    "cdkg8kpppoockghpmptkkkhkhkopwoppkkggk.................gophgpppisthtdcgtms8kklogcc....888.9544.4.",
    "qqk8.c88a8cccoilullpokhkdkokpllltodgkcck............okmggkdhf8k8ollpdxplo8kgdgk99......44.984..5",
    "dlcc8g5868gck8cpzyyxlkokkcggkolmxlcsokgoc..........cplk5.xx88...ooodlypoogkgkoc8d9.8.cg.4.tg..45",
    "h8c..469a88...oovvmyxsggcgk8lsplllkltmokgo.........4lix..kk......e8lmmdgcggddc8c88.89c4...kc....",
    "c..4.5546844..clutyyyxphkc88kgdkkkkgdkgplpx.........k8o.........xpsyppddcccc9d88c..s4...........",
    "g.44.48.54....8hlpxyuxxwkkcccgc8.c..dc5klppx...................xplktdockocc888c.c.gs............",
    "c5.4.44.4..c8..klllttxttsgcsw.c..8cc8g.ghlpk..................kxkllgedolso8kk8c..8g..............",
    ".644......okc..kpiplhslssggoswc.dwdd.cc.xpldc.................yi8mmdh9kkoo8kk88g.8..............",
    "4.7544...gso....kospokkkkgooos..dsxd..d.y8oldx................tkookotc.csg848gwo................",
    "4554.4..8t8.......cg88ssggkkoo8c88o8..g.o.4ydq................kkpcchcd.os4ss.gw.................",
    "..44...4u.............wscgswgoggc...8cc....sck.................lp8cl.w5kk4ss.....................",
    ".....4.k..................swkkkhdc..8g.c.w.....................plccldwwg84......................",
    "46..........................48gdolc..c.d.o.....................lk8kkd.wkd8......................",
    "...5..........................8dgkc..wcgd8.....................yg.pd9..kk84......................",
    "..5.5.........................cc.kc..wxxc......................xp8occ..oog8......................",
    "...d..........................os.g...4ws.......................gl9c8s4.wwsk......................",
    "..............................os................................l98cw4..........................",
    "g...............................................................kc.9............................"
  ];

  const SPLIT_COL = 48;
  const GLYPHS = ["0", "1", "X", "x", ">", "$", "s", "S", "-", ".", "/"];
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let width = 0;
  let height = 0;
  let dpr = 1;
  let cells = [];
  let pointer = { x: -1000, y: -1000, active: false };
  let animationFrame = 0;
  let lastTime = 0;
  let disposed = false;

  function resize() {
    const bounds = canvas.getBoundingClientRect();

    width = Math.max(1, bounds.width || window.innerWidth);
    height = Math.max(1, bounds.height || window.innerHeight);
    dpr = Math.min(2, window.devicePixelRatio || 1);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cellSize = Math.min(
      width / ART_COLS,
      height / Math.max(MAP.length, 24)
    );

    const artWidth = ART_COLS * cellSize;
    const artHeight = MAP.length * cellSize;
    const startX = (width - artWidth) / 2;
    const startY = (height - artHeight) / 2;

    cells = [];

    MAP.forEach((row, rowIndex) => {
      for (let col = 0; col < Math.min(row.length, ART_COLS); col++) {
        const token = row[col];

        if (token === ".") continue;

        const value = parseInt(token, 36);

        if (!Number.isFinite(value)) continue;

        const tone = value >> 2;
        if (tone < 1) continue;

        cells.push({
          x: startX + (col + 0.5) * cellSize,
          y: startY + (rowIndex + 0.5) * cellSize,
          col,
          row: rowIndex,
          tone,
          variant: value & 3,
          cellSize
        });
      }
    });

    draw(reduceMotion.matches ? 0 : performance.now());
  }

  function draw(time) {
    if (disposed) return;

    ctx.clearRect(0, 0, width, height);

    const cycle = (time / 1000) % 8;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (const cell of cells) {
      const toneStrength = Math.min(1, cell.tone / 8);
      let alpha = 0.18 + toneStrength * 0.28;

      let wave = 0;

      if (cycle < 3.5 && cell.col >= SPLIT_COL) {
        const front =
          ART_COLS - 1 -
          (cycle / 3.5) * (ART_COLS - SPLIT_COL);

        wave = Math.exp(-Math.pow((cell.col - front) / 5.5, 2));
      }

      else if (cycle >= 4.1 && cell.col < SPLIT_COL) {
        const progress = (cycle - 4.1) / 3.0;
        const front = SPLIT_COL - progress * SPLIT_COL;

        wave = Math.exp(-Math.pow((cell.col - front) / 5.5, 2));
      }

      let pointerGlow = 0;

      if (pointer.active) {
        const distance = Math.hypot(
          cell.x - pointer.x,
          cell.y - pointer.y
        );

        pointerGlow = Math.max(0, 1 - distance / 150);
      }

      const highlight = Math.min(
        1,
        wave * 0.72 + pointerGlow * 0.45
      );

      alpha = Math.min(0.85, alpha + highlight * 0.35);

      const useAccent =
        highlight > 0.18 ||
        ((cell.col * 3 + cell.row * 5) % 31 === 0);

      const color = useAccent
      ? `rgba(49, 78, 245, ${alpha})`
      : `rgba(43, 50, 75, ${alpha})`;

      ctx.fillStyle = color;

      const size = cell.cellSize;

      if (cell.tone >= 6 && cell.variant === 0) {
        const square = Math.max(1, size * 0.46);

        ctx.fillRect(
          cell.x - square / 2,
          cell.y - square / 2,
          square,
          square
        );
      } else {
        const glyph =
          GLYPHS[(cell.tone + cell.variant * 2) % GLYPHS.length];

        ctx.font = `600 ${Math.max(
          5,
          size * 0.78
        )}px ui-monospace, SFMono-Regular, Menlo, monospace`;

        ctx.fillText(glyph, cell.x, cell.y + size * 0.02);
      }
    }
  }

  function animate(now) {
    if (disposed) return;

    if (!reduceMotion.matches) {
      if (now - lastTime > 24) {
        draw(now);
        lastTime = now;
      }

      animationFrame = requestAnimationFrame(animate);
    }
  }

  function updatePointer(event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;

    if (reduceMotion.matches) {
      draw(0);
    }
  }

  function clearPointer() {
    pointer.active = false;

    if (reduceMotion.matches) {
      draw(0);
    }
  }

  resize();

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", updatePointer, { passive: true });
  window.addEventListener("pointerleave", clearPointer, { passive: true });

  if (!reduceMotion.matches) {
    animationFrame = requestAnimationFrame(animate);
  }

  reduceMotion.addEventListener?.("change", () => {
    cancelAnimationFrame(animationFrame);

    if (reduceMotion.matches) {
      draw(0);
    } else {
      animationFrame = requestAnimationFrame(animate);
    }
  });

  window.addEventListener(
    "pagehide",
    () => {
      disposed = true;

      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", clearPointer);
    },
    { once: true }
  );
})();