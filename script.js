// Selecting the elements.
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

let isPriyaActive = false;
let isSpeaking = false;
let voicesLoaded = false; // Track if voices are loaded
let lowBatteryAlerted = false; // Flag to track if low battery alert has been given
let highBatteryAlerted = false; // Flag to track if high battery alert has been given

// Function to Speak Text.
function speak(text) {
    isSpeaking = true;
    recognition.stop();
    const text_speak = new SpeechSynthesisUtterance(text);
    setFemaleVoice(text_speak);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    text_speak.onend = () => {
        isSpeaking = false;
        if (isPriyaActive) {
            recognition.start();
        } else {
            wakeWordRecognition.start();
        }
    };
    window.speechSynthesis.speak(text_speak);
}

// Function to Set Female Voice.
function setFemaleVoice(utterance) {
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.gender === 'female');
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    } else {
        console.log('Female voice not found, using default voice');
    }
}

// Function to Wish Based on Time.
function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning!");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon!");
    } else {
        speak("Good Evening!");
    }
}

// Function to Initialize PRIYA
function initializePriya() {
    if (!voicesLoaded) {
        voicesLoaded = true;
        speak("Initializing PRIYA");
        wishMe();
        monitorBatteryStatus(); // Monitor battery status upon initialization
    }
}

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
    if (!isSpeaking) {
        const transcript = event.results[event.resultIndex][0].transcript.toLowerCase().trim();
        if (transcript.includes('hey priya') || transcript.includes('priya')) {
            speak("Ji");
            isPriyaActive = true;
            recognition.start();
        }
    }
};

// Command Recognition Handler.
recognition.onresult = (event) => {
    if (!isSpeaking) {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript.toLowerCase();
        content.textContent = transcript;

        if (transcript.includes('rest')) {
            isPriyaActive = false;
            speak("Okay, I am taking a rest.");
        } else {
            takeCommand(transcript);
        }
    }
};

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hello')) {
        speak("Hello! How are you?");
    }
    else if (message.includes("namaste mata") || message.includes("pranam mata")) {
        speak("Kush Raho Betaa");
    }
    else if (message.includes("bipin")) {
        speak("Bipin! son of Mr. S K Singh and Mrs. Lal Muni Devi! is an educationist with over 20 years of work experience and a great father and husband.");
    }
    else if (message.includes("i love u") || message.includes("i love you priya") || message.includes("i love you")) {
        speak("That's so sweet! But I am just an AI interface, I cannot provide you the same emotion! Sorry.");
    }
    else if (message.includes("yash")) {
        speak("Yash! son of Mr. Om Shankar Singh and Mrs. Priya! is the creator of this AI interface named Priya! He is a web designer and a frontend developer.");
    }
    else if (message.includes("aayush") || message.includes("ayush")) {
        speak("Ayush! son of Mr. Om Shankar Singh and Mrs. Priya! is the creator of this AI interface named Priya! He is a web designer and a frontend developer.");
    }
    else if (message.includes("muskan")) {
        speak("Muskan! daughter of Mr. Om Shankar Singh and Mrs. Priya! is a web designer in TCS with over 2 years of work experience! And a lovely child of her parents.");
    }
    else if (message.includes("om shankar singh")) {
        speak("Mr. Om Shankar Singh! son of late Mr. Anandjee Singh! is a senior technician in SRU department of BSL plant Bokaro with over 20 years of work experience! And a great father as well as husband.");
    }
    else if (message.includes("priya")) {
        speak("Mrs. Priya! daughter of Mr. S K Singh and Late Mrs. Lal Muni Devi! is an LIC agent in Bokaro with over 10 years of work experience! And a great mother as well as wife.");
    }
    else if (message.includes("bhalu")) {
        speak("Gevi Sharma! sister of Mr. Yash! is currently a student doing BE CSE from Chitkara University! And focusing only on gaining knowledge, not to implement it.");
    }
    else if (message.includes("about yourself")) {
        speak("Hello! Myself Priya! an AI based software created by Mr. Ayush! as a present for his mother.");
    }
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google for you.");
    }
    else if (message.includes("open chatgpt") || message.includes("open chat gpt")) {
        window.open("https://chatgpt.com/", "_blank");
        speak("Opening ChatGPT for you.");
    }
    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube for you.");
    }
    else if (message.includes("github") || message.includes("open git hub")) {
        window.open("https://github.com/ayush-kumar306", "_blank");
        speak("Opening GitHub for you.");
    }
    else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook for you.");
    }
    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    }
    else if (message.includes('google')) {
        window.open(`https://www.google.com/search?q=${message.replace("google", "").trim().replace(/ /g, "+")}`, "_blank");
        speak("Searching Google for " + message.replace("google", "").trim());
    }
    else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    }
    else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    }
    else if (message.includes('calculator')) {
        window.open('Calculator:///', '_blank');
        speak("Opening Calculator.");
    }
    else if (message.includes('whatsapp')) {
        window.open('Whatsapp:///', '_blank');
        speak("Opening Calculator.");
    }
    else if (message.includes('spotify')) {
        window.open('Spotify:///', '_blank');
        speak("Opening Spotify.");
    }
    else if (message.includes('battery')) {
        monitorBatteryStatus(); // Just call the function to speak battery status once
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}

// Function to Monitor Battery Status
function monitorBatteryStatus() {
    navigator.getBattery().then(battery => {
        const level = Math.floor(battery.level * 100);
        const charging = battery.charging;

        // Speak battery status
        speak(`Sir! your device battery level is ${level} percent`);

        // Alert to plug charger if battery level is 20% or less, and haven't alerted before
        if (level <= 20 && !charging && !lowBatteryAlerted) {
            lowBatteryAlerted = true;
            speak("sir! Please plug in the charger to avoid battery depletion.");
        }

        // Alert to unplug charger if battery level is 90% or more, and haven't alerted before
        if (level >= 90 && charging && !highBatteryAlerted) {
            highBatteryAlerted = true;
            speak("sir! i would like to suggest you to unplug the chager because,");
        }
    });
}

// Automatically start listening for wake word when the page loads.
window.addEventListener('load', () => {
    // Ensure voices are loaded before initializing
    window.speechSynthesis.onvoiceschanged = () => {
        if (!voicesLoaded) {
            initializePriya();
        }
    };

    // Fallback in case voiceschanged event does not trigger
    setTimeout(() => {
        if (!voicesLoaded) {
            initializePriya();
        }
    }, 1000);
});

// Restart wake word recognition when it ends.
wakeWordRecognition.onspeechend = () => {
    if (!isPriyaActive && !isSpeaking) {
        wakeWordRecognition.stop();
        wakeWordRecognition.start();
    }
};

recognition.onspeechend = () => {
    recognition.stop();
};

recognition.onend = () => {
    if (isPriyaActive && !isSpeaking) {
        recognition.start();
    } else {
        wakeWordRecognition.start();
    }
};

// Battery event listeners to monitor charger connection/disconnection
navigator.getBattery().then(battery => {
    function updateBatteryStatus() {
        const level = Math.floor(battery.level * 100);
        const charging = battery.charging;

        // Speak battery status
        speak(`the device is currently ${charging ? 'charging' : 'not charging'}.`);

        // Alert to plug charger if battery level is 20% or less, and haven't alerted before
        if (level <= 20 && !charging && !lowBatteryAlerted) {
            lowBatteryAlerted = true;
            speak("sir! Please plug in the charger to avoid battery depletion.");
        }

        // Alert to unplug charger if battery level is 90% or more, and haven't alerted before
        if (level >= 90 && charging && !highBatteryAlerted) {
            highBatteryAlerted = true;
            speak("sir! Battery is sufficiently charged. Please unplug the charger.");
        }
    }

    // Announce battery status when charger is connected or disconnected
    battery.addEventListener('chargingchange', () => {
        updateBatteryStatus();
    });

    // Initial status
    //updateBatteryStatus();
});
