<template>
    <div>
    <AdminHeader title="Default" icon="fa-solid fa-star"></AdminHeader>
        <div class="flex h-screen antialiased text-gray-800">
            <!-- {{messages}} -->
            <!-- {{getMessages}} -->
            <audio id="audio-player">
                                <source src="@/assets/message.mp3" type="audio/mpeg" />
                                Your browser does not support the audio tag.
                              </audio>
            <div class="flex flex-row h-full w-full overflow-x-hidden" @keyup.enter="send()">
                <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                    <div class="flex flex-row items-center justify-center h-12 w-full">
                        <div class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        ></path>
                                      </svg>
                        </div>
                        <div class="ml-2 font-bold text-2xl">General Chat</div>
                    </div>
                    <div class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                        <div class="h-20 w-20 rounded-full border overflow-hidden">
                            <img v-if="getUser.image" :src="getUser.image" alt="Avatar" class="h-full w-full" />
                            <img v-else src="https://picsum.photos/200/300" alt="Placeholder" class="h-full w-full" />
                        </div>
                        <div v-if="getUser.name" class="text-sm font-semibold mt-2">
                            {{ getUser.name }}
                        </div>
                        <div v-else class="text-sm font-semibold mt-2">
                            {{ getUser._id }}
                        </div>
                        <div class="text-xs text-gray-500">{{ getUser.email }}</div>
                        <div class="flex flex-row items-center mt-3">
                            <div class="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                                <div class="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                            </div>
                            <div class="leading-none ml-1 text-xs">Active</div>
                        </div>
                    </div>
                    <div class="flex flex-col mt-8">
                        <div class="flex flex-row items-center justify-between text-xs">
                            <span class="font-bold">Users</span>
                            <span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{{ users.length }}</span
                                      >
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Search"
                                      class="input input-bordered w-24 md:w-auto m-4 h-7"
                                    />
                                    <!-- {{ getUser }} -->
                                    <div class="flex flex-col space-y-1 -mx-2 h-48 overflow-y-auto">
                                      <button
                                        v-for="user in users"
                                        :key="user.index"
                                        @click="private(user._id)"
                                        class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                      >
                                        <div
                                          class="flex items-center justify-center h-8 w-8 bg-purple-300 rounded-full"
                                        >
                                          <img
                                            v-if="user.image"
                                            :src="user.image"
                                            alt="User Image"
                                            class="h-8 w-8 rounded-full"
                                          />
                                          <img
                                            v-if="!user.image"
                                            src="https://picsum.photos/200/300"
                                            alt="User Image"
                                            class="h-8 w-8 rounded-full"
                                          />
                                        </div>
                                        <div class="ml-2 text-sm font-semibold">
                                          {{ user.name + ' ' + user.lastname }}
                                        </div>
                                      </button>
                                    </div>
                                    
                                    
                                  </div>
                                </div>
                                <div class="flex flex-col flex-auto h-full p-6">
                                  <div
                                    class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
                                  >
                                    <div class="flex flex-col h-full overflow-x-auto mb-4" ref="messageContainer">
                                      <div   v-for="(message, index) in getMessages"
                                            :key="index">
                                        <div class="grid grid-cols-12 gap-y-2">
                                          <div
                                            class="col-start-1 col-end-8 p-2 rounded-lg"
                                            
                                           
                                          >
                                            <div class="flex flex-row items-center">
                                              <!-- {{message.sender.image}} -->
                                              <div class="rounded" style="height: 50px; width: 50px">
                                                <img
                                                v-if="message.sender"
                                                  class="rounded-full w-12 h-12"
                                                  :src="message.sender.image"
                                                />
                                              </div>
                                              <div
                                                class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                              >
                                                <div>{{ message.text }}</div>
                                                <div
                                                  v-if="message.seen"
                                                  class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                                                >
                                                  Seen
                                                </div>
                                              </div>
                                            </div>
                                            
                                          </div>
                                          <!-- <div class="col-start-6 col-end-13 p-3 rounded-lg" >
                                            <div
                                              class="flex items-center justify-start flex-row-reverse"
                                            >
                                              <div
                                                class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                              >
                                                A
                                              </div>
                                              <div
                                                class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                              >
                                                <div>
                                                  {{ message.text }}
                                                </div>
                                              </div>
                                            </div>
                                          </div> -->
                                        </div>
                                      </div>
                                    </div>
                        
                                    <!-- <div class="flex flex-col h-full overflow-x-auto mb-4">
                                                <div class="flex flex-col h-full">
                                                  <div class="grid grid-cols-12 gap-y-2">
                                                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                                    {{messages}}
                                                      <div class="flex flex-row items-center">
                                                        <div
                                                          class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                        >
                                                          A
                                                        </div>
                                                        
                                                        <div
                                                          class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                        >
                                                          <div>Hey How are you today?</div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                                      <div class="flex flex-row items-center">
                                                        <div
                                                          class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                        >
                                                          A
                                                        </div>
                                                        <div
                                                          class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                        >
                                                          <div>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit. Vel ipsa commodi illum saepe numquam maxime
                                                            asperiores voluptate sit, minima perspiciatis.
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                                      <div class="flex items-center justify-start flex-row-reverse">
                                                        <div
                                                          class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                        >
                                                          A
                                                        </div>
                                                        <div
                                                          class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                        >
                                                          <div>I'm ok what about you?</div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                                      <div class="flex items-center justify-start flex-row-reverse">
                                                        <div
                                                          class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                        >
                                                          A
                                                        </div>
                                                        <div
                                                          class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                        >
                                                          <div>
                                                            Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                                      <div class="flex flex-row items-center">
                                                        <div
                                                          class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                        >
                                                          A
                                                        </div>
                                                        <div
                                                          class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                        >
                                                          <div>Lorem ipsum dolor sit amet !</div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                                      <div class="flex items-center justify-start flex-row-reverse">
                                                        <div
                                                          class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                        >
                                                          A
                                                        </div>
                                                        <div
                                                          class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                        >
                                                          <div>
                                                            Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                                          </div>
                                                          <div
                                                            class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                                                          >
                                                            Seen
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                                      <div class="flex flex-row items-center">
                                                        <div
                                                          class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                        >
                                                          A
                                                        </div>
                                                        <div
                                                          class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                        >
                                                          <div>
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                            Perspiciatis, in.
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                                      <div class="flex flex-row items-center">
                                                        <div
                                                          class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                        >
                                                          A
                                                        </div>
                                                        <div
                                                          class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                        >
                                                          <div class="flex flex-row items-center">
                                                            <button
                                                              class="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10"
                                                            >
                                                              <svg
                                                                class="w-6 h-6 text-white"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                              >
                                                                <path
                                                                  stroke-linecap="round"
                                                                  stroke-linejoin="round"
                                                                  stroke-width="1.5"
                                                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                ></path>
                                                                <path
                                                                  stroke-linecap="round"
                                                                  stroke-linejoin="round"
                                                                  stroke-width="1.5"
                                                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                ></path>
                                                              </svg>
                                                            </button>
                                                            <div class="flex flex-row items-center space-x-px ml-4">
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-12 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-6 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-5 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-3 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                                              <div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div> -->
                                    <!-- {{messages}} -->
                                    <div
                                      class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                                    >
                                      <div>
                                        <button
                                          class="flex items-center justify-center text-gray-400 hover:text-gray-600"
                                        >
                                          <svg
                                            class="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                          </svg>
                                        </button>
                                      </div>
                                      <div class="flex-grow ml-4">
                                        <div class="relative w-full">
                                          <input
                                            v-model="message"
                                            type="text"
                                            class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                          />
                                          <button @click="openEmojis =!openEmojis"
                                            class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                          >
                                            <svg
                                              class="w-6 h-6"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                              ></path>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                      <div class="ml-4">
                                        <button
                                          @click="send()"
                                          class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                        >
                                          <span>Send</span>
                            <span class="ml-2">
                                            <svg
                                              class="w-4 h-4 transform rotate-45 -mt-px"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                              ></path>
                                            </svg>
                                          </span>
                            </button>
                            <!-- <button
                                          @click="sendPrivate()"
                                          class="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                        >
                                          <span>Send Private</span>
                                            <span class="ml-2">
                                            <svg
                                              class="w-4 h-4 transform rotate-45 -mt-px"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                              ></path>
                                            </svg>
                                          </span>
                                            </button> -->
                                         
                        </div>
                        
                    </div>
                    <emoji-picker v-if="openEmojis" style="width: 342px; height: 264px;" class="m-2"/>
                </div>
            </div>
            
        </div>
    </div>
    </div>
</template>

<script>
// import store from 'vuex'
import { mapActions, mapGetters } from 'vuex';
import FeathersClient from '@/FeathersClient.js';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import EmojiPicker from '../../components/EmojiPicker.vue';

export default {
    data() {
        return {
            users: [],
            message: '',
            // messages: [],
            roomId: 'miSalaPrivada',
            openEmojis: false
        };
    },
    components: {EmojiPicker},
    computed: {
        ...mapGetters(['getUser']),
        // Agrega getters de module2
        ...mapGetters('chat', ['getMessages']),
    },

    mounted() {
        this.fetchUsers(); //
        this.lisenMessage();

        this.$socket.emit('MESSAGES_SERVER');
       

        // this.$socket.on('MESSAGES_CLIENT', (messages) => {
        //     console.log('messages', messages);
        //     this.messages = messages;
        // });

        //  const messageContainer = this.$refs.messageContainer;

        this.$socket.on('NEW_MESSAGE_CLIENT', () => {
            // Hacer scroll hacia abajo
            // Usar this.$refs para acceder a messageContainer
             const messageContainer = this.$refs.messageContainer;  

            // Verificar si messageContainer existe
            if (messageContainer) {
                // Hacer scroll hacia abajo
                this.$nextTick(() => {
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                });
            }
            // this.$socket.emit('NEW_MESSAGE', message);
        });
        this.$socket.on('MESSAGES_CLIENT', () => {
            // Hacer scroll hacia abajo
            // Usar this.$refs para acceder a messageContainer
             const messageContainer = this.$refs.messageContainer;  

            // Verificar si messageContainer existe
            if (messageContainer) {
                // Hacer scroll hacia abajo
                this.$nextTick(() => {
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                });
            }
            // this.$socket.emit('NEW_MESSAGE', message);
        });


        // Escuchar eventos de mensaje desde el servidor
        // this.$socket.on('mensaje', (message) => {
        //     console.log(`Mensaje recibido: ${message}`);
        // });
    },
    methods: {
        ...mapActions(['loadingSet', 'chat']),
        // Agrega la nueva acción sendNewMessage del módulo socket
        ...mapActions('chat', ['sendNewMessage', 'lisenMessage']),
        async fetchUsers() {
            this.loadingSet(true);
            try {
                const res = await FeathersClient.service('users').find({
                    query: {
                        // Puedes agregar filtros o parámetros de consulta aquí si es necesario
                    },
                });
                this.loadingSet(false);
                this.users = res.data; // Almacena los datos de usuarios en la variable users
                console.log('fetchUsers', res);
            } catch (error) {
                this.loadingSet(false);
                this.$snotify.error(error, 'Error', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                });
                console.error(error);
            }
        },
        send() {
            this.sendNewMessage({
                text: this.message,
                sender: this.getUser,
                seen: false,
            });
            this.message = '';
            // const newMessage = {
            //     text: this.message,
            //     sender: this.getUser,
            //     seen: false,
            // };
            // this.$socket.emit('NEW_MESSAGE_SERVER', newMessage);
            // this.messages.push(newMessage);
            // this.message = '';
        },
        private(userId) {
            // this.privateChannel = true;
            console.log('private a', userId);

            // Unirse a la sala privada cuando se monta el componente
            // this.$socket.emit('unirse-a-sala-privada', this.roomId);


        },
        sendPrivate() {
            // Enviar un mensaje privado a la sala

            this.$socket.emit('mensaje-privado', {
                roomId: this.roomId,
                mensaje: this.message,
            });

            this.message = '';
        }
    },
    components: {
        AdminHeader,
    },
};
</script>
