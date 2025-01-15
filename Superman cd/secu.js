(function () {
    const redirectConsole = () => {
        setTimeout(() => {
            // Check if the console is open
            if (window.console && (console.firebug || /firebug/i.test(console.log))) {
                window.location.href = "about:blank"; // Redirect to a blank page
            } else if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
                // Detect DevTools open in other cases
                window.location.href = "about:blank";
            }
        }, 100);
    };

    // Add an event listener to detect F12, Ctrl+Shift+I, or Ctrl+Shift+C
    window.addEventListener("keydown", (e) => {
        if (
            e.key === "F12" || 
            (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C")) ||
            (e.ctrlKey && e.key === "U") // Prevent viewing source code
        ) {
            e.preventDefault();
            redirectConsole();
        }
    });

    // Continuous monitoring for DevTools
    const element = new Image();
    Object.defineProperty(element, "id", {
        get: () => {
            redirectConsole();
            throw new Error("Console inspection is disabled.");
        },
    });
    setInterval(() => {
        console.log(element);
    }, 1000);
})();
