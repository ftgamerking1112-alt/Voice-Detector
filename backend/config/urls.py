import os
import mimetypes
from pathlib import Path
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse, FileResponse, Http404

FRONTEND_DIR = settings.BASE_DIR.parent

def serve_healer_home(request):
    index_file = FRONTEND_DIR / 'index.html'
    if index_file.is_file():
        return FileResponse(open(index_file, 'rb'), content_type='text/html')
    return HttpResponse("HEALER Frontend not found", status=404)

def serve_frontend_asset(request, path):
    file_path = (FRONTEND_DIR / path).resolve()
    # Security: Ensure requested path does not escape FRONTEND_DIR
    if not str(file_path).startswith(str(FRONTEND_DIR.resolve())):
        raise Http404("Asset not found")
    if file_path.is_file():
        content_type, _ = mimetypes.guess_type(str(file_path))
        if str(file_path).endswith(('.js', '.mjs')):
            content_type = 'text/javascript'
        elif str(file_path).endswith('.css'):
            content_type = 'text/css'
        return FileResponse(open(file_path, 'rb'), content_type=content_type)
    raise Http404("Asset not found")

urlpatterns = [
    path('', serve_healer_home, name='healer_home'),
    path('admin/', admin.site.urls),
    path('api/', include('detector.urls')),
    re_path(r'^(?P<path>(styles\.css|app\.js|src/.*))$', serve_frontend_asset, name='frontend_assets'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


