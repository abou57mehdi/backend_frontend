from django.urls import path
from .views import login_user, logout_user, register_user, get_dealer, post_review, get_all_dealers

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('api/dealers/', get_all_dealers, name='get_all_dealers'),  # New endpoint
    path('api/dealers/<int:dealer_id>/', get_dealer, name='get_dealer'),
    path('api/dealers/<int:dealer_id>/reviews/', post_review, name='post_review'),
]
