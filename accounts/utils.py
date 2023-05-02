from django.core.cache import cache
from django.conf import settings
from django.core.mail import send_mail
from random import randint

def send_verification_code(email):
    code = randint(100000, 999999)
    subject = "Verfication Code For API"
    message = f'''Your verification code is {code}\nThis code will be expired after 2 minutes'''
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list, fail_silently=True)
    cache.set(email, code, timeout=120)

def verify_verification_code(email, code):
    generated_code = cache.get(email)
    value = (generated_code == code)
    if (value):
        cache.delete(email)
    return value

def send_forget_verification_code(email):
    code = randint(100000, 999999)
    subject = "Forget Password Code For API"
    message = f'''Your forget password code is {code}\nThis code will be expired after 2 minutes'''
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list, fail_silently=True)
    cache.set(f"{email}#forget", code, timeout=120)

def verify_forget_verification_code(email, code, delete=True):
    generated_code = cache.get(f"{email}#forget")
    value = (generated_code == code)
    if (value and delete):
        cache.delete(email)
    return value