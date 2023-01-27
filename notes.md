Notes taken about the methods and approaches I tried while building the project.

### XMLHttpRequest & fetch Requests (JS)

These are the common methods to send a HTTP request.

* Fetch obligates you to manaully serialize your POST payload before sending the request, which can introduce some un-accounted edge cases when uploading files.
* XMLHttpRequest can automate this part as you can directly pass on a file object.

### PocketBase Users

PocketBase has 2 users tables. One for admins & the other is for auth users.

### UX

**Keyboard Shortcuts**<br>
Usually the keyboard shortcuts are only active on desktop devices. This can be achieved by checking the screen-width in JS using `window.screen.width`.

### To-Do

#### Paste in Images

**(In progress)**
* (2) Add the support to select the whole block on triple click. (Idea inspired from [Advent of Code](https://xzansite.cyclic.app/blog/Programming/Events/Advent%20of%20Code%202022))
* (3) Add support for tab intendations.
* Play abit with the realtime API that pocketBase offers. (More docs reading)


**Done**
* Add the ability to Drag&Drop files. (mostly gonna use the `drop` event in JS)
* (1) Add Code-Block support in the `textProcessor` function. (Text analysis is one of the trickiest things one must deal with)


**(low priority)**
* Add the ability to paste in images. (Spending sometime reading [Clipboard APIS](https://w3c.github.io/clipboard-apis/) docs)<br>
Firefox doesn't allow webpages to access clipboard data via JS, and my daily driver is Firefox. Going to work on this later for Chrome, but currently, I'm focused more on the app productivity.