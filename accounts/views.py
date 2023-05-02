from .models import User
from .serializers import RegisterSerializer, ForgetPasswordSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from accounts.models import User
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from django.core.cache import cache
from django.core.validators import validate_email
from accounts.utils import send_verification_code, verify_verification_code, send_forget_verification_code

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class Verify(APIView):
    def post(self, request, format=None):
        try:
            email = request.data.get("email")
            code = int(request.data.get("code"))
            validate_email(email)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        if ((not email) or (not code)):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(User, email=email)
        if verify_verification_code(user.email, code):
            user.is_active = True
            user.save()
            return Response(status=status.HTTP_200_OK)
        return Response(data={
            "error": "Verfication Code Expired"
        }, status=status.HTTP_400_BAD_REQUEST)
    

class ResendOTP(APIView):
    def post(self, request, format=None):
        try:
            email = request.data.get("email")
            validate_email(email)
        except Exception:
            return Response(data={
                "email": ["This field is required with valide email."],
            }, status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(User, email=email)
        send_verification_code(user.email)
        return Response(status=status.HTTP_200_OK)
    
class RequestForgetPassword(APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        try:
            validate_email(email)
        except ValidationError:
            return Response(data={
                "email": ["This field is required with valid email."]
            })
        user = get_object_or_404(User, email=email)
        send_forget_verification_code(user.email)
        return Response(status=status.HTTP_200_OK)
    
class ForgetPasswordVerify(APIView):
    def post(self, request, format=None):
        serializer = ForgetPasswordSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        email = serializer.data.get("email")
        password = serializer.data.get("password2")
        user = User.objects.get(email=email)
        user.set_password(password)
        user.save()
        return Response(status=status.HTTP_200_OK)