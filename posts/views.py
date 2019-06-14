from django.shortcuts import render

# Create your views here.


def index(request):
    render(request, 'posts/posts.html')

def post(request):
    render(request, 'posts/post.html')