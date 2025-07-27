document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm('service_ho19n7k', 'template_tczvc9k', this)
      .then((response) => {
        messageBox.style.display = "block";
        messageBox.style.color = "green";
        messageBox.style.fontSize = "18px";  // Increase font size here
        messageBox.textContent = "Message sent successfully!";
        form.reset();

        console.log("SUCCESS!", response.status, response.text);

        // Hide message after 5 seconds
        setTimeout(() => {
          messageBox.style.display = "none";
        }, 5000);
      }, (error) => {
        messageBox.style.display = "block";
        messageBox.style.color = "red";
        messageBox.style.fontSize = "18px";  // Increase font size here too
        messageBox.textContent = "Failed to send message, please try again.";
        console.error("FAILED...", error);

        setTimeout(() => {
          messageBox.style.display = "none";
        }, 5000);
      });
  });
});
