from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
]

# Force serving static files in all conditions (including DEBUG=False)
static_root = settings.STATIC_ROOT
if not os.path.exists(static_root):
    static_root = os.path.join(settings.BASE_DIR, 'main', 'static')

urlpatterns += [
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': static_root}),
]
