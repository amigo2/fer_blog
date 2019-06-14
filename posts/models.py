from django.db import models

from django.utils import timezone


class Category(models.Model):
    name =  models.CharField(max_length=250)
    slug =  models.SlugField(max_length=250, unique=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    STATUS_CHOICES = (
        ('draft' , 'Draft'),
        ('published', 'Published'),
    )
    title             = models.CharField(max_length=250)
    slug              = models.SlugField(max_length=250, unique=True)
    category          = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    photo_main        = models.ImageField(upload_to='photos/%Y/%m/%d')
    content           = models.TextField(blank=True)
    published         = models.DateTimeField(default=timezone.now)
    created           = models.DateTimeField(auto_now_add=True) 
    update            = models.DateTimeField(auto_now=True) 
    status            = models.CharField(max_length=9, choices=STATUS_CHOICES, default='draft')
    photo_1           = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    photo_2           = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    photo_3           = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    photo_4           = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    photo_5           = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)

    def __str__(self):
        return self.title
