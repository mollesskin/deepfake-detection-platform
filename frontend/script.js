const translations = {

    ru: {
        uploadTitle: "Загрузите фотографию",
        uploadDescription: "Выберите фотографию с устройства",
        chooseButton: "Выбрать фотографию",
        uploadHint: "JPG и PNG, до 10 МБ"
    },

    kz: {
        uploadTitle: "Суретті жүктеңіз",
        uploadDescription: "Құрылғыңыздан суретті таңдаңыз",
        chooseButton: "Суретті таңдау",
        uploadHint: "JPG және PNG, 10 МБ дейін"
    },

    en: {
        uploadTitle: "Upload your image",
        uploadDescription: "Choose a photo from your device",
        chooseButton: "Choose image",
        uploadHint: "JPG and PNG, up to 10 MB"
    }

};


const languageButton =
    document.getElementById("languageButton");

const languageMenu =
    document.getElementById("languageMenu");


function setLanguage(language) {

    const text = translations[language];

    document.getElementById("uploadTitle").textContent =
        text.uploadTitle;

    document.getElementById("uploadDescription").textContent =
        text.uploadDescription;

    document.getElementById("chooseButton").textContent =
        text.chooseButton;

    document.getElementById("uploadHint").textContent =
        text.uploadHint;

    languageButton.textContent =
        language.toUpperCase();

    localStorage.setItem("language", language);

    languageMenu.classList.add("hidden");
}



languageButton.addEventListener("click", () => {

    languageMenu.classList.toggle("hidden");

});


languageMenu.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        const language =
            button.dataset.language;

        setLanguage(language);

    });

});


const savedLanguage =
    localStorage.getItem("language") || "en";

setLanguage(savedLanguage);
const fileInput = document.getElementById("fileInput");

const chooseButton = document.getElementById("chooseButton");
const changeButton = document.getElementById("changeButton");

const checkButton = document.getElementById("checkButton");
const anotherButton = document.getElementById("anotherButton");

const errorButton = document.getElementById("errorButton");

const uploadState = document.getElementById("uploadState");
const previewState = document.getElementById("previewState");
const loadingState = document.getElementById("loadingState");
const resultState = document.getElementById("resultState");
const errorState = document.getElementById("errorState");

const previewImage = document.getElementById("previewImage");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");

const resultLabel = document.getElementById("resultLabel");
const confidenceValue = document.getElementById("confidenceValue");
const confidenceProgress = document.getElementById("confidenceProgress");
const resultDescription = document.getElementById("resultDescription");

const errorTitle = document.getElementById("errorTitle");
const errorMessage = document.getElementById("errorMessage");

let selectedFile = null;



const API_URL = "http://localhost:8000/predict";


chooseButton.addEventListener("click", () => {
    fileInput.click();
});

changeButton.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    handleFile(file);
});



function handleFile(file) {

    resetStates();

    const allowedTypes = [
        "image/jpeg",
        "image/png"
    ];

    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {

        showError(
            "Unsupported format",
            "Please choose a JPG or PNG image."
        );

        return;
    }

    if (file.size > maxSize) {

        showError(
            "File is too large",
            "The maximum allowed file size is 10 MB."
        );

        return;
    }

    selectedFile = file;

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;

    fileName.textContent = file.name;

    fileSize.textContent = formatFileSize(file.size);

    uploadState.classList.add("hidden");
    previewState.classList.remove("hidden");
}



checkButton.addEventListener("click", async () => {

    if (!selectedFile) {

        showError(
            "No image selected",
            "Please choose an image first."
        );

        return;
    }

    showLoading();

    try {

        const formData = new FormData();

        formData.append("file", selectedFile);


        /*
         * BACKEND CONNECTION
         *
         * When Aяулым creates the backend,
         * this request will send the image to it.
         */

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });


        if (!response.ok) {
            throw new Error("Server error");
        }


        const data = await response.json();

        showResult(
            data.label,
            data.confidence
        );

    } catch (error) {

        /*
         * TEMPORARY DEMO RESULT
         *
         * Remove this block after backend
         * integration is completed.
         */

        setTimeout(() => {

            showResult(
                "REAL",
                94
            );

        }, 1200);
    }
});



function showLoading() {

    uploadState.classList.add("hidden");
    previewState.classList.add("hidden");
    resultState.classList.add("hidden");
    errorState.classList.add("hidden");

    loadingState.classList.remove("hidden");

    checkButton.disabled = true;
}



function showResult(label, confidence) {

    loadingState.classList.add("hidden");
    resultState.classList.remove("hidden");

    const isReal =
        String(label).toUpperCase() === "REAL";

    resultLabel.textContent =
        isReal ? "REAL" : "AI GENERATED";

    resultLabel.style.color =
        isReal ? "#12b76a" : "#f04438";

    confidenceValue.textContent =
        `${Math.round(confidence)}%`;

    confidenceProgress.style.width =
        `${Math.round(confidence)}%`;

    if (isReal) {

        resultDescription.textContent =
            "The image appears to be authentic based on the model analysis.";

    } else {

        resultDescription.textContent =
            "The model detected signs that the image may have been artificially generated.";
    }
}


function showError(title, message) {

    uploadState.classList.add("hidden");
    previewState.classList.add("hidden");
    loadingState.classList.add("hidden");
    resultState.classList.add("hidden");

    errorState.classList.remove("hidden");

    errorTitle.textContent = title;
    errorMessage.textContent = message;
}


errorButton.addEventListener("click", () => {

    resetStates();

    fileInput.value = "";

    selectedFile = null;

    uploadState.classList.remove("hidden");
});


anotherButton.addEventListener("click", () => {

    resetStates();

    fileInput.value = "";

    selectedFile = null;

    uploadState.classList.remove("hidden");

    window.location.hash = "checker";
});


function resetStates() {

    uploadState.classList.add("hidden");
    previewState.classList.add("hidden");
    loadingState.classList.add("hidden");
    resultState.classList.add("hidden");
    errorState.classList.add("hidden");
}


function formatFileSize(bytes) {

    if (bytes < 1024 * 1024) {

        return `${(bytes / 1024).toFixed(1)} KB`;

    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}