import socket from '../../plugins/socket';
const state = {
    messages: [],
  };
  
  const mutations = {
    SET_MESSAGES(state, messages) {
      state.messages = messages;
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
      console.log('state.messages', state.messages);
    },
  };

  const getters = {
    getMessages: (state) => state.messages,
  };
  
  const actions = {
    // Aquí puedes definir las acciones relacionadas con socket
    // Por ejemplo, una acción para enviar un nuevo mensaje
    sendNewMessage({ commit }, message) {
      // Lógica para emitir el mensaje al servidor
      // Después, puedes llamar a la mutación para agregar el mensaje a la lista
      console.log('message', message);
      // const newMessage = {
      //     text: this.message,
      //     sender: this.getUser,
      //     seen: false,
      // };
      socket.emit('NEW_MESSAGE_SERVER', message);
      // this.messages.push(newMessage);
      commit('ADD_MESSAGE', message);
      // this.message = '';
      // commit('ADD_MESSAGE', message);
    },
    lisenMessage({ commit }, message) {

      socket.on('MESSAGES_CLIENT', (messages) => {
        console.log('messages', messages);
        commit('SET_MESSAGES', messages);
        // this.messages = messages;
    });

      
        socket.on('NEW_MESSAGE_CLIENT', (message) => {
            console.log('messages', message);
            // this.messages.push(message);
            commit('ADD_MESSAGE', message);
            // this.$socket.emit('NEW_MESSAGE', message);
            console.log('NUEVO MENSAJE');
            // audio.play();
            var audio = document.getElementById('audio-player');
            console.log('audio', audio);
            audio.play();
        });
    //   commit('ADD_MESSAGE', message);
    }
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  