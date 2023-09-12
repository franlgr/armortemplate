// Import necessary modules and dependencies
import FeathersClient from '../../FeathersClient'; // Import FeathersClient for authentication
import router from '../../router'; // Import the router for navigation
import store from '../../store'; // Import the store for state management
import snotify from 'vue3-snotify';
// import $snotify from 'vue3-snotify';
// import 'vue3-snotify/style';
// Define the initial state of the authentication module
const state = {
  token: null, // Stores the authentication token
  user: null, // Stores the authenticated user's information
};

// Define getters to retrieve information from the state
const getters = {
  isAuthenticated: (state) => state.token !== null, // Checks if a user is authenticated
  getUser: (state) => state.user, // Retrieves the user information
};

// Define mutations to update the state
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token; // Mutates the state to set the authentication token
  },
  SET_USER(state, user) {
    state.user = user; // Mutates the state to set the authenticated user's information
  },
};

// Define actions to perform authentication-related tasks
const actions = {
  //set user
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  // Action to log in a user
  async login({ commit }, { email, password }) {
    console.log('login', email, password);

    // Set loading state to true (assumed 'loading' is defined in the store)
    store.state.loading = true;

    try {
      const response = await FeathersClient.authenticate({
        strategy: 'local', // Authentication strategy (e.g., username/password)
        email, // User's email
        password, // User's password
      });

      // Store the received access token and user information in the state
      commit('SET_TOKEN', response.accessToken);
      commit('SET_USER', response.user);

      console.log('snotify', this.$snotify);

      // Redirect to the '/admin' view
      router.push('/admin');

      // Set loading state to false after 1000 milliseconds
      setTimeout(() => {
        store.state.loading = false;
        this.$snotify.success('Succes login', 'Authentication', {
          timeout: 4000,
          // showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
        });
      }, 1000);

      // Return the authentication response
      return response;
    } catch (error) {
      // Set loading state to false after 1000 milliseconds in case of an error
      setTimeout(() => {
        store.state.loading = false;
        this.$snotify.error('Invalid login', 'Authentication', {
          timeout: 4000,
          // showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
        });
      }, 1000);

      // Throw an error if authentication fails
      throw error;
    }
  },

  // Action to authenticate a user with a stored token
  async authenticateWithStoredToken({ commit }) {
    const storedToken = window.localStorage.getItem('feathers-jwt'); // Retrieve the stored token

    // Set loading state to true
    store.state.loading = true;

    if (storedToken) {
      console.log('Stored token found. Authenticating with existing token...');

      try {
        const response = await FeathersClient.authenticate({
          strategy: 'jwt', // JWT authentication strategy
          accessToken: storedToken, // Stored access token
        });

        // Store the stored access token and user information in the state
        commit('SET_TOKEN', storedToken);
        commit('SET_USER', response.user);

        // Set loading state to false after 1000 milliseconds
        setTimeout(() => {
          store.state.loading = false;
        }, 1000);

        // Return the authentication response
        return response;
      } catch (error) {
        console.log('no hay token');
        console.error('Authentication error', error); // Log an error if authentication fails

        // Set loading state to false after 1000 milliseconds in case of an error
        setTimeout(() => {
          store.state.loading = false;
        }, 1000);

        // Throw an error if authentication fails
        throw error;
      }
    } else {
      // Set loading state to false after 1000 milliseconds if no stored token is found
      setTimeout(() => {
        store.state.loading = false;
      }, 1000);

      console.log(
        'No stored token found. Proceeding without authentication...',
      );
    }
  },

  // Action to log out a user
  logout({ commit }) {
    // Clear the stored token and user information in the state
    commit('SET_TOKEN', null);
    commit('SET_USER', null);

    // Remove the token from local storage
    window.localStorage.removeItem('feathers-jwt');

    this.$snotify.info('Sucess logout', 'Logout', {
      timeout: 4000,
      // showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
    });

    // Redirect to the '/login' view
    router.push('/login');
  },
};

// Define the authentication module
const authModule = {
  state,
  getters,
  mutations,
  actions,
};

// Export the authentication module for use in other parts of the application
export default authModule;
