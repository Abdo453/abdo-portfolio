from django.shortcuts import render, redirect
from django.template.exceptions import TemplateDoesNotExist
from django.http import Http404
from .portfolio_data import get_portfolio_context

def home(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    return render(request, 'main/home.html', get_portfolio_context())

def methodology(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    return render(request, 'main/methodology.html', get_portfolio_context())

def bug_bounty_writeups(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    return render(request, 'main/bug_bounty_writeups.html', get_portfolio_context())

def academy_vuln(request, page):
    if not request.user.is_authenticated:
        return redirect('/login')
    template_name = page.replace('.html', '').replace('-', '_')
    try:
        return render(request, f'main/academy/vulnerabilities/{template_name}.html', get_portfolio_context())
    except TemplateDoesNotExist:
        raise Http404

def academy_lab(request, page):
    if not request.user.is_authenticated:
        return redirect('/login')
    template_name = page.replace('.html', '').replace('-', '_')
    try:
        return render(request, f'main/academy/labs/{template_name}.html', get_portfolio_context())
    except TemplateDoesNotExist:
        raise Http404

def academy_linux(request, page):
    if not request.user.is_authenticated:
        return redirect('/login')
    template_name = page.replace('.html', '').replace('-', '_')
    try:
        return render(request, f'main/academy/linux/{template_name}.html', get_portfolio_context())
    except TemplateDoesNotExist:
        raise Http404

def academy_writeup(request, page):
    if not request.user.is_authenticated:
        return redirect('/login')
    template_name = page.replace('.html', '').replace('-', '_')
    try:
        return render(request, f'main/writeups/{template_name}.html', get_portfolio_context())
    except TemplateDoesNotExist:
        raise Http404

def python_for_hackers(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    return render(request, 'main/python_for_hackers.html', get_portfolio_context())

import json
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile

@csrf_exempt
def api_register(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)
    try:
        data = json.loads(request.body)
        username = data.get('username').strip()
        password = data.get('password')
        email = data.get('email')
        whatsapp = data.get('whatsapp')
        gender = data.get('gender', 'male')
        avatar = data.get('avatar')
        
        if not username or not password:
            return JsonResponse({'success': False, 'error': 'Username and password required'}, status=400)
        
        if User.objects.filter(username__iexact=username).exists():
            return JsonResponse({'success': False, 'error': 'Username already exists'}, status=400)
        
        user = User.objects.create_user(username=username, password=password)
        profile = user.profile
        profile.email = email
        profile.whatsapp = whatsapp
        profile.gender = gender
        profile.avatar = avatar
        profile.save()
        
        auth_login(request, user)
        return JsonResponse({
            'success': True,
            'user': {
                'username': user.username,
                'xp': profile.xp,
                'completed_challenges': json.loads(profile.completed_challenges or '[]'),
                'email': profile.email,
                'whatsapp': profile.whatsapp,
                'gender': profile.gender,
                'avatar': profile.avatar
            }
        })
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

@csrf_exempt
def api_login(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return JsonResponse({
                'success': True,
                'user': {
                    'username': user.username,
                    'xp': user.profile.xp,
                    'completed_challenges': json.loads(user.profile.completed_challenges or '[]'),
                    'email': user.profile.email,
                    'whatsapp': user.profile.whatsapp,
                    'gender': user.profile.gender,
                    'avatar': user.profile.avatar
                }
            })
        else:
            return JsonResponse({'success': False, 'error': 'Invalid username or password'}, status=401)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

@csrf_exempt
def api_logout(request):
    auth_logout(request)
    return JsonResponse({'success': True})

@csrf_exempt
def api_save_progress(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success': False, 'error': 'Not authenticated'}, status=401)
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)
    try:
        data = json.loads(request.body)
        xp = data.get('xp')
        completed = data.get('completed_challenges')
        profile = request.user.profile
        if xp is not None:
            profile.xp = int(xp)
        if completed is not None:
            profile.completed_challenges = json.dumps(completed)
        profile.save()
        return JsonResponse({'success': True, 'xp': profile.xp})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

def api_profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({'authenticated': False})
    user = request.user
    return JsonResponse({
        'authenticated': True,
        'user': {
            'username': user.username,
            'xp': user.profile.xp,
            'completed_challenges': json.loads(user.profile.completed_challenges or '[]'),
            'email': user.profile.email,
            'whatsapp': user.profile.whatsapp,
            'gender': user.profile.gender,
            'avatar': user.profile.avatar
        }
    })

def api_leaderboard(request):
    profiles = UserProfile.objects.select_related('user').order_by('-xp')
    leaderboard = []
    for p in profiles:
        leaderboard.append({
            'username': p.user.username,
            'xp': p.xp,
            'is_user': True
        })
    fictional_hackers = [
        {'username': 'Cipher_Ghost', 'xp': 2850, 'is_user': False},
        {'username': 'Root_Mask', 'xp': 2400, 'is_user': False},
        {'username': 'Zero_Day', 'xp': 1950, 'is_user': False},
        {'username': 'Null_Byte', 'xp': 1200, 'is_user': False}
    ]
    combined = leaderboard + fictional_hackers
    
    # Remove duplicate username of current user from fictional list if matching
    seen = set()
    unique_combined = []
    for item in combined:
        uname = item['username'].lower()
        if uname not in seen:
            seen.add(uname)
            unique_combined.append(item)
            
    unique_combined.sort(key=lambda x: x['xp'], reverse=True)
    return JsonResponse({'success': True, 'leaderboard': unique_combined[:5]})

def login_page(request):
    if request.user.is_authenticated:
        return redirect('/')
    return render(request, 'main/login.html')
