// Comprehensive Python Frameworks and Libraries Database
const pythonFrameworks = [
    // Web Development Frameworks
    {
        name: "Django",
        category: "web",
        description: "A high-level Python web framework that encourages rapid development and clean, pragmatic design. Perfect for complex web applications.",
        icon: "fab fa-python",
        color: "text-green-500",
        functions: ["URL Routing", "ORM", "Admin Interface", "Authentication", "Templates", "Forms", "Security"],
        website: "https://www.djangoproject.com/",
        installation: "pip install Django",
        difficulty: "intermediate",
        popularity: 95
    },
    {
        name: "Flask",
        category: "web",
        description: "A lightweight WSGI web application framework designed to make getting started quick and easy, with the ability to scale up to complex applications.",
        icon: "fab fa-python",
        color: "text-blue-500",
        functions: ["Routing", "Templates", "Development Server", "Debugger", "Request Handling", "Session Management"],
        website: "https://flask.palletsprojects.com/",
        installation: "pip install Flask",
        difficulty: "beginner",
        popularity: 92
    },
    {
        name: "FastAPI",
        category: "web",
        description: "A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.",
        icon: "fas fa-bolt",
        color: "text-yellow-500",
        functions: ["Async Support", "Auto API Documentation", "Type Checking", "High Performance", "OAuth2", "JWT"],
        website: "https://fastapi.tiangolo.com/",
        installation: "pip install fastapi uvicorn",
        difficulty: "intermediate",
        popularity: 88
    },
    {
        name: "Pyramid",
        category: "web",
        description: "A flexible, lightweight web framework that can be used for both small and large applications with a minimalist approach.",
        icon: "fas fa-mountain",
        color: "text-purple-500",
        functions: ["Flexible Routing", "Security", "Templating", "Database Integration", "Configuration"],
        website: "https://trypyramid.com/",
        installation: "pip install pyramid",
        difficulty: "intermediate",
        popularity: 70
    },
    {
        name: "Tornado",
        category: "web",
        description: "A Python web framework and asynchronous networking library, originally developed at FriendFeed for handling thousands of simultaneous connections.",
        icon: "fas fa-wind",
        color: "text-red-500",
        functions: ["Async I/O", "WebSockets", "Non-blocking", "Real-time", "HTTP Client"],
        website: "https://www.tornadoweb.org/",
        installation: "pip install tornado",
        difficulty: "advanced",
        popularity: 75
    },
    {
        name: "Sanic",
        category: "web",
        description: "A Python 3.7+ web server and web framework that's written to go fast. It allows the usage of async/await syntax.",
        icon: "fas fa-rocket",
        color: "text-indigo-500",
        functions: ["Async HTTP", "WebSockets", "High Performance", "Easy to Use", "Middleware"],
        website: "https://sanicframework.org/",
        installation: "pip install sanic",
        difficulty: "intermediate",
        popularity: 82
    },
    {
        name: "Starlette",
        category: "web",
        description: "A lightweight ASGI framework/toolkit, which is ideal for building async web services in Python.",
        icon: "fas fa-star",
        color: "text-yellow-400",
        functions: ["ASGI", "WebSockets", "Background Tasks", "Testing", "Static Files"],
        website: "https://www.starlette.io/",
        installation: "pip install starlette",
        difficulty: "intermediate",
        popularity: 78
    },

    // Data Science & Analytics
    {
        name: "Pandas",
        category: "data",
        description: "A fast, powerful, flexible and easy to use open source data analysis and manipulation tool, built on top of NumPy.",
        icon: "fas fa-table",
        color: "text-purple-500",
        functions: ["DataFrame", "Series", "Data Analysis", "Data Cleaning", "CSV/Excel I/O", "Grouping"],
        website: "https://pandas.pydata.org/",
        installation: "pip install pandas",
        difficulty: "beginner",
        popularity: 98
    },
    {
        name: "NumPy",
        category: "data",
        description: "The fundamental package for scientific computing with Python, providing support for large, multi-dimensional arrays and matrices.",
        icon: "fas fa-calculator",
        color: "text-blue-500",
        functions: ["Array Operations", "Linear Algebra", "Random Numbers", "Mathematical Functions", "Broadcasting"],
        website: "https://numpy.org/",
        installation: "pip install numpy",
        difficulty: "beginner",
        popularity: 97
    },
    {
        name: "SciPy",
        category: "data",
        description: "A library for scientific and technical computing, built on top of NumPy, providing algorithms for optimization, integration, and statistics.",
        icon: "fas fa-flask",
        color: "text-green-500",
        functions: ["Optimization", "Signal Processing", "Statistics", "Image Processing", "Integration"],
        website: "https://scipy.org/",
        installation: "pip install scipy",
        difficulty: "intermediate",
        popularity: 90
    },
    {
        name: "Matplotlib",
        category: "data",
        description: "A comprehensive library for creating static, animated, and interactive visualizations in Python.",
        icon: "fas fa-chart-line",
        color: "text-orange-500",
        functions: ["2D Plotting", "3D Plotting", "Animation", "Customization", "Publication Quality"],
        website: "https://matplotlib.org/",
        installation: "pip install matplotlib",
        difficulty: "beginner",
        popularity: 95
    },
    {
        name: "Seaborn",
        category: "data",
        description: "A statistical data visualization library based on matplotlib, providing a high-level interface for drawing attractive statistical graphics.",
        icon: "fas fa-chart-bar",
        color: "text-pink-500",
        functions: ["Statistical Plots", "Color Palettes", "Data Visualization", "Style Settings", "Regression Plots"],
        website: "https://seaborn.pydata.org/",
        installation: "pip install seaborn",
        difficulty: "beginner",
        popularity: 88
    },
    {
        name: "Plotly",
        category: "data",
        description: "An interactive, open-source plotting library that supports over 40 unique chart types covering a wide range of statistical, financial, geographic, scientific, and 3-dimensional use-cases.",
        icon: "fas fa-chart-pie",
        color: "text-blue-400",
        functions: ["Interactive Plots", "Dashboards", "3D Visualization", "Web Integration", "Real-time Updates"],
        website: "https://plotly.com/python/",
        installation: "pip install plotly",
        difficulty: "intermediate",
        popularity: 85
    },
    {
        name: "Jupyter",
        category: "data",
        description: "An open-source web application that allows you to create and share documents that contain live code, equations, visualizations and narrative text.",
        icon: "fas fa-book-open",
        color: "text-orange-400",
        functions: ["Interactive Notebooks", "Data Visualization", "Code Sharing", "Markdown Support", "Multiple Kernels"],
        website: "https://jupyter.org/",
        installation: "pip install jupyter",
        difficulty: "beginner",
        popularity: 93
    },

    // Machine Learning & AI
    {
        name: "TensorFlow",
        category: "ai",
        description: "An open-source software library for machine learning and artificial intelligence, developed by Google Brain team.",
        icon: "fas fa-brain",
        color: "text-orange-500",
        functions: ["Neural Networks", "Deep Learning", "Model Training", "Inference", "GPU Support", "TensorBoard"],
        website: "https://www.tensorflow.org/",
        installation: "pip install tensorflow",
        difficulty: "advanced",
        popularity: 94
    },
    {
        name: "PyTorch",
        category: "ai",
        description: "An open source machine learning framework that accelerates the path from research prototyping to production deployment.",
        icon: "fas fa-fire",
        color: "text-red-500",
        functions: ["Dynamic Computation", "GPU Acceleration", "Neural Networks", "Research Tools", "TorchScript"],
        website: "https://pytorch.org/",
        installation: "pip install torch",
        difficulty: "advanced",
        popularity: 92
    },
    {
        name: "scikit-learn",
        category: "ai",
        description: "A machine learning library featuring various classification, regression and clustering algorithms built on NumPy, SciPy, and matplotlib.",
        icon: "fas fa-robot",
        color: "text-blue-500",
        functions: ["Classification", "Regression", "Clustering", "Model Selection", "Preprocessing", "Metrics"],
        website: "https://scikit-learn.org/",
        installation: "pip install scikit-learn",
        difficulty: "intermediate",
        popularity: 96
    },
    {
        name: "Keras",
        category: "ai",
        description: "A high-level neural networks API, written in Python and capable of running on top of TensorFlow, CNTK, or Theano.",
        icon: "fas fa-layer-group",
        color: "text-green-500",
        functions: ["Neural Networks", "Model Building", "Training", "Evaluation", "Transfer Learning"],
        website: "https://keras.io/",
        installation: "pip install keras",
        difficulty: "intermediate",
        popularity: 89
    },
    {
        name: "Transformers",
        category: "ai",
        description: "State-of-the-art Natural Language Processing library by Hugging Face, providing thousands of pretrained models.",
        icon: "fas fa-language",
        color: "text-yellow-500",
        functions: ["Transformers", "NLP Models", "Text Generation", "Model Hub", "Fine-tuning", "Tokenization"],
        website: "https://huggingface.co/transformers/",
        installation: "pip install transformers",
        difficulty: "advanced",
        popularity: 87
    },
    {
        name: "OpenCV",
        category: "ai",
        description: "An open source computer vision and machine learning software library with over 2500 optimized algorithms.",
        icon: "fas fa-eye",
        color: "text-blue-600",
        functions: ["Image Processing", "Video Analysis", "Object Detection", "Face Recognition", "Feature Detection"],
        website: "https://opencv.org/",
        installation: "pip install opencv-python",
        difficulty: "intermediate",
        popularity: 91
    },
    {
        name: "NLTK",
        category: "ai",
        description: "A leading platform for building Python programs to work with human language data, providing easy-to-use interfaces to over 50 corpora and lexical resources.",
        icon: "fas fa-comments",
        color: "text-green-600",
        functions: ["Text Processing", "Tokenization", "Part-of-Speech Tagging", "Named Entity Recognition", "Sentiment Analysis"],
        website: "https://www.nltk.org/",
        installation: "pip install nltk",
        difficulty: "intermediate",
        popularity: 84
    },
    {
        name: "spaCy",
        category: "ai",
        description: "An industrial-strength Natural Language Processing library in Python and Cython, designed for production use.",
        icon: "fas fa-language",
        color: "text-blue-700",
        functions: ["NLP Pipeline", "Named Entity Recognition", "Dependency Parsing", "Word Vectors", "Text Classification"],
        website: "https://spacy.io/",
        installation: "pip install spacy",
        difficulty: "intermediate",
        popularity: 86
    },

    // Testing & Development Tools
    {
        name: "pytest",
        category: "dev",
        description: "A framework that makes building simple and scalable tests easy. It supports complex functional testing for applications and libraries.",
        icon: "fas fa-vial",
        color: "text-green-500",
        functions: ["Test Discovery", "Fixtures", "Parameterization", "Plugins", "Assertions", "Coverage"],
        website: "https://docs.pytest.org/",
        installation: "pip install pytest",
        difficulty: "beginner",
        popularity: 93
    },
    {
        name: "Selenium",
        category: "dev",
        description: "A powerful tool for controlling web browsers through programs and performing browser automation for testing web applications.",
        icon: "fas fa-spider",
        color: "text-green-500",
        functions: ["Browser Automation", "Web Testing", "Scraping", "Cross-browser Testing", "UI Testing"],
        website: "https://selenium-python.readthedocs.io/",
        installation: "pip install selenium",
        difficulty: "intermediate",
        popularity: 89
    },
    {
        name: "Black",
        category: "dev",
        description: "The uncompromising Python code formatter that reformats entire files in place to make your code more readable and consistent.",
        icon: "fas fa-code",
        color: "text-gray-500",
        functions: ["Code Formatting", "Style Enforcement", "Automation", "Consistency", "Integration"],
        website: "https://black.readthedocs.io/",
        installation: "pip install black",
        difficulty: "beginner",
        popularity: 87
    },
    {
        name: "Flake8",
        category: "dev",
        description: "A tool for checking Python code against style guide enforcement, programming errors, and complexity metrics.",
        icon: "fas fa-check-circle",
        color: "text-blue-500",
        functions: ["Style Checking", "Error Detection", "Code Quality", "Linting", "Plugin System"],
        website: "https://flake8.pycqa.org/",
        installation: "pip install flake8",
        difficulty: "beginner",
        popularity: 85
    },
    {
        name: "mypy",
        category: "dev",
        description: "An optional static type checker for Python that aims to combine the benefits of dynamic and static typing.",
        icon: "fas fa-shield-alt",
        color: "text-purple-500",
        functions: ["Type Checking", "Static Analysis", "Type Hints", "Error Prevention", "IDE Integration"],
        website: "https://mypy.readthedocs.io/",
        installation: "pip install mypy",
        difficulty: "intermediate",
        popularity: 82
    },
    {
        name: "Poetry",
        category: "dev",
        description: "A tool for dependency management and packaging in Python, making it easy to manage project dependencies and virtual environments.",
        icon: "fas fa-feather-alt",
        color: "text-indigo-500",
        functions: ["Dependency Management", "Virtual Environments", "Package Building", "Publishing", "Lock Files"],
        website: "https://python-poetry.org/",
        installation: "curl -sSL https://install.python-poetry.org | python3 -",
        difficulty: "intermediate",
        popularity: 88
    },

    // Database & ORM
    {
        name: "SQLAlchemy",
        category: "db",
        description: "The Database Toolkit for Python, providing a full suite of well known enterprise-level persistence patterns.",
        icon: "fas fa-database",
        color: "text-blue-500",
        functions: ["ORM", "SQL Expression", "Connection Pooling", "Schema Management", "Query Building"],
        website: "https://www.sqlalchemy.org/",
        installation: "pip install sqlalchemy",
        difficulty: "intermediate",
        popularity: 91
    },
    {
        name: "PyMongo",
        category: "db",
        description: "The official Python driver for MongoDB, providing tools for interacting with MongoDB databases.",
        icon: "fas fa-leaf",
        color: "text-green-500",
        functions: ["Document Storage", "Indexing", "Aggregation", "GridFS", "Async Support"],
        website: "https://pymongo.readthedocs.io/",
        installation: "pip install pymongo",
        difficulty: "beginner",
        popularity: 86
    },
    {
        name: "redis-py",
        category: "db",
        description: "A Python client for Redis, an in-memory data structure store used as database, cache, and message broker.",
        icon: "fas fa-memory",
        color: "text-red-500",
        functions: ["Caching", "Pub/Sub", "Data Structures", "Persistence", "Clustering"],
        website: "https://redis-py.readthedocs.io/",
        installation: "pip install redis",
        difficulty: "beginner",
        popularity: 88
    },
    {
        name: "Peewee",
        category: "db",
        description: "A simple and small ORM with few dependencies, supporting SQLite, MySQL, and PostgreSQL databases.",
        icon: "fas fa-feather",
        color: "text-green-400",
        functions: ["Lightweight ORM", "Multiple DBs", "Simple API", "Migrations", "Query Builder"],
        website: "http://docs.peewee-orm.com/",
        installation: "pip install peewee",
        difficulty: "beginner",
        popularity: 78
    },
    {
        name: "SQLModel",
        category: "db",
        description: "A library for interacting with SQL databases from Python code, with Python objects, designed by the creator of FastAPI.",
        icon: "fas fa-database",
        color: "text-purple-600",
        functions: ["SQL ORM", "Type Hints", "Pydantic Integration", "FastAPI Compatible", "Auto-completion"],
        website: "https://sqlmodel.tiangolo.com/",
        installation: "pip install sqlmodel",
        difficulty: "intermediate",
        popularity: 83
    },

    // Networking & Web Scraping
    {
        name: "Requests",
        category: "net",
        description: "A simple, yet elegant HTTP library for Python, built for human beings. It makes HTTP requests simple and intuitive.",
        icon: "fas fa-globe",
        color: "text-blue-500",
        functions: ["HTTP Methods", "Session Handling", "Authentication", "File Uploads", "JSON Support"],
        website: "https://requests.readthedocs.io/",
        installation: "pip install requests",
        difficulty: "beginner",
        popularity: 98
    },
    {
        name: "aiohttp",
        category: "net",
        description: "An async HTTP client/server framework for asyncio and Python, supporting both client and server side of HTTP protocol.",
        icon: "fas fa-bolt",
        color: "text-yellow-500",
        functions: ["Async HTTP", "WebSockets", "Server", "Client", "Middleware"],
        website: "https://docs.aiohttp.org/",
        installation: "pip install aiohttp",
        difficulty: "intermediate",
        popularity: 85
    },
    {
        name: "Scrapy",
        category: "net",
        description: "A fast high-level web crawling and web scraping framework, used to crawl websites and extract structured data.",
        icon: "fas fa-spider",
        color: "text-orange-500",
        functions: ["Web Scraping", "Crawling", "Data Extraction", "Pipeline", "Middleware"],
        website: "https://scrapy.org/",
        installation: "pip install scrapy",
        difficulty: "intermediate",
        popularity: 87
    },
    {
        name: "BeautifulSoup",
        category: "net",
        description: "A library for pulling data out of HTML and XML files, providing Pythonic ways of navigating, searching, and modifying parse trees.",
        icon: "fas fa-code",
        color: "text-green-600",
        functions: ["HTML Parsing", "XML Parsing", "Web Scraping", "Tree Navigation", "Search"],
        website: "https://www.crummy.com/software/BeautifulSoup/",
        installation: "pip install beautifulsoup4",
        difficulty: "beginner",
        popularity: 92
    },
    {
        name: "httpx",
        category: "net",
        description: "A fully featured HTTP client for Python 3, which provides sync and async APIs, and support for both HTTP/1.1 and HTTP/2.",
        icon: "fas fa-exchange-alt",
        color: "text-blue-600",
        functions: ["HTTP/2 Support", "Async Support", "Connection Pooling", "Authentication", "Streaming"],
        website: "https://www.python-httpx.org/",
        installation: "pip install httpx",
        difficulty: "intermediate",
        popularity: 81
    },
    {
        name: "Twisted",
        category: "net",
        description: "An event-driven networking engine written in Python, supporting many protocols including HTTP, SMTP, POP3, IMAP, SSH, IRC, and FTP.",
        icon: "fas fa-network-wired",
        color: "text-purple-500",
        functions: ["Event Loop", "Protocols", "Deferreds", "Reactor", "Networking"],
        website: "https://twistedmatrix.com/",
        installation: "pip install twisted",
        difficulty: "advanced",
        popularity: 76
    },

    // GUI Development
    {
        name: "Tkinter",
        category: "gui",
        description: "Python's standard GUI toolkit, providing a simple way to create GUI applications. It's included with Python by default.",
        icon: "fas fa-window-restore",
        color: "text-green-500",
        functions: ["Basic GUI", "Widgets", "Event Handling", "Layout Management", "Canvas"],
        website: "https://docs.python.org/3/library/tkinter.html",
        installation: "Built-in with Python",
        difficulty: "beginner",
        popularity: 85
    },
    {
        name: "PyQt5/PyQt6",
        category: "gui",
        description: "A set of Python bindings for Qt libraries, providing tools for creating desktop applications with native look and feel.",
        icon: "fas fa-window-maximize",
        color: "text-blue-500",
        functions: ["Native GUI", "Widgets", "Signals/Slots", "Designer", "Threading"],
        website: "https://www.riverbankcomputing.com/software/pyqt/",
        installation: "pip install PyQt5 or pip install PyQt6",
        difficulty: "intermediate",
        popularity: 88
    },
    {
        name: "Kivy",
        category: "gui",
        description: "An open source Python library for developing multitouch applications. It's cross-platform and released under the MIT license.",
        icon: "fas fa-mobile-alt",
        color: "text-orange-500",
        functions: ["Cross-platform", "Touch Support", "Custom Widgets", "Animation", "Graphics"],
        website: "https://kivy.org/",
        installation: "pip install kivy",
        difficulty: "intermediate",
        popularity: 82
    },
    {
        name: "PySide2/PySide6",
        category: "gui",
        description: "The official Python bindings for Qt, providing access to Qt APIs for creating desktop applications.",
        icon: "fas fa-desktop",
        color: "text-indigo-500",
        functions: ["Qt Integration", "Cross-platform", "Widgets", "Multimedia", "Web Engine"],
        website: "https://pyside.org/",
        installation: "pip install PySide6",
        difficulty: "intermediate",
        popularity: 84
    },
    {
        name: "wxPython",
        category: "gui",
        description: "A cross-platform GUI toolkit for Python, providing native look and feel on different platforms.",
        icon: "fas fa-window-close",
        color: "text-red-600",
        functions: ["Native Look", "Cross-platform", "Rich Widgets", "Graphics", "Printing"],
        website: "https://www.wxpython.org/",
        installation: "pip install wxpython",
        difficulty: "intermediate",
        popularity: 75
    },
    {
        name: "Dear PyGui",
        category: "gui",
        description: "A simple to use (but powerful) Python GUI framework. DearPyGui provides a wrapping of Dear ImGui.",
        icon: "fas fa-magic",
        color: "text-purple-600",
        functions: ["Immediate Mode", "Fast Rendering", "Built-in Themes", "Plotting", "Node Editor"],
        website: "https://dearpygui.readthedocs.io/",
        installation: "pip install dearpygui",
        difficulty: "beginner",
        popularity: 79
    },

    // Game Development
    {
        name: "Pygame",
        category: "game",
        description: "A set of Python modules designed for writing video games. It includes graphics and sound libraries built on top of SDL.",
        icon: "fas fa-gamepad",
        color: "text-purple-500",
        functions: ["Graphics", "Sound", "Input Handling", "Sprites", "Collision Detection"],
        website: "https://www.pygame.org/",
        installation: "pip install pygame",
        difficulty: "beginner",
        popularity: 89
    },
    {
        name: "Arcade",
        category: "game",
        description: "A modern Python framework for crafting games with compelling graphics and sound, designed to be easy to learn and use.",
        icon: "fas fa-dice",
        color: "text-red-500",
        functions: ["2D Graphics", "Physics", "Sound", "Sprites", "Animation"],
        website: "https://arcade.academy/",
        installation: "pip install arcade",
        difficulty: "beginner",
        popularity: 82
    },
    {
        name: "Panda3D",
        category: "game",
        description: "A 3D engine developed by Disney and Carnegie Mellon University for creating games, simulations, and other interactive applications.",
        icon: "fas fa-cube",
        color: "text-green-600",
        functions: ["3D Graphics", "Physics", "Audio", "Networking", "Scene Graph"],
        website: "https://www.panda3d.org/",
        installation: "pip install panda3d",
        difficulty: "advanced",
        popularity: 76
    },
    {
        name: "Pyglet",
        category: "game",
        description: "A cross-platform windowing and multimedia library for Python, intended for developing games and other visually rich applications.",
        icon: "fas fa-play-circle",
        color: "text-blue-600",
        functions: ["OpenGL", "Audio", "Windowing", "Images", "Text Rendering"],
        website: "https://pyglet.org/",
        installation: "pip install pyglet",
        difficulty: "intermediate",
        popularity: 78
    },

    // Security & Cryptography
    {
        name: "cryptography",
        category: "security",
        description: "A package which provides cryptographic recipes and primitives to Python developers, including both high and low level interfaces.",
        icon: "fas fa-lock",
        color: "text-blue-500",
        functions: ["Encryption", "Hashing", "Digital Signatures", "Key Management", "X.509"],
        website: "https://cryptography.io/",
        installation: "pip install cryptography",
        difficulty: "intermediate",
        popularity: 91
    },
    {
        name: "PyJWT",
        category: "security",
        description: "A Python library which allows you to encode and decode JSON Web Tokens (JWT) for secure information transmission.",
        icon: "fas fa-key",
        color: "text-yellow-500",
        functions: ["JWT Encoding", "JWT Decoding", "Token Validation", "Claims", "Algorithms"],
        website: "https://pyjwt.readthedocs.io/",
        installation: "pip install PyJWT",
        difficulty: "beginner",
        popularity: 87
    },
    {
        name: "bcrypt",
        category: "security",
        description: "A library for hashing passwords using the bcrypt hashing function, providing protection against rainbow table attacks.",
        icon: "fas fa-shield-alt",
        color: "text-green-600",
        functions: ["Password Hashing", "Salt Generation", "Hash Verification", "Security", "Authentication"],
        website: "https://github.com/pyca/bcrypt/",
        installation: "pip install bcrypt",
        difficulty: "beginner",
        popularity: 85
    },
    {
        name: "passlib",
        category: "security",
        description: "A password hashing library for Python which provides cross-platform implementations of over 30 password hashing algorithms.",
        icon: "fas fa-user-lock",
        color: "text-purple-600",
        functions: ["Multiple Hash Algorithms", "Password Verification", "Context Management", "Migration", "Security"],
        website: "https://passlib.readthedocs.io/",
        installation: "pip install passlib",
        difficulty: "intermediate",
        popularity: 82
    },

    // Image Processing
    {
        name: "Pillow (PIL)",
        category: "image",
        description: "The Python Imaging Library adds image processing capabilities to your Python interpreter, supporting many file formats.",
        icon: "fas fa-image",
        color: "text-pink-500",
        functions: ["Image Processing", "Format Conversion", "Filters", "Drawing", "Text Rendering"],
        website: "https://pillow.readthedocs.io/",
        installation: "pip install Pillow",
        difficulty: "beginner",
        popularity: 94
    },
    {
        name: "scikit-image",
        category: "image",
        description: "A collection of algorithms for image processing in Python, built on top of SciPy and providing a gentle introduction to image processing.",
        icon: "fas fa-camera",
        color: "text-blue-600",
        functions: ["Image Processing", "Segmentation", "Feature Detection", "Filters", "Morphology"],
        website: "https://scikit-image.org/",
        installation: "pip install scikit-image",
        difficulty: "intermediate",
        popularity: 86
    },
    {
        name: "Wand",
        category: "image",
        description: "A ctypes-based simple ImageMagick binding for Python, providing a Pythonic interface to ImageMagick functionality.",
        icon: "fas fa-magic",
        color: "text-purple-500",
        functions: ["ImageMagick Binding", "Image Manipulation", "Format Conversion", "Effects", "Drawing"],
        website: "https://docs.wand-py.org/",
        installation: "pip install Wand",
        difficulty: "intermediate",
        popularity: 78
    },

    // Audio Processing
    {
        name: "librosa",
        category: "audio",
        description: "A python package for music and audio analysis, providing the building blocks necessary to create music information retrieval systems.",
        icon: "fas fa-music",
        color: "text-green-500",
        functions: ["Audio Analysis", "Feature Extraction", "Spectral Analysis", "Rhythm", "Pitch Detection"],
        website: "https://librosa.org/",
        installation: "pip install librosa",
        difficulty: "intermediate",
        popularity: 84
    },
    {
        name: "PyAudio",
        category: "audio",
        description: "Python bindings for PortAudio, providing easy access to audio I/O functionality across different platforms.",
        icon: "fas fa-microphone",
        color: "text-red-500",
        functions: ["Audio Recording", "Audio Playback", "Real-time Audio", "Cross-platform", "Streaming"],
        website: "https://people.csail.mit.edu/hubert/pyaudio/",
        installation: "pip install pyaudio",
        difficulty: "beginner",
        popularity: 81
    },
    {
        name: "pydub",
        category: "audio",
        description: "A simple and easy-to-use library for audio manipulation in Python, making it easy to work with audio files.",
        icon: "fas fa-volume-up",
        color: "text-blue-500",
        functions: ["Audio Manipulation", "Format Conversion", "Effects", "Slicing", "Concatenation"],
        website: "https://github.com/jiaaro/pydub",
        installation: "pip install pydub",
        difficulty: "beginner",
        popularity: 85
    },

    // Task Queues & Background Jobs
    {
        name: "Celery",
        category: "async",
        description: "A distributed task queue that focuses on real-time processing, while also supporting task scheduling and background job processing.",
        icon: "fas fa-tasks",
        color: "text-green-500",
        functions: ["Task Queue", "Background Jobs", "Distributed", "Scheduling", "Monitoring"],
        website: "https://docs.celeryproject.org/",
        installation: "pip install celery",
        difficulty: "intermediate",
        popularity: 89
    },
    {
        name: "RQ (Redis Queue)",
        category: "async",
        description: "A simple Python library for queueing jobs and processing them in the background with workers, backed by Redis.",
        icon: "fas fa-layer-group",
        color: "text-red-500",
        functions: ["Job Queue", "Background Processing", "Redis Backend", "Worker Management", "Simple API"],
        website: "https://python-rq.org/",
        installation: "pip install rq",
        difficulty: "beginner",
        popularity: 83
    },
    {
        name: "APScheduler",
        category: "async",
        description: "Advanced Python Scheduler (APScheduler) is a Python library that lets you schedule your Python code to be executed later.",
        icon: "fas fa-clock",
        color: "text-purple-500",
        functions: ["Job Scheduling", "Cron-like", "Persistent Jobs", "Multiple Triggers", "Thread/Process Pools"],
        website: "https://apscheduler.readthedocs.io/",
        installation: "pip install apscheduler",
        difficulty: "intermediate",
        popularity: 86
    },

    // Configuration & Environment
    {
        name: "python-decouple",
        category: "config",
        description: "A library to separate settings from code, helping you to store parameters in ini or .env files and access them via environment variables.",
        icon: "fas fa-cog",
        color: "text-blue-500",
        functions: ["Environment Variables", "Configuration", "Settings Management", "Security", "Deployment"],
        website: "https://github.com/henriquebastos/python-decouple",
        installation: "pip install python-decouple",
        difficulty: "beginner",
        popularity: 84
    },
    {
        name: "pydantic",
        category: "config",
        description: "Data validation and settings management using Python type hints, enforcing type hints at runtime with user-friendly errors.",
        icon: "fas fa-check-double",
        color: "text-green-500",
        functions: ["Data Validation", "Type Hints", "Settings", "JSON Schema", "Error Handling"],
        website: "https://pydantic-docs.helpmanual.io/",
        installation: "pip install pydantic",
        difficulty: "intermediate",
        popularity: 91
    },
    {
        name: "PyYAML",
        category: "config",
        description: "A YAML parser and emitter for Python, allowing you to work with YAML configuration files easily.",
        icon: "fas fa-file-code",
        color: "text-orange-500",
        functions: ["YAML Parsing", "Configuration Files", "Serialization", "Human Readable", "Data Exchange"],
        website: "https://pyyaml.org/",
        installation: "pip install PyYAML",
        difficulty: "beginner",
        popularity: 88
    },

    // API Development
    {
        name: "Django REST Framework",
        category: "api",
        description: "A powerful and flexible toolkit for building Web APIs in Django, providing serialization, authentication, and more.",
        icon: "fas fa-server",
        color: "text-green-600",
        functions: ["REST API", "Serialization", "Authentication", "Permissions", "Throttling", "Documentation"],
        website: "https://www.django-rest-framework.org/",
        installation: "pip install djangorestframework",
        difficulty: "intermediate",
        popularity: 90
    },
    {
        name: "Flask-RESTful",
        category: "api",
        description: "An extension for Flask that adds support for quickly building REST APIs with minimal setup and configuration.",
        icon: "fas fa-plug",
        color: "text-blue-600",
        functions: ["REST API", "Resource Classes", "Request Parsing", "Output Formatting", "Error Handling"],
        website: "https://flask-restful.readthedocs.io/",
        installation: "pip install Flask-RESTful",
        difficulty: "beginner",
        popularity: 85
    },
    {
        name: "Marshmallow",
        category: "api",
        description: "An ORM/ODM/framework-agnostic library for converting complex datatypes to and from native Python datatypes.",
        icon: "fas fa-exchange-alt",
        color: "text-pink-500",
        functions: ["Serialization", "Deserialization", "Validation", "Schema Definition", "Data Transformation"],
        website: "https://marshmallow.readthedocs.io/",
        installation: "pip install marshmallow",
        difficulty: "intermediate",
        popularity: 87
    }
];

// Framework categories for filtering
const frameworkCategories = {
    all: "All Frameworks",
    web: "Web Development",
    data: "Data Science",
    ai: "Machine Learning & AI",
    dev: "Development Tools",
    db: "Database & ORM",
    net: "Networking",
    gui: "GUI Development",
    game: "Game Development",
    security: "Security",
    image: "Image Processing",
    audio: "Audio Processing",
    async: "Async & Background",
    config: "Configuration",
    api: "API Development"
};

// Initialize frameworks display
function initializeFrameworks() {
    displayFrameworks(pythonFrameworks);
    setupFrameworkFilters();
    setupFrameworkSearch();
}

// Display frameworks in grid
function displayFrameworks(frameworks) {
    const grid = document.getElementById('frameworksGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    frameworks.forEach(framework => {
        const card = document.createElement('div');
        card.className = 'framework-card bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer';
        card.setAttribute('data-category', framework.category);
        
        const popularityColor = framework.popularity >= 90 ? 'text-green-400' : 
                               framework.popularity >= 80 ? 'text-yellow-400' : 'text-gray-400';
        
        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center">
                    <i class="${framework.icon} ${framework.color} text-2xl mr-3"></i>
                    <div>
                        <h3 class="text-xl font-bold text-white">${framework.name}</h3>
                        <div class="flex items-center mt-1">
                            <span class="bg-gray-700 text-xs px-2 py-1 rounded-full capitalize mr-2">${framework.category}</span>
                            <span class="text-xs ${popularityColor}">★ ${framework.popularity}%</span>
                        </div>
                    </div>
                </div>
                <span class="text-xs px-2 py-1 rounded ${framework.difficulty === 'beginner' ? 'bg-green-600' : 
                    framework.difficulty === 'intermediate' ? 'bg-yellow-600' : 'bg-red-600'}">${framework.difficulty}</span>
            </div>
            
            <p class="text-gray-300 mb-4 text-sm leading-relaxed">${framework.description}</p>
            
            <div class="flex flex-wrap gap-1 mb-4">
                ${framework.functions.slice(0, 4).map(func => 
                    `<span class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">${func}</span>`
                ).join('')}
                ${framework.functions.length > 4 ? 
                    `<span class="text-xs text-gray-400 px-2 py-1">+${framework.functions.length - 4} more</span>` : ''}
            </div>
            
            <div class="flex justify-between items-center">
                <code class="text-xs bg-gray-800 px-2 py-1 rounded text-green-400">${framework.installation}</code>
                <a href="${framework.website}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm">
                    <i class="fas fa-external-link-alt mr-1"></i>Visit
                </a>
            </div>
        `;
        
        // Add click handler for detailed view
        card.addEventListener('click', () => showFrameworkDetails(framework));
        
        grid.appendChild(card);
    });
}

// Setup framework filters
function setupFrameworkFilters() {
    const filterContainer = document.querySelector('#frameworks .flex.space-x-2');
    if (!filterContainer) return;
    
    filterContainer.innerHTML = Object.entries(frameworkCategories).map(([key, label]) => 
        `<button onclick="filterFrameworks('${key}')" data-category="${key}" 
                class="${key === 'all' ? 'bg-yellow-600' : 'bg-gray-700'} text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors text-sm">
            ${label}
        </button>`
    ).join('');
}

// Setup framework search
function setupFrameworkSearch() {
    // Add search input if it doesn't exist
    const frameworksHeader = document.querySelector('#frameworks .flex.justify-between');
    if (frameworksHeader && !document.getElementById('frameworkSearch')) {
        const searchHTML = `
            <div class="flex items-center space-x-4">
                <input type="text" id="frameworkSearch" placeholder="Search frameworks..." 
                       class="bg-gray-700 text-white px-4 py-2 rounded-lg w-64">
                <select id="sortFrameworks" class="bg-gray-700 text-white px-3 py-2 rounded">
                    <option value="popularity">Sort by Popularity</option>
                    <option value="name">Sort by Name</option>
                    <option value="difficulty">Sort by Difficulty</option>
                </select>
            </div>
        `;
        frameworksHeader.innerHTML = frameworksHeader.innerHTML.replace('</div>', searchHTML + '</div>');
        
        // Add event listeners
        document.getElementById('frameworkSearch').addEventListener('input', handleFrameworkSearch);
        document.getElementById('sortFrameworks').addEventListener('change', handleFrameworkSort);
    }
}

// Filter frameworks by category
function filterFrameworks(category) {
    // Update active button
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.classList.remove('bg-yellow-600');
        btn.classList.add('bg-gray-700');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('bg-yellow-600');
    document.querySelector(`[data-category="${category}"]`).classList.remove('bg-gray-700');
    
    // Filter frameworks
    let filtered = category === 'all' ? pythonFrameworks : 
                   pythonFrameworks.filter(f => f.category === category);
    
    // Apply current search filter
    const searchTerm = document.getElementById('frameworkSearch')?.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(f => 
            f.name.toLowerCase().includes(searchTerm) ||
            f.description.toLowerCase().includes(searchTerm) ||
            f.functions.some(func => func.toLowerCase().includes(searchTerm))
        );
    }
    
    displayFrameworks(filtered);
}

// Handle framework search
function handleFrameworkSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const activeCategory = document.querySelector('[data-category].bg-yellow-600')?.getAttribute('data-category') || 'all';
    
    let filtered = activeCategory === 'all' ? pythonFrameworks : 
                   pythonFrameworks.filter(f => f.category === activeCategory);
    
    if (searchTerm) {
        filtered = filtered.filter(f => 
            f.name.toLowerCase().includes(searchTerm) ||
            f.description.toLowerCase().includes(searchTerm) ||
            f.functions.some(func => func.toLowerCase().includes(searchTerm))
        );
    }
    
    displayFrameworks(filtered);
}

// Handle framework sorting
function handleFrameworkSort(event) {
    const sortBy = event.target.value;
    const activeCategory = document.querySelector('[data-category].bg-yellow-600')?.getAttribute('data-category') || 'all';
    
    let frameworks = activeCategory === 'all' ? [...pythonFrameworks] : 
                     pythonFrameworks.filter(f => f.category === activeCategory);
    
    switch (sortBy) {
        case 'name':
            frameworks.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'difficulty':
            const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
            frameworks.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
            break;
        case 'popularity':
        default:
            frameworks.sort((a, b) => b.popularity - a.popularity);
            break;
    }
    
    displayFrameworks(frameworks);
}

// Show detailed framework information
function showFrameworkDetails(framework) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
    
    modal.innerHTML = `
        <div class="bg-gray-800 rounded-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-start mb-6">
                    <div class="flex items-center">
                        <i class="${framework.icon} ${framework.color} text-3xl mr-4"></i>
                        <div>
                            <h3 class="text-3xl font-bold text-white">${framework.name}</h3>
                            <div class="flex items-center mt-2 space-x-3">
                                <span class="bg-gray-700 text-sm px-3 py-1 rounded-full capitalize">${framework.category}</span>
                                <span class="text-sm ${framework.difficulty === 'beginner' ? 'text-green-400' : 
                                    framework.difficulty === 'intermediate' ? 'text-yellow-400' : 'text-red-400'}">
                                    ${framework.difficulty.charAt(0).toUpperCase() + framework.difficulty.slice(1)}
                                </span>
                                <span class="text-sm text-gray-400">★ ${framework.popularity}% popular</span>
                            </div>
                        </div>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <p class="text-gray-300 mb-6 leading-relaxed">${framework.description}</p>
                
                <div class="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h4 class="text-lg font-semibold text-white mb-3">Key Features</h4>
                        <div class="space-y-2">
                            ${framework.functions.map(func => 
                                `<div class="flex items-center">
                                    <i class="fas fa-check text-green-400 mr-2"></i>
                                    <span class="text-gray-300">${func}</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-semibold text-white mb-3">Installation & Links</h4>
                        <div class="space-y-3">
                            <div class="bg-gray-900 p-3 rounded">
                                <p class="text-sm text-gray-400 mb-1">Installation:</p>
                                <code class="text-green-400">${framework.installation}</code>
                            </div>
                            <a href="${framework.website}" target="_blank" 
                               class="inline-flex items-center text-blue-400 hover:text-blue-300">
                                <i class="fas fa-external-link-alt mr-2"></i>
                                Official Documentation
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Export the data and functions
window.pythonFrameworks = pythonFrameworks;
window.frameworkCategories = frameworkCategories;
window.initializeFrameworks = initializeFrameworks;
window.filterFrameworks = filterFrameworks;
window.showFrameworkDetails = showFrameworkDetails;