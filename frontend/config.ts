let apiUrl;

if (process.env.NODE_ENV === "development") {
  apiUrl = "http://localhost:3000";
} else if (process.env.NODE_ENV === "production") {
  apiUrl = "https://bulkgrossisten.onrender.com";
}

const config = {
  apiUrl
};

export default config;
