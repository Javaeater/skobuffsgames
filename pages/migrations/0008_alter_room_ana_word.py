# Generated by Django 4.0 on 2021-12-18 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0007_room_ana_word'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='ana_word',
            field=models.CharField(max_length=10),
        ),
    ]
