from django.urls import include, path
from apps.entidades import views
from rest_framework import routers

# Todo esto genera las rutas de nuestra api con los métodos GET, POST, PUT, DELETE
router = routers.DefaultRouter()
router.register(r'libros', views.LibrosView)
router.register(r'carrito', views.CarritoView)
router.register(r'categorias', views.CategoriasView)
router.register(r'register', views.RegisterView)
router.register(r'login', views.LoginView)
router.register(r'carrito-usuario', views.CarritoByUsuarioView)
router.register(r'logout', views.LogoutView)
router.register(r'librosByTitulo', views.LibrosbyTitleView)

# api versioning
urlpatterns = [
   path("", include(router.urls)), 
]
