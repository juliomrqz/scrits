# Generated by Django 2.0.3 on 2018-03-19 23:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=50)),
                ('vote', models.SmallIntegerField(choices=[(1, '+1'), (-1, '-1')])),
                ('object_id', models.PositiveIntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, null=True)),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
            ],
            options={
                'db_table': 'secretballot_vote',
            },
        ),
        migrations.AlterUniqueTogether(
            name='vote',
            unique_together={('token', 'content_type', 'object_id')},
        ),
    ]
