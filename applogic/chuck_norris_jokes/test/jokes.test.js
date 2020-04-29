const axios=require('axios');

it('check jokes URL', async () => {
  expect.assertions(1);
  const jokeResp = await axios.get('https://api.icndb.com/jokes');
  const randomNum = Math.floor(Math.random()*20);
  expect(typeof jokeResp.data.value[randomNum].joke).toBe('string');
});
