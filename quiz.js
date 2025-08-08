// Quiz functionality for PyHub
let currentQuiz = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let quizTimer = null;
let timeRemaining = 300; // 5 minutes default

// Comprehensive question pool organized by difficulty
const questionPool = {
    beginner: [
        {
            question: "What is the correct way to create a comment in Python?",
            options: ["// This is a comment", "# This is a comment", "/* This is a comment */", "-- This is a comment"],
            correct: 1,
            explanation: "In Python, single-line comments start with the # symbol. Multi-line comments can use triple quotes."
        },
        {
            question: "Which function is used to display output in Python?",
            options: ["echo()", "print()", "printf()", "console.log()"],
            correct: 1,
            explanation: "The print() function is used to display output to the console in Python."
        },
        {
            question: "What data type is the result of: type(5)?",
            options: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "<class 'number'>"],
            correct: 1,
            explanation: "The number 5 is an integer, so type(5) returns <class 'int'>."
        },
        {
            question: "How do you create a list in Python?",
            options: ["list = (1, 2, 3)", "list = {1, 2, 3}", "list = [1, 2, 3]", "list = <1, 2, 3>"],
            correct: 2,
            explanation: "Lists in Python are created using square brackets []. Parentheses () create tuples, and curly braces {} create sets or dictionaries."
        },
        {
            question: "Python is case-sensitive. True or False?",
            options: ["True", "False"],
            correct: 0,
            explanation: "Python is case-sensitive, meaning 'Variable' and 'variable' are treated as different identifiers."
        },
        {
            question: "What is the correct way to assign a value to a variable?",
            options: ["x := 10", "x = 10", "x == 10", "var x = 10"],
            correct: 1,
            explanation: "In Python, use the single equals sign (=) for assignment. Double equals (==) is for comparison."
        },
        {
            question: "Which of these is NOT a valid Python variable name?",
            options: ["my_var", "_private", "2ndVar", "myVar2"],
            correct: 2,
            explanation: "Variable names cannot start with a number. They must start with a letter or underscore."
        },
        {
            question: "What does len() function return?",
            options: ["The last element", "The first element", "The length/size", "The type"],
            correct: 2,
            explanation: "The len() function returns the number of items in an object like a string, list, or tuple."
        },
        {
            question: "How do you access the first element of a list called 'fruits'?",
            options: ["fruits[1]", "fruits[0]", "fruits.first()", "fruits(0)"],
            correct: 1,
            explanation: "Python uses zero-based indexing, so the first element is at index 0: fruits[0]."
        },
        {
            question: "What is the result of 10 // 3 in Python?",
            options: ["3.33", "3", "4", "Error"],
            correct: 1,
            explanation: "The // operator performs floor division, returning the integer part of the division: 10 // 3 = 3."
        }
    ],

    intermediate: [
        {
            question: "What is *args used for in function parameters?",
            options: ["Keyword arguments", "Variable number of positional arguments", "Default arguments", "Required arguments"],
            correct: 1,
            explanation: "*args allows a function to accept any number of positional arguments as a tuple."
        },
        {
            question: "What does this lambda function do: lambda x: x**2?",
            options: ["Returns x squared", "Returns x times 2", "Returns 2 to the power of x", "Returns x plus 2"],
            correct: 0,
            explanation: "This lambda function returns the square of x (x raised to the power of 2). ** is the exponentiation operator."
        },
        {
            question: "What is the result of: [x for x in range(5) if x % 2 == 0]?",
            options: ["[1, 3]", "[0, 2, 4]", "[2, 4]", "[0, 1, 2, 3, 4]"],
            correct: 1,
            explanation: "This list comprehension creates a list of even numbers from 0 to 4: [0, 2, 4]."
        },
        {
            question: "What does 'pass' do in Python?",
            options: ["Skips to next iteration", "Exits the function", "Does nothing (null operation)", "Raises an exception"],
            correct: 2,
            explanation: "'pass' is a null operation - it does nothing when executed. It's used as a placeholder where syntactically some code is required."
        },
        {
            question: "How do you handle multiple exceptions in Python?",
            options: ["except Exception1, Exception2:", "except (Exception1, Exception2):", "except Exception1 or Exception2:", "except Exception1 and Exception2:"],
            correct: 1,
            explanation: "Multiple exceptions are handled using a tuple: except (Exception1, Exception2):"
        },
        {
            question: "What is the difference between '==' and 'is' in Python?",
            options: ["No difference", "'==' compares values, 'is' compares identity", "'==' is faster", "'is' compares values, '==' compares identity"],
            correct: 1,
            explanation: "'==' compares if two objects have the same value, while 'is' compares if they are the same object in memory."
        },
        {
            question: "What does **kwargs represent in function parameters?",
            options: ["Keyword arguments as a dictionary", "Variable arguments", "Required parameters", "Optional parameters"],
            correct: 0,
            explanation: "**kwargs allows a function to accept any number of keyword arguments as a dictionary."
        },
        {
            question: "What is the result of list(range(3, 8, 2))?",
            options: ["[3, 5, 7]", "[3, 4, 5, 6, 7]", "[3, 5]", "[3, 8, 2]"],
            correct: 0,
            explanation: "range(3, 8, 2) creates numbers from 3 to 7 (exclusive) with step 2: [3, 5, 7]."
        },
        {
            question: "Which method is used to add an element to the end of a list?",
            options: ["add()", "append()", "insert()", "push()"],
            correct: 1,
            explanation: "The append() method adds an element to the end of a list. insert() can add at any position."
        },
        {
            question: "What is a decorator in Python?",
            options: ["A function that modifies another function", "A design pattern", "A built-in function", "A type of loop"],
            correct: 0,
            explanation: "A decorator is a function that takes another function and extends its behavior without explicitly modifying it."
        }
    ],

    advanced: [
        {
            question: "What is the purpose of __init__ method in a class?",
            options: ["Destructor", "Constructor/initializer", "String representation", "Comparison method"],
            correct: 1,
            explanation: "__init__ is the constructor method that initializes new instances of a class with initial values."
        },
        {
            question: "What does super() do in Python?",
            options: ["Creates a superclass", "Calls parent class methods", "Makes a class superior", "Defines inheritance"],
            correct: 1,
            explanation: "super() is used to call methods from the parent class, allowing access to inherited methods."
        },
        {
            question: "What does if __name__ == '__main__': do?",
            options: ["Defines main function", "Checks if script is run directly", "Imports main module", "Creates main class"],
            correct: 1,
            explanation: "This checks if the script is being run directly (not imported as a module). If true, the code block executes."
        },
        {
            question: "What is method overriding in Python?",
            options: ["Creating multiple methods with same name", "Redefining parent class method in child class", "Calling multiple methods", "Deleting methods"],
            correct: 1,
            explanation: "Method overriding is redefining a parent class method in the child class to provide specific implementation."
        },
        {
            question: "What is the Global Interpreter Lock (GIL) in Python?",
            options: ["A security feature", "A mutex that protects Python objects", "A compilation step", "A debugging tool"],
            correct: 1,
            explanation: "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously."
        },
        {
            question: "What is the difference between __str__ and __repr__?",
            options: ["No difference", "__str__ for users, __repr__ for developers", "__repr__ for users, __str__ for developers", "Both are identical"],
            correct: 1,
            explanation: "__str__ is meant to be readable for end users, while __repr__ is meant to be unambiguous for developers/debugging."
        },
        {
            question: "What is a generator in Python?",
            options: ["A function that returns an iterator", "A class method", "A built-in function", "A type of loop"],
            correct: 0,
            explanation: "A generator is a function that returns an iterator object, yielding items one at a time using the 'yield' keyword."
        },
        {
            question: "What does the 'yield' keyword do?",
            options: ["Returns a value and exits", "Pauses function and returns a value", "Raises an exception", "Imports a module"],
            correct: 1,
            explanation: "'yield' pauses the function's execution and returns a value, allowing the function to resume from where it left off."
        },
        {
            question: "What is metaclass in Python?",
            options: ["A parent class", "A class of a class", "A module", "A function"],
            correct: 1,
            explanation: "A metaclass is a class whose instances are classes. It defines how classes are constructed and behave."
        },
        {
            question: "What is the purpose of __slots__ in a Python class?",
            options: ["Define methods", "Restrict attribute creation and save memory", "Define inheritance", "Handle exceptions"],
            correct: 1,
            explanation: "__slots__ restricts the attributes that can be created and saves memory by avoiding the creation of __dict__ for each instance."
        }
    ]
};

// Initialize quiz system
function initializeQuiz() {
    generateNewQuiz();
    updateQuizStats();
}

// Generate new quiz based on difficulty
function generateNewQuiz() {
    const difficulty = document.getElementById('difficultySelect').value || 'intermediate';
    const allQuestions = questionPool[difficulty] || questionPool.intermediate;
    const questionsCount = Math.min(10, allQuestions.length);
    
    // Shuffle and select questions
    currentQuiz = shuffleArray([...allQuestions]).slice(0, questionsCount);
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    timeRemaining = 300; // 5 minutes
    
    // Show quiz container and hide results
    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('resultsContainer').classList.add('hidden');
    
    // Start timer
    startTimer();
    
    // Display first question
    displayQuestion();
    updateProgress();
}

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= currentQuiz.length) {
        endQuiz();
        return;
    }
    
    const question = currentQuiz[currentQuestionIndex];
    const container = document.getElementById('quizContainer');
    
    container.innerHTML = `
        <div class="bg-gray-700 rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-purple-400">
                    Question ${currentQuestionIndex + 1} of ${currentQuiz.length}
                </h3>
                <div class="flex items-center space-x-4">
                    <div class="text-sm text-gray-400">
                        <i class="fas fa-clock mr-1"></i>
                        <span id="timerDisplay">${formatTime(timeRemaining)}</span>
                    </div>
                    <div class="text-sm text-gray-400">
                        Score: <span class="text-green-400">${score}</span>/${currentQuiz.length}
                    </div>
                </div>
            </div>
            
            <div class="mb-6">
                <p class="text-lg text-gray-100 leading-relaxed">${question.question}</p>
            </div>
            
            <div class="space-y-3 mb-6">
                ${question.options.map((option, index) => `
                    <button onclick="selectAnswer(${index})" 
                            class="option-btn w-full text-left p-4 bg-gray-600 hover:bg-gray-500 rounded-lg border-2 border-transparent hover:border-purple-400 transition-all duration-200"
                            id="option-${index}">
                        <span class="inline-flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full mr-3 font-semibold">
                            ${String.fromCharCode(65 + index)}
                        </span>
                        <span>${option}</span>
                    </button>
                `).join('')}
            </div>
            
            <div class="flex justify-between">
                <button onclick="skipQuestion()" class="text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-forward mr-1"></i>Skip Question
                </button>
                <div class="text-sm text-gray-400">
                    ${currentQuestionIndex > 0 ? `
                        <button onclick="previousQuestion()" class="text-purple-400 hover:text-purple-300 mr-4">
                            <i class="fas fa-chevron-left mr-1"></i>Previous
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    const question = currentQuiz[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = selectedIndex;
    
    const options = document.querySelectorAll('.option-btn');
    options.forEach((option, index) => {
        option.disabled = true;
        option.classList.remove('hover:bg-gray-500', 'hover:border-purple-400');
        
        if (index === question.correct) {
            option.classList.add('bg-green-600', 'border-green-400');
            option.innerHTML = option.innerHTML.replace('bg-purple-600', 'bg-green-500');
        } else if (index === selectedIndex) {
            option.classList.add('bg-red-600', 'border-red-400');
            option.innerHTML = option.innerHTML.replace('bg-purple-600', 'bg-red-500');
        } else {
            option.classList.add('opacity-50');
        }
    });
    
    // Check if answer is correct
    if (selectedIndex === question.correct) {
        score++;
    }
    
    // Show explanation
    setTimeout(() => {
        showExplanation(question);
    }, 1000);
    
    // Auto-advance after explanation
    setTimeout(() => {
        nextQuestion();
    }, 4000);
}

// Show explanation
function showExplanation(question) {
    const container = document.getElementById('quizContainer');
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'mt-4 p-4 bg-blue-900 bg-opacity-50 rounded-lg border-l-4 border-blue-400';
    explanationDiv.innerHTML = `
        <div class="flex items-start">
            <i class="fas fa-info-circle text-blue-400 mt-1 mr-3"></i>
            <div>
                <h4 class="font-semibold text-blue-300 mb-2">Explanation</h4>
                <p class="text-gray-300">${question.explanation}</p>
            </div>
        </div>
    `;
    container.appendChild(explanationDiv);
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
    updateProgress();
}

// Skip current question
function skipQuestion() {
    if (confirm('Are you sure you want to skip this question?')) {
        userAnswers[currentQuestionIndex] = -1; // Mark as skipped
        nextQuestion();
    }
}

// Go to previous question (if applicable)
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateProgress();
    }
}

// Update progress bar
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const currentQuestion = document.getElementById('currentQuestion');
    
    if (progressBar && currentQuestion) {
        const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
        progressBar.style.width = `${progress}%`;
        currentQuestion.textContent = currentQuestionIndex + 1;
    }
}

// Timer functions
function startTimer() {
    clearInterval(quizTimer);
    quizTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            endQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
        timerDisplay.textContent = formatTime(timeRemaining);
        
        // Change color based on remaining time
        if (timeRemaining <= 60) {
            timerDisplay.className = 'text-red-400';
        } else if (timeRemaining <= 120) {
            timerDisplay.className = 'text-yellow-400';
        } else {
            timerDisplay.className = 'text-green-400';
        }
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// End quiz and show results
function endQuiz() {
    clearInterval(quizTimer);
    
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');
    
    const accuracy = Math.round((score / currentQuiz.length) * 100);
    const skipped = userAnswers.filter(answer => answer === -1).length;
    const timeTaken = 300 - timeRemaining;
    
    // Update results display
    document.getElementById('finalScore').textContent = score;
    
    // Determine emoji and message based on performance
    let emoji, message, color;
    if (accuracy >= 90) {
        emoji = '🏆';
        message = 'Outstanding!';
        color = 'text-yellow-400';
    } else if (accuracy >= 80) {
        emoji = '🎉';
        message = 'Excellent!';
        color = 'text-green-400';
    } else if (accuracy >= 70) {
        emoji = '👍';
        message = 'Good job!';
        color = 'text-blue-400';
    } else if (accuracy >= 60) {
        emoji = '📚';
        message = 'Keep studying!';
        color = 'text-orange-400';
    } else {
        emoji = '💪';
        message = 'Practice more!';
        color = 'text-red-400';
    }
    
    document.getElementById('scoreEmoji').textContent = emoji;
    
    // Show detailed results
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `
        <div class="text-center">
            <div class="text-6xl mb-4">${emoji}</div>
            <h3 class="text-3xl font-bold mb-2 ${color}">${message}</h3>
            <div class="text-2xl font-bold mb-6">
                Your Score: <span class="text-purple-400">${score}</span>/${currentQuiz.length}
            </div>
            
            <div class="bg-gray-700 rounded-lg p-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-400">${accuracy}%</div>
                        <div class="text-sm text-gray-400">Accuracy</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-blue-400">${formatTime(timeTaken)}</div>
                        <div class="text-sm text-gray-400">Time Taken</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-orange-400">${skipped}</div>
                        <div class="text-sm text-gray-400">Skipped</div>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-wrap justify-center gap-4">
                <button onclick="generateNewQuiz()" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
                    <i class="fas fa-redo mr-2"></i>Take Another Quiz
                </button>
                <button onclick="reviewAnswers()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
                    <i class="fas fa-eye mr-2"></i>Review Answers
                </button>
                <button onclick="shareResults()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
                    <i class="fas fa-share mr-2"></i>Share Results
                </button>
            </div>
        </div>
    `;
}

// Review answers function
function reviewAnswers() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
    
    const content = document.createElement('div');
    content.className = 'bg-gray-800 rounded-xl max-w-4xl w-full max-h-96 overflow-y-auto';
    
    let reviewHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">Quiz Review</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="space-y-4">
    `;
    
    currentQuiz.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        const wasSkipped = userAnswer === -1;
        
        reviewHTML += `
            <div class="bg-gray-700 rounded-lg p-4 border-l-4 ${isCorrect ? 'border-green-400' : wasSkipped ? 'border-yellow-400' : 'border-red-400'}">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold">Question ${index + 1}</h4>
                    <span class="px-2 py-1 rounded text-sm ${isCorrect ? 'bg-green-600' : wasSkipped ? 'bg-yellow-600' : 'bg-red-600'}">
                        ${isCorrect ? 'Correct' : wasSkipped ? 'Skipped' : 'Incorrect'}
                    </span>
                </div>
                <p class="text-gray-300 mb-3">${question.question}</p>
                <div class="space-y-1 text-sm">
                    ${question.options.map((option, optIndex) => `
                        <div class="flex items-center ${optIndex === question.correct ? 'text-green-400' : optIndex === userAnswer && !isCorrect ? 'text-red-400' : 'text-gray-400'}">
                            <span class="w-6">${String.fromCharCode(65 + optIndex)}.</span>
                            <span>${option}</span>
                            ${optIndex === question.correct ? '<i class="fas fa-check ml-2"></i>' : ''}
                            ${optIndex === userAnswer && !isCorrect ? '<i class="fas fa-times ml-2"></i>' : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="mt-3 p-3 bg-blue-900 bg-opacity-50 rounded text-sm">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            </div>
        `;
    });
    
    reviewHTML += `
            </div>
        </div>
    `;
    
    content.innerHTML = reviewHTML;
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// Share results function
function shareResults() {
    const difficulty = document.getElementById('difficultySelect').value;
    const accuracy = Math.round((score / currentQuiz.length) * 100);
    
    const shareText = `🐍 I just completed a Python quiz on PyHub!\n\n📊 Results:\n✅ Score: ${score}/${currentQuiz.length} (${accuracy}%)\n🎯 Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}\n\n#PyHub #Python #Quiz #Programming`;
    
    if (navigator.share) {
        navigator.share({
            title: 'PyHub Quiz Results',
            text: shareText,
            url: window.location.href
        });
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Results copied to clipboard!', 'success');
        });
    } else {
        // Fallback: show modal with shareable text
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-800 rounded-xl max-w-md w-full p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">Share Your Results</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <textarea class="w-full h-32 bg-gray-700 text-white p-3 rounded resize-none" readonly>${shareText}</textarea>
                <button onclick="navigator.clipboard?.writeText('${shareText.replace(/'/g, "\\'")}'); showNotification('Copied!', 'success');" class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                    <i class="fas fa-copy mr-2"></i>Copy to Clipboard
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// Update quiz statistics
function updateQuizStats() {
    // This would typically update user statistics
    // For now, we'll just update the display
    console.log('Quiz completed:', {
        score,
        total: currentQuiz.length,
        accuracy: Math.round((score / currentQuiz.length) * 100),
        difficulty: document.getElementById('difficultySelect').value
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        warning: 'bg-yellow-600',
        info: 'bg-blue-600'
    };
    
    notification.className = `fixed top-20 right-4 ${colors[type]} text-white px-4 py-2 rounded-lg shadow-lg z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Quick start functions for different difficulties
function startBeginnerQuiz() {
    document.getElementById('difficultySelect').value = 'beginner';
    generateNewQuiz();
}

function startIntermediateQuiz() {
    document.getElementById('difficultySelect').value = 'intermediate';
    generateNewQuiz();
}

function startAdvancedQuiz() {
    document.getElementById('difficultySelect').value = 'advanced';
    generateNewQuiz();
}

// Export functions for global use
window.initializeQuiz = initializeQuiz;
window.generateNewQuiz = generateNewQuiz;
window.selectAnswer = selectAnswer;
window.skipQuestion = skipQuestion;
window.previousQuestion = previousQuestion;
window.reviewAnswers = reviewAnswers;
window.shareResults = shareResults;
window.startBeginnerQuiz = startBeginnerQuiz;
window.startIntermediateQuiz = startIntermediateQuiz;
window.startAdvancedQuiz = startAdvancedQuiz;