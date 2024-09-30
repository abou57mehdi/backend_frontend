from django.db import models
from django.contrib.auth.models import User

class Dealer(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Review(models.Model):
    dealer = models.ForeignKey(Dealer, on_delete=models.CASCADE, related_name='reviews')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    sentiment = models.CharField(max_length=20, choices=[('positive', 'Positive'), ('neutral', 'Neutral'), ('negative', 'Negative')])

    def __str__(self):
        return f'Review by {self.author} on {self.dealer}'
