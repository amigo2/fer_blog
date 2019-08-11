from django.shortcuts import render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.http import HttpResponse
from posts.models import Post
from posts.models import Category



def index(request):
    posts = Post.objects.order_by('-published').filter( status = 'published')

    # pagination
    # max objevt per page
    paginator = Paginator(posts,3)
    page = request.GET.get('page')
    paged_posts = paginator.get_page(page)

    context={
        'posts' : paged_posts
    }

    return render( request, 'pages/index.html', context)
    

def coding(request):

    #posts = Post.objects.all()
    #posts = Post.objects.all().order_by('category', 'created').distinct('category')
    posts = Post.objects.order_by( '-published').filter( category = '01')
    context={
        #passing all objects to template through posts
        'posts'      : posts
    }


    return render( request, 'pages/coding.html', context)

def arts(request):

    posts = Post.objects.order_by( '-published').filter( category = '02')

    # pagination
    # max objevt per page
    paginator = Paginator(posts,3)
    page = request.GET.get('page')
    paged_posts = paginator.get_page(page)

    context={
        #passing all objects to template through posts
        'posts'      : paged_posts
    }
    return render( request, 'pages/arts.html', context)

def contact(request):
    return render( request, 'pages/contact.html')


def about(request):
    return render( request, 'pages/about.html')