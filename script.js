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
function uploadVideo() {
    var videoUrl = document.getElementById('videoUrl').value;
    if (videoUrl) {
        var videoContainer = document.getElementById('videoContainer');

        var videoElement = '<div>' +
                            '<iframe width="560" height="315" src="' + videoUrl + '" frameborder="0" allowfullscreen></iframe>' +
                            '<button onclick="deleteVideo(this)">Delete</button>' +
                           '</div>';
        
        videoContainer.innerHTML += videoElement;
        document.getElementById('videoUrl').value = ''; // Clear the input field
    } else {
        alert("Please enter a video URL.");
    }
}

function deleteVideo(element) {
    // Remove the parent div of the delete button (which contains the video)
    element.parentElement.remove();
}

// Extend the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... existing event listeners ...
    loadQuestions();
});

function addQuestion() {
    var question = document.getElementById('questionInput').value;
    var answer = document.getElementById('answerInput').value;

    if (question && answer) {
        var qaContainer = document.getElementById('qaContainer');
        var qaElement = '<div class="qa-item">' +
                            '<p><b>Q:</b> ' + question + '</p>' +
                            '<p><b>A:</b> ' + answer + '</p>' +
                            '<button onclick="deleteQA(this)">Delete</button>' +
                        '</div>';
        qaContainer.innerHTML += qaElement;

        document.getElementById('questionInput').value = '';
        document.getElementById('answerInput').value = '';

        saveQuestionsToLocalStorage();
    } else {
        alert("Please enter both question and answer.");
    }
}

function deleteQA(element) {
    element.parentElement.remove();
    saveQuestionsToLocalStorage();
}

function saveQuestionsToLocalStorage() {
    var qas = [];
    document.querySelectorAll('#qaContainer .qa-item').forEach(function(item) {
        var question = item.querySelector('p:first-of-type').textContent.substring(3);
        var answer = item.querySelector('p:last-of-type').textContent.substring(3);
        qas.push({ question, answer });
    });
    localStorage.setItem('qas', JSON.stringify(qas));
}

function loadQuestions() {
    var savedQAs = JSON.parse(localStorage.getItem('qas'));
    if (savedQAs) {
        savedQAs.forEach(function(qa) {
            var qaContainer = document.getElementById('qaContainer');
            var qaElement = '<div class="qa-item">' +
                                '<p><b>Q:</b> ' + qa.question + '</p>' +
                                '<p><b>A:</b> ' + qa.answer + '</p>' +
                                '<button onclick="deleteQA(this)">Delete</button>' +
                            '</div>';
            qaContainer.innerHTML += qaElement;
        });
    }
}
