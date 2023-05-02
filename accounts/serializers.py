from rest_framework import serializers
from .models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .utils import send_verification_code, verify_forget_verification_code
from django.core.validators import MinValueValidator, MaxValueValidator
from django.shortcuts import get_object_or_404
from accounts.models import User
from .utils import verify_forget_verification_code

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2',
                  'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        send_verification_code(user.email)
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'is_active', 'is_admin']


class ForgetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(
        required=True, validators=[validate_password])
    code = serializers.IntegerField(validators=[MinValueValidator(100000), MaxValueValidator(999999)])

    def validate(self, attrs):
        user = get_object_or_404(User, email=attrs.get("email"))
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        if (verify_forget_verification_code(attrs['email'], attrs['code']) == False):
            raise serializers.ValidationError(
                {"code": "Verfication is not valid"})
        return super().validate(attrs)