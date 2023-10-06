<template>
    <div data-theme="retro" class="body">
        <!-- <button @click="showNotificyarn uation()">Notificacion</button> -->
        <vue-snotify></vue-snotify>
        <router-view />
    </div>
</template>

<script setup>
// if ("serviceWorker" in navigator) {
//   // navigator.serviceWorker.register("/sw.js");
//   navigator.serviceWorker.register("/sw.js");
// if (Notification.permission !== "granted") {
//   Notification.requestPermission();
// }
// }


// addEventListener("notificationclick", (event) => {});

// function showNotification() {
//     Notification.requestPermission((result) => {
//         if (result === "granted") {
//             navigator.serviceWorker.ready.then((registration) => {
//                 registration.showNotification("Atención", {
//                     body: "Esto es una notificación",
//                     icon: "../public/android-chrome-512x512.png",
//                     actions: [
//                         { action: "aceptar", title: "Aceptar" },
//                         { action: "rechazar", title: "Rechazar" },
//                     ],
//                 });
//             });
//         }
//     });
// }

const channel = new BroadcastChannel("sw-mensajes");
channel.addEventListener("message", (event) => {
    console.log("Received", event.data.title);
    if (event.data.title == "aceptar") {
        console.log("Botón aceptar pulsado");
    }
    if (event.data.title == "rechazar") {
        console.log("Botón rechazar pulsado");
    }
});
</script>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    layout: 'default',
    components: {},
    created() {
        if ("serviceWorker" in navigator) {
            // navigator.serviceWorker.register("/sw.js");
            navigator.serviceWorker.register("/sw.js");
            if (Notification.permission !== "granted") {
                Notification.requestPermission();
            }
        }
        // Check for and authenticate with the stored token
        this.authenticateWithStoredToken();
        this.socketStart();

        // Set the snotify instance on the store
        this.$store.$snotify = this.$snotify;
        this.$router = this.$router;


        this.$socket.on('notificationSocket', (message) => {
            console.log('notificationSocket');
            console.log(message);
            this.showNotification(message);
        });

    },
    methods: {
        ...mapActions(['authenticateWithStoredToken', 'socketStart']),

 showNotification(message) {
    Notification.requestPermission((result) => {
        if (result === "granted") {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(message.title, {
                    body: message.body,
                    icon: "../public/android-chrome-512x512.png",
                    actions: [
                        { action: "aceptar", title: "Aceptar" },
                        { action: "rechazar", title: "Rechazar" },
                    ],
                });
            });
        }
    });
}
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'isLoading']),
    },
};
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

.background-container {
    background-color: #010603;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='272' height='272' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%23003723' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%2300402c' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%23003723' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%2300402c' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%230A4A35' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%2300240b' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%23032911' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%23082E16' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%23032911' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%2300240b' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%23082E16' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%2300240b' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%23082E16' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%23032911' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%23082E16' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E");
}

.body {
    background-color: #f4f6f8;
}
</style>
