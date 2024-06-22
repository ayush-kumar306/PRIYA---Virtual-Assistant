// Selecting the elements.
const btn = document.querySelector('.talk');              // Selects the element with the class 'talk'.
const content = document.querySelector('.content');       // Selects the element with the class 'content'.

// Function to Speak Text.
function speak(text) {                                          // Takes a string 'text' and converts it to speech using the Web Speech API.
    const text_speak = new SpeechSynthesisUtterance(text);      // Creates a 'SpeechSynthesisUtterance' object with the provided text.
    setFemaleVoice(text_speak);                                 // Sets a female voice for the utterance.      
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);                   // Uses the 'speechSynthesis' API to speak the utterance.
}

// Function to Set Female Voice.
function setFemaleVoice(utterance) {                                                                            // Sets a female voice for the given 'utterance'.
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.gender === 'female');       // Finds a voice with "Female" in its name or gender set to female.
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    } else {
        console.log('Female voice not found, using default voice');                                             // If a female voice is found, it sets it to the 'utterance'. Otherwise, it logs a message and uses the default voice.
    }
}

// Function to Wish Based on Time.
function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon");
    } else {
        speak("Good Evening");
    }
}

// Initialization on Page Load.
window.addEventListener('load', () => {
    window.speechSynthesis.onvoiceschanged = () => {
        speak("Initializing PRIYA");
        wishMe();
    };
});

// Speech Recognition Setup.
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const wakeWordRecognition = new SpeechRecognition();

// Recognition settings.
recognition.continuous = false;          // Stops recognition automatically after speech ends.
wakeWordRecognition.continuous = true;   // Keeps listening continuously for the wake word.
wakeWordRecognition.interimResults = false;

// Wake Word Recognition Handler.
wakeWordRecognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript.toLowerCase().trim();
    if (transcript.includes('hey priya')) {
        speak("Ji");
        recognition.start();
    }
};

// Command Recognition Handler.
recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hello')) {
        speak("Hello! How are you?");
    } else if (message.includes("namaste mata") || message.includes("pranam mata")) {
        speak("Kush Raho Betaa");
    } else if (message.includes("about bipin")) {
        speak("Bipin! son of Mr. S K Singh and Mrs. Lal Muni Devi! is an educationist with over 20 years of work experience and a great father and husband.");
    } else if (message.includes("i love you priya") || message.includes("i love you")) {
        speak("That's so sweet! But I am just an AI interface, I cannot provide you the same emotion! Sorry.");
    } else if (message.includes("about yash")) {
        speak("Yash! son of Mr. Om Shankar Singh and Mrs. Priya! is the creator of this AI interface named Priya! He is a web designer and a frontend developer.");
    } else if (message.includes("about ayush")) {
        speak("Ayush! son of Mr. Om Shankar Singh and Mrs. Priya! is the creator of this AI interface named Priya! He is a web designer and a frontend developer.");
    } else if (message.includes("about muskan")) {
        speak("Muskan! daughter of Mr. Om Shankar Singh and Mrs. Priya! is a web designer in TCS with over 2 years of work experience! And a lovely child of her parents.");
    } else if (message.includes("about om shankar singh")) {
        speak("Mr. Om Shankar Singh! son of late Mr. Anandjee Singh! is a senior technician in SRU department of BSL plant Bokaro with over 20 years of work experience! And a great father as well as husband.");
    } else if (message.includes("about priya")) {
        speak("Mrs. Priya! daughter of Mr. S K Singh and Late Mrs. Lal Muni Devi! is an LIC agent in Bokaro with over 10 years of work experience! And a great mother as well as wife.");
    } else if (message.includes("about bhalu")) {
        speak("Gevi Sharma! sister of Mr. Yash! is currently a student doing BE CSE from Chitkara University! And focusing only on gaining knowledge, not to implement it.");
    } else if (message.includes("about yourself")) {
        speak("Hello! Myself Priya! an AI based software created by Mr. Ayush! as a present for his mother.");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google for you.");
    } else if (message.includes("open chatgpt") || message.includes("open chat gpt")) {
        window.open("https://chatgpt.com/", "_blank");
        speak("Opening ChatGPT for you.");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube for you.");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook for you.");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('google')) {
        window.open(`https://www.google.com/search?q=${message.replace("google", "").trim().replace(/ /g, "+")}`, "_blank");
        speak("Searching Google for " + message.replace("google", "").trim());
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///', '_blank');
        speak("Opening Calculator.");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}

// Automatically start listening for wake word when the page loads.
window.addEventListener('load', () => {
    wakeWordRecognition.start();
});

// Restart wake word recognition when it ends.
wakeWordRecognition.onspeechend = () => {
    wakeWordRecognition.stop();
    wakeWordRecognition.start();
};

recognition.onspeechend = () => {
    recognition.stop();
};

recognition.onend = () => {
    wakeWordRecognition.start();  // Restart listening for wake word after command is processed.
};
