from django.shortcuts import render
from django.template.exceptions import TemplateDoesNotExist
from django.http import Http404
from .portfolio_data import get_portfolio_context

def home(request):
    return render(request, 'main/home.html', get_portfolio_context())

def methodology(request):
    return render(request, 'main/methodology.html', get_portfolio_context())

def bug_bounty_writeups(request):
    return render(request, 'main/bug_bounty_writeups.html', get_portfolio_context())

from django.template.exceptions import TemplateDoesNotExist
from django.http import Http404

def academy_vuln(request, page):
    template_name = page.replace('.html', '').replace('-', '_')
    try:
        return render(request, f'main/academy/vulnerabilities/{template_name}.html', get_portfolio_context())
    except TemplateDoesNotExist:
        raise Http404

def academy_lab(request, page):
    template_name = page.replace('.html', '').replace('-', '_')
    try:
        return render(request, f'main/academy/labs/{template_name}.html', get_portfolio_context())
    except TemplateDoesNotExist:
        raise Http404

def academy_linux(request, page):
    template_name = page.replace('.html', '').replace('-', '_')
    try:
        return render(request, f'main/academy/linux/{template_name}.html', get_portfolio_context())
    except TemplateDoesNotExist:
        raise Http404

def academy_writeup(request, page):
    template_name = page.replace('.html', '').replace('-', '_')
    try:
        return render(request, f'main/writeups/{template_name}.html', get_portfolio_context())
    except TemplateDoesNotExist:
        raise Http404


def python_for_hackers(request):
    return render(request, 'main/python_for_hackers.html', get_portfolio_context())
