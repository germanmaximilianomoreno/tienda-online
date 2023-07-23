from rest_framework import viewsets
from .serializer import LibroSerializer, CarritoSerializer, CategoriaSerializer, UserSerializer
from .models import Libro, Carrito, Categoria 
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.shortcuts import redirect


class LibrosView(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = Libro.objects.all()
    
    def get_queryset(self):
        queryset = super().get_queryset()
        categoria = self.request.query_params.get('categoria')
        if categoria:
            queryset = queryset.filter(categoria=categoria)
        return queryset
    
class LibrosbyTitleView(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = Libro.objects.all()
    
    def get_queryset(self):
        queryset = super().get_queryset()
        titulo = self.request.query_params.get('titulo')
        if titulo:
            queryset = queryset.filter(titulo=titulo)
        return queryset
    
class CarritoView(viewsets.ModelViewSet):
    serializer_class = CarritoSerializer
    queryset = Carrito.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        producto_id = self.request.query_params.get('producto_id')
        usuario_id = self.request.query_params.get('usuario_id')
        if producto_id and usuario_id:
            queryset = queryset.filter(producto_id=producto_id, usuario_id=usuario_id)            
        return queryset
    
    def delete(self, request):
        usuario_id = self.request.query_params.get('usuario_id')
        queryset = Carrito.objects.filter(usuario_id=usuario_id)
        queryset.delete()

        return Response(queryset)
    
class CarritoByUsuarioView(viewsets.ModelViewSet):
    serializer_class = CarritoSerializer
    queryset = Carrito.objects.all()
    
    def get_queryset(self):
        queryset = super().get_queryset()
        usuario = self.request.query_params.get('usuario')
        if usuario:
            queryset = queryset.filter(usuario=usuario)            
        return queryset
    
class CategoriasView(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()
    
    
class RegisterView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def create(self, request):
        data = request.data
        
        if User.objects.filter(email=data['email']).exists():
            return Response("Ya existe")
        
        # Encripta la contraseña antes de guardarla en la base de datos
        encrypted_password = make_password(data['password'])

        # Crea un nuevo objeto Cliente con los datos proporcionados
        user = User.objects.create(
            email=data['email'],
            password=encrypted_password,
            username=data['email']
        )

        # Guarda el nuevo usuario en la base de datos
        user.save()

        return Response("Registrado correctamente")
    

class LoginView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def create(self, request, *args, **kwargs):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            
            user = User.objects.get(email=email)
            
            if check_password(password, user.password):
                
                if Token.objects.filter(user_id=user.id).exists():
                    token = Token.objects.get(user_id=user.id)
                else:
                    token = Token.objects.create(user_id=user.id)
                
                if user.is_superuser:
                    return Response({"success": True,"is_superuser": True,"token" : token.key, "usuario": user.id})
                else:
                    return Response({"success": True,"is_superuser": False,"token" : token.key, "usuario": user.id})
            else:
                return Response({"success": False})
        except User.DoesNotExist:
            return Response({"success": 'Email not registered'})
        except Exception as e:
            return Response({"success": False, "error": str(e)})

class LogoutView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def delete(self, request):
        user_id = request.query_params.get('user')
        try:
            token = Token.objects.get(user_id=user_id)
            token.delete()
            return Response({"success": True})
        except Token.DoesNotExist:
            return Response({"success": False, "error": "Token does not exist"})
        except Exception as e:
            return Response({"success": False, "error": str(e)})
