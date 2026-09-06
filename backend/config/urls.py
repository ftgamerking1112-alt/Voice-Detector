import os
import mimetypes
from pathlib import Path
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse, FileResponse, Http404

FRONTEND_DIST = settings.BASE_DIR.parent / 'frontend' / 'dist'

def serve_react_index(request):
    index_file = FRONTEND_DIST / 'index.html'
    if index_file.is_file():
        return FileResponse(open(index_file, 'rb'), content_type='text/html')
    return HttpResponse("VoiceGuard AI Frontend build not found. Please run 'npm run build' inside frontend/.", status=404)

def serve_react_assets(request, path):
    file_path = (FRONTEND_DIST / 'assets' / path).resolve()
    assets_dir = (FRONTEND_DIST / 'assets').resolve()
    # Security: Ensure requested path does not escape assets directory
    if not str(file_path).startswith(str(assets_dir)):
        raise Http404("Asset not found")
    if file_path.is_file():
        content_type, _ = mimetypes.guess_type(str(file_path))
        if str(file_path).endswith(('.js', '.mjs')):
            content_type = 'application/javascript'
        elif str(file_path).endswith('.css'):
            content_type = 'text/css'
        return FileResponse(open(file_path, 'rb'), content_type=content_type)
    raise Http404("Asset not found")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('detector.urls')),
    re_path(r'^assets/(?P<path>.*)$', serve_react_assets, name='react_assets'),
    re_path(r'^(?!api/|admin/|media/|static/).*$', serve_react_index, name='react_index'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)




