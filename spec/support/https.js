const {get} = require('https');

export const getResponseAndBody = options => new Promise((resolveWith, rejectWith) => {
  let body = '';
  const request = get(options);
  request.on('error', rejectWith);
  request.on('response', response => {
    response.setEncoding('UTF-8');
    response.on('data', chunk => body += chunk);
    response.on('end', () => resolveWith({response, body}));
  });
});
