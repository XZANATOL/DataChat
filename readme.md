# DataChat

A self-host personal chat app that groups some basic features of Whatsapp and Discord to store personal data in an organized manner.

### Usage

The project is a custom built interface to visualize the data on top of [PocketBase](pocketbase.io/) project, So it needs to be installed first:

1) Download the compiled project depending on your os from [here](https://github.com/pocketbase/pocketbase/releases) & place it in the project root directory.
2) Run `pocketbase migrate` to apply data base migrations. A 'pb_data' folder will be created.
3) Run `pocketbase serve` to start the server.
4) OPTIONAL: you can append `--http=<ip_addr>:<port>` to serve the application on a custom IP address if you own it.

### How It Started

If you're a nerd, you probably have some kind of a private chat that only includes you as a member where you quick save notes, links, pics, etc. (Mine are on Whatsapp & Discord)

Speaking about their pros:
1) **Discord:** gives you channels to better orgaize your data.
2) **Whatsapp:** gives you a quick share option with peers, and access to data when you're offline.

For the cons:
1) **Discord:** you need to be online to access your data.
2) **Whatsapp:** you don't have the channels feature to organize your data which can makes alot of notes slip by if you're someone who frequently takes notes throughout the day.

having to deal with the cons, things tends to get a bit annoying. So I decided to build up the best of the two worlds. A chat app that has enables you to organize data, can be accessed offline and put it online (on a local network) whenever I want to, and for better flexibility, I have to be able to host it from mobile.

### How It's Built

In order to meet the requirments of real-time offline data, and portability. I needed a database to be hosted on a mobile, build a Rest-API for data transactions, and an interface to easier interact with the stack. First things first.

After some researching, I ended up choosing the following stack to satisfy the needs of the project:
* [UserLand](https://userland.tech/) for Linux virtualization on Android.
* [PocketBase](https://pocketbase.io) a backend platform with a builtin database, JWT authentication, SDK, and a Restful API all packed into one single executable. To make it better, It's written in Go and directly compiled for ARM64.
* A webpage with HTML-CSS-JS as an interface to make the files compact and portable. PocketBase allows for the host of static files besides its services if they're put in **pb_public** folder. [Docs](https://pocketbase.io/docs/)

### Database Design

As the project won't deal with user accounts or chatting rooms, so It will be simple as making one table with 3 basic fields:
* **Channel Name:** to implement the idea of the channels in Discord.
* **Text:** to get the message text. (if any)
* **Files:** to get the associated file. (if any)

### UI/UX Design

* Dark Theme.
* Controls (channel select, text & files input, send button) at the bottom for quick access on mobile.
* Double click a message to delete.
* Ability to upload multiple files. (each file as a seperate message)
* Keyboard shortcuts in Desktop mode. (Ctrl+Shift+F to upload a file, Ctrl+Shift+M to focus text input)