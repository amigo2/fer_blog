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
# this is dummy, main url's are pointing to views.post 
def post(request):

    #post = get_object_or_404(Post, pk=post_id)


    return render(request, 'posts/post.html')



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
