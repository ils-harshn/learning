from django.contrib import admin
from django.urls import path
from . import views
from .obtain_access_token import obtain_auth_token

urlpatterns = [
    path('register', view=views.RegisterView.as_view()),
    path('verify', view=views.Verify.as_view()),
    path('resendOTP', view=views.ResendOTP.as_view()),
    path('token', view=obtain_auth_token),
    path('forgetpasswordrequest', view=views.RequestForgetPassword.as_view()),
    path('forgetverify', view=views.ForgetPasswordVerify.as_view()),
]
