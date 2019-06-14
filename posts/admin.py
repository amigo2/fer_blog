from django.contrib import admin

from .models import Post 
from .models import Category


#class PostAdmin(admin.ModelAdmin):
 #   list_display       = ('id', 'title', 'reference', 'is_published', 'price', 'list_date', 'broker')

admin.site.register(Post)
admin.site.register(Category)