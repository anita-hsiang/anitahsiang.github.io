// Load existing timeline entries from local storage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTimelineEntries();
    document.getElementById('addTimelineButton').addEventListener('click', addToTimeline);
});


// Function to add a new timeline entry
function addToTimeline() {
    var date = document.getElementById('timelineDate').value;
    var title = document.getElementById('timelineTitle').value;
    var description = document.getElementById('timelineDescription').value;

    // Check if all the fields have values
    if (date && title && description) {
        var container = document.getElementById('timelineContainer');

        // Create the new timeline item with a delete button
        var newItem = '<div class="timeline-item">' +
                        '<div class="timeline-date">' + date + '</div>' +
                        '<div class="timeline-content">' +
                            '<h3>' + title + '</h3>' +
                            '<p>' + description + '</p>' +
                            '<button onclick="deleteTimelineItem(this)">Delete</button>' +
                        '</div>' +
                      '</div>';

        // Append the new item to the timeline container
        container.innerHTML += newItem;

        // Clear the form fields
        document.getElementById('timelineDate').value = '';
        document.getElementById('timelineTitle').value = '';
        document.getElementById('timelineDescription').value = '';
    } else {
        // Alert if any field is empty
        alert("Please fill in all fields.");
    }
    saveTimelineToLocalStorage();
}

// Function to delete a timeline entry
function deleteTimelineItem(element) {
    // element is the delete button. Remove its grandparent (the timeline item)
    element.parentElement.parentElement.remove();
    saveTimelineToLocalStorage();
}

// Event listener for adding timeline entries
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addTimelineButton').addEventListener('click', addToTimeline);
});

function saveTimelineToLocalStorage() {
    var timelineHtml = document.getElementById('timelineContainer').innerHTML;
    localStorage.setItem('timelineEntries', timelineHtml);
}

function loadTimelineEntries() {
    var savedTimeline = localStorage.getItem('timelineEntries');
    if (savedTimeline) {
        document.getElementById('timelineContainer').innerHTML = savedTimeline;
    }
}
