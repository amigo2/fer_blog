from django.shortcuts import render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.http import HttpResponse
from posts.models import Post



def index(request):
    posts = Post.objects.order_by('published').filter( status = 'published')

    # pagination
    # max objevt per page
    paginator = Paginator(posts,1)
    page = request.GET.get('page')
    paged_posts = paginator.get_page(page)

    context={
        'posts' : paged_posts
    }

    return render( request, 'pages/index.html', context)

def post(request):
    
    posts = Post.objects.order_by('-published')
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
