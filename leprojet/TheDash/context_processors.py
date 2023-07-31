import random
import string

def random_string_context(request):
    random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))
    return {'random_string': random_string}
