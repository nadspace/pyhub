#!/usr/bin/env python3
"""
PyHub ChatterBot Setup Script
Automatically installs and configures ChatterBot for PyHub
"""

import subprocess
import sys
import os

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major == 3 and version.minor >= 6:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} is not compatible. Need Python 3.6+")
        return False

def install_dependencies():
    """Install required Python packages"""
    print("📦 Installing Python dependencies...")
    
    # Core packages
    packages = [
        "flask==2.3.3",
        "flask-cors==4.0.0",
        "chatterbot==1.0.8",
        "SQLAlchemy==1.3.24",
        "nltk==3.8.1",
        "pytz==2023.3",
        "python-dateutil==2.8.2",
        "pyyaml==6.0.1"
    ]
    
    for package in packages:
        if not run_command(f"pip install {package}", f"Installing {package}"):
            return False
    
    return True

def download_nltk_data():
    """Download required NLTK data"""
    print("📚 Downloading NLTK data...")
    
    nltk_script = """
import nltk
try:
    nltk.download('punkt')
    nltk.download('stopwords')
    nltk.download('wordnet')
    print("NLTK data downloaded successfully")
except Exception as e:
    print(f"NLTK download error: {e}")
"""
    
    try:
        subprocess.run([sys.executable, "-c", nltk_script], check=True)
        print("✅ NLTK data downloaded successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ NLTK data download failed: {e}")
        return False

def test_chatbot():
    """Test if chatbot works"""
    print("🧪 Testing chatbot...")
    
    test_script = """
try:
    from chatterbot import ChatBot
    from chatterbot.trainers import ListTrainer
    
    # Create a simple test bot
    bot = ChatBot('TestBot', storage_adapter='chatterbot.storage.SQLStorageAdapter')
    trainer = ListTrainer(bot)
    trainer.train(['Hello', 'Hi there!'])
    
    response = bot.get_response('Hello')
    print(f"Test response: {response}")
    print("Chatbot test successful!")
    
except Exception as e:
    print(f"Chatbot test failed: {e}")
    exit(1)
"""
    
    try:
        subprocess.run([sys.executable, "-c", test_script], check=True)
        print("✅ Chatbot test passed!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Chatbot test failed: {e}")
        return False

def main():
    """Main setup function"""
    print("🚀 PyHub ChatterBot Setup")
    print("=" * 40)
    
    # Check Python version
    if not check_python_version():
        print("Please install Python 3.6 or higher")
        return False
    
    # Install dependencies
    if not install_dependencies():
        print("Failed to install dependencies")
        return False
    
    # Download NLTK data
    if not download_nltk_data():
        print("Failed to download NLTK data")
        return False
    
    # Test chatbot
    if not test_chatbot():
        print("Chatbot test failed")
        return False
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Run: python chatbot_backend.py")
    print("2. Open PyHub in your browser")
    print("3. Navigate to the Chatbot section")
    print("4. Start chatting with PyBot!")
    
    return True

if __name__ == "__main__":
    success = main()
    if not success:
        print("\n❌ Setup failed. Please check the errors above.")
        sys.exit(1)
    else:
        print("\n✅ Setup completed successfully!")
        
        # Ask if user wants to start the chatbot
        start_now = input("\n🤖 Would you like to start the chatbot backend now? (y/n): ")
        if start_now.lower() in ['y', 'yes']:
            print("Starting chatbot backend...")
            os.system("python chatbot_backend.py")
