import os
from zxcvbn import zxcvbn
import string
import math

# Load common passwords for simulating a "breached" list check
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(BASE_DIR, "data", "common_passwords.txt")

try:
    with open(DATA_FILE, "r") as f:
        COMMON_PASSWORDS = set([line.strip() for line in f.readlines()])
except FileNotFoundError:
    COMMON_PASSWORDS = set()

def calculate_entropy_shannon(password: str) -> float:
    """Calculate the Shannon entropy of a password based on character pool size."""
    if not password:
        return 0.0
        
    pool_size = 0
    if any(c.islower() for c in password): pool_size += 26
    if any(c.isupper() for c in password): pool_size += 26
    if any(c.isdigit() for c in password): pool_size += 10
    if any(c in string.punctuation for c in password): pool_size += len(string.punctuation)
    
    if pool_size == 0:
        return 0.0
        
    entropy = len(password) * math.log2(pool_size)
    return round(entropy, 2)

def analyze_password(password: str) -> dict:
    """Analyze a password using zxcvbn and custom checks."""
    result = zxcvbn(password)
    
    score = result['score'] # 0 to 4
    # We use zxcvbn's guesses log10 for entropy estimation, or shannon entropy as fallback
    entropy = calculate_entropy_shannon(password)
    
    labels = {
        0: "Very Weak",
        1: "Weak",
        2: "Medium",
        3: "Strong",
        4: "Very Strong"
    }
    
    issues = []
    
    # Custom breached check
    if password in COMMON_PASSWORDS:
        issues.append("Password found in breached/common database!")
        score = 0 # Force Very Weak
    
    # Parse zxcvbn feedback
    feedback = result['feedback']
    warning = feedback['warning']
    suggestions = feedback['suggestions']
    
    if warning:
        issues.append(warning)
        
    if score < 3 and not issues:
        issues.append("Password is too predictable or short.")
        
    # Additional simple checks for better feedback
    if len(password) < 8:
        issues.append("Password length is less than 8 characters.")
    
    return {
        "score": score,
        "entropy": entropy,
        "label": labels[score],
        "issues": list(set(issues)), # unique issues
        "feedback_suggestions": suggestions
    }
