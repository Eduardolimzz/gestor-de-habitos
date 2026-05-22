let users = [];
let id = 1;

const create = (user) => {
  const newUser = {
    id: id++,
    ...user
  };

  users.push(newUser);
  return newUser;
};

const findByEmail = (email) => {
  return users.find(user => user.email === email);
};

const findById = (id) => {
  return users.find(user => user.id === Number(id));
};

module.exports = {
  create,
  findByEmail,
  findById
};