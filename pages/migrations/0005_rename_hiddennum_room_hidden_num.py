# Generated by Django 4.0 on 2021-12-17 16:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0004_alter_room_hiddennum'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='hiddenNum',
            new_name='hidden_num',
        ),
    ]
