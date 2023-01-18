Notes taken about the methods and approaches I tired while building the project.

### XMLHttpRequest & fetch Requests (JS)

These are the common methods to send a HTTP request.

* Fetch obligates you to manaully serialize your POST payload before sending the request, which can introduce some un-accounted edge cases when uploading files.
* XMLHttpRequest can automate this part as you can directly pass on a file object.

### PocketBase Users

PocketBase has 2 users tables. One for admins & the other is for auth users.

### UX

**Keyboard Shortcuts**
Usually the keyboard shortcuts are only active on desktop devices. This can be achieved by checking the screen-width in JS using `window.screen.width`

### To-Do

* Add the ability to paste in images. (Spending sometime reading [Clipboard APIS](https://w3c.github.io/clipboard-apis/) docs)
* Add the ability to Drag&Drop files. (mostly gonna use the `drop` event in JS)
* (1) Add Code-Block support in the `textProcessor` function.
* (2) Add the support to select the whole block on triple click. (Idea inspired from [Advent of Code](https://xzansite.cyclic.app/blog/Programming/Events/Advent%20of%20Code%202022))
* Play a bit with the realtime API that pocketBase offers. (More docs reading)