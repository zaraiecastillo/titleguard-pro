import re
import sys

def scrub_pii(text):
    # Redact Social Security Numbers (Simple pattern)
    text = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', '[REDACTED_SSN]', text)
    text = re.sub(r'\b\d{3}\s\d{2}\s\d{4}\b', '[REDACTED_SSN]', text)

    # Redact generic banking routing/account numbers (Simple patterns for demo)
    # routing
    text = re.sub(r'\b\d{9}\b', '[REDACTED_BANKING]', text)
    
    # Redact Email addresses
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[REDACTED_EMAIL]', text)

    return text

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # If file path provided
        try:
            with open(sys.argv[1], 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            print(scrub_pii(content))
        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(1)
    else:
        # Read from stdin
        input_text = sys.stdin.read()
        print(scrub_pii(input_text))
