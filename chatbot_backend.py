#!/usr/bin/env python3
"""
PyHub Smart Chatbot Backend
A local AI chatbot using pattern matching and machine learning - no external APIs required!
Compatible with Python 3.13+
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
import random
import sqlite3
import os
import ast
import sys
import traceback
import re
from datetime import datetime
from difflib import SequenceMatcher
from io import StringIO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class PythonErrorChecker:
    """Python code error checker and analyzer"""

    def __init__(self):
        self.common_errors = {
            'SyntaxError': 'Syntax error - check for missing colons, parentheses, or quotes',
            'IndentationError': 'Indentation error - Python uses consistent indentation (4 spaces recommended)',
            'NameError': 'Variable or function name not defined - check spelling and scope',
            'TypeError': 'Type error - incompatible data types or wrong number of arguments',
            'ValueError': 'Value error - correct type but inappropriate value',
            'IndexError': 'Index out of range - list/string index too large',
            'KeyError': 'Dictionary key not found - check if key exists',
            'AttributeError': 'Object has no attribute - check method/property names',
            'ImportError': 'Module import failed - check module name and installation',
            'ZeroDivisionError': 'Division by zero - add condition to check denominator',
            'FileNotFoundError': 'File not found - check file path and existence'
        }

    def check_syntax(self, code):
        """Check Python code for syntax errors"""
        try:
            ast.parse(code)
            return {'valid': True, 'message': 'Code syntax is valid!'}
        except SyntaxError as e:
            return {
                'valid': False,
                'error_type': 'SyntaxError',
                'message': str(e),
                'line': e.lineno,
                'column': e.offset,
                'suggestion': self.get_syntax_suggestion(str(e))
            }
        except Exception as e:
            return {
                'valid': False,
                'error_type': type(e).__name__,
                'message': str(e),
                'suggestion': 'Check your code structure and syntax'
            }

    def analyze_code(self, code):
        """Analyze code for potential issues and improvements"""
        issues = []
        suggestions = []

        lines = code.split('\n')

        for i, line in enumerate(lines, 1):
            line_stripped = line.strip()

            # Check for common issues
            if line_stripped.startswith('print '):
                issues.append(f"Line {i}: Use print() function, not print statement (Python 3)")

            if '==' in line and line.count('=') > line.count('==') * 2:
                issues.append(f"Line {i}: Possible assignment (=) instead of comparison (==)")

            if line_stripped.endswith(':') and not line.startswith(' ') and not line.startswith('\t'):
                next_line = lines[i] if i < len(lines) else ''
                if next_line and not (next_line.startswith(' ') or next_line.startswith('\t')):
                    issues.append(f"Line {i+1}: Missing indentation after colon")

            if 'import' in line and '*' in line:
                suggestions.append(f"Line {i}: Avoid 'import *' - import specific functions instead")

            if len(line) > 79:
                suggestions.append(f"Line {i}: Line too long ({len(line)} chars) - PEP 8 recommends max 79")

        return {
            'issues': issues,
            'suggestions': suggestions,
            'line_count': len(lines),
            'complexity': self.calculate_complexity(code)
        }

    def get_syntax_suggestion(self, error_msg):
        """Get specific suggestions based on syntax error"""
        error_lower = error_msg.lower()

        if 'invalid syntax' in error_lower:
            if 'eof' in error_lower:
                return "Check for missing closing parentheses, brackets, or quotes"
            elif ':' in error_msg:
                return "Check if you need a colon (:) after if, for, while, def, or class statements"
            else:
                return "Check for typos, missing operators, or incorrect Python syntax"

        elif 'unexpected indent' in error_lower:
            return "Remove extra indentation or ensure consistent indentation"

        elif 'expected an indented block' in error_lower:
            return "Add indentation (4 spaces) after colon (:) statements"

        elif 'unindent does not match' in error_lower:
            return "Fix indentation to match the outer indentation level"

        else:
            return "Check Python syntax rules and fix the highlighted error"

    def calculate_complexity(self, code):
        """Calculate basic code complexity"""
        complexity_keywords = ['if', 'elif', 'else', 'for', 'while', 'try', 'except', 'with']
        complexity = sum(code.count(keyword) for keyword in complexity_keywords)

        if complexity <= 5:
            return 'Low'
        elif complexity <= 10:
            return 'Medium'
        else:
            return 'High'

    def safe_execute(self, code, timeout=5):
        """Safely execute Python code with restrictions"""
        # Restricted imports and functions for security
        restricted = ['import os', 'import sys', 'import subprocess', 'exec', 'eval', 'open', '__import__']

        for restriction in restricted:
            if restriction in code:
                return {
                    'success': False,
                    'error': f"Restricted operation: {restriction}",
                    'output': '',
                    'suggestion': 'Code contains potentially unsafe operations'
                }

        # Capture output
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        stdout_capture = StringIO()
        stderr_capture = StringIO()

        try:
            sys.stdout = stdout_capture
            sys.stderr = stderr_capture

            # Execute code in restricted environment
            exec_globals = {
                '__builtins__': {
                    'print': print,
                    'len': len,
                    'str': str,
                    'int': int,
                    'float': float,
                    'list': list,
                    'dict': dict,
                    'tuple': tuple,
                    'set': set,
                    'range': range,
                    'enumerate': enumerate,
                    'zip': zip,
                    'sum': sum,
                    'max': max,
                    'min': min,
                    'abs': abs,
                    'round': round,
                    'sorted': sorted,
                    'reversed': reversed
                }
            }

            exec(code, exec_globals)

            output = stdout_capture.getvalue()
            error_output = stderr_capture.getvalue()

            return {
                'success': True,
                'output': output,
                'error': error_output,
                'suggestion': 'Code executed successfully!'
            }

        except Exception as e:
            error_type = type(e).__name__
            error_msg = str(e)

            return {
                'success': False,
                'error': f"{error_type}: {error_msg}",
                'output': stdout_capture.getvalue(),
                'suggestion': self.common_errors.get(error_type, 'Check the error message and fix the issue')
            }

        finally:
            sys.stdout = old_stdout
            sys.stderr = old_stderr

class SmartChatBot:
    """A simple but effective chatbot using pattern matching and learning"""

    def __init__(self):
        self.db_path = 'pybot_conversations.db'
        self.error_checker = PythonErrorChecker()
        self.init_database()
        self.load_training_data()

    def init_database(self):
        """Initialize SQLite database for storing conversations"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                input_text TEXT NOT NULL,
                response_text TEXT NOT NULL,
                confidence REAL DEFAULT 0.8,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS patterns (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pattern TEXT NOT NULL,
                response TEXT NOT NULL,
                category TEXT DEFAULT 'general'
            )
        ''')

        conn.commit()
        conn.close()

    def load_training_data(self):
        """Load initial training data"""
        training_data = [
            # Greetings
            ("hello", "Hi there! I'm PyBot, your Python programming assistant. How can I help you today?", "greeting"),
            ("hi", "Hello! I'm here to help you with Python programming. What would you like to learn?", "greeting"),
            ("hey", "Hey! Ready to dive into some Python programming? Ask me anything!", "greeting"),

            # Python Basics
            ("what is python", "Python is a high-level, interpreted programming language known for its simplicity and readability. It's great for beginners and powerful for experts!", "basics"),
            ("python language", "Python is a versatile programming language created by Guido van Rossum. It emphasizes code readability and has a simple, easy-to-learn syntax.", "basics"),

            # Lists
            ("create list", "You can create a list in Python using square brackets: my_list = [1, 2, 3, 'hello']. Lists are mutable and can contain different data types.", "lists"),
            ("python list", "Lists in Python are ordered collections that can hold multiple items. Example: fruits = ['apple', 'banana', 'orange']. You can add, remove, and modify items.", "lists"),
            ("list methods", "Common list methods: append() to add items, remove() to delete items, len() for length, sort() to sort, and index() to find position.", "lists"),

            # Functions
            ("python function", "A function in Python is defined using the 'def' keyword. Example: def my_function(): return 'Hello World'. Functions help organize and reuse code.", "functions"),
            ("define function", "To define a function: def function_name(parameters): # code here return value. Functions can take parameters and return values.", "functions"),
            ("function parameters", "Function parameters are variables listed inside parentheses. Example: def greet(name): return f'Hello {name}!'. Call with greet('Alice').", "functions"),
            ("how do i create a function", "To create a function in Python: def function_name(parameters): # your code here return result. Example: def greet(name): return f'Hello {name}!'", "functions"),
            ("create function", "Functions are created with 'def': def my_function(): print('Hello!'). You can add parameters: def greet(name): print(f'Hi {name}!')", "functions"),

            # Loops
            ("python loops", "Python has for and while loops. For example: for i in range(5): print(i) or while condition: do_something(). Loops help repeat code efficiently.", "loops"),
            ("for loop", "For loops iterate over sequences: for item in list: print(item). Use range() for numbers: for i in range(10): print(i).", "loops"),
            ("while loop", "While loops continue until condition is false: while x < 10: x += 1. Be careful to avoid infinite loops!", "loops"),

            # Variables
            ("python variables", "Variables in Python store data values. You create them by assignment: name = 'John', age = 25. Python is dynamically typed, so no type declaration needed.", "variables"),
            ("variable types", "Python has several data types: int (numbers), str (text), list (collections), dict (key-value pairs), bool (True/False), and float (decimals).", "variables"),

            # Error Handling
            ("error handling", "Use try-except blocks: try: risky_code() except Exception as e: handle_error(). This prevents your program from crashing when errors occur.", "errors"),
            ("try except", "Try-except catches errors: try: result = 10/0 except ZeroDivisionError: print('Cannot divide by zero'). Always handle specific exceptions when possible.", "errors"),

            # Debugging
            ("help debug my code", "To debug Python code: 1) Read error messages carefully, 2) Use print() statements, 3) Check indentation, 4) Verify variable names, 5) Use Python debugger (pdb)", "debugging"),
            ("debug code", "Common debugging steps: Check syntax errors, verify indentation, print variable values, use try/except blocks, read error tracebacks carefully", "debugging"),
            ("debugging python", "Python debugging tips: Use print() for simple debugging, pdb for advanced debugging, check common errors like indentation, typos, and logic errors", "debugging"),

            # Best Practices
            ("python best practices", "Python best practices: Use meaningful variable names, follow PEP 8 style guide, write docstrings, handle exceptions, use list comprehensions, avoid global variables", "best_practices"),
            ("best practices", "Key Python practices: Clear naming, proper indentation (4 spaces), comments for complex code, error handling with try/except, modular code with functions", "best_practices"),

            # OOP
            ("object oriented", "OOP in Python uses classes and objects. Define a class with 'class MyClass:', create objects with 'obj = MyClass()'. It helps organize complex programs.", "oop"),
            ("python class", "Classes are blueprints for objects: class Dog: def __init__(self, name): self.name = name. Create instances: my_dog = Dog('Buddy').", "oop"),

            # Modules
            ("import modules", "Use 'import module_name' or 'from module import function'. Example: import math, from datetime import datetime. Modules extend Python's functionality.", "modules"),
            ("python modules", "Modules are files containing Python code. Import with 'import'. Popular modules: os (operating system), sys (system), json (JSON data), requests (HTTP).", "modules"),

            # Dictionaries
            ("python dictionary", "Dictionaries store key-value pairs: my_dict = {'name': 'John', 'age': 30}. Access values with my_dict['name']. They're like hash tables or maps.", "dictionaries"),
            ("dict methods", "Dictionary methods: keys() for all keys, values() for all values, items() for key-value pairs, get() for safe access, update() to merge dictionaries.", "dictionaries"),

            # File Handling
            ("read files", "Use 'with open('file.txt', 'r') as f: content = f.read()'. The 'with' statement ensures proper file handling and automatic closing.", "files"),
            ("write files", "To write files: with open('file.txt', 'w') as f: f.write('Hello World'). Use 'a' mode to append, 'w' to overwrite, 'r' to read.", "files"),
            ("how to work with files", "Python file operations: open('file.txt', 'r') to read, open('file.txt', 'w') to write. Always use 'with open()' for automatic file closing. Example: with open('file.txt', 'r') as f: content = f.read()", "files"),
            ("work with files", "File handling in Python: with open('filename', 'mode') as file: # operations. Modes: 'r' (read), 'w' (write), 'a' (append), 'r+' (read/write)", "files"),
            ("file operations", "Python file operations: Reading: with open('file.txt') as f: data = f.read(). Writing: with open('file.txt', 'w') as f: f.write('content')", "files"),

            # List Comprehension
            ("list comprehension", "List comprehension creates lists concisely: [x*2 for x in range(5)] creates [0, 2, 4, 6, 8]. It's a Pythonic way to create lists from iterables.", "advanced"),

            # Debugging
            ("debug python", "Use print statements, Python debugger (pdb), or IDE debuggers. Add 'import pdb; pdb.set_trace()' to set breakpoints. Also check error messages carefully.", "debugging"),

            # Libraries
            ("python libraries", "Libraries are collections of pre-written code. Popular ones include NumPy (math), Pandas (data), Requests (HTTP), Flask (web). Install with 'pip install library_name'.", "libraries"),

            # Web Development
            ("web app python", "Use frameworks like Flask or Django. Flask example: from flask import Flask; app = Flask(__name__); @app.route('/') def home(): return 'Hello World'", "web"),

            # Data Types
            ("lists vs tuples", "Lists are mutable (changeable): [1, 2, 3]. Tuples are immutable (unchangeable): (1, 2, 3). Use lists for data that changes, tuples for fixed data.", "datatypes"),

            # Popular Libraries
            ("numpy", "NumPy for numerical computing: import numpy as np; arr = np.array([1,2,3]). Fast array operations, mathematical functions, linear algebra.", "libraries"),
            ("pandas", "Pandas for data analysis: import pandas as pd; df = pd.read_csv('file.csv'). DataFrames for structured data, data cleaning, analysis.", "libraries"),
            ("matplotlib", "Matplotlib for plotting: import matplotlib.pyplot as plt; plt.plot([1,2,3]); plt.show(). Create charts, graphs, visualizations.", "libraries"),
            ("requests", "Requests for HTTP: import requests; response = requests.get('url'). Easy API calls, web scraping, HTTP operations.", "libraries"),
            ("json", "JSON handling: import json; data = json.loads(json_string); json_string = json.dumps(data). Parse and create JSON data.", "libraries"),
            ("datetime", "Date/time operations: from datetime import datetime; now = datetime.now(). Format dates, time calculations, timezones.", "libraries"),
            ("os", "Operating system interface: import os; os.listdir('.'), os.path.join(), os.makedirs(). File system operations, environment variables.", "libraries"),
            ("sys", "System-specific parameters: import sys; sys.argv (command line args), sys.exit(), sys.path. Python interpreter interaction.", "libraries"),

            # Web Development
            ("flask", "Flask web framework: from flask import Flask; app = Flask(__name__); @app.route('/') def home(): return 'Hello'. Lightweight web apps.", "web"),
            ("django", "Django web framework: Full-featured framework with ORM, admin panel, authentication. Use: django-admin startproject mysite", "web"),
            ("api", "Create APIs with Flask: @app.route('/api/data', methods=['GET', 'POST']). Return JSON: return jsonify({'key': 'value'})", "web"),
            ("html", "Generate HTML in Python: from flask import render_template; return render_template('template.html', data=data)", "web"),

            # Database
            ("sqlite", "SQLite database: import sqlite3; conn = sqlite3.connect('db.sqlite'); cursor = conn.cursor(); cursor.execute('SELECT * FROM table')", "database"),
            ("sql", "SQL in Python: cursor.execute('INSERT INTO table VALUES (?, ?)', (val1, val2)). Always use parameterized queries to prevent SQL injection.", "database"),
            ("orm", "Object-Relational Mapping: SQLAlchemy maps Python objects to database tables. Define models as classes, query with Python syntax.", "database"),

            # Testing
            ("unittest", "Unit testing: import unittest; class TestMyCode(unittest.TestCase): def test_function(self): self.assertEqual(result, expected)", "testing"),
            ("pytest", "Pytest testing: def test_function(): assert result == expected. Simpler syntax than unittest, powerful fixtures and plugins.", "testing"),
            ("mock", "Mock objects for testing: from unittest.mock import Mock; mock_obj = Mock(); mock_obj.method.return_value = 'test'", "testing"),

            # Performance
            ("optimization", "Optimize Python: Use list comprehensions, avoid global variables, use local variables, profile with cProfile, use appropriate data structures.", "performance"),
            ("memory", "Memory management: Python has automatic garbage collection. Use generators for large datasets, del to remove references, gc module for control.", "performance"),
            ("multiprocessing", "Parallel processing: from multiprocessing import Pool; with Pool() as p: results = p.map(function, data). Bypass GIL for CPU-bound tasks.", "performance"),
            ("threading", "Threading: import threading; thread = threading.Thread(target=function); thread.start(). Good for I/O-bound tasks, limited by GIL for CPU.", "performance"),

            # Best Practices
            ("pep8", "PEP 8 style guide: Use 4 spaces for indentation, lowercase with underscores for functions/variables, CamelCase for classes, max 79 characters per line.", "bestpractices"),
            ("docstring", "Document functions: def my_function(): '''This function does something. Args: param1: Description. Returns: Description.''' Use triple quotes.", "bestpractices"),
            ("virtual environment", "Virtual environments: python -m venv myenv; myenv\\Scripts\\activate (Windows) or source myenv/bin/activate (Linux/Mac). Isolate project dependencies.", "bestpractices"),
            ("pip", "Package manager: pip install package_name, pip list, pip freeze > requirements.txt, pip install -r requirements.txt. Manage Python packages.", "bestpractices"),

            # Network & Socket Programming
            ("socket", "Socket programming: import socket; s = socket.socket(socket.AF_INET, socket.SOCK_STREAM); s.bind(('localhost', 8080)); s.listen(). Create network connections.", "networking"),
            ("socket programming", "Create TCP server: s = socket.socket(); s.bind(('host', port)); s.listen(); conn, addr = s.accept(). Client: s.connect(('host', port)); s.send(data)", "networking"),
            ("tcp socket", "TCP sockets for reliable communication: socket.SOCK_STREAM. Use s.send() and s.recv() for data transfer. Always close connections with s.close()", "networking"),
            ("udp socket", "UDP sockets for fast communication: socket.SOCK_DGRAM. Use s.sendto() and s.recvfrom() for data transfer. No connection establishment needed.", "networking"),
            ("asyncio", "Asynchronous programming: import asyncio; async def main(): await some_function(); asyncio.run(main()). Handle concurrent operations efficiently.", "networking"),

            # Web Frameworks
            ("fastapi", "FastAPI modern web framework: from fastapi import FastAPI; app = FastAPI(); @app.get('/') async def root(): return {'message': 'Hello'}. Auto API docs.", "webframeworks"),
            ("tornado", "Tornado web framework: import tornado.web; class MainHandler(tornado.web.RequestHandler): def get(self): self.write('Hello'). Async and scalable.", "webframeworks"),
            ("bottle", "Bottle micro web framework: from bottle import route, run; @route('/') def hello(): return 'Hello World'; run(host='localhost', port=8080)", "webframeworks"),
            ("cherrypy", "CherryPy web framework: import cherrypy; class HelloWorld: @cherrypy.expose def index(self): return 'Hello World'; cherrypy.quickstart(HelloWorld())", "webframeworks"),
            ("pyramid", "Pyramid web framework: from pyramid.config import Configurator; from pyramid.response import Response. Flexible and scalable web applications.", "webframeworks"),

            # GUI Frameworks
            ("tkinter", "Tkinter GUI: import tkinter as tk; root = tk.Tk(); label = tk.Label(root, text='Hello'); label.pack(); root.mainloop(). Built-in Python GUI.", "gui"),
            ("pyqt", "PyQt GUI framework: from PyQt5.QtWidgets import QApplication, QWidget, QLabel. Professional desktop applications with Qt.", "gui"),
            ("kivy", "Kivy cross-platform GUI: from kivy.app import App; from kivy.uix.label import Label. Mobile and desktop apps with touch support.", "gui"),
            ("wxpython", "wxPython native GUI: import wx; app = wx.App(); frame = wx.Frame(None, title='Hello'); frame.Show(); app.MainLoop(). Native look and feel.", "gui"),
            ("pyside", "PySide Qt binding: from PySide2.QtWidgets import QApplication, QWidget. Official Qt for Python, similar to PyQt but LGPL license.", "gui"),

            # Game Development Frameworks
            ("pygame", "Pygame game development: import pygame; pygame.init(); screen = pygame.display.set_mode((800, 600)). 2D games, sprites, sounds, events.", "gamedev"),
            ("panda3d", "Panda3D 3D game engine: from panda3d.core import *; from direct.showbase.ShowBase import ShowBase. Professional 3D game development.", "gamedev"),
            ("arcade", "Arcade 2D game library: import arcade; class MyGame(arcade.Window): def on_draw(self): arcade.start_render(). Modern 2D game development.", "gamedev"),

            # Scientific Computing Frameworks
            ("scipy", "SciPy scientific computing: from scipy import stats, optimize, integrate. Advanced mathematical functions, statistics, optimization.", "scientific"),
            ("scikit-learn", "Scikit-learn machine learning: from sklearn.model_selection import train_test_split; from sklearn.linear_model import LinearRegression", "scientific"),
            ("tensorflow", "TensorFlow machine learning: import tensorflow as tf; model = tf.keras.Sequential([tf.keras.layers.Dense(10)]). Deep learning framework.", "scientific"),
            ("pytorch", "PyTorch machine learning: import torch; import torch.nn as nn. Dynamic neural networks, research-friendly deep learning framework.", "scientific"),
            ("opencv", "OpenCV computer vision: import cv2; img = cv2.imread('image.jpg'); cv2.imshow('Image', img). Image processing and computer vision.", "scientific"),

            # Testing Frameworks
            ("pytest", "Pytest testing framework: def test_function(): assert result == expected. Fixtures: @pytest.fixture. Parametrize: @pytest.mark.parametrize", "testingframeworks"),
            ("nose", "Nose testing framework: nosetests command runs tests automatically. Extends unittest with plugins and test discovery.", "testingframeworks"),
            ("doctest", "Doctest testing: def add(a, b): '''Add two numbers. >>> add(2, 3) 5 '''. Tests embedded in docstrings.", "testingframeworks"),
            ("tox", "Tox testing tool: tox.ini configuration file. Test across multiple Python versions and environments automatically.", "testingframeworks"),

            # Task Queue & Background Processing
            ("celery", "Celery distributed task queue: from celery import Celery; app = Celery('tasks'); @app.task def add(x, y): return x + y. Background jobs.", "taskqueue"),
            ("rq", "RQ (Redis Queue): from rq import Queue; q = Queue(); job = q.enqueue(function, args). Simple background jobs with Redis.", "taskqueue"),
            ("dramatiq", "Dramatiq task processing: import dramatiq; @dramatiq.actor def send_email(email): pass. Fast and reliable background tasks.", "taskqueue"),

            # ORM & Database Frameworks
            ("sqlalchemy", "SQLAlchemy ORM: from sqlalchemy import create_engine, Column, Integer, String; from sqlalchemy.ext.declarative import declarative_base", "orm"),
            ("django orm", "Django ORM: from django.db import models; class User(models.Model): name = models.CharField(max_length=100). Built-in ORM with migrations.", "orm"),
            ("peewee", "Peewee lightweight ORM: from peewee import *; db = SqliteDatabase('my_app.db'); class User(Model): name = CharField(). Simple and expressive.", "orm"),
            ("tortoise", "Tortoise ORM async: from tortoise.models import Model; from tortoise import fields. Async ORM inspired by Django ORM.", "orm"),

            # API & Microservices Frameworks
            ("starlette", "Starlette ASGI framework: from starlette.applications import Starlette; from starlette.responses import JSONResponse. Lightweight async.", "api"),
            ("falcon", "Falcon API framework: import falcon; class ThingsResource: def on_get(self, req, resp): resp.media = {'message': 'Hello'}. High-performance APIs.", "api"),
            ("connexion", "Connexion API framework: import connexion; app = connexion.App(__name__); app.add_api('swagger.yaml'). OpenAPI/Swagger first.", "api"),
            ("graphene", "Graphene GraphQL: import graphene; class Query(graphene.ObjectType): hello = graphene.String(). GraphQL APIs in Python.", "api"),

            # Data Processing Frameworks
            ("dask", "Dask parallel computing: import dask.dataframe as dd; df = dd.read_csv('large_file.csv'). Parallel computing for larger-than-memory datasets.", "dataprocessing"),
            ("ray", "Ray distributed computing: import ray; @ray.remote def function(): return 1; ray.get(function.remote()). Distributed applications and ML.", "dataprocessing"),
            ("apache airflow", "Airflow workflow management: from airflow import DAG; from airflow.operators.bash_operator import BashOperator. Data pipelines.", "dataprocessing"),
            ("luigi", "Luigi workflow management: import luigi; class MyTask(luigi.Task): def run(self): pass. Build complex pipelines of batch jobs.", "dataprocessing"),

            # Scraping & Automation Frameworks
            ("scrapy", "Scrapy web scraping: import scrapy; class MySpider(scrapy.Spider): name = 'example'; def parse(self, response): yield response.follow()", "scraping"),
            ("beautifulsoup", "BeautifulSoup HTML parsing: from bs4 import BeautifulSoup; soup = BeautifulSoup(html, 'html.parser'); soup.find('div')", "scraping"),
            ("selenium", "Selenium web automation: from selenium import webdriver; driver = webdriver.Chrome(); driver.get('url'); driver.find_element_by_id('id')", "scraping"),
            ("playwright", "Playwright browser automation: from playwright.sync_api import sync_playwright; with sync_playwright() as p: browser = p.chromium.launch()", "scraping"),

            # Configuration & Deployment
            ("click", "Click CLI framework: import click; @click.command() @click.option('--name') def hello(name): click.echo(f'Hello {name}'). Command-line interfaces.", "cli"),
            ("argparse", "Argparse CLI: import argparse; parser = argparse.ArgumentParser(); parser.add_argument('--name'); args = parser.parse_args(). Built-in CLI.", "cli"),
            ("fabric", "Fabric deployment: from fabric import task; @task def deploy(c): c.run('git pull'); c.run('systemctl restart app'). Remote deployment automation.", "deployment"),
            ("ansible", "Ansible automation: YAML playbooks for configuration management. Use ansible-playbook command to run automation tasks.", "deployment"),

            # Image & Media Processing
            ("pillow", "Pillow image processing: from PIL import Image; img = Image.open('photo.jpg'); img.resize((100, 100)); img.save('resized.jpg')", "media"),
            ("moviepy", "MoviePy video editing: from moviepy.editor import VideoFileClip; clip = VideoFileClip('video.mp4'); clip.subclip(0, 10).write_videofile()", "media"),
            ("imageio", "ImageIO image/video I/O: import imageio; img = imageio.imread('image.jpg'); imageio.imwrite('output.jpg', img). Read/write images and videos.", "media"),

            # Cryptography & Security
            ("cryptography", "Cryptography library: from cryptography.fernet import Fernet; key = Fernet.generate_key(); f = Fernet(key); encrypted = f.encrypt(data)", "security"),
            ("hashlib", "Hashlib hashing: import hashlib; hash_object = hashlib.sha256(data.encode()); hex_dig = hash_object.hexdigest(). Built-in hashing.", "security"),
            ("jwt", "JWT tokens: import jwt; token = jwt.encode({'user': 'john'}, 'secret', algorithm='HS256'); decoded = jwt.decode(token, 'secret')", "security"),

            # Email & Communication
            ("smtplib", "SMTP email: import smtplib; server = smtplib.SMTP('smtp.gmail.com', 587); server.send_message(msg). Built-in email sending.", "communication"),
            ("email", "Email handling: from email.mime.text import MIMEText; from email.mime.multipart import MIMEMultipart. Create and parse email messages.", "communication"),
            ("twilio", "Twilio SMS/calls: from twilio.rest import Client; client = Client(account_sid, auth_token); client.messages.create(). SMS and voice APIs.", "communication"),

            # Logging & Monitoring
            ("logging", "Logging framework: import logging; logging.basicConfig(level=logging.INFO); logger = logging.getLogger(__name__); logger.info('message')", "monitoring"),
            ("loguru", "Loguru logging: from loguru import logger; logger.info('message'); logger.add('file.log'). Simple and powerful logging.", "monitoring"),
            ("sentry", "Sentry error tracking: import sentry_sdk; sentry_sdk.init('DSN'); sentry_sdk.capture_exception(exception). Error monitoring and alerting.", "monitoring"),

            # Caching & Performance
            ("redis", "Redis caching: import redis; r = redis.Redis(host='localhost', port=6379); r.set('key', 'value'); value = r.get('key'). In-memory data store.", "caching"),
            ("memcached", "Memcached caching: import memcache; mc = memcache.Client(['127.0.0.1:11211']); mc.set('key', 'value'); value = mc.get('key')", "caching"),
            ("diskcache", "DiskCache persistent cache: import diskcache; cache = diskcache.Cache('/tmp/cache'); cache['key'] = 'value'; value = cache['key']", "caching"),

            # Documentation & Code Quality
            ("sphinx", "Sphinx documentation: sphinx-quickstart to create docs. Use reStructuredText format. Generate HTML, PDF docs from docstrings.", "documentation"),
            ("black", "Black code formatter: black filename.py or black . for directory. Automatic Python code formatting with opinionated style.", "codequality"),
            ("flake8", "Flake8 linting: flake8 filename.py. Check code style, programming errors, complexity. Combines PyFlakes, pycodestyle, McCabe.", "codequality"),
            ("mypy", "MyPy type checking: mypy filename.py. Static type checker for Python. Use type hints: def func(x: int) -> str: return str(x)", "codequality"),

            # Serialization & Data Formats
            ("pickle", "Pickle serialization: import pickle; data = {'key': 'value'}; pickle.dump(data, file); loaded = pickle.load(file). Python object serialization.", "serialization"),
            ("yaml", "YAML processing: import yaml; data = yaml.safe_load(file); yaml.dump(data, file). Human-readable data serialization.", "serialization"),
            ("toml", "TOML processing: import toml; data = toml.load('config.toml'); toml.dump(data, file). Configuration file format.", "serialization"),
            ("msgpack", "MessagePack serialization: import msgpack; packed = msgpack.packb(data); unpacked = msgpack.unpackb(packed). Binary serialization.", "serialization"),

            # HTTP & API Clients
            ("httpx", "HTTPX HTTP client: import httpx; response = httpx.get('url'); async with httpx.AsyncClient() as client: response = await client.get()", "http"),
            ("aiohttp", "aiohttp async HTTP: import aiohttp; async with aiohttp.ClientSession() as session: async with session.get('url') as response:", "http"),
            ("urllib", "urllib HTTP: from urllib.request import urlopen; from urllib.parse import urlencode. Built-in HTTP client and URL utilities.", "http"),

            # Strings
            ("string", "Strings in Python are text data enclosed in quotes. Example: name = 'Hello World'. Use single or double quotes. Strings are immutable.", "strings"),
            ("python string", "Strings are sequences of characters: text = 'Hello'. Common methods: .upper(), .lower(), .strip(), .split(), .replace(). Use f-strings for formatting: f'Hello {name}'.", "strings"),
            ("string methods", "String methods: .upper() (uppercase), .lower() (lowercase), .strip() (remove spaces), .split() (split into list), .replace() (replace text), .find() (find position).", "strings"),
            ("string formatting", "String formatting options: f-strings f'Hello {name}', .format() method 'Hello {}'.format(name), or % formatting 'Hello %s' % name.", "strings"),

            # Print Function
            ("print", "The print() function displays output to the console. Example: print('Hello World'). You can print variables: print(name), multiple items: print('Name:', name).", "print"),
            ("print function", "print() outputs text to screen. Examples: print('Hello'), print(variable), print('Value:', x). Use sep= for separators, end= to change line ending.", "print"),
            ("how to print", "To print in Python use print(): print('Hello World'). Print variables: print(my_variable). Print multiple things: print('Name:', name, 'Age:', age).", "print"),
            ("print multiple", "Print multiple items: print('Name:', name, 'Age:', age). Use sep= to change separator: print(a, b, c, sep='-'). Use end= to change line ending: print('Hello', end=' ').", "print"),

            # Advanced Python Concepts
            ("lambda", "Lambda functions are anonymous functions: lambda x: x*2. Use for short functions: numbers = [1,2,3]; squared = list(map(lambda x: x**2, numbers))", "advanced"),
            ("decorator", "Decorators modify functions: @decorator_name. Example: @property, @staticmethod. Create custom: def my_decorator(func): def wrapper(): print('Before'); func(); print('After'); return wrapper", "advanced"),
            ("generator", "Generators yield values lazily: def count(): i=0; while True: yield i; i+=1. Use yield instead of return. Memory efficient for large datasets.", "advanced"),
            ("comprehension", "List comprehensions: [x*2 for x in range(5)]. Dict comprehensions: {x: x*2 for x in range(5)}. Set comprehensions: {x*2 for x in range(5)}", "advanced"),

            # Data Structures
            ("set", "Sets store unique elements: my_set = {1, 2, 3}. Methods: .add(), .remove(), .union(), .intersection(). Use for removing duplicates: list(set(my_list))", "datastructures"),
            ("tuple", "Tuples are immutable sequences: my_tuple = (1, 2, 3). Access with indexing: my_tuple[0]. Use for fixed data, function returns, dictionary keys.", "datastructures"),
            ("dictionary", "Dictionaries store key-value pairs: my_dict = {'name': 'John', 'age': 30}. Methods: .keys(), .values(), .items(), .get(), .update()", "datastructures"),
            ("list", "Lists are mutable sequences: my_list = [1, 2, 3]. Methods: .append(), .extend(), .insert(), .remove(), .pop(), .sort(), .reverse()", "datastructures"),

            # Control Flow
            ("if statement", "Conditional execution: if condition: do_something elif other_condition: do_other else: do_default. Use comparison operators: ==, !=, <, >, <=, >=", "control"),
            ("for loop", "Iterate over sequences: for item in list: print(item). With range: for i in range(10): print(i). With enumerate: for i, item in enumerate(list)", "control"),
            ("while loop", "Repeat while condition is true: while x < 10: x += 1. Be careful of infinite loops! Use break to exit, continue to skip iteration.", "control"),
            ("break continue", "break exits loop completely. continue skips current iteration. Example: for i in range(10): if i == 5: break; if i % 2 == 0: continue; print(i)", "control"),

            # File Operations
            ("file handling", "Open files with open(): with open('file.txt', 'r') as f: content = f.read(). Modes: 'r' (read), 'w' (write), 'a' (append), 'rb' (binary)", "files"),
            ("read file", "Read files: with open('file.txt', 'r') as f: content = f.read() (all), f.readline() (one line), f.readlines() (list of lines)", "files"),
            ("write file", "Write files: with open('file.txt', 'w') as f: f.write('Hello'). Use 'a' mode to append. Always use 'with' statement for proper file handling.", "files"),
            ("csv file", "Handle CSV files: import csv; with open('file.csv', 'r') as f: reader = csv.reader(f); for row in reader: print(row). Use csv.writer() for writing.", "files"),

            # Exception Handling
            ("try except", "Handle errors: try: risky_code() except SpecificError as e: handle_error() except Exception as e: handle_any_error() finally: cleanup()", "exceptions"),
            ("exception", "Common exceptions: ValueError (wrong value), TypeError (wrong type), IndexError (list index), KeyError (dict key), FileNotFoundError", "exceptions"),
            ("raise exception", "Raise custom exceptions: raise ValueError('Invalid input'). Create custom: class MyError(Exception): pass. Then: raise MyError('Something wrong')", "exceptions"),

            # Object-Oriented Programming
            ("class", "Define classes: class MyClass: def __init__(self, name): self.name = name. Create objects: obj = MyClass('John'). Access attributes: obj.name", "oop"),
            ("inheritance", "Inherit from parent class: class Child(Parent): def __init__(self): super().__init__(). Override methods by redefining them in child class.", "oop"),
            ("method", "Class methods: def my_method(self, param): return param*2. Static methods: @staticmethod def utility(): return 'helper'. Class methods: @classmethod", "oop"),
            ("property", "Use @property decorator: @property def name(self): return self._name. @name.setter def name(self, value): self._name = value. Provides controlled access.", "oop"),
        ]

        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Clear existing patterns and add new ones
        cursor.execute("DELETE FROM patterns")

        for pattern, response, category in training_data:
            cursor.execute(
                "INSERT INTO patterns (pattern, response, category) VALUES (?, ?, ?)",
                (pattern, response, category)
            )

        conn.commit()
        conn.close()

    def similarity(self, a, b):
        """Calculate similarity between two strings"""
        return SequenceMatcher(None, a.lower(), b.lower()).ratio()

    def get_response(self, user_input, style='balanced', original_message=None):
        """Get response for user input with style customization and code checking"""
        # First check if the message contains code
        code_response = self.check_code_and_respond(user_input, style)
        if code_response:
            # Store code checking conversation
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO conversations (input_text, response_text, confidence) VALUES (?, ?, ?)",
                (original_message or user_input, code_response, 1.0)
            )
            conn.commit()
            conn.close()

            return {
                'message': code_response,
                'confidence': 1.0,
                'category': 'code_check',
                'style': style
            }

        # Clean the input for pattern matching
        clean_input = user_input.lower().strip()

        # Remove style prefixes for better pattern matching
        style_prefixes = [
            'please provide a detailed, comprehensive explanation:',
            'please provide a brief, concise answer:',
            'please explain in beginner-friendly terms with simple examples:',
            'please provide a detailed explanation:',
            'please explain simply:'
        ]

        for prefix in style_prefixes:
            if clean_input.startswith(prefix):
                clean_input = clean_input[len(prefix):].strip()
                break

        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Get all patterns
        cursor.execute("SELECT pattern, response, category FROM patterns")
        patterns = cursor.fetchall()

        best_match = None
        best_score = 0

        # Find best matching pattern
        for pattern, response, category in patterns:
            score = 0

            # Check for exact matches first (highest priority)
            if clean_input == pattern:
                score = 1.0
            # Check if pattern is contained in user input
            elif pattern in clean_input:
                # Give higher score for longer, more specific patterns
                score = 0.8 + (len(pattern) / max(len(clean_input), 10)) * 0.2

                # Bonus for exact word matches
                user_words = clean_input.split()
                pattern_words = pattern.split()
                word_matches = sum(1 for word in pattern_words if word in user_words)
                if word_matches == len(pattern_words):
                    score += 0.1

            # Check if user input is contained in pattern
            elif clean_input in pattern:
                score = 0.7
            else:
                # Use similarity matching as fallback
                score = self.similarity(pattern, clean_input)
                # Lower the threshold for similarity matching
                if score < 0.6:
                    score = 0

            if score > best_score and score > 0.3:  # Minimum threshold
                best_score = score
                best_match = (pattern, response, category)

        if best_match:
            base_response = best_match[1]
            styled_response = self.apply_response_style(base_response, style, best_match[2])

            # Store conversation
            cursor.execute(
                "INSERT INTO conversations (input_text, response_text, confidence) VALUES (?, ?, ?)",
                (original_message or user_input, styled_response, best_score)
            )
            conn.commit()
            conn.close()

            return {
                'message': styled_response,
                'confidence': best_score,
                'category': best_match[2],
                'style': style
            }
        else:
            # Default response with style
            default_response = self.get_default_response(style)

            cursor.execute(
                "INSERT INTO conversations (input_text, response_text, confidence) VALUES (?, ?, ?)",
                (original_message or user_input, default_response, 0.1)
            )
            conn.commit()
            conn.close()

            return {
                'message': default_response,
                'confidence': 0.1,
                'category': 'default',
                'style': style
            }

    def apply_response_style(self, base_response, style, category):
        """Apply different response styles to the base response"""
        if style == 'detailed':
            return self.make_detailed_response(base_response, category)
        elif style == 'concise':
            return self.make_concise_response(base_response)
        elif style == 'beginner':
            return self.make_beginner_response(base_response, category)
        else:  # balanced
            return base_response

    def make_detailed_response(self, response, category):
        """Create a detailed version of the response"""
        detailed_additions = {
            'functions': "\n\n**Additional Details:**\n• Functions can have default parameters: def greet(name='World'): return f'Hello {name}'\n• Use *args for variable arguments: def sum_all(*args): return sum(args)\n• Use **kwargs for keyword arguments: def info(**kwargs): print(kwargs)\n• Functions are first-class objects and can be passed as arguments",
            'lists': "\n\n**Advanced List Operations:**\n• List slicing: my_list[1:3] gets elements from index 1 to 2\n• List comprehensions: [x*2 for x in range(5) if x % 2 == 0]\n• Nested lists: matrix = [[1,2], [3,4]]\n• List methods: .count(), .index(), .copy(), .clear()",
            'strings': "\n\n**String Advanced Features:**\n• String slicing: text[1:5] gets substring from index 1 to 4\n• Raw strings: r'C:\\path\\to\\file' (no escape sequences)\n• Multi-line strings: '''Line 1\nLine 2\nLine 3'''\n• String formatting: f'{name:>10}' (right-align in 10 chars)",
            'loops': "\n\n**Loop Advanced Concepts:**\n• Loop with else: for/while loops can have else clause (runs if no break)\n• Nested loops: for i in range(3): for j in range(3): print(i, j)\n• Loop control: break (exit), continue (skip), pass (do nothing)\n• Enumerate: for i, value in enumerate(list) gives index and value",
        }

        addition = detailed_additions.get(category, "\n\n**Pro Tip:** This is a fundamental Python concept. Practice with different examples to master it!")
        return response + addition

    def make_concise_response(self, response):
        """Create a concise version of the response"""
        # Extract the core information (first sentence usually)
        sentences = response.split('. ')
        if len(sentences) > 1:
            # Keep first sentence and any code examples
            core = sentences[0] + '.'
            # Add code examples if they exist
            if ':' in response and any(keyword in response for keyword in ['import', 'def', '=', 'print']):
                code_part = response[response.find(':'):].split('.')[0] + '.'
                return core + ' ' + code_part
            return core
        return response

    def make_beginner_response(self, response, category):
        """Create a beginner-friendly version of the response"""
        beginner_intros = {
            'functions': "🔧 **Functions** are like recipes in cooking - they take ingredients (parameters) and create something (return value). ",
            'lists': "📝 **Lists** are like shopping lists - you can add items, remove items, and check what's in them. ",
            'strings': "📄 **Strings** are just text - like words in a book. You can join them, split them, and change them. ",
            'loops': "🔄 **Loops** are like doing the same task multiple times - like washing dishes one by one. ",
            'variables': "📦 **Variables** are like labeled boxes where you store things for later use. ",
            'dictionaries': "📚 **Dictionaries** are like phone books - you look up a name (key) to find a number (value). ",
        }

        intro = beginner_intros.get(category, "🐍 **Python Concept:** ")

        # Add beginner-friendly explanation
        beginner_suffix = "\n\n💡 **Remember:** Start simple and practice! Every expert was once a beginner. Try typing this code in Python to see how it works."

        return intro + response + beginner_suffix

    def detect_code_in_message(self, message):
        """Detect if message contains Python code"""
        code_indicators = [
            'def ', 'class ', 'import ', 'from ', 'print(', 'if ', 'for ', 'while ',
            'try:', 'except:', '=', '==', '!=', '+=', '-=', 'return ', 'yield ',
            '[', ']', '{', '}', '()', 'lambda ', 'with ', 'as ', 'in ', 'not ',
            'and ', 'or ', 'True', 'False', 'None'
        ]

        # Check for code blocks (triple backticks)
        if '```' in message:
            return True

        # Check for multiple code indicators
        indicator_count = sum(1 for indicator in code_indicators if indicator in message)

        # If message has multiple code indicators, likely contains code
        return indicator_count >= 3

    def extract_code_from_message(self, message):
        """Extract Python code from message"""
        # Look for code blocks first
        code_block_pattern = r'```(?:python)?\s*(.*?)\s*```'
        code_blocks = re.findall(code_block_pattern, message, re.DOTALL)

        if code_blocks:
            return '\n'.join(code_blocks)

        # If no code blocks, try to extract code-like content
        lines = message.split('\n')
        code_lines = []

        for line in lines:
            line_stripped = line.strip()
            # Look for lines that look like Python code
            if (line_stripped.startswith(('def ', 'class ', 'import ', 'from ', 'if ', 'for ', 'while ', 'try:', 'print(')) or
                '=' in line_stripped or 'return ' in line_stripped):
                code_lines.append(line_stripped)

        return '\n'.join(code_lines) if code_lines else None

    def check_code_and_respond(self, message, style):
        """Check if message contains code and provide error checking"""
        code = self.extract_code_from_message(message)

        if not code:
            return None

        # Perform syntax check
        syntax_result = self.error_checker.check_syntax(code)

        # Perform code analysis
        analysis_result = self.error_checker.analyze_code(code)

        # Try to execute code safely
        execution_result = self.error_checker.safe_execute(code)

        # Build response based on results
        response_parts = []

        if syntax_result['valid']:
            response_parts.append("✅ **Code Syntax Check: PASSED**")

            if execution_result['success']:
                response_parts.append("✅ **Code Execution: SUCCESS**")
                if execution_result['output']:
                    response_parts.append(f"**Output:**\n```\n{execution_result['output']}\n```")
            else:
                response_parts.append("❌ **Code Execution: FAILED**")
                response_parts.append(f"**Error:** {execution_result['error']}")
                response_parts.append(f"**Suggestion:** {execution_result['suggestion']}")
        else:
            response_parts.append("❌ **Code Syntax Check: FAILED**")
            response_parts.append(f"**Error:** {syntax_result['message']}")
            if 'line' in syntax_result:
                response_parts.append(f"**Line:** {syntax_result['line']}")
            response_parts.append(f"**Suggestion:** {syntax_result['suggestion']}")

        # Add code analysis
        if analysis_result['issues']:
            response_parts.append("⚠️ **Issues Found:**")
            for issue in analysis_result['issues']:
                response_parts.append(f"• {issue}")

        if analysis_result['suggestions']:
            response_parts.append("💡 **Suggestions:**")
            for suggestion in analysis_result['suggestions']:
                response_parts.append(f"• {suggestion}")

        response_parts.append(f"**Code Complexity:** {analysis_result['complexity']}")

        # Style-specific additions
        if style == 'beginner':
            response_parts.insert(0, "🔍 **Code Analysis Results:**")
            response_parts.append("\n💡 **Learning Tip:** Code checking helps you write better Python! Keep practicing and learning from errors.")
        elif style == 'detailed':
            response_parts.append("\n**Code Quality Tips:**")
            response_parts.append("• Follow PEP 8 style guidelines")
            response_parts.append("• Use meaningful variable names")
            response_parts.append("• Add comments for complex logic")
            response_parts.append("• Handle exceptions appropriately")

        return '\n'.join(response_parts)

    def get_default_response(self, style):
        """Get default response based on style"""
        if style == 'detailed':
            return "I'm here to provide comprehensive help with Python programming! I can explain topics in detail including: data structures (lists, dictionaries, sets, tuples), control flow (loops, conditionals), functions, classes, modules, error handling, file operations, and popular frameworks. I can also check your Python code for errors! What specific Python topic would you like to explore in depth?"
        elif style == 'concise':
            return "Ask me about Python: lists, functions, loops, variables, classes, modules, frameworks, or send code for error checking."
        elif style == 'beginner':
            return "🐍 Hi! I'm here to help you learn Python step-by-step! I can explain Python concepts in simple terms with easy examples. I can also check your Python code for errors and help you fix them! Try asking about: 'What is a variable?', 'How do lists work?', or 'What is a function?' - I'll explain everything clearly!"
        else:  # balanced
            return "I'm here to help with Python programming! Try asking about strings, print(), lists, functions, loops, variables, frameworks, or send me Python code to check for errors."

# Initialize chatbot
chatbot = SmartChatBot()
print("✅ PyBot Smart Chatbot initialized successfully!")

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat requests with response style support"""
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        style = data.get('style', 'balanced')
        original_message = data.get('original_message', message)

        if not message:
            return jsonify({'error': 'No message provided'}), 400

        # Get response from chatbot with style
        response = chatbot.get_response(message, style=style, original_message=original_message)

        return jsonify({
            'message': response['message'],
            'confidence': response['confidence'],
            'category': response.get('category', 'general'),
            'style': response.get('style', style)
        })

    except Exception as e:
        print(f"Chat error: {e}")
        return jsonify({
            'message': 'Sorry, I encountered an error. Please try rephrasing your question about Python programming.',
            'confidence': 0.1,
            'category': 'error',
            'style': 'balanced'
        }), 500

@app.route('/api/status', methods=['GET'])
def status():
    """Check chatbot status"""
    return jsonify({
        'status': 'online',
        'chatbot_available': True,
        'backend_type': 'Smart Pattern Matching',
        'database': 'SQLite Local Storage'
    })

@app.route('/api/stats', methods=['GET'])
def stats():
    """Get chatbot statistics"""
    try:
        conn = sqlite3.connect(chatbot.db_path)
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM conversations")
        total_conversations = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM patterns")
        total_patterns = cursor.fetchone()[0]

        cursor.execute("SELECT category, COUNT(*) FROM patterns GROUP BY category")
        categories = dict(cursor.fetchall())

        conn.close()

        return jsonify({
            'total_conversations': total_conversations,
            'total_patterns': total_patterns,
            'categories': categories
        })

    except Exception as e:
        return jsonify({'error': f'Stats failed: {e}'}), 500

@app.route('/api/train', methods=['POST'])
def train():
    """Add new training pattern"""
    try:
        data = request.get_json()
        pattern = data.get('pattern', '').strip()
        response = data.get('response', '').strip()
        category = data.get('category', 'custom')

        if not pattern or not response:
            return jsonify({'error': 'Pattern and response are required'}), 400

        conn = sqlite3.connect(chatbot.db_path)
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO patterns (pattern, response, category) VALUES (?, ?, ?)",
            (pattern, response, category)
        )

        conn.commit()
        conn.close()

        return jsonify({'message': 'Training pattern added successfully'})

    except Exception as e:
        return jsonify({'error': f'Training failed: {e}'}), 500

if __name__ == '__main__':
    print("🚀 Starting PyHub Smart Chatbot Backend...")
    print("🤖 Smart Pattern Matching Chatbot ready!")
    print("💾 Using SQLite database for learning")
    print("🌐 Starting server on http://localhost:5000")
    print("✅ Compatible with Python 3.13+")
    print("\n📋 Available endpoints:")
    print("  POST /api/chat - Send messages to chatbot")
    print("  GET  /api/status - Check chatbot status")
    print("  GET  /api/stats - View chatbot statistics")
    print("  POST /api/train - Add new training patterns")
    print("\n🎯 Ready to help with Python programming!")

    # Start Flask server
    app.run(host='0.0.0.0', port=5000, debug=True)
