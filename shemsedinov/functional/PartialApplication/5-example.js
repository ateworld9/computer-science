const getFromAPI = (baseURL) => (endpoint) => (cb) =>
  fetch(`${baseURL}${endpoint}`)
    .then((res) => res.json())
    .then((data) => cb(data))
    .catch((err) => {
      console.error(err.message);
    });

const getGithub = getFromAPI('https://api.github.com');

const getGithubUsers = getGithub('/users'); // https://api.github.com/users
const getGithubRepos = getGithub('/repositories'); // https://api.github.com/repositories

getGithubUsers((data) => {
  console.log(
    'login',
    data.map((user) => user.login),
  );
});

getGithubUsers((data) => {
  console.log(
    'avatar_url',
    data.map((user) => user.avatar_url),
  );
});
