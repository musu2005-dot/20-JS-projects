const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");

const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

// Update length display
lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value;
});

// Generate password
generateButton.addEventListener("click", makePassword);

function makePassword() {

    const length = Number(lengthSlider.value);

    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    if (
        !includeUppercase &&
        !includeLowercase &&
        !includeNumbers &&
        !includeSymbols
    ) {
        alert("Please select at least one character type.");
        return;
    }

    const newPassword = createRandomPassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
    );

    passwordInput.value = newPassword;

    updateStrengthMeter(newPassword);
}


// Update password strength
function updateStrengthMeter(password) {

    const passwordLength = password.length;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()\-_=+\[\]{}|;:,.<>?/]/.test(password);

    let strengthScore = 0;

    strengthScore += Math.min(passwordLength * 2, 40);

    if (hasUpperCase) {
        strengthScore += 15;
    }

    if (hasLowerCase) {
        strengthScore += 15;
    }

    if (hasNumbers) {
        strengthScore += 15;
    }

    if (hasSymbols) {
        strengthScore += 15;
    }

    if (passwordLength < 8) {
        strengthScore = Math.min(strengthScore, 40);
    }

    const safeScore = Math.min(100, strengthScore);

    strengthBar.style.width = safeScore + "%";

    let strengthLabelText = "";
    let barColor = "";

    if (strengthScore < 40) {

        barColor = "#fc8181";
        strengthLabelText = "Weak";

    } else if (strengthScore < 70) {

        barColor = "#fbd38d";
        strengthLabelText = "Medium";

    } else {

        barColor = "#68d391";
        strengthLabelText = "Strong";
    }

    strengthBar.style.backgroundColor = barColor;
    strengthText.textContent = strengthLabelText;
}


// Create random password
function createRandomPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
) {

    let allCharacters = "";

    if (includeUppercase) {
        allCharacters += uppercaseLetters;
    }

    if (includeLowercase) {
        allCharacters += lowercaseLetters;
    }

    if (includeNumbers) {
        allCharacters += numberCharacters;
    }

    if (includeSymbols) {
        allCharacters += symbolCharacters;
    }

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(
            Math.random() * allCharacters.length
        );

        password += allCharacters[randomIndex];
    }

    return password;
}


// Generate password when page loads
window.addEventListener("DOMContentLoaded", makePassword);


// Copy password
copyButton.addEventListener("click", () => {

    if (!passwordInput.value) {
        return;
    }

    navigator.clipboard
        .writeText(passwordInput.value)
        .then(() => showCopySuccess())
        .catch((error) => {
            console.log("Could not copy:", error);
        });
});


// Show copy success
function showCopySuccess() {

    copyButton.classList.remove("fas", "fa-copy");
    copyButton.classList.add("fas", "fa-check");

    copyButton.style.color = "#48bb78";

    setTimeout(() => {

        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");

        copyButton.style.color = "";

    }, 1500);
}