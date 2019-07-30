from django.urls import path
from . import views
from django.conf.urls import url, include



urlpatterns = [
    path('', views.index, name='posts' ),
    path('<int:post_id>', views.post, name='post' ), 

    
    
]
