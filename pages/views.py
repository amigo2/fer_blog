from django.shortcuts import render
from django.http import HttpResponse
from posts.models import Post


def index(request):


    return render( request, 'pages/index.html')

def post(request):
    
    posts = Post.objects.all()
    context={
        #passing all objects to template through posts
        'posts'      : posts
    }


    return render( request, 'posts/posts.html', context)



def about(request):
    return render( request, 'pages/about.html')
    

def coding(request):

    posts = Post.objects.all()
    context={
        #passing all objects to template through posts
        'posts'      : posts
    }


    return render( request, 'pages/coding.html', context)

def arts(request):
    return render( request, 'pages/arts.html')

def contact(request):
    return render( request, 'pages/contact.html')
