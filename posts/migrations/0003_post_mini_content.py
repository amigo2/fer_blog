# Generated by Django 2.2.3 on 2019-07-24 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_post_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='mini_content',
            field=models.TextField(blank=True),
        ),
    ]
