// Python Compiler functionality for PyHub
let editor;
let isRunning = false;

// Initialize compiler when page loads
function initializeCompiler() {
    if (!editor) {
        const textarea = document.getElementById('codeEditor');
        if (!textarea) return;

        editor = CodeMirror.fromTextArea(textarea, {
            mode: 'python',
            theme: 'dracula',
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            styleActiveLine: true,
            indentUnit: 4,
            tabSize: 4,
            lineWrapping: true,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });

        // Set initial code
        editor.setValue(`# Welcome to PyHub Python Compiler!
print("Hello, PyHub!")

# Try some Python code:
name = "Python Learner"
age = 25

print(f"Hello, {name}!")
print(f"You are {age} years old.")

# Math operations
x = 10
y = 5
print(f"{x} + {y} = {x + y}")
print(f"{x} * {y} = {x * y}")

# List operations
fruits = ["apple", "banana", "orange"]
print("Fruits:", fruits)

for i, fruit in enumerate(fruits, 1):
    print(f"{i}. {fruit.title()}")
`);

        // Add resize handling
        editor.setSize(null, "400px");
        
        // Auto-save to localStorage
        editor.on('change', function() {
            localStorage.setItem('pyhub_code', editor.getValue());
        });

        // Load saved code
        const savedCode = localStorage.getItem('pyhub_code');
        if (savedCode) {
            editor.setValue(savedCode);
        }
    }

    // Add example selector functionality
    setupExampleSelector();
}

// Code examples
const codeExamples = {
    hello: {
        title: "Hello World",
        code: `# Hello World Program
print("Hello, World!")
print("Welcome to PyHub Python Compiler!")

# Variables
name = "Python Programmer"
print(f"Nice to meet you, {name}!")

# Basic math
x = 42
y = 8
print(f"The answer is {x}, and {y} is great too!")
`
    },
    
    calculator: {
        title: "Simple Calculator",
        code: `# Simple Calculator
print("=== PyHub Calculator ===")

def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y != 0:
        return x / y
    else:
        return "Cannot divide by zero!"

# Example calculations
a, b = 15, 3

print(f"{a} + {b} = {add(a, b)}")
print(f"{a} - {b} = {subtract(a, b)}")
print(f"{a} × {b} = {multiply(a, b)}")
print(f"{a} ÷ {b} = {divide(a, b)}")

# Power and modulo
print(f"{a} ** {b} = {a ** b}")
print(f"{a} % {b} = {a % b}")
`
    },

    lists: {
        title: "Lists & Loops",
        code: `# Lists and Loops Demo
print("=== Lists and Loops ===")

# Creating lists
fruits = ["apple", "banana", "orange", "grape", "kiwi"]
numbers = [1, 4, 9, 16, 25]

print("Fruits:", fruits)
print("Numbers:", numbers)

# Accessing elements
print(f"First fruit: {fruits[0]}")
print(f"Last fruit: {fruits[-1]}")

# Loop through list with index
print("\\n--- Fruits with index ---")
for i, fruit in enumerate(fruits):
    print(f"{i + 1}. {fruit.title()}")

# List operations
fruits.append("mango")
print(f"\\nAfter adding mango: {fruits}")

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")

# Filter even numbers
evens = [x for x in numbers if x % 2 == 0]
print(f"Even numbers: {evens}")
`
    },

    functions: {
        title: "Functions",
        code: `# Functions Demo
print("=== Python Functions ===")

# Basic function
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Function with multiple parameters
def calculate_area(shape, **kwargs):
    if shape == "rectangle":
        return kwargs.get('length', 0) * kwargs.get('width', 0)
    elif shape == "circle":
        import math
        radius = kwargs.get('radius', 0)
        return math.pi * radius ** 2
    else:
        return "Unknown shape"

# Function with variable arguments
def sum_all(*args):
    total = 0
    for num in args:
        total += num
    return total

# Using functions
print(greet("Python"))
print(greet("World", "Hi"))

rect_area = calculate_area("rectangle", length=5, width=3)
circle_area = calculate_area("circle", radius=4)

print(f"Rectangle area: {rect_area}")
print(f"Circle area: {circle_area:.2f}")

print(f"Sum of 1,2,3,4,5: {sum_all(1,2,3,4,5)}")

# Lambda function
square = lambda x: x ** 2
print(f"Square of 7: {square(7)}")
`
    },

    classes: {
        title: "Classes & OOP",
        code: `# Classes and Object-Oriented Programming
print("=== Classes and OOP ===")

class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
        self.age = 0
    
    def make_sound(self):
        return f"{self.name} makes a sound"
    
    def celebrate_birthday(self):
        self.age += 1
        return f"Happy birthday {self.name}! Now {self.age} years old."

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Canine")
        self.breed = breed
    
    def make_sound(self):
        return f"{self.name} says Woof!"
    
    def fetch(self):
        return f"{self.name} fetches the ball!"

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name, "Feline")
        self.color = color
    
    def make_sound(self):
        return f"{self.name} says Meow!"
    
    def purr(self):
        return f"{self.name} purrs contentedly"

# Create instances
dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers", "Orange")

# Use the objects
print(f"Dog: {dog.name} ({dog.breed})")
print(dog.make_sound())
print(dog.fetch())
print(dog.celebrate_birthday())

print(f"\\nCat: {cat.name} ({cat.color})")
print(cat.make_sound())
print(cat.purr())
`
    },

    data_structures: {
        title: "Data Structures",
        code: `# Data Structures in Python
print("=== Python Data Structures ===")

# Lists (ordered, mutable)
my_list = [1, 2, 3, "hello", True]
print(f"List: {my_list}")

# Tuples (ordered, immutable)
my_tuple = (1, 2, 3, "world")
print(f"Tuple: {my_tuple}")

# Dictionaries (key-value pairs)
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York",
    "skills": ["Python", "JavaScript", "SQL"]
}
print(f"Dictionary: {person}")
print(f"Name: {person['name']}")
print(f"Skills: {', '.join(person['skills'])}")

# Sets (unique elements)
numbers = {1, 2, 3, 3, 4, 4, 5}
print(f"Set: {numbers}")  # Duplicates removed

# Set operations
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}
print(f"Union: {set1 | set2}")
print(f"Intersection: {set1 & set2}")
print(f"Difference: {set1 - set2}")

# Nested structures
students = [
    {"name": "John", "grade": 85, "subjects": ["Math", "Science"]},
    {"name": "Emma", "grade": 92, "subjects": ["English", "History"]},
    {"name": "Alex", "grade": 78, "subjects": ["Math", "Art"]}
]

print("\\n--- Student Records ---")
for student in students:
    subjects = ", ".join(student["subjects"])
    print(f"{student['name']}: {student['grade']}% - {subjects}")
`
    },

    error_handling: {
        title: "Error Handling",
        code: `# Error Handling in Python
print("=== Error Handling Demo ===")

def safe_divide(a, b):
    try:
        result = a / b
        return f"{a} ÷ {b} = {result}"
    except ZeroDivisionError:
        return "Error: Cannot divide by zero!"
    except TypeError:
        return "Error: Both arguments must be numbers!"

def process_list(data):
    try:
        # Try to access list elements
        print(f"First element: {data[0]}")
        print(f"Length: {len(data)}")
        
        # Try to convert elements to integers
        numbers = [int(x) for x in data]
        print(f"Sum: {sum(numbers)}")
        
    except IndexError:
        print("Error: List is empty!")
    except ValueError as e:
        print(f"Error: Cannot convert to integer - {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        print("Processing complete.")

# Test safe division
print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide("10", 2))

print("\\n--- List Processing ---")
# Test with valid list
process_list(["1", "2", "3", "4"])

print("\\n--- Empty List ---")
# Test with empty list
process_list([])

print("\\n--- Invalid Data ---")
# Test with invalid data
process_list(["1", "two", "3"])

# Custom exceptions
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

def validate_age(age):
    try:
        age = int(age)
        if age < 0:
            raise CustomError("Age cannot be negative")
        elif age > 150:
            raise CustomError("Age seems unrealistic")
        else:
            print(f"Valid age: {age}")
    except CustomError as e:
        print(f"Validation error: {e.message}")
    except ValueError:
        print("Error: Age must be a number")

print("\\n--- Age Validation ---")
validate_age("25")
validate_age("-5")
validate_age("200")
validate_age("abc")
`
    },

    file_operations: {
        title: "File Operations",
        code: `# File Operations Demo
print("=== File Operations ===")

# Note: In this online environment, actual file operations may be limited
# This code demonstrates the syntax and concepts

# Writing to a file (simulated)
def simulate_file_write():
    print("Writing to file (simulated):")
    content = """Hello, PyHub!
This is a test file.
Python file operations are powerful.
You can read, write, and manipulate files easily."""
    
    print("File content to write:")
    print(content)
    print("File written successfully! (simulated)")

# Reading from a file (simulated)
def simulate_file_read():
    print("\\nReading from file (simulated):")
    lines = [
        "Line 1: Hello, Python!",
        "Line 2: File operations are useful",
        "Line 3: Always close your files",
        "Line 4: Or use 'with' statements"
    ]
    
    print("File contents:")
    for i, line in enumerate(lines, 1):
        print(f"  {line}")

# JSON operations (simulated)
import json

def json_operations():
    print("\\n=== JSON Operations ===")
    
    # Python dictionary
    data = {
        "name": "PyHub User",
        "age": 25,
        "languages": ["Python", "JavaScript", "HTML"],
        "active": True,
        "projects": {
            "web": 3,
            "data_science": 2,
            "automation": 5
        }
    }
    
    # Convert to JSON string
    json_string = json.dumps(data, indent=2)
    print("Dictionary as JSON:")
    print(json_string)
    
    # Parse JSON back to dictionary
    parsed_data = json.loads(json_string)
    print(f"\\nParsed back - Name: {parsed_data['name']}")
    print(f"Languages: {', '.join(parsed_data['languages'])}")

# CSV operations (simulated)
def csv_operations():
    print("\\n=== CSV Operations ===")
    
    # Simulated CSV data
    csv_data = [
        ["Name", "Age", "City", "Language"],
        ["Alice", "28", "New York", "Python"],
        ["Bob", "32", "London", "JavaScript"],
        ["Charlie", "25", "Tokyo", "Python"],
        ["Diana", "29", "Paris", "Java"]
    ]
    
    print("CSV Data:")
    for row in csv_data:
        print(", ".join(str(cell) for cell in row))
    
    # Process CSV data
    print("\\nPython developers:")
    for row in csv_data[1:]:  # Skip header
        if row[3] == "Python":
            print(f"  {row[0]} ({row[1]} years old) from {row[2]}")

# Run demonstrations
simulate_file_write()
simulate_file_read()
json_operations()
csv_operations()

print("\\n=== File Handling Best Practices ===")
print("1. Always use 'with' statements for automatic file closing")
print("2. Handle exceptions when working with files")
print("3. Specify encoding when working with text files")
print("4. Use appropriate file modes ('r', 'w', 'a', 'rb', etc.)")
print("5. Close files properly to free system resources")
`
    }
};

// Setup example selector
function setupExampleSelector() {
    // Create example selector if it doesn't exist
    let selector = document.getElementById('exampleSelect');
    if (!selector) {
        const compilerSection = document.querySelector('#compiler .grid');
        if (compilerSection && compilerSection.children[0]) {
            const editorHeader = compilerSection.children[0].querySelector('.bg-gray-700');
            if (editorHeader) {
                const selectorHTML = `
                    <select id="exampleSelect" class="bg-gray-600 text-white px-3 py-1 rounded text-sm ml-4">
                        <option value="">Load Example...</option>
                        ${Object.entries(codeExamples).map(([key, example]) => 
                            `<option value="${key}">${example.title}</option>`
                        ).join('')}
                    </select>
                `;
                editorHeader.innerHTML += selectorHTML;
                
                selector = document.getElementById('exampleSelect');
                selector.addEventListener('change', function() {
                    if (this.value) {
                        loadExample(this.value);
                        this.value = '';
                    }
                });
            }
        }
    }
}

// Load code example
function loadExample(exampleKey) {
    if (exampleKey && codeExamples[exampleKey] && editor) {
        const example = codeExamples[exampleKey];
        editor.setValue(example.code);
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = `Loaded: ${example.title}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}

// Run Python code using Skulpt
function runCode() {
    if (!editor) return;
    
    const code = editor.getValue().trim();
    const outputDiv = document.getElementById('output');
    
    if (!code) {
        outputDiv.innerHTML = '<span class="text-red-400">Error: No code to execute!</span>';
        return;
    }

    if (isRunning) {
        outputDiv.innerHTML = '<span class="text-yellow-400">Code is already running...</span>';
        return;
    }

    isRunning = true;
    outputDiv.innerHTML = '<span class="text-blue-400">Running...</span>\n';
    
    // Configure Skulpt
    Sk.pre = "output";
    Sk.configure({
        output: function(text) {
            outputDiv.innerHTML += text;
        },
        read: function(x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x];
        },
        inputfun: function(prompt) {
            return window.prompt(prompt);
        },
        inputfunTakesPrompt: true
    });

    // Create promise for async execution
    const myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    });

    myPromise.then(
        function(mod) {
            // Success
            if (outputDiv.innerHTML === '<span class="text-blue-400">Running...</span>\n') {
                outputDiv.innerHTML = '<span class="text-green-400">✓ Program executed successfully!</span>\n<span class="text-gray-400">(No output generated)</span>';
            } else {
                // Add success indicator
                const successMsg = document.createElement('div');
                successMsg.className = 'text-green-400 text-sm mt-2';
                successMsg.innerHTML = '✓ Execution completed successfully';
                outputDiv.appendChild(successMsg);
            }
            isRunning = false;
        },
        function(err) {
            // Error handling
            outputDiv.innerHTML = `<span class="text-red-400">❌ Error:</span>\n<span class="text-red-300">${err.toString()}</span>`;
            isRunning = false;
        }
    );
}

// Clear code editor
function clearCode() {
    if (editor) {
        if (confirm('Are you sure you want to clear all code?')) {
            editor.setValue('# Write your Python code here...\n');
            clearOutput();
        }
    }
}

// Clear output panel
function clearOutput() {
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
        outputDiv.innerHTML = '<span class="text-gray-400">Output cleared. Ready for next execution...</span>';
    }
}

// Save code to file (download)
function saveCode() {
    if (!editor) return;
    
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pyhub_code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = 'Code saved as pyhub_code.py';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Load code from file
function loadCode() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.py,.txt';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (editor) {
                    editor.setValue(e.target.result);
                    
                    // Show notification
                    const notification = document.createElement('div');
                    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                    notification.textContent = `Loaded: ${file.name}`;
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.remove();
                    }, 2000);
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

// Format code (basic indentation fix)
function formatCode() {
    if (!editor) return;
    
    const code = editor.getValue();
    const lines = code.split('\n');
    let indentLevel = 0;
    const formattedLines = [];
    
    for (let line of lines) {
        const trimmed = line.trim();
        
        if (trimmed === '') {
            formattedLines.push('');
            continue;
        }
        
        // Decrease indent for certain keywords
        if (trimmed.startsWith('except') || trimmed.startsWith('elif') || 
            trimmed.startsWith('else') || trimmed.startsWith('finally')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        // Add current line with proper indentation
        formattedLines.push('    '.repeat(indentLevel) + trimmed);
        
        // Increase indent after certain keywords
        if (trimmed.endsWith(':') && 
            (trimmed.startswith('def ') || trimmed.startsWith('class ') || 
             trimmed.startsWith('if ') || trimmed.startsWith('elif ') ||
             trimmed.startsWith('else:') || trimmed.startsWith('for ') ||
             trimmed.startsWith('while ') || trimmed.startsWith('try:') ||
             trimmed.startsWith('except') || trimmed.startsWith('finally:') ||
             trimmed.startsWith('with '))) {
            indentLevel++;
        }
    }
    
    editor.setValue(formattedLines.join('\n'));
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = 'Code formatted!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Export functions for global use
window.initializeCompiler = initializeCompiler;
window.runCode = runCode;
window.clearCode = clearCode;
window.clearOutput = clearOutput;
window.loadExample = loadExample;
window.saveCode = saveCode;
window.loadCode = loadCode;
window.formatCode = formatCode;