const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector('input[type="text"]');
    const email = document.querySelector('input[type="email"]');
    const phone = document.querySelector('input[type="tel"]');
    const subject = document.querySelectorAll('input[type="text"]')[1];
    const message = document.querySelector("textarea");

    // Check required fields
    if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        subject.value.trim() === "" ||
        message.value.trim() === ""
    ) {
        alert("Please fill in all required fields.");
        return;
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        alert("Please enter a valid email address.");
        return;
    }

    // Everything is correct
    alert("Message sent successfully! 🎉");

    // Clear the form
    form.reset();
});