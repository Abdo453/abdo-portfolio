from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),
    path('login', views.login_page, name='login'),
    path('methodology.html', views.methodology, name='methodology'),
    path('python-for-hackers.html', views.python_for_hackers, name='python_for_hackers'),
    path('bug-bounty-writeups.html', views.bug_bounty_writeups, name='bug_bounty_writeups'),
    path('vulnerabilities/<str:page>', views.academy_vuln, name='vuln_page'),
    path('labs/<str:page>', views.academy_lab, name='lab_page'),
    path('linux-security/<str:page>', views.academy_linux, name='linux_page'),
    path('writeups/<str:page>', views.academy_writeup, name='writeup_page'),
    path('api/auth/register', views.api_register, name='api_register'),
    path('api/auth/login', views.api_login, name='api_login'),
    path('api/auth/logout', views.api_logout, name='api_logout'),
    path('api/auth/save-progress', views.api_save_progress, name='api_save_progress'),
    path('api/auth/profile', views.api_profile, name='api_profile'),
    path('api/auth/leaderboard', views.api_leaderboard, name='api_leaderboard'),
]
