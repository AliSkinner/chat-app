const expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',  () => {

  it('it should generate correct message object', () => {
    let text = 'Hi, mate!';
    let from = 'test@test.com';
    let message = generateMessage(from, text);

    expect(message).toInclude({text, from});
    expect(message.from).toBe('test@test.com');
    expect(message.text).toBe('Hi, mate!');
    expect(message.createdAt).toBeA('number');
  });

});

describe('generateLocationMessage',  () => {

  it('it should generate correct location object', () => {
    let from = 'test-user';
    let latitude = '51.5432642';
    let longitude = '-0.0863518';
    let location = generateLocationMessage(from, latitude, longitude);
    let url = `https://google.com/maps/?q=${latitude},${longitude}`;

    expect(location).toInclude({from});
    expect(location.createdAt).toExist();
    expect(location.url).toBe(url);
  });

});
