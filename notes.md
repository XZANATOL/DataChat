Notes taken about the methods and approaches I tried while building the project.

### XMLHttpRequest & fetch Requests (JS)

These are the common methods to send a HTTP request.

* Fetch obligates you to manaully serialize your POST payload before sending the request, which can introduce some un-accounted edge cases when uploading files.
* XMLHttpRequest can automate this part as you can directly pass on a file object.

### PocketBase Users

PocketBase has 2 users tables. One for admins & the other is for auth users.

### PocketBase Server Sent Events (SSE)

**08-02-2023**
After implmenting the logic, I got caught in a refactor trap. SSE will trigger on any create, change, or delete. This includes ones sent from the client session, making the logic of manually updating the UI on the server 20x response useless.

I've added the logic for catching the triggers for now without updating the UI. I'm going to refactor the code so that the SSE handlers render the UI rather than waiting for the server response with a request succeded/failed. This part will only be responsible for showing error messages if exist.

Also, I've written a [blog](https://xzansite.cyclic.app/blog/Programming/Web_Development/Real_Time_Communication_On_A_Low_Level_(SSE)) taking the approach I used to understand this real time API as an example.

### UX

**Keyboard Shortcuts**<br>
Usually the keyboard shortcuts are only active on desktop devices. This can be achieved by checking the screen-width in JS using `window.screen.width`.

### To-Do

**(In progress)**
* Add SSE updates to render.
* Add error handlers. (For connection establishment bugs while on mobile)
* Add HTTPs support?
* Make an icon for the app.
* Add support for playing audios. (Audio also supports .ogg files, Gonna need to add some smart logic to detect [audio](https://stackoverflow.com/questions/30604696/use-javascript-to-detect-if-an-mp4-video-has-a-sound-track) & [frames](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) existence)


**Done**
* Add the ability to Drag&Drop files. (mostly gonna use the `drop` event in JS)
* (1) Add Code-Block support in the `textProcessor` function. (Text analysis is one of the trickiest things one must deal with)
* (2) Add the support to select the whole block on triple click. (Idea inspired from [Advent of Code](https://xzansite.cyclic.app/blog/Programming/Events/Advent%20of%20Code%202022))
* (3) Add support for tab intendations. (Need this for python codes)
* Add uploading animation for more responsive preview.
* Add support for playing videoes.
* Play abit with the realtime API that pocketBase offers. (More docs reading)


**(low priority)**
* Add the ability to paste in images. (Spending sometime reading [Clipboard APIS](https://w3c.github.io/clipboard-apis/) docs)<br>
Firefox doesn't allow webpages to access clipboard data via JS, and my daily driver is Firefox. Going to work on this later for Chrome, but currently, I'm more focused on the app productivity.