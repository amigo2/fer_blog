# Generated by Django 2.2.3 on 2019-07-31 19:33

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20190725_2009'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=ckeditor.fields.RichTextField(blank=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='mini_content',
            field=ckeditor.fields.RichTextField(blank=True),
        ),
    ]
