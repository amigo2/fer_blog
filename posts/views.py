from django.shortcuts import get_object_or_404, render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.http import HttpResponse
from posts.models import Post
from django.contrib.auth.models import User

# Create your views here.


def index(request):

    posts = Post.objects.all().order_by('-published')
    paginator = Paginator(posts,3)
    page = request.GET.get('page')
    paged_posts = paginator.get_page(page)

    context={
        'posts' : paged_posts
    }


    return render( request, 'posts/posts.html', context)



def post(request, post_id):

    post = get_object_or_404(Post, pk=post_id)

    context={
        'post':post
    }

    return render(request, 'posts/post.html', context)

def search(request):

    query_list = Post.objects.all().order_by('-published')
    #query_user = User.objects.all()

    # Keywords
    if 'keywords' in request.GET:
        keywords = request.GET['keywords']
        if keywords:
            query_content      = query_list.filter( content__icontains      = keywords)
            query_mini_content = query_list.filter( mini_content__icontains = keywords)
            #query_title        = query_list.filter( title__icontains        = keywords)
            #query_author       = query_user.filter( username__icontains     = keywords)

    context={
        'posts' : query_mini_content, 
        'posts' : query_content, 
        #'posts' : query_title, 
        #'posts' : query_author, 

    }
    return render(request, 'posts/search.html', context)