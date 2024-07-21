# Markdown files interpreter
Make github like README ,in your HTML site

**IT IS NOT A README FILE GENRATOR**

Write MarkDown in your Webpage and use this library to interpret it.

Put it in your HTML file's head tag,
```
<script src='https://baltej223.github.io/md_interpreter/main.js'> </script>
```

# Working of md_interpreter-js ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

<br>

I wrote this md_interpreter-js which you can use to write MarkDown Files
in html page and it also have a github like interface 

## Loading .md files

### md.load()
For using this MarkDown-interpretor need to call
```
md.load(url);
//or 
md.load();
```

if you pass any url of a markdown file, then it will fetch that url and display that markdown file
**but if you dont pass any parameter then if will pick up what is written in body, if is markdown, will display it**
**and thats all you need to load a MARKDOWN(.md) file**

### md.process()
use this if you want end result should be returned rather than being displayed
Syntax:
```
md.process(data)
// data is data that you want to process
```

The js file that i created have many functions which might be helpful for other tasks to.
I was thinkin to make a personal-js github repositry in which i may keep these functions.
here is a list of all function that i created
edit: i created [personal.js](https://github.com/baltej223/personal)

#### functions (permanently moved!)
- page
- **.c()** *(my fav)* [permanently moved to other repositry](https://github.com/baltej223/personal)
- .renderit() [permanently moved to other repositry](https://github.com/baltej223/personal)
- .update() 
- **$$$()** *(my fav)* 
- escapeHtml() 
- **searchAll()** [permanently moved to other repositry](https://github.com/baltej223/personal)
- **sliceBetween()** [permanently moved to other repositry](https://github.com/baltej223/personal)
- **sliceAfterAndStop()** [permanently moved to other repositry](https://github.com/baltej223/personal)
- **ready()**
- unescapeHtml()
- **copy()** *(my fav)* 
---

## page
it have some functions
- page.title();
- page.css(); *(my fav)*
- page.js(); *(my fav)*
- page.favicon();
- page.divide();

### page.title('title')
as its name suggests, changes html page's title.
### page.css(url,callback);
Its is a wonderful function that can add css file using PURE JS. And callback
is fired when import is complete 
### page.js(url,callback);
Its is a magnificient function that can add JS file JUST using PURE JS. And callback
is fired when import is complete ;)
### page.favicon(url)
setup page's favicon for you, default is stackoverflow's
### page.divide(...);
divides page vertically and add class to there parent element 'parent' and to 
child elements 'child'
syntax:
```
page.divide(InHowManyParts,%OfFirstPart,%OfSecondPart...,%OfNthPart)
```
## .c()
Its is really helpful in debuggin. Its is just console.log's short form.<br>
It is short form of console.log() but works like a method
It is short form of console.log() but works like a method
<br/>
exmaple:
```
function myFunction(){
    return "something that it can return";
}
myFunction().c();
```
console:
```
something that it can return
```
## .renderit()

Its a fancy way to add something to innerHTML
```
element.renderit(`
    HTML TO ADD
`);
```
## .update()
It works in a similar way like .renderit() but it updated HTML rather than pushing it in.

## $$$()
Really helpful in senarios when there are dynamically added elements.
Basically its a promise which returns the element when element is fully dynamically added.
It works on **JS** promises.
syntax:
```
$$$("tag/class/id",index,true/false).then(function(element){
    //element accesible here
}).catch(function(e){
    console.error(e);
});
```
- **first parameter** : (selector) by default is "body"
- **second parameter** : (index) by default is 0
- **third parameter** : (wether to return array of element with this selector) default is false

Example:
```
$$$(".classOfSomething",1).then(function(element){
    element.renderit(`
    <p>hi</p>
    `);
}).catch(function(e){
    console.error(e);
});
```
## escapeHtml()
It escapes HTML for you, which is good for sensitisation
<br/>
Syntax:
```
escapeHtml('html to be escaped')
//it will return you escaped html
```
## searchAll()
This function finds all occurrences of a substring within another
string (string) and collects the starting indices of each occurrence 
into an **array**.
<br/>
Syntax:
```
searchAll(string,sunstring);
```
## sliceBetween()
As its name suggests, it slices between given chracters.It 
extract substrings from string that are located between 
two markers. Here is an Example
```
let string = "start123middle456end789start987middle654end321";
let result = sliceBetween("start", "end", string);
console.log(result); // Output: ["123middle456", "987middle654"]

```
## sliceAfterAndStop()
It is just an another cheap copy of sliceBetween() function, 
it just slices till it findes a line break and returns all occurences 
in the form of an array

## ready()
Its can be called using two methods
```
ready(function(){
    //code to be runned when page loades goes here
})
// and 
function newFunction(){
//code to be runned when page loades goes here
}
newFunction().ready();
```
You might have already understood how it works

## unescapeHtml()
Syntax:
```
unescapeHtml(escaped_html)
```
it returns unescaped html when escaped html is passed as an parameter
## copy()
It can be used for copying items to clipboard
<br/>
it can be called using two ways
```
data = 'data to be copied'
copy(data);
//and 
data.copy();
```
#### These were all the powers it had :)

An exmaple [file i have](https://baltej223.github.io/md_interpreter/files/example.html)
<br>
another example [here](https://baltej223.github.io/md_interpreter/files/example2.html)

```
Made and Organised by: Baltej Singh
```
