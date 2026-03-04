// 💌 LETTER CONTENT (WITH FORMATTING)
const letterContent = `Dear Radhika,

From the moment you came into my life, everything started feeling softer, brighter, and more meaningful.

Every moment with you feels like a beautiful dream I never want to wake up from.
Your smile? It’s my favorite sight in this entire world.
It has this magic that instantly melts all my worries away.

I truly feel blessed to have someone like YOU.
I never believed angels could exist in this world…
but then I met you — and suddenly, I understood.

With you, even ordinary days feel special.
Your presence brings peace to my chaos,
comfort to my fears,
and warmth to my heart.

You inspire me to become better,
to love deeper,
to dream bigger.

You are not just my forever…
you are my safe place,
my happiness,
my heartbeat.

Thank you for choosing me.
Thank you for staying.
Thank you for being YOU.

Forever yours,
❤️

I LOVE YOU ❤️
`;

// ELEMENTS
const btnLetter = document.getElementById("btn__letter");
const boxLetter = document.querySelector(".box__letter");
const letterBorder = document.querySelector(".letter__border");
const textLetter = document.querySelector(".text__letter p");
const titleLetter = document.querySelector(".title__letter");
const closeBtn = document.querySelector(".close");

let index = 0;
let typingInterval;

// 🖋️ TYPEWRITER FUNCTION
function startTyping() {
    textLetter.innerHTML = "";
    index = 0;

    typingInterval = setInterval(() => {
        if (index < letterContent.length) {

            let char = letterContent[index];

            if (char === "\n") {
                textLetter.innerHTML += "<br>";
            } else {
                // Highlight "YOU"
                if (letterContent.substring(index, index + 3) === "YOU") {
                    textLetter.innerHTML += `<span class="highlight">YOU</span>`;
                    index += 2; // Skip next 2 letters
                } else {
                    textLetter.innerHTML += char;
                }
            }

            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 30);
}

// 💌 OPEN LETTER
let letterOpen = false;
let gifsAnimated = false;

function openLetter() {
    if (letterOpen) return; // Prevent double opening
    letterOpen = true;
    gifsAnimated = false; // Reset for new opening
    
    boxLetter.style.display = "block";

    setTimeout(() => {
        letterBorder.style.display = "block";
    }, 600);

    // TITLE TYPE
    titleLetter.innerHTML = "To You 💌";
    let tIndex = 0;

    // HEART + GIF ANIMATIONS (only once)
    setTimeout(() => {
        if (!gifsAnimated) {
            gifsAnimated = true;
            document.getElementById("heart__letter")?.classList.add("animationOp");
            document.querySelectorAll(".left-gif")?.forEach(img => 
                img.classList.add("animationOp")
            );
        }
    }, 1200);

    // START TYPING
    setTimeout(startTyping, 2500);
}

// Auto-open letter on page load
document.addEventListener('DOMContentLoaded', () => {
    openLetter();
});

// Add click listener for button if it exists
if (btnLetter) {
    btnLetter.addEventListener("click", openLetter);
}

// ❌ CLOSE LETTER
closeBtn.addEventListener("click", () => {
    clearInterval(typingInterval);

    textLetter.innerHTML = "";
    titleLetter.innerHTML = "";

    document.getElementById("heart__letter")?.classList.remove("animationOp");
    document.querySelectorAll(".left-gif")?.forEach(img => 
        img.classList.remove("animationOp")
    );

    letterBorder.style.display = "none";
    boxLetter.style.display = "none";
    
    letterOpen = false; // Allow opening again
    
    // Navigate to options page
    window.location.href = 'options.html';
});

// 🏠 NAVIGATE BACK TO OPTIONS
function goToOptions() {
    window.location.href = 'options.html';
}
