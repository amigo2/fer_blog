from django.shortcuts import get_object_or_404, render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.http import HttpResponse
from posts.models import Post

# Create your views here.


def index(request):

    posts = Post.objects.order_by('-published')
    context={
        #passing all objects to template through posts
        'posts'      : posts
    }


    return render( request, 'posts/posts.html', context)



def post(request, post_id):

    post = get_object_or_404(Post, pk=post_id)

    context={
        'post':post
    }

    render(request, 'posts/post.html')
    