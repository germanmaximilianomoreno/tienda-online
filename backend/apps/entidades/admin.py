from django.contrib import admin
from apps.entidades.models import Libro, Carrito, Categoria
import os
import environ

env = environ.Env()
environ.Env.read_env()

class LibroAdmin(admin.ModelAdmin):
    list_display = ("titulo",)
    
    def save_model(self, request, obj, form, change):
        obj.titulo = obj.titulo.upper()
        obj.subtitulo = obj.subtitulo.upper()
        obj.autor = obj.autor.upper()
        obj.caracteristica = obj.caracteristica.upper()
        obj.area_tematica = obj.area_tematica.upper()
        obj.save()
    
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre",)

admin.site.register(Libro, LibroAdmin)
admin.site.register(Carrito)
admin.site.register(Categoria, CategoriaAdmin)

admin.site.site_header = 'Panel de Administración'
admin.site.site_title = 'Panel de Administración'
admin.site.index_title = 'Bienvenido al Panel de Administración'

# Personalización del enlace "View Site"
admin.site.site_url = os.environ.get('SITE_URL_FRONTEND')
