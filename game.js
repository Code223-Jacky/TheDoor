
function collectClue(clueName) {
    sessionStorage.setItem(clueName, "true");
}

function hasClue(clueName) {
    return sessionStorage.getItem(clueName) === "true";
}

function resetGame() {
    sessionStorage.removeItem("mirrorClue");
    sessionStorage.removeItem("phoneClue");
    sessionStorage.removeItem("memoryUnlocked");
}

const mirror = document.getElementById("mirror");
const mirrorMessage = document.getElementById("mirror-message");

if (mirror && mirrorMessage) {
    mirror.addEventListener("click", function() {
        collectClue("mirrorClue");
        mirrorMessage.classList.remove("hidden");
    });

    if (hasClue("mirrorClue")) {
        mirrorMessage.classList.remove("hidden");
    }
}

const telephone = document.getElementById("telephone");
const phoneMessage = document.getElementById("phone-message");


const phoneRing = document.getElementById("phone-ring");
const startRing = document.getElementById("start-ring");

if (telephone && phoneMessage && phoneRing && startRing) {

    startRing.addEventListener("click", function() {
        phoneRing.currentTime = 0;
        phoneRing.play().catch(function(error) {
            console.log("Audio could not play:", error);
        });
        startRing.classList.add("hidden");
    });

    telephone.addEventListener("click", function() {
        phoneRing.pause();
        phoneRing.currentTime = 0;

        collectClue("phoneClue");
        phoneMessage.classList.remove("hidden");
        startRing.classList.add("hidden");
    });

    if (hasClue("phoneClue")) {
        phoneMessage.classList.remove("hidden");
        startRing.classList.add("hidden");
    }
}

const photograph = document.getElementById("photograph");
const memoryMessage = document.getElementById("memory-message");

if (photograph && memoryMessage) {

    photograph.addEventListener("click", function() {

        let mirrorFound = hasClue("mirrorClue");
        let phoneFound = hasClue("phoneClue");

        if (mirrorFound && phoneFound) {

            collectClue("memoryUnlocked");

            memoryMessage.textContent =
                "You recognize her now. " +
                "She was the one calling your name through the smoke. " +
                "You had the key to her room. " +
                "You heard her knocking. " +
                "And you chose to run.";

        } else if (mirrorFound) {

            memoryMessage.textContent =
                "Something about the room feels familiar. " +
                "You remember standing outside a door, " +
                "a brass key trembling in your hand. " +
                "But you cannot remember who was inside.";

        } else if (phoneFound) {

            memoryMessage.textContent =
                "You recognize her. " +
                "The voice on the telephone belonged to this woman. " +
                "She was calling your name. " +
                "But why can't you remember her face?";

        } else {

            memoryMessage.textContent =
                "The woman's face is completely blurred. " +
                "You stare at the photograph, " +
                "but nothing comes back to you.";

        }

        memoryMessage.classList.remove("hidden");
    });
}


const finalDoor = document.getElementById("final-door");
const doorMessage = document.getElementById("door-message");

if (finalDoor && doorMessage) {

    finalDoor.addEventListener("click", function() {

        let mirrorFound = hasClue("mirrorClue");
        let phoneFound = hasClue("phoneClue");
        let memoryFound = hasClue("memoryUnlocked");

        if (mirrorFound && phoneFound && memoryFound) {

            window.location.href = "ending-a.html";

        } else {

            doorMessage.textContent =
                "The door will not open. " +
                "There is something you haven't remembered. " +
                "Perhaps you should go back.";
        }
    });
}

if (document.body.classList.contains("start-page")) {
    resetGame();
}

const knockButton = document.getElementById("hear-knocks");
const knockAudio = document.getElementById("door-knock");
const endingReveal = document.getElementById("ending-reveal");

if (knockButton && knockAudio && endingReveal) {
    knockButton.addEventListener("click", function() {
        knockButton.classList.add("hidden");

        knockAudio.play().catch(function(error) {
            console.log("Knocking sound could not play:", error);
        });

        knockAudio.addEventListener("ended", function() {
            endingReveal.classList.remove("hidden");
        }, { once: true });
    });
}
