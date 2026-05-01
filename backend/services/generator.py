import random
import string

def generate_passwords(count: int = 3, min_length: int = 14) -> list[str]:
    """Generate secure passwords with a mix of all character types."""
    suggestions = []
    
    # Character pools
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    digits = string.digits
    symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?"
    
    all_chars = lower + upper + digits + symbols
    
    for _ in range(count):
        # Ensure at least one of each type
        password = [
            random.choice(lower),
            random.choice(upper),
            random.choice(digits),
            random.choice(symbols)
        ]
        
        # Fill the rest randomly
        for _ in range(min_length - 4):
            password.append(random.choice(all_chars))
            
        # Shuffle to avoid predictable pattern (e.g. always starting with lower, upper, etc.)
        random.shuffle(password)
        suggestions.append("".join(password))
        
    return suggestions
