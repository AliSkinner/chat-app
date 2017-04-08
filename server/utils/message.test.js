const expect = require('expect');
let {generateMessage} = require('./message');

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
