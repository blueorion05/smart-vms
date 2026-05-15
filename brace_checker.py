import sys

def check_structure(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    stack = []
    in_string = False
    quote_char = None
    in_template = False
    in_multiline_comment = False

    for i, line in enumerate(lines):
        line_num = i + 1
        j = 0
        while j < len(line):
            char = line[j]
            next_char = line[j+1] if j+1 < len(line) else ""
            
            # Template literals can contain ${...}
            if in_template and char == '$' and next_char == '{':
                stack.append(('${', line_num, i))
                j += 2
                continue

            if not in_string and not in_template:
                if not in_multiline_comment and char == '/' and next_char == '/':
                    break 
                if not in_multiline_comment and char == '/' and next_char == '*':
                    in_multiline_comment = True
                    j += 2
                    continue
                if in_multiline_comment and char == '*' and next_char == '/':
                    in_multiline_comment = False
                    j += 2
                    continue
            
            if in_multiline_comment:
                j += 1
                continue

            if char == '\\' and (in_string or in_template):
                j += 2
                continue

            if (char == '"' or char == "'") and not in_template:
                if not in_string:
                    in_string = True
                    quote_char = char
                elif quote_char == char:
                    in_string = False
                    quote_char = None
            
            elif char == '`' and not in_string:
                in_template = not in_template

            elif not in_string: # includes in_template but only if we handle ${} correctly
                # If we are inside a template, only ${ } matters for braces
                # But if we are NOT in a template, standard braces apply
                if char == '{' or char == '(' or char == '[':
                    stack.append((char, line_num, i))
                elif char == '}' or char == ')' or char == ']':
                    if not stack:
                        print(f"Unbalanced '{char}' at line {line_num}:")
                        show_context(lines, i)
                        return
                    
                    opening_char, op_line, op_idx = stack.pop()
                    matches = {'}': '{', ')': '(', ']': '[', '}': '${'}
                    # Special case for } closing both { and ${
                    if matches[char] != opening_char:
                        if char == '}' and opening_char == '${':
                             pass # Valid
                        elif char == '}' and opening_char == '{':
                             pass # Valid
                        else:
                            print(f"Mismatched '{char}' at line {line_num} (expected closing for '{opening_char}' from line {op_line}):")
                            show_context(lines, i)
                            return
            j += 1

    if stack:
        op_char, op_line, op_idx = stack[0]
        print(f"First unclosed '{op_char}' starts at line {op_line}:")
        show_context(lines, op_idx)
    else:
        print("All symbols appear balanced.")

def show_context(lines, idx):
    start = max(0, idx - 1)
    end = min(len(lines), idx + 2)
    for k in range(start, end):
        prefix = "> " if k == idx else "  "
        print(f"{prefix}{k+1}: {lines[k].rstrip()}")

check_structure(r'c:\Users\Jhudiel\OneDrive\Documents\Programming\OJT\smart-vms\src\pages\AdminPage.jsx')
