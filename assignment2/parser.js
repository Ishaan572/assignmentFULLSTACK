/* * P2a: Document your QR string
 * RAW IITK ID CARD QR STRING:
//02.250458,1,MEUCIQCd8FS9M+dHTrcaxxL77H5xm1n0s5ob1WH4XaXprpAeEAIgALgvUpb1G4pUfmsURPSWclPAuFZ1VsEuMAyGo2AzoZQ=.iitkidcard
 * * ROLL NUMBER LOCATION: 
 * The roll number is typically a 6-digit number located next to a "UID" or "RollNo" label.
 */ 

function extractRollNumber(qrString) {
const matches = qrString.match(/\d{6}/g);

    if (!matches) {
        return null;
    }

    const validRoll = matches.find((rollStr) => {
        const num = Number(rollStr);
        return num >= 240001 && num <= 240400;
    })

    return validRoll || null;
}

function isRegistered(rollNumber) {
    const num = Number(rollNumber);
    return num >= 240001 && num <= 240400;
}

module.exports = { extractRollNumber, isRegistered };
