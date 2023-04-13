from rest_framework import viewsets
from accounts.serializers import UserSerializers
from accounts.models import User

class UserViewSets(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers