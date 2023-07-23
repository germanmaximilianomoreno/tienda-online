from django.db import models
from django.contrib.auth.models import User
    
class Categoria(models.Model):
    nombre = models.CharField(max_length=30)
    
    def __str__(self):
        return self.nombre
    
class Libro(models.Model):
    titulo = models.CharField(max_length=100)
    subtitulo = models.CharField(max_length=100)
    autor = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    caracteristica = models.CharField(max_length=200)
    isbn = models.CharField(max_length=100)
    precio = models.IntegerField()
    area_tematica = models.CharField(max_length=100)
    imagen = models.URLField(blank=True)
    
class Carrito(models.Model):
    producto = models.ForeignKey(Libro, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    
    class Meta:
        verbose_name="Carrito"
        verbose_name_plural="Carrito"



    