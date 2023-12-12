const AuthService = {
  // Function to check if the access token is expired
  isAccessTokenExpired: () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return true;
    }

    try {
      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
      return Date.now() >= expirationTime;
    } catch (error) {
      console.error("Error decoding or parsing the access token:", error);
      return true;
    }
  },

  // Function to refresh the access token
  refreshAccessToken: async () => {
    try {
      // Assume that the refresh token is stored in a cookie named 'jwt'
      const refreshToken = getCookie("jwt");

      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const response = await fetch(
        `http://your-api-url/refresh?refreshToken=${refreshToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error refreshing access token. Status: ${response.status}`
        );
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);

      return data.accessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  },

  // Function to perform login
  login: async (username, password) => {
    try {
      const response = await fetch("http://your-api-url/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Error logging in. Status: ${response.status}`);
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      return data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Function to perform logout
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

export default AuthService;
