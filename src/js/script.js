document.addEventListener('DOMContentLoaded', function() {
    var currentLanguage = 'en';

    window.changeLanguage = function() {
        var languageSelector = document.getElementById('languageSelector');
        currentLanguage = languageSelector.value;
        updateContent();
    };

    function updateContent() {
        loadJSON('src/locales/' + currentLanguage + '.json', function(data) {
            applyTranslations(data);
        });
    }

    function loadJSON(file, callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', file, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(null);
    }

    function applyTranslations(translations) {
        // Apply translations based on IDs
        for (var id in translations) {
            if (translations.hasOwnProperty(id)) {
                var element = document.getElementById(id);
                if (element) {
                    element.textContent = translations[id];
                }
            }
        }
    }

    console.log("It's ready!");

    updateContent();
});