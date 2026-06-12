require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error("Error: TELEGRAM_BOT_TOKEN is missing in .env");
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const { decodeQR } = require('./qr');
const { extractRollNumber, isRegistered } = require('./parser');
const { markAttendance, getStats } = require('./attendence');

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome! Send me a photo of a QR code to mark attendance.");
});


bot.on('photo', async (msg) => {
    const chatId = msg.chat.id;
    
    try {
        const highestResPhoto = msg.photo[msg.photo.length - 1];
        const fileId = highestResPhoto.file_id;

        bot.sendMessage(chatId, "Downloading and scanning QR...");

        const fileLink = await bot.getFileLink(fileId);

        const qrData = await decodeQR(fileLink);
        if (!qrData) throw new Error("NO_QR");

        const rollNumber = extractRollNumber(qrData);
        if (!rollNumber) throw new Error("NO_ROLL_NUMBER");

        const registered = await isRegistered(rollNumber);
        if (!registered) throw new Error("OUT_OF_RANGE");

        const markResult = await markAttendance(rollNumber);
        
        if (markResult.alreadyMarked) {
            return bot.sendMessage(chatId, ` Roll number ${rollNumber} was already marked present at ${markResult.timestamp}.`);
        }

        bot.sendMessage(chatId, ` Successfully marked attendance for roll number: ${rollNumber}.`);

    } catch (error) {
        switch (error.message) {
            case "NO_QR":
                bot.sendMessage(chatId, "❌ No QR code could be detected in that image.");
                break;
            case "NO_ROLL_NUMBER":
                bot.sendMessage(chatId, "❌ QR detected, but I couldn't extract a valid roll number.");
                break;
            case "OUT_OF_RANGE":
                bot.sendMessage(chatId, "❌ This roll number is not registered or is out of range.");
                break;
            default:
                console.error(error);
                bot.sendMessage(chatId, "❌ An unexpected error occurred while processing the photo.");
        }
    }
});

bot.onText(/\/report/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
        const stats = await getStats();
        
        const reportText = `📊 *Attendance Report*\n\n` +
                           `Total Present: ${stats.totalCount}\n` +
                           `Roll Numbers:\n${stats.rollList.join('\n')}`;

        bot.sendMessage(chatId, reportText, { parse_mode: "Markdown" });
    } catch (error) {
        console.error("Report error:", error);
        bot.sendMessage(chatId, "Failed to generate the report.");
    }
});