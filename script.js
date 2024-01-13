document.addEventListener("DOMContentLoaded", function () {
    openTab('wordTab'); // Show the word input tab by default
});

function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    const tabButtons = document.querySelectorAll('.tabs button');
    tabButtons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).style.display = 'block';
    document.getElementById(tabId + 'Btn').classList.add('active');
}

function analyzeWord() {
    const wordInput = document.getElementById('wordInput').value.trim().toLowerCase();

    if (wordInput !== "") {
        // Fetch word details from the JSON file
        fetch('./wordData.json')  
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); 
                // Find word details based on input in the 'word' property
                const wordDetails = data.definitions.find(definition => definition.word === wordInput);

                if (wordDetails) {
                    displayWordDetails(wordDetails);
                    updateWordCount(wordInput);
                } else {
                    clearWordDetails();
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        clearWordDetails();
        clearWordCount();
    }
}


function displayWordDetails(wordDetails) {
    const wordDetailsContainer = document.getElementById('wordDetails');
    
    // Create and update a table dynamically
    const table = document.createElement('table');
    table.classList.add('result-table');

    const tableBody = document.createElement('tbody');
    
    // Add rows for definition, part of speech, synonyms, and antonyms
    addTableRow(tableBody, 'Definition', wordDetails.definition);
    addTableRow(tableBody, 'Part of Speech', wordDetails.partOfSpeech);
    addTableRow(tableBody, 'Synonyms', wordDetails.synonyms.join(', '));
    addTableRow(tableBody, 'Antonyms', wordDetails.antonyms.join(', '));
    addTableRow(tableBody, 'Example', wordDetails.example.join(', '));

    table.appendChild(tableBody);
    wordDetailsContainer.innerHTML = ''; // Clear previous content
    wordDetailsContainer.appendChild(table);
}

function clearWordDetails() {
    const wordDetailsContainer = document.getElementById('wordDetails');
    wordDetailsContainer.innerHTML = '';
}

function addTableRow(tableBody, label, value) {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = label;
    cell2.textContent = value;
}

function updateWordCount(word) {
    const wordCountContainer = document.getElementById('wordCount');
    const characterCountContainer = document.getElementById('characterCount');

    const wordCount = word.split(/\s+/).filter(word => word !== '').length;
    const characterCount = word.length;

    const table = document.createElement('table');
    table.classList.add('result-table');

    const tableBody = document.createElement('tbody');

    // Add rows for word and character counts
    addTableRow(tableBody, 'Words', wordCount);
    addTableRow(tableBody, 'Characters', characterCount);

    table.appendChild(tableBody);
    wordCountContainer.textContent = `Words: ${wordCount}`;
    characterCountContainer.textContent = `Characters: ${characterCount}`;
    // Clear previous content and append the new table
    wordCountElement.innerHTML = ''; 
    wordCountElement.appendChild(table);
    
}
function addTableRow(tableBody, label, value) {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = label;
    cell2.textContent = value;
}
function clearWordCount() {
    const wordCountContainer = document.getElementById('wordCount');
    const characterCountContainer = document.getElementById('characterCount');

    wordCountContainer.textContent = 'Words: ';
    characterCountContainer.textContent = 'Characters: ';
}
function analyzeRealTimeWord() {
    //clearWordDetails();
    const wordInput = document.getElementById('wordInput').value.trim().toLowerCase();
    updateWordCount(wordInput);
}

// Function for real-time analysis of paragraph
function analyzeRealTimeParagraph() {
    const paragraphInput = document.getElementById('paragraphInput').value;
    const paragraphMetrics = analyzeParagraph(paragraphInput);

    // Display the paragraph metrics in real-time
    displayParagraphMetrics(paragraphMetrics);
}

// Function to analyze paragraph metrics
function analyzeParagraph(paragraph) {
    const charCount = paragraph.length;
    const wordCount = paragraph.split(/\s+/).filter(word => word !== '').length;
    const sentenceCount = paragraph.split(/[.!?]/).filter(sentence => sentence !== '').length;
    const paragraphCount = paragraph.split(/\n\s*\n/).filter(para => para !== '').length;
    const spaceCount = paragraph.split(/\s/).filter(space => space !== '').length; // Exclude the space at the end
    const punctuationCount = paragraph.replace(/[a-zA-Z\s]/g, '').length;

    return {
        charCount,
        wordCount,
        sentenceCount,
        paragraphCount,
        spaceCount,
        punctuationCount,
    };
}

// Function to display paragraph metrics
/*function displayParagraphMetrics(paragraphMetrics) {
    const paragraphMetricsContainer = document.getElementById('paragraphMetrics');
    
    // Create and update a table dynamically
    const table = document.createElement('table');
    table.classList.add('result-table');

    const tableBody = document.createElement('tbody');
    
    // Add rows for paragraph metrics
    addTableRow(tableBody, 'Characters', paragraphMetrics.charCount);
    addTableRow(tableBody, 'Words', paragraphMetrics.wordCount);
    addTableRow(tableBody, 'Sentences', paragraphMetrics.sentenceCount);
    addTableRow(tableBody, 'Paragraphs', paragraphMetrics.paragraphCount);
    addTableRow(tableBody, 'Spaces', paragraphMetrics.spaceCount);
    addTableRow(tableBody, 'Punctuations', paragraphMetrics.punctuationCount);

    table.appendChild(tableBody);
    paragraphMetricsContainer.innerHTML = '';
    paragraphMetricsContainer.appendChild(table);
}
*/


function displayParagraphMetrics(paragraphMetrics) {
    const paragraphMetricsContainer = document.getElementById('paragraphMetrics');
    
    
    const table = document.createElement('table');
    table.classList.add('result-table');

    const tableBody = document.createElement('tbody');
    
    
    addTableRow(tableBody, 'Characters', paragraphMetrics.charCount);
    addTableRow(tableBody, 'Words', paragraphMetrics.wordCount);
    addTableRow(tableBody, 'Sentences', paragraphMetrics.sentenceCount);
    addTableRow(tableBody, 'Paragraphs', paragraphMetrics.paragraphCount);
    addTableRow(tableBody, 'Spaces', paragraphMetrics.spaceCount);
    addTableRow(tableBody, 'Punctuations', paragraphMetrics.punctuationCount);

    table.appendChild(tableBody);
    paragraphMetricsContainer.innerHTML = '';
    paragraphMetricsContainer.appendChild(table);
}

function addTableRow(tableBody, label, value) {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = label;
    cell2.textContent = value;
}