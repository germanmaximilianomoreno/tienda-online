# custom_middleware.py
from django.http import HttpResponse, HttpResponseRedirect

class DenyAccessMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path == '/':
            # Si la URL solicitada es "/", devuelve una respuesta de error 403 Forbidden
            return HttpResponse("Acceso denegado", status=403)
            
        # Si la URL no coincide, continúa con el procesamiento de la solicitud
        response = self.get_response(request)
        return response
