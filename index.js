const door = document.querySelector(".door-link");
const creak = document.getElementById("door-creak");

if (door && creak) {

    door.addEventListener("click", function(event) {

        event.preventDefault();

        door.classList.add("opening");

        creak.currentTime = 0;

        creak.play().catch(function(error) {
            console.log("Audio could not play:", error);
        });

        setTimeout(function() {
            window.location.href = door.href;
        }, 1800);
    });
}
