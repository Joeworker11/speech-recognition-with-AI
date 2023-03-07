
const mainEngine = () => {

    // create a SpeechRecognition object
    const recognition = new window.webkitSpeechRecognition();
    
    // set the language to Hungarian
    recognition.lang = 'hu-HU';
    
    // start the speech recognition
    recognition.start();
    
    // when speech is recognized, handle the result
    recognition.onresult = function(event) {
      // get the first recognition result
      const result = event.results[0][0].transcript;
      console.log('You said: ' + result);
      
      // send the result to ChatGPT API to generate a response
      // (this part requires an API key and an HTTP request)
      
      // create a speech synthesis object
      const synthesis = window.speechSynthesis;
      
      // create a new speech utterance with the response
      const utterance = new SpeechSynthesisUtterance('Igen, köszönöm jól vagyok. És te?');
      
      // set the language to Hungarian
      utterance.lang = 'hu-HU';
      
      // speak the response
      synthesis.speak(utterance);
    };
    
    // handle errors
    recognition.onerror = function(event) {
      console.error('Speech recognition error: ' + event.error);
    };
    
    // stop the speech recognition when it ends
    recognition.onend = function() {
      console.log('Speech recognition ended');
    };
    
    // // create a speech synthesis object
    // const synthesis = window.speechSynthesis;
    
    // // wait for the voices to be loaded
    // synthesis.onvoiceschanged = function() {
    //   // get the available voices
    //   const voices = synthesis.getVoices();
    
    //   // log the voices and their properties
    //   voices.forEach(voice => {
    //     console.log(`Name: ${voice.name}, Lang: ${voice.lang}, Gender: ${voice.gender}, VoiceURI: ${voice.voiceURI}`);
    //   });
    // };
}



const callToAction = () => {
    // create a new SpeechRecognition object
const recognition = new window.webkitSpeechRecognition();

// set the language of the recognition
recognition.lang = 'en-US';

// set the maximum number of alternative transcripts to be returned
recognition.maxAlternatives = 1;

// start the recognition
recognition.start();

// add an event listener for when a result is received
recognition.onresult = event => {
  const transcript = event.results[0][0].transcript;
  console.log(`You said: ${transcript}`);
};
}


document.querySelector("#btn").addEventListener('click', mainEngine);


const liveAssisstant = () => {
    // create a new SpeechRecognition object
const recognition = new window.webkitSpeechRecognition();

// set the language of the recognition
recognition.lang = 'en-US';

// set the maximum number of alternative transcripts to be returned
recognition.maxAlternatives = 1;

// create a new SpeechSynthesis object
const synthesis = window.speechSynthesis;

// create a function to send a message to the OpenAI API and receive a response
async function sendMessage(message) {
  // set up the request parameters
  const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  };
  const data = {
    prompt: message,
    max_tokens: 60,
    temperature: 0.5,
    n: 1
  };

  // send the request and wait for the response
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  });
  const result = await response.json();

  // extract the response text from the result
  const text = result.choices[0].text.trim();

  // return the response text
  return text;
}

// start the recognition
recognition.start();

// add an event listener for when a result is received
recognition.onresult = async event => {
  const transcript = event.results[0][0].transcript;
  console.log(`You said: ${transcript}`);

  // send the transcript to the OpenAI API and get a response
  const response = await sendMessage(transcript);
  console.log(`AI said: ${response}`);

  // create a new utterance and set its text to the response
  const utterance = new SpeechSynthesisUtterance(response);

  // set the voice of the utterance (optional)
  const voices = synthesis.getVoices();
  utterance.voice = voices.find(voice => voice.name === 'YOUR_PREFERRED_VOICE_NAME');

  // speak the utterance
  synthesis.speak(utterance);
};
}
