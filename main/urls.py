from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),
    path('methodology.html', views.methodology, name='methodology'),
    path('bug-bounty-writeups.html', views.bug_bounty_writeups, name='bug_bounty_writeups'),
    path('vulnerabilities/sql-injection.html', views.academy_page, {'path': 'vulnerabilities/sql-injection.html'}, name='vuln_sqli'),
    path('vulnerabilities/idor.html', views.academy_page, {'path': 'vulnerabilities/idor.html'}, name='vuln_idor'),
    path('vulnerabilities/ssrf.html', views.academy_page, {'path': 'vulnerabilities/ssrf.html'}, name='vuln_ssrf'),
    path('labs/sql-injection-lab.html', views.academy_page, {'path': 'labs/sql-injection-lab.html'}, name='lab_sqli'),
]
