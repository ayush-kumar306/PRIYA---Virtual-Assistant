const btn = document.querySelector('.talk');   // Selecting a button element with class 'talk'
const content = document.querySelector('.content');   // Selecting a content area with class 'content'

// Initializing flags and variables.
let isPriyaActive = false;   // Flag to indicate if "Priya" is active
let isSpeaking = false;      // Flag to indicate if the "Priya" is currently speaking
let voicesLoaded = false;    // Flag to track if speech synthesis voices have been loaded
let lowBatteryAlerted = false;  // Flag to track if low battery alert has been triggered
let highBatteryAlerted = false; // Flag to track if high battery alert has been triggered

// Function to Speak Text.
function speak(text) {
    isSpeaking = true;   // Set speaking flag to true
    recognition.stop();  // Stop speech recognition if active
    const text_speak = new SpeechSynthesisUtterance(text);  // Create a speech synthesis utterance object
    setFemaleVoice(text_speak);  // Set a female voice for the utterance
    text_speak.rate = 1;    // Set speaking rate
    text_speak.volume = 1;  // Set volume
    text_speak.pitch = 1;   // Set pitch
    text_speak.onend = () => {   // Callback when speech ends
        isSpeaking = false;   // Reset speaking flag
        if (isPriyaActive) {
            recognition.start();   // Restart recognition if Priya is active
        } else {
            wakeWordRecognition.start();   // Start wake word recognition otherwise
        }
    };
    window.speechSynthesis.speak(text_speak);   // Speak the utterance
}

// Function to Set Female Voice.
function setFemaleVoice(utterance) {
    const voices = window.speechSynthesis.getVoices();   // Get available speech synthesis voices
    const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.gender === 'female');   // Find a female voice
    if (femaleVoice) {
        utterance.voice = femaleVoice;   // Set the utterance to use the found female voice
    } else {
        console.log('Female voice not found, using default voice');   // Log if no female voice found
    }
}

// Function to Wish Based on Time.
function wishMe() {
    const day = new Date();   // Get current date
    const hour = day.getHours();   // Get current hour

    if (hour >= 0 && hour < 12) {
        speak("Good Morning!");   // Speak "Good Morning!" if morning
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon!");   // Speak "Good Afternoon!" if afternoon
    } else {
        speak("Good Evening!");   // Speak "Good Evening!" otherwise
    }
}

// Function to Initialize PRIYA
function initializePriya() {
    if (!voicesLoaded) {   // Check if voices are not loaded yet
        voicesLoaded = true;   // Mark voices as loaded
        speak("Initializing PRIYA");   // Speak initialization message
        wishMe();   // Call function to wish based on time
        monitorBatteryStatus();   // Start monitoring battery status
    }
}

// Speech Recognition Setup.
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;   // Get speech recognition object
const recognition = new SpeechRecognition();   // Create speech recognition instance
const wakeWordRecognition = new SpeechRecognition();   // Create wake word recognition instance

// Recognition settings.
recognition.continuous = false;   // Set continuous recognition to false
wakeWordRecognition.continuous = true;   // Set continuous wake word recognition
wakeWordRecognition.interimResults = false;   // Set interim results to false

// Wake Word Recognition Handler.
wakeWordRecognition.onresult = (event) => {   // Event handler for wake word recognition results
    if (!isSpeaking) {   // Check if not currently speaking
        const transcript = event.results[event.resultIndex][0].transcript.toLowerCase().trim();   // Get recognized transcript
        if (transcript.includes('hey priya') || transcript.includes('priya')) {   // Check for wake word
            speak("Ji");   // Respond with acknowledgment
            isPriyaActive = true;   // Set Priya as active
            recognition.start();   // Start normal recognition
        }
    }
};

// Command Recognition Handler.
recognition.onresult = (event) => {   // Event handler for command recognition results
    if (!isSpeaking) {   // Check if not currently speaking
        const currentIndex = event.resultIndex;   // Get current recognition result index
        const transcript = event.results[currentIndex][0].transcript.toLowerCase();   // Get recognized transcript
        content.textContent = transcript;   // Display recognized transcript in content area

        if (transcript.includes('rest')) {   // Check for command to rest
            isPriyaActive = false;   // Deactivate Priya
            speak("Okay, I am taking a rest.");   // Acknowledge rest command
        } else {
            takeCommand(transcript);   // Handle other commands
        }
    }
};

// Function to handle various spoken commands.
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
        speak("Opening Whatsapp.");
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
    navigator.getBattery().then(battery => {   // Get battery information
        const level = Math.floor(battery.level * 100);   // Get battery level in percentage
        const charging = battery.charging;   // Check if device is charging

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

// Event listener to ensure voices are loaded before initializing PRIYA
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

// Stop recognition when speech ends.
recognition.onspeechend = () => {
    recognition.stop();
};

// Restart recognition when it ends, depending on current state.
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
        const level = Math.floor(battery.level * 100);   // Get battery level in percentage
        const charging = battery.charging;   // Check if device is charging

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
});
