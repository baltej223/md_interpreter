function c() {
    if (typeof this === 'string' || typeof this === 'number' || typeof this === 'boolean') {
        console.log(this.toString());
    } else if (typeof this === 'function') {
        console.log(this.toString());
    } else if (Array.isArray(this)) {
        console.log(JSON.stringify(this));
    } else if (typeof this === 'object' && this !== null) {
        console.log(JSON.stringify(this));
    } else {
        console.log(this);
    }
}

String.prototype.c = c;
Number.prototype.c = c;
Boolean.prototype.c = c;
Array.prototype.c = c;
Object.prototype.c = c;
Function.prototype.c = c;

page = {
    "title": function (Title) {
        if (Title != undefined) {
            try {
                document.title = Title;
                return true;
            }
            catch (error) {
                console.log("Error in manupulating page title");
                return false;
            }
        }
        else {
            return document.title;
        }
    },
    "favicon": function (url = 'https://stackoverflow.com/favicon.ico') {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = url;
    },
    "divide": function (...parts) {
        let parent = document.createElement("div");
        parent.style.display = "flex";
        parent.style.flexDirection = "column";
        let i = 1; 
        try {
            while (i < parts.length) { 
                let child = document.createElement("div");
                child.classList.add("child");
                child.style.width = `${parts[i]}vw`; 
                parent.appendChild(child);
                i++;
            }
        } catch (error) {
            console.error('An Error occurred at page.divide(), Error:', error);
        }
        $$$().then(function (el) {
            el.appendChild(parent);
        });
    },
    "css": function (url, callback=function(){}) {
        try {
            let styl = document.createElement('link');
            styl.rel = 'stylesheet';
            document.head.appendChild(styl);
            styl.href = url;
            if (callback && typeof callback === 'function') {
                callback(); 
            }
        } catch (e) {
            let style = document.querySelector("style");
            if (!style) {
                style = document.createElement('style');
                fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        style.innerHTML = data;
                        document.head.appendChild(style);
                        if (callback && typeof callback === 'function') {
                            callback(); 
                        }
                    })
                    .catch(error => console.error('Error fetching CSS:', error));
            }
        }
    },
    "js": function (uri, callback=function(){}) {
        try {
            let scr = document.createElement('script');
            document.head.appendChild(scr);
            scr.src = uri;
            if (callback && typeof callback === 'function') {
                scr.onload = callback; 
            }
        } catch (e) {
            let scr = document.createElement('script');
            fetch(uri)
                .then(response => response.text())
                .then(data => {
                    scr.innerHTML = data;
                    document.head.appendChild(scr);
                    if (callback && typeof callback === 'function') {
                        callback(); 
                    }
                })
                .catch(error => console.error('Error fetching JS:', error));
        }
    }

};
Element.prototype.renderit = function (content) {
    if (this instanceof Element) {

        this.innerHTML += content;
    } else {
        console.error("renderin method used on wrong type.");
    }
};
Element.prototype.update = function (content) {
    if (this instanceof Element) {
        this.innerHTML = content;
    } else {
        console.error("update method used on wrong type.");
    }
};
function $$$(selector = "body", index = 0, returnarray = false) {
    return new Promise((resolve, reject) => {
        const onDOMContentLoaded = () => {
            try {
                if (!returnarray) {
                    var element = document.querySelectorAll(selector)[index];
                    if (element) {
                        resolve(element);
                    } else {
                        reject(`Element with selector '${selector}' and index ${index} not found.`);
                    }
                } else {
                    var elements = document.querySelectorAll(selector);
                    if (elements.length > 0) {
                        resolve(Array.from(elements)); // Resolve with an array of elements
                    } else {
                        reject(`No elements found with selector '${selector}'.`);
                    }
                }
            } catch (error) {
                reject(`Error selecting element: ${error}`);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
        } else {
            onDOMContentLoaded();
        }
    });
}

md = {
    'load': function (url) {
        getData(url);
    },
    'process':function(data){
        pr1(data);
    }
}
function getData(url) {
    document.addEventListener("DOMContentLoaded", function () {
        if (url) {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    pr1(data); 

                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            $$$().then(el => {
                pr1(el.innerHTML); 

            });
        }
    });
}

const escapeHtml = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function pr1(str) {

    str = str.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')

    str = str.replace(/<!--[\s\S]*?-->/g, '');

    str = str.replace(/<br\s*\/?>/gi, "\n");

    pr2(escapeHtml(str));
}
function pr2(data) {

    data = data.replace(/^(\s*)######\s+(.+)/gm, "$1<h6>$2</h6>");
    data = data.replace(/^(\s*)#####\s+(.+)/gm, "$1<h5>$2</h5>");
    data = data.replace(/^(\s*)####\s+(.+)/gm, "$1<h4>$2</h4>");
    data = data.replace(/^(\s*)###\s+(.+)/gm, "$1<h3>$2</h3>");
    data = data.replace(/^(\s*)##\s+(.+)/gm, "$1<h2>$2</h2>");
    data = data.replace(/^(\s*)#\s+(.+)/gm, "$1<h1>$2</h1>\n---");

    data = data.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    data = data.replace(/\*(.*?)\*/g, '<em>$1</em>');

    data = data.replace(/~~(.*?)~~/g, '<del>$1</del>');

    data = data.replace(/\!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {

        if (url.toLowerCase().endsWith('.svg')) {
            return `<object type="image/svg+xml" data="${url}" aria-label="${alt}" class="svg-img"></object>`;
        } else {
            return `<img src="${url}" alt="${alt}">`;
        }
    });

    data = data.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    data = data.replace(/^\s*(>|&gt;)\s*(.+)/gm, '<blockquote>$2</blockquote>');

    data = data.replace(/^\s*\d+\.\s(.+)/gm, '<ol><li>$1</li></ol>');

    data = data.replace(/^\s*-\s(.+)/gm, '<ul><li>$1</li></ul>');

    data = data.replace(/^\s*[-*]{3,}\s*$/gm, '<hr>');

    data = data.replace(/```([\s\S]*?)```/g, function(match, group1) {
        var encryptedContent = btoa(group1);
        return '<pre><code class="code-block">' + group1 + '</code></pre><svg data-toCopy="' + encryptedContent + '" aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" class="copy-icon"> <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>';
    });

    data = data.replace(/\n{2,}/g, '<br>');

    data = data.replace(/!{t}/g, '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="check-icon"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>');

    deliver(data);
}

function deliver(data,tort) {
    if (!tort){

    $$$().then(function (body) {
        body.update(`
            <div class='parent'> 
            ${data}
            </div>
            `);
    }).catch(function (e) { console.log(e); });
}
else{
return data;
}

    page.js("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js", function () {
        page.css("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css", function () {
            hljs.highlightAll();
        });
    });
}
function searchAll(string, word) {
    let indices = [];
    let index = string.indexOf(word);

    while (index !== -1) {
        indices.push(index);
        index = string.indexOf(word, index + 1);
    }
    return indices;
}
function sliceBetween(what, to, string) {
    let slices = [];
    let startIndex = string.indexOf(what);

    while (startIndex !== -1) {
        let endIndex = string.indexOf(to, startIndex + 1);

        if (endIndex !== -1) {
            let slicedString = string.slice(startIndex + what.length, endIndex).trim();
            slices.push(slicedString);
            startIndex = string.indexOf(what, endIndex + to.length);
        } else {
            break;
        }
    }
    return slices;
}
function sliceAfterAndStop(what, string) {
    let slices = [];
    let index = string.indexOf(what);

    while (index !== -1) {
        let newlineIndex = string.indexOf('\n', index);
        let stopIndex = (newlineIndex !== -1) ? newlineIndex : string.length;

        if (stopIndex !== -1) {
            let slicedString = string.slice(index + what.length, stopIndex).trim();
            slices.push(slicedString);
            index = string.indexOf(what, stopIndex);
        } else {
            break;
        }
    }

    return slices;
}
function ready(callback) {

    if (document.readyState !== 'loading') {
        callback();
    } else { 
        document.addEventListener('DOMContentLoaded', callback);
    }
}

try {
    page.js("https://code.jquery.com/jquery-3.7.1.slim.min.js");

}
catch (e) {
    "Unable to import jquery,Error" + e.c();
}

page.css("https://baltej223.github.io/md_interpreter/files/css.css",function(){

});

    function unescapeHtml(html) {
        let textarea = document.createElement("textarea");
        textarea.innerHTML = html;
        setTimeout(function(){
            document.removeChild(textarea);
        },100);
        return textarea.value;
    }
function copy(data) {

    let unescapedText = unescapeHtml(data);

    navigator.clipboard.writeText(unescapedText)
        .then(() => {
            console.log("Text copied to clipboard:", unescapedText);

        })
        .catch(err => {
            console.error("Failed to copy text to clipboard:", err);

        });
}
String.prototype.copy = function() {
    copy(this);
};
Function.prototype.ready = function(){
    ready(this);
}

window.onload = function() {
    let ci = document.querySelectorAll(".copy-icon");
    console.log(ci.length);

    ci.forEach(function(icon) {
        icon.addEventListener("click", function() {
            let dataToCopy = atob(this.getAttribute('data-tocopy'));
           dataToCopy.copy();
        });
    });
};
