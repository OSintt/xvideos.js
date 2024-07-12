def has_next_function(current_page, pages):
    return current_page < max(pages)

def has_previous_function(current_page, pages):
    return current_page > min(pages)

def next_function(current_page, load_module_function):
    next_page = current_page + 1
    return lambda: load_module_function(next_page)

def previous_function(current_page, load_module_function):
    prev_page = current_page - 1
    return lambda: load_module_function(prev_page)

def refresh_function(current_page, load_module_function):
    return lambda: load_module_function(current_page)