# serializers.py
from rest_framework import serializers
from .models import Dealer, Review

class DealerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealer
        fields = ['id', 'name', 'description']

class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()  # Show the username of the author

    class Meta:
        model = Review
        fields = ['id', 'author', 'content', 'sentiment']
