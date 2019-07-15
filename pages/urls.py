from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'), 
    path('post', views.post, name='post'), 
    path('coding', views.coding, name='coding'), 
    path('arts', views.arts, name='arts'), 
    path('contact', views.contact, name='contact'), 
]