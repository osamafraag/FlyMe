# Generated by Django 4.2.6 on 2023-11-01 14:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AirPort',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
                ('latitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('longitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
                ('flag', models.ImageField(upload_to='countries/photos/')),
                ('callingCode', models.CharField(max_length=5, null=True)),
                ('nationality', models.CharField(blank=True, help_text='like Egyption, etc..', max_length=150, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='TrendingPlace',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
                ('description', models.TextField()),
                ('latitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('longitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='countries.country')),
            ],
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distance', models.DecimalField(blank=True, decimal_places=2, help_text='Distance in kilometers', max_digits=7, null=True)),
                ('endAirport', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='routes_to', to='countries.airport')),
                ('startAirport', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='routes_from', to='countries.airport')),
            ],
        ),
        migrations.CreateModel(
            name='MultiImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='trending_places/photos/')),
                ('trendingPlace', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='countries.trendingplace')),
            ],
        ),
        migrations.AddField(
            model_name='airport',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='countries.country'),
        ),
    ]
