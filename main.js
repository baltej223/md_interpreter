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

// Extend prototypes of built-in types
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
        let i = 1; // Start with index 0 for the array
        try {
            while (i < parts.length) { // Use < instead of <= to avoid out-of-bounds access
                let child = document.createElement("div");
                child.classList.add("child");
                child.style.width = `${parts[i]}vw`; // Access parts at index i
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
    "css": function (url, callback) {
        try {
            let styl = document.createElement('link');
            styl.rel = 'stylesheet';
            document.head.appendChild(styl);
            styl.href = url;
            if (callback && typeof callback === 'function') {
                callback(); // Execute callback if provided and is a function
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
                            callback(); // Execute callback if provided and is a function
                        }
                    })
                    .catch(error => console.error('Error fetching CSS:', error));
            }
        }
    },
    "js": function (uri, callback) {
        try {
            let scr = document.createElement('script');
            document.head.appendChild(scr);
            scr.src = uri;
            if (callback && typeof callback === 'function') {
                scr.onload = callback; // Execute callback when script loads successfully
            }
        } catch (e) {
            let scr = document.createElement('script');
            fetch(uri)
                .then(response => response.text())
                .then(data => {
                    scr.innerHTML = data;
                    document.head.appendChild(scr);
                    if (callback && typeof callback === 'function') {
                        callback(); // Execute callback if provided and is a function
                    }
                })
                .catch(error => console.error('Error fetching JS:', error));
        }
    }

};

Element.prototype.renderit = function (content) {
    if (this instanceof Element) {
        //this.innerHTML += content;
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
function $$$(selector = "body", index = 0) {
    return new Promise((resolve, reject) => {
        const onDOMContentLoaded = () => {
            var element = document.querySelectorAll(selector)[index];
            if (element) {
                resolve(element);
            } else {
                reject(`Element with selector '${selector}' and index ${index} not found.`);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
        } else {
            onDOMContentLoaded();
        }
    });
}
getData();
function getData(url) {
    document.addEventListener("DOMContentLoaded", function () {
        if (url) {
            fetch(url)
                .then(function (rec) {
                    pr1(rec);
                })
                .catch(function (e) {
                    console.error(e);
                });
        }
        else {
            $$$().then(function (el) {
                pr1(el.innerHTML);
                //el.innerHTML.c();
            });
        }
    });
}
const escapeHtml = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function pr1(str) {
    // remove script tags
    str = str.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    // remove html comments
    str = str.replace(/<!--[\s\S]*?-->/g, '');
    //escape html here
    pr2(escapeHtml(str));
}

function pr2(data) {
    //made and enhanced using AI :(
    // Handle headings (h1 to h6)
    data = data.replace(/^#\s(.+)/gm, '<h1>$1</h1>\n---');
    data = data.replace(/^##\s(.+)/gm, '<h2>$1</h2>');
    data = data.replace(/^###\s(.+)/gm, '<h3>$1</h3>');
    data = data.replace(/^####\s(.+)/gm, '<h4>$1</h4>');
    data = data.replace(/^#####\s(.+)/gm, '<h5>$1</h5>');
    data = data.replace(/^######\s(.+)/gm, '<h6>$1</h6>');

    // Handle bold text
    data = data.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Handle italic text
    data = data.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Handle strikethrough text
    data = data.replace(/~~(.*?)~~/g, '<del>$1</del>');

     // Handle images (![alt text](image url))
    data = data.replace(/\!\[([^\]]+)\]\(([^)]+)\)/g, (match, alt, url) => {
        // Check if it's an SVG image
        if (url.toLowerCase().endsWith('.svg')) {
            return `<object type="image/svg+xml" data="${url}" aria-label="${alt}" class="svg-img"></object>`;
        } else {
            return `<img src="${url}" alt="${alt}">`;
        }
    });
    
    // Handle links ([link name](link address))
    data = data.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Handle blockquotes (> blockquote)
    data = data.replace(/^\s*>\s(.+)/gm, '<blockquote>$1</blockquote>');

    // Handle ordered lists (1. list item)
    data = data.replace(/^\s*\d+\.\s(.+)/gm, '<ol><li>$1</li></ol>');

    // Handle unordered lists (- list item)
    data = data.replace(/^\s*-\s(.+)/gm, '<ul><li>$1</li></ul>');

    // Handle horizontal rules (--- or ***)
    data = data.replace(/^\s*[-*]{3,}\s*$/gm, '<hr>');

    data = data.replace(/```([\s\S]*?)```/g, (match, codeContent) => {
        // Remove the leading and trailing newlines
        codeContent = codeContent.trim();
        // Replace double line breaks with <br> tags within code blocks
        codeContent = codeContent.replace(/\n{2,}/g, '<br>');
        return `<pre><code>${codeContent}</code></pre>`;
    });

    // Replace double line breaks with <br> tags
    data = data.replace(/\n{2,}/g, '<br>');

    // Deliver the formatted data to the DOM
    deliver(data);
}

/*
function pr2(data) {
//made my hooman
        // Handle headings
        let _1hashesArray = sliceAfterAndStop("# ", data);
        _1hashesArray.forEach(_1hashes => {
            data = data.replaceAll(`# ${_1hashes}`, `<h1>${_1hashes}</h1> <hr>`);
        });
    
        // Handle bold text
        let _boldArray = sliceBetween("**", "**", data);
        _boldArray.forEach(_bold => {
            data = data.replaceAll(`**${_bold}**`, `<strong>${_bold}</strong>`);
        });
    
        // Handle links
        data = data.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
        // Handle code blocks
        let _3smudgeArray = sliceBetween("```", "```", data);
        _3smudgeArray.forEach(_3smudge => {
            data = data.replaceAll(_3smudge,
                `<pre><code class='code-block'>${_3smudge}</code></pre>
                <svg class='copy-icon' aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>`)
                .replaceAll("```", "");
        });
    
        // Replace double line breaks with <pre>
        data = data.replaceAll(`\n\n`, `<pre>\n</pre>`);
    
        // Deliver the formatted data to the DOM
        deliver(data);

    
}
*/
function deliver(data) {
    //update dom and highlight.js
    $$$().then(function (body) {
        body.update(`
            <div class='parent'> 
            ${data}
            </div>
            `);
    }).catch(function (e) { console.log(e); });

    //for heighlight.js
    page.js("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js", function () {
        page.css("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css", function () {
            hljs.highlightAll();
        });
    });
    //make copy icons working
    //copyIcons();
    //-----------------
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
    // in case the document is already rendered
    if (document.readyState != 'loading') {
        callback();
    } else { // modern browsers
        document.addEventListener('DOMContentLoaded', callback);
    }
}
// for jquery
try {
    page.js("https://code.jquery.com/jquery-3.7.1.slim.min.js");
    //page.js("./files/jquery.js")
}
catch (e) {
    "Unable to import jquery,Error" + e.c();
}



function copyIcons() {
}
md = {
    'load': function (url) {
        getData(url)
    }
}
//<script src="https://code.jquery.com/jquery-3.7.1.slim.min.js"></script>
