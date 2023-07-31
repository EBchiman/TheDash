function checkCapsLock(event) {
    var capsLockWarning = document.getElementById("capsLockWarning");
    if (event.getModifierState("CapsLock")) {
        capsLockWarning.style.display = "block";
    } else {
        capsLockWarning.style.display = "none";
    }
}
