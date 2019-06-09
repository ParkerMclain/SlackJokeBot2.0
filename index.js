const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-661905516070-648301080530-RT5LallzyHIAkORa8zGGR51i',
    name: 'jokebot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel(
        'general', 
        'Get Ready to Laugh with @JokeBot!', 
        params);
});

//Error handler
bot.on('error', (err) => console.log(err));

//Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message')
    {
        return;
    }
    handleMessage(data.text);
});

function handleMessage(message)
{
    if(message.includes(' chucknorris')) {
        chuckJoke();
    }
}

function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random/')
    .then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'general', 
            `Chuck Norris: ${joke}`, 
            params);

    })
}