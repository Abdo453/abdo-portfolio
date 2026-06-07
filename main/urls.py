from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),
    path('methodology.html', views.methodology, name='methodology'),
    path('bug-bounty-writeups.html', views.bug_bounty_writeups, name='bug_bounty_writeups'),
    path('vulnerabilities/<str:page>', views.academy_vuln, name='vuln_page'),
    path('labs/<str:page>', views.academy_lab, name='lab_page'),
    path('linux-security/<str:page>', views.academy_linux, name='linux_page'),
    path('writeups/<str:page>', views.academy_writeup, name='writeup_page'),
]
