const toUser = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt
  };
};

module.exports = {
  toUser
};
