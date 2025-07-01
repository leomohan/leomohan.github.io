$(document).ready(function() {
    // Define the number of pages in your PDF
    const numberOfPages = 56; // <--- !!! IMPORTANT: CHANGE THIS TO YOUR ACTUAL PAGE COUNT !!!

    // Define page width and height based on your image dimensions
    // For example, if each image is 400px wide by 600px tall:
    const page_width = 720;
    const page_height = 1000;

    // Dynamically add pages to the flipbook
    for (let i = 1; i <= numberOfPages; i++) {
        let pageDiv = $('<div>').addClass('page');
        // Ensure the path to your page images is correct
        // Example: pages/page1.jpg, pages/page2.jpg, etc.
        pageDiv.css('background-image', `url(pages/page${i}.jpg)`);

        // Optional: Add a class for the first and last page if they are covers
        if (i === 1 || i === numberOfPages) { // Adjust if you have a separate back cover
            pageDiv.addClass('hard'); // Apply hard cover style
        }
        $('#flipbook').append(pageDiv);
    }

    // Initialize the flipbook
    $('#flipbook').turn({
        width: page_width * 2, // Total width of the open book (two pages)
        height: page_height,   // Height of the book
        autoCenter: true,      // Centers the book horizontally
        gradients: true,       // Adds a nice shadow effect for page turning
        acceleration: true,    // Improves performance on touch devices
        display: 'double',     // Show two pages at a time (default)
        // Set an initial page if needed, e.g., start from page 2
        // page: 2,
        when: {
            turning: function(event, page, view) {
                // console.log('Turning to page: ' + page);
            },
            turned: function(event, page, view) {
                // console.log('Turned to page: ' + page);
            }
        }
    });

    // Optional: Make the flipbook somewhat responsive (basic)
    // You'd need more sophisticated CSS and JS for true responsiveness.
    $(window).resize(function() {
        // Calculate new dimensions based on viewport, maintaining aspect ratio
        const newWidth = $(window).width() * 0.8; // 80% of window width
        const newHeight = newWidth / (page_width * 2 / page_height); // Maintain aspect ratio

        // Ensure it doesn't exceed original dimensions or desired max
        const finalWidth = Math.min(newWidth, page_width * 2);
        const finalHeight = Math.min(newHeight, page_height);

        $('#flipbook').turn('size', finalWidth, finalHeight);
    }).bind('mousewheel', function(e) { // Enable mouse wheel to flip
        e.preventDefault(); // Prevent default scroll
        if (e.originalEvent.wheelDelta / 120 > 0) { // Scroll up
            $('#flipbook').turn('previous');
        } else { // Scroll down
            $('#flipbook').turn('next');
        }
    });

    // Add basic navigation buttons (optional, but good for testing)
    // Add these buttons directly in index.html for better structure
    if ($('#prevPage').length === 0) { // Prevent adding multiple times on resize
        $('body').append('<button id="prevPage" style="position:fixed; left:10px; top:50%; transform:translateY(-50%); z-index:100; font-size:2em; padding: 10px; cursor: pointer; border: none; background-color: rgba(0,0,0,0.5); color: white; border-radius: 5px;">&larr;</button>');
        $('body').append('<button id="nextPage" style="position:fixed; right:10px; top:50%; transform:translateY(-50%); z-index:100; font-size:2em; padding: 10px; cursor: pointer; border: none; background-color: rgba(0,0,0,0.5); color: white; border-radius: 5px;">&rarr;</button>');

        $('#prevPage').click(function() {
            $('#flipbook').turn('previous');
        });

        $('#nextPage').click(function() {
            $('#flipbook').turn('next');
        });
    }

    // Trigger resize once on load to set initial size
    $(window).trigger('resize');
});
