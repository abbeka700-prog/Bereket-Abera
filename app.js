/* ==========================================================================
   BULLETPROOF FAQ ACCORDION EVENT HANDLER ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Grab all the FAQ cards
    const faqCards = document.querySelectorAll(".faq-item-card");

    if (faqCards.length === 0) {
        console.warn("Portfolio Warning: No element found with class '.faq-item-card'. Check your HTML structure!");
        return;
    }

    faqCards.forEach((card) => {
        const headerButton = card.querySelector(".faq-trigger-header");
        const glyphElement = card.querySelector(".icon-toggle-glyph");

        if (headerButton) {
            headerButton.addEventListener("click", (e) => {
                // Prevent default button jumping actions
                e.preventDefault();
                
                const isCurrentlyActive = card.classList.contains("active");

                // Close all other open cards to keep presentation focused and tidy
                faqCards.forEach((otherCard) => {
                    if (otherCard !== card) {
                        otherCard.classList.remove("active");
                        const otherButton = otherCard.querySelector(".faq-trigger-header");
                        const otherGlyph = otherCard.querySelector(".icon-toggle-glyph");
                        if (otherButton) otherButton.setAttribute("aria-expanded", "false");
                        if (otherGlyph) otherGlyph.textContent = "+";
                    }
                });

                // Toggle target card state elements
                if (isCurrentlyActive) {
                    card.classList.remove("active");
                    headerButton.setAttribute("aria-expanded", "false");
                    if (glyphElement) glyphElement.textContent = "+";
                } else {
                    card.classList.add("active");
                    headerButton.setAttribute("aria-expanded", "true");
                    if (glyphElement) glyphElement.textContent = "−"; 
                }
            });
        }
    });
}); // <--- The FAQ code now closes completely here!


/* ==========================================================================
   DIRECT HIGH-SPEED SCROLL CONTROLLER (FORCE MOTION)
   ========================================================================= */
window.addEventListener("scroll", () => {
    const leftTrack = document.getElementById("left-moving-track");
    const rightTrack = document.getElementById("right-moving-track");
    const parallaxEngine = document.querySelector(".parallax-visual-engine");

    // Safety check: if elements aren't loaded yet, stop
    if (!leftTrack || !rightTrack || !parallaxEngine) return;

    // Get the exact location of the footer container on the screen
    const boundingBox = parallaxEngine.getBoundingClientRect();
    
    // Check if the footer has started appearing at the bottom of the window
    if (boundingBox.top < window.innerHeight && boundingBox.bottom > 0) {
        
        // Calculate exactly how many pixels the footer has moved up the screen
        const relativeScroll = window.innerHeight - boundingBox.top;

        // SPEED MULTIPLIER: Increase this number (e.g., 0.6, 0.8) to make it slide even faster!
        const movementFactor = relativeScroll * 0.55; 

        // Set the shifting values
        const leftShift = -5 - movementFactor;
        const rightShift = -75 + movementFactor;

        // Apply fast 2D translations directly to the tracks
        leftTrack.style.transform = `translateX(${leftShift}px)`;
        rightTrack.style.transform = `translateX(${rightShift}px)`;
    }
});
/* ==========================================================================
   SUCCESS STORIES SCROLL REVEAL & RUNNING COUNTER TIMELINE ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const animationZone = document.querySelector(".scroll-animate-zone");
    const counterElements = document.querySelectorAll(".rolling-counter");

    if (!animationZone) return;

    // Helper function that calculates the rolling digits progression
    const startRollingNumbers = () => {
        counterElements.forEach((counter) => {
            const targetNumber = parseInt(counter.getAttribute("data-target"), 10);
            let currentCount = 0;
            
            // Adjust speed: lower step time means faster count animation loops
            const animationDuration = 1500; 
            const stepTime = Math.max(Math.floor(animationDuration / targetNumber), 20);

            const counterInterval = setInterval(() => {
                currentCount += 1;
                counter.textContent = currentCount;

                if (currentCount >= targetNumber) {
                    counter.textContent = targetNumber; // Snap precisely to target number value
                    clearInterval(counterInterval);
                }
            }, stepTime);
        });
    };

    // Configure the observer intersection boundaries
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When the section comes 20% into view from the bottom
            if (entry.isIntersecting) {
                animationZone.classList.add("triggered");
                startRollingNumbers();
                
                // Disconnect observer so the numbers only roll once per load
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sectionObserver.observe(animationZone);
});
/* ==========================================================================
   ABOUT SECTION INTERSECTION TRIGGER & METRIC RUNNER ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const aboutZone = document.querySelector(".scroll-animate-about-zone");
    const aboutCounters = document.querySelectorAll(".about-counter");

    if (!aboutZone) return;

    // Numerical incremental ticker logic
    const runAboutNumbers = () => {
        aboutCounters.forEach((counter) => {
            const maxVal = parseInt(counter.getAttribute("data-target"), 10);
            let currentVal = 0;
            
            const totalDuration = 1500; // Finish rolling numbers in exactly 1.5 seconds
            const trackingSpeed = Math.max(Math.floor(totalDuration / maxVal), 15);

            const counterTimer = setInterval(() => {
                currentVal += 1;
                counter.textContent = currentVal;

                if (currentVal >= maxVal) {
                    counter.textContent = maxVal;
                    clearInterval(counterTimer);
                }
            }, trackingSpeed);
        });
    };

    // Watch for the about section container crossing into view
    const aboutScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Instantly inject animation triggers and initiate the counters
                aboutZone.classList.add("triggered");
                runAboutNumbers();
                
                // Unobserve so it perfectly finishes only once per load cycle
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Triggers when 20% of the section enters the window view

    aboutScrollObserver.observe(aboutZone);
});
/* ==========================================================================
   INDIVIDUAL PORTFOLIO CARD TRIGGER ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const individualCards = document.querySelectorAll(".parallax-card-media");

    if (individualCards.length === 0) return;

    // Configuration optimal for mobile viewports
    const cardObserverOptions = {
        root: null,
        rootMargin: "0px 0px -10% 0px", // Triggers slightly before card fills screen
        threshold: 0.15 // Triggers when 15% of the individual card is visible
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Activate color transitions for this specific element
                entry.target.classList.add("card-visible");
                
                // Stop observing this card so the beautiful color stays active
                observer.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    // Bind every single project card wrapper to the scroll observer network
    individualCards.forEach((card) => {
        cardObserver.observe(card);
    });
});
/* ==========================================================================
   CINEMATIC MOBILE MENU INTERACTION ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const burgerButton = document.querySelector(".mobile-burger-trigger");
    const menuOverlay = document.querySelector(".mobile-menu-overlay");
    const structuralNavLinks = document.querySelectorAll(".mobile-nav-link");

    if (!burgerButton || !menuOverlay) return;

    const toggleMobileMenu = () => {
        const isExpanded = burgerButton.getAttribute("aria-expanded") === "true";
        
        // Toggle visual active state tracking classes
        burgerButton.classList.toggle("menu-is-open");
        menuOverlay.classList.toggle("menu-is-open");
        
        // Update accessibility tags
        burgerButton.setAttribute("aria-expanded", !isExpanded);

        // Lock background body scroll mechanics while viewing overlay options
        if (!isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    // Listen for direct layout click triggers
    burgerButton.addEventListener("click", toggleMobileMenu);

    // Auto close overlay panel if an internal jump link gets clicked 
    structuralNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (menuOverlay.classList.contains("menu-is-open")) {
                toggleMobileMenu();
            }
        });
    });
});