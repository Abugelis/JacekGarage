/**
 * Enables click-and-drag horizontal scrolling for desktop users.
 * Applied to horizontally scrollable card containers to improve UX
 * where traditional scrollbars are hidden.
 */
document
  .querySelectorAll('.features-cards-wrapper, .testimonials-wrapper')
  .forEach(container => {

    // Tracks whether the mouse button is currently held down
    let isDown = false;

    // Stores the initial mouse X position when dragging starts
    let startX;

    // Stores the container's initial scroll position
    let scrollLeft;

    // Mouse down: initialize drag state 
    container.addEventListener('mousedown', e => {
        isDown = true;
        container.classList.add('dragging'); // Visual feedback (cursor change)

        // Calculate mouse position relative to container
        startX = e.pageX - container.offsetLeft;

        // Capture current scroll position
        scrollLeft = container.scrollLeft;
    });

    // Mouse up: end dragging
    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    // Mouse leaves container: cancel dragging. Prevents "stuck" drag state if cursor exits container
    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    //Mouse move: handle horizontal scrolling while dragging
    container.addEventListener('mousemove', e => {
        if (!isDown) return; // Only scroll when actively dragging

        e.preventDefault(); // Prevent text/image selection while dragging

        // Current mouse position relative to container
        const x = e.pageX - container.offsetLeft;

        // Distance dragged multiplied for smoother/faster scrolling
        const walk = (x - startX) * 1.5;

        // Apply scroll movement
        container.scrollLeft = scrollLeft - walk;
    });
});
