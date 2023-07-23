from rest_framework import serializers
from .models import Libro, Carrito, Categoria
from django.contrib.auth.models import User

class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = ('__all__')
        
class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = ('__all__')
        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ('__all__')
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')