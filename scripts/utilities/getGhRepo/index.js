const GitHub = require('github-api');

const getGhRepo = async (username, repo) => {
  const gh = new GitHub({
    token: process.env.GITHUB_TOKEN,
  });
  return gh.getRepo(username || 'pharingee', repo || 'psammead');
};

module.exports = getGhRepo;
