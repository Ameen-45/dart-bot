const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ]
    }
});

// QR CODE
client.on("qr", qr => {
    console.log("📱 Scan this QR code with WhatsApp:");
    qrcode.generate(qr, { small: true });
});

// READY
client.on("ready", () => {
    console.log("✅ Dart Bot is ready and online 24/7!");
});

// HANDLE AUTH FAIL
client.on("auth_failure", () => {
    console.log("❌ Auth failed. Re-scan QR.");
});

// HANDLE DISCONNECT
client.on("disconnected", reason => {
    console.log("⚠️ Disconnected:", reason);
});

// MESSAGE HANDLER
client.on("message", async msg => {
    try {
        if (msg.from.includes("@g.us")) return; // ignore groups

        const type = msg.type;
        const text = msg.body?.toLowerCase().trim();

        const ignoreWords = ["send acc", "send account", "about business"];
        if (text && ignoreWords.some(w => text.includes(w))) return;

        if (type === "sticker") {
            return reply(msg, "Okay ooo 😎");
        }

        const replies = {
            hi: "Hello 👋! This is Dart Bot.",
            hello: "Hello 👋! This is Dart Bot.",
            hey: "Hey 😎",
            "how far": "I'm good! How about you?",
            gm: "Good morning 🌞",
            gn: "Good night 🌙",
            "good morning": "Good morning 🌞",
            "good evening": "Good evening 🌆",
            "how are you": "I'm good, thanks 😊",
            thanks: "You're welcome 😊",
            ok: "Okay ooo 😎"
        };

        if (text && replies[text]) {
            return reply(msg, replies[text]);
        }

        if (text) {
            return reply(msg, "This is Dart Bot. Dartwise will reply back soon 😎");
        }

    } catch (err) {
        console.log("⚠️ Message error:", err.message);
    }
});

async function reply(msg, text) {
    await delay(700);
    return msg.reply(text);
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

client.initialize();
