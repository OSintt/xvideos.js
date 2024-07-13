from .pagination_function import has_next_function, has_previous_function, next_function, previous_function, refresh_function

def create_has_next_function(pagination):
    page, pages = pagination['page'], pagination['pages']
    return lambda: has_next_function(page, pages)

def create_has_previous_function(pagination):
    page, pages = pagination['page'], pagination['pages']
    return lambda: has_previous_function(page, pages)

def create_next_function(pagination, load_module_function):
    page = pagination['page']
    return lambda: next_function(page, load_module_function)

def create_previous_function(pagination, load_module_function):
    page = pagination['page']
    return lambda: previous_function(page, load_module_function)

def create_refresh_function(pagination, load_module_function):
    page = pagination['page']
    return lambda: refresh_function(page, load_module_function)