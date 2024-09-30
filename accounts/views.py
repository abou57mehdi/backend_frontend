from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Dealer, Review
from .serializers import DealerSerializer, ReviewSerializer

@csrf_exempt
def login_user(request):
    """Handle user login."""
    print("Login request received.")
    
    if request.method == 'POST':
        print("Processing POST request...")
        
        try:
            data = json.loads(request.body)
            print(f"Received data: {data}")
            
            username = data.get('username')
            password = data.get('password')

            print(f"Authenticating user: {username}")
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                print(f"Login successful for user: {username}")
                return JsonResponse({'status': 'success', 'userName': username})
            else:
                print("Authentication failed. Invalid credentials.")
                return JsonResponse({'status': 'error', 'error': 'Invalid credentials'}, status=400)

        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            return JsonResponse({'status': 'error', 'error': 'Invalid JSON format'}, status=400)
    else:
        print("Invalid request method. Only POST allowed.")
    return JsonResponse({'status': 'error', 'error': 'Invalid request method'}, status=405)



@api_view(['GET'])
def get_all_dealers(request):
    """Get a list of all dealers."""
    dealers = Dealer.objects.all()
    dealer_data = DealerSerializer(dealers, many=True).data
    return Response(dealer_data)



@csrf_exempt
def logout_user(request):
    """Handle user logout."""
    print("Logout request received.")
    
    if request.method == 'POST':
        logout(request)
        print("User logged out successfully.")
        return JsonResponse({'status': 'success', 'message': 'Logged out successfully'})
    else:
        print("Invalid request method. Only POST allowed.")
    return JsonResponse({'status': 'error', 'error': 'Invalid request method'}, status=405)

@csrf_exempt
def register_user(request):
    """Handle user registration."""
    print("Registration request received.")
    
    if request.method == 'POST':
        print("Processing POST request...")
        
        try:
            data = json.loads(request.body)
            print(f"Received data: {data}")

            username = data.get('username')
            password = data.get('password')
            email = data.get('email')

            # Validate input
            if not username or not password or not email:
                print("Missing fields in registration data.")
                return JsonResponse({'status': 'error', 'error': 'All fields are required.'}, status=400)

            print(f"Checking if username {username} already exists.")
            if User.objects.filter(username=username).exists():
                print(f"Username {username} is already taken.")
                return JsonResponse({'status': 'error', 'error': 'Username already taken'}, status=400)

            print(f"Creating new user: {username}")
            user = User.objects.create_user(username=username, password=password, email=email)
            
            # Automatically log in the new user after registration
            login(request, user)
            print(f"User {username} registered and logged in successfully.")
            return JsonResponse({'status': 'success', 'userName': username})

        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            return JsonResponse({'status': 'error', 'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            print(f"Unexpected error: {e}")
            return JsonResponse({'status': 'error', 'error': 'Server error'}, status=500)
    else:
        print("Invalid request method. Only POST allowed.")
    return JsonResponse({'status': 'error', 'error': 'Invalid request method'}, status=405)



@api_view(['GET'])
def get_dealer(request, dealer_id):
    """Get dealer details and reviews."""
    print(f"Received request for dealer ID: {dealer_id}")
    
    try:
        dealer = Dealer.objects.get(id=dealer_id)
        print(f"Dealer found: {dealer.name}")  # Print the name of the found dealer
    except Dealer.DoesNotExist:
        print(f"Dealer with ID {dealer_id} does not exist.")
        return Response({'error': 'Dealer not found'}, status=status.HTTP_404_NOT_FOUND)

    dealer_data = DealerSerializer(dealer).data
    print(f"Dealer data serialized: {dealer_data}")  # Print serialized dealer data

    reviews = Review.objects.filter(dealer=dealer)
    reviews_data = ReviewSerializer(reviews, many=True).data
    print(f"Reviews found for dealer ID {dealer_id}: {reviews_data}")  # Print reviews data

    return Response({'dealer': dealer_data, 'reviews': reviews_data})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_review(request, dealer_id):
    """Post a new review for the dealer."""
    try:
        dealer = Dealer.objects.get(id=dealer_id)
    except Dealer.DoesNotExist:
        return Response({'error': 'Dealer not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    author = request.user
    review = Review.objects.create(
        dealer=dealer,
        author=author,
        content=data['content'],
        sentiment=data['sentiment']
    )

    return Response({'success': 'Review submitted successfully'}, status=status.HTTP_201_CREATED)
