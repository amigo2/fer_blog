from django.shortcuts import get_object_or_404, render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.http import HttpResponse
from posts.models import Post

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

    # Keywords
    if 'keywords' in request.GET:
        keywords = request.GET['keywords']
        if keywords:
            query_content = query_list.filter( content__icontains  = keywords)
            query_mini_content = query_list.filter( mini_content__icontains  = keywords)

    context={
        'posts' : query_content, 
        'posts' : query_mini_content, 

    }
    return render(request, 'posts/search.html', context)