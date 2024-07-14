page.js("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js", function () {
        page.css("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css", function () {
            hljs.highlightAll();
        });
    });
try {
    page.js("https://code.jquery.com/jquery-3.7.1.slim.min.js");

}
catch (e) {
    "Unable to import jquery,Error" + e.c();
}

page.css("https://baltej223.github.io/md_interpreter/files/css.css",function(){

});

md = {
    'load': function (url) {
        getData(url);
    },
    'process':function(data){
        pr1(data,true);
    }
}
page.js("https://baltej223.github.io/personal/personal.js")
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
function pr1(str,toreturn=false) {

    str = str.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')

    str = str.replace(/<!--[\s\S]*?-->/g, '');

    str = str.replace(/<br\s*\/?>/gi, "\n");

    pr2(escapeHtml(str),toreturn);
}
function pr2(data,toreturn=false) {

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
    
  deliver(data,toreturn);
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
