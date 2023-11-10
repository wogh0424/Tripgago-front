import i18next from 'i18next';

function changeLanguageFunction() {
    const lang = localStorage.getItem("lang");

    const changeLanguage = (lang) => {
        i18next.changeLanguage(lang);
    };

    if (lang === "english") {
        changeLanguage("en");
    } else if (lang === "japanese") {
        changeLanguage("jp");
    } else {
        changeLanguage("ko");
    }
}

export default changeLanguageFunction;
