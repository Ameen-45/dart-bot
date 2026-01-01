// Import the required packages
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Create WhatsApp client using LocalAuth (saves session)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true // headless for server deployment
    }
});

// Event: When QR code is received
client.on("qr", qr => {
    console.log("Scan this QR code with your WhatsApp mobile app:");
    qrcode.generate(qr, { small: true }); // displays QR in terminal
});

// Event: When client is ready
client.on("ready", () => {
    console.log("✅ Dart Bot is ready and connected to WhatsApp!");
});

// Listen for incoming messages from friends (ignore groups)
client.on("message", async message => {
    // Ignore group messages
    if (message.from.includes("@g.us")) return;

    // Get message type
    const type = message.type;

    // Ignore sensitive keywords
    const sensitiveKeywords = ["send acc", "send account", "about business"];
    let text = "";
    if (type === "chat") {
        text = message.body.toLowerCase().trim();
        if (sensitiveKeywords.some(word => text.includes(word))) return; // ignore sensitive
    }

    // Respond to stickers
    if (type === "sticker") {
        await delay(800);
        return message.reply("Okay ooo 😎");
    }

    // Predefined responses for common messages
    const responses = {
        "hi": "Hello 👋! This is Dart Bot. How can I help you today?",
        "hello": "Hello 👋! How can I help you today?",
        "hey": "Hey there! 😎",
        "how far": "I'm good! How about you?",
        "good morning": "Good morning 🌞! Have a great day!",
        "morning": "Good morning 🌞!",
        "good afternoon": "Good afternoon! Hope your day is going well!",
        "afternoon": "Good afternoon! 😎",
        "good evening": "Good evening! How was your day?",
        "evening": "Good evening! 😎",
        "good night": "Good night 🌙! Sleep well!",
        "how are you": "I'm good, thank you! And you?",
        "what's up": "Not much 😎, how about you?",
        "whats up": "Not much 😎, how about you?",
        "thanks": "You're welcome! 😊",
        "thank you": "You're welcome! 😊",
        "tnx": "No problem! 😎",
        "bye": "Bye! Take care 👋",
        "see you": "See you! 😎",
        "ok": "Okay ooo 😎",
        "okay": "Okay ooo 😎",
        "lol": "😄 Haha!",
        "haha": "😄 Haha!",
        "hahaha": "😄 Haha!",
        "gm": "Good morning 🌞! Have a productive day!",
        "gn": "Good night 🌙! Sleep well!",
        "good night": "Good night 🌙! Sweet dreams!",
        "good afternoon": "Good afternoon! Hope your day is going well!",
        "good evening": "Good evening! 😎",
    };

    // Check if message matches predefined responses
    if (responses[text]) {
        await delay(800);
        return message.reply(responses[text]);
    }

    // Fallback reply for anything else (unrecognized message)
    if (text || type === "chat") {
        await delay(800);
        return message.reply("This is Dart Bot. Dartwise will reply back soon! 😎");
    }
});

// Utility function for delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize the client
client.initialize();
