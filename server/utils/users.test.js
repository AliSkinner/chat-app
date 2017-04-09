const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'User 1',
      room: 'Room One'
    }, {
      id: 2,
      name: 'User 2',
      room: 'Room One'
    }, {
      id: 3,
      name: 'User 3',
      room: 'Room Two'
    }];
  });

  it('should create new user', () => {
    let users = new Users();
    let user = {
      id: 312,
      name: 'test',
      room: 'test room'
    };
    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users.length).toEqual(1);
    expect(users.users[0].name).toBe('test');
  });

  it('should return names for Room One', () => {
    let userList = users.getUserList('Room One');
    expect(userList).toEqual(['User 1', 'User 2']);
  });

  it('should return names for Room Two', () => {
    let userList = users.getUserList('Room Two');
    expect(userList).toEqual(['User 3']);
  });

  it('should find user by id', () => {
    let userId = 1;
    let user = users.getUser(userId);
    expect(user.id).toEqual(userId);
  });

  it('should not find user', () => {
    let userId = 5;
    let user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should remove a user', () => {
    let userId = 1;
    let user = users.removeUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not remove a user', () => {
    let userId = 5;
    let user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

});
