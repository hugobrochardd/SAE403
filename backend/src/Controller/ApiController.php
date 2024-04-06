<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Movie;
use App\Entity\Category;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\WatchlistRepository;
use App\Entity\Watchlist;
use App\Entity\User;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;





class ApiController extends AbstractController
{
    #[Route('/api', name: 'app_api')]
    public function index(): Response
    {
        return $this->render('api/index.html.twig', [
            'controller_name' => 'ApiController',
        ]);
    }



    #[Route('/api/movie/{id}', name: 'app_api_movie')]
    public function readMovie(int $id, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        $movie = $entityManager->getRepository(Movie::class)->find($id);
    
        if (!$movie) {
            throw $this->createNotFoundException('The movie does not exist');
        }
    
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
            AbstractNormalizer::GROUPS => ['json_category', 'json_watchlist']
        ];
    
        $data = $serializer->normalize($movie, null, $context);
        $response = new JsonResponse($data);
        return $response;
    }
    
    #[Route('/api/movies', name: 'app_api_movies')]
    public function readMovies(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 50);
        $offset = ($page - 1) * $limit;
    
        $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery();
    
        $movies = $query->getResult();
    
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
            AbstractNormalizer::GROUPS => ['json_category', 'json_watchlist']
        ];
    
        $data = $serializer->normalize($movies, null, $context);
        $response = new JsonResponse($data);
        return $response;
    }



    #[Route('/api/categories', name: 'app_api_categories')]
    public function readCategories(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 50);
        $offset = ($page - 1) * $limit;
    
        $query = $entityManager->getRepository(Category::class)->createQueryBuilder('c')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery();
    
        $categories = $query->getResult();
    
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
            AbstractNormalizer::GROUPS => ['json_category', 'json_watchlist']
        ];
    
        $data = $serializer->normalize($categories, null, $context);
        $response = new JsonResponse($data);
        return $response;
    }

    
    #[Route('/api/category/{category}', name: 'app_api_category')]
    public function readMoviesByCategory(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request, string $category): Response
    {
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 50);
        $offset = ($page - 1) * $limit;
    
        $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
            ->join('m.category', 'c') // Join the Category entity
            ->where('c.name = :category') // Use the joined entity in the where clause
            ->setParameter('category', $category)
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery();
    
        $movies = $query->getResult();
    
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
            AbstractNormalizer::GROUPS => ['json_category', 'json_watchlist']
        ];
    
        $data = $serializer->normalize($movies, null, $context);
        $response = new JsonResponse($data);
        return $response;
    }



    #[Route('/api/new', name: 'app_api_new')]
    public function readMoviesSortedByReleaseYear(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 50);
        $offset = ($page - 1) * $limit;
    
        $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
            ->orderBy('m.released', 'DESC')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery();
    
        $movies = $query->getResult();
    
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
            AbstractNormalizer::GROUPS => ['json_category', 'json_watchlist']
        ];
    
        $data = $serializer->normalize($movies, null, $context);
        $response = new JsonResponse($data);
        return $response;
    }


    
    #[Route('/api/highlight', name: 'app_api_highlight')]
    public function highlightMovies(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 50);
        $offset = ($page - 1) * $limit;
    
        $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
            ->where('m.highlight = :highlight')
            ->setParameter('highlight', true)
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery();
    
        $movies = $query->getResult();
    
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
            AbstractNormalizer::GROUPS => ['json_category', 'json_watchlist']
        ];
    
        $data = $serializer->normalize($movies, null, $context);
        $response = new JsonResponse($data);
        return $response;
    }


    #[Route('/api/search/{term}', name: 'app_api_search')]
    public function searchMovies($term, SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 50);
        $offset = ($page - 1) * $limit;
    
        $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
            ->where('m.name LIKE :term')
            ->setParameter('term', '%' . $term . '%')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery();
    
        $movies = $query->getResult();
    
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
            AbstractNormalizer::GROUPS => ['json_category', 'json_watchlist']
        ];
    
        $data = $serializer->normalize($movies, null, $context);
        $response = new JsonResponse($data);
        return $response;
    }


    #[Route('/api/random', name: 'app_api_random')]
    public function randomMovies(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
        $limit = $request->query->get('limit', 50);
    
        $count = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
            ->select('COUNT(m)')
            ->getQuery()
            ->getSingleScalarResult();
    
        $offset = max(0, rand(0, $count - $limit));
    
        $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery();
    
        $movies = $query->getResult();
    
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
            AbstractNormalizer::GROUPS => ['json_category', 'json_watchlist']
        ];
    
        $data = $serializer->normalize($movies, null, $context);
        $response = new JsonResponse($data);
        return $response;
    }




    #[Route('/api/watchlist/user/{id}', name: 'app_api_user_watchlists', methods: ['GET'])]
    public function getUserWatchlist(int $id, WatchlistRepository $watchlistRepository, SerializerInterface $serializer): Response
    {
        $watchlist = $watchlistRepository->findOneBy(['user' => $id]);

        if (!$watchlist) {
            return $this->json(['message' => 'No watchlist found for this user'], 404);
        }

        $data = $serializer->normalize($watchlist, null, [
            'groups' => 'json_watchlist',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($data);
    }

    #[Route('/api/watchlist/user/{id}/delete', name: 'app_api_user_watchlist_delete', methods: ['DELETE'])]
    public function deleteUserWatchlist(int $id, EntityManagerInterface $entityManager): Response
    {
        $watchlistRepository = $entityManager->getRepository(Watchlist::class);
        $watchlist = $watchlistRepository->findOneBy(['user' => $id]);

        if (!$watchlist) {
            return $this->json(['message' => 'No watchlist found for this user'], 404);
        }

        foreach ($watchlist->getMovies() as $movie) {
            $watchlist->removeMovie($movie);
        }

        $entityManager->persist($watchlist);
        $entityManager->flush();

        return $this->json(['message' => 'Watchlist cleared successfully']);
    }

    #[Route('/api/watchlist/user/{userId}/movie/{movieId}/add', name: 'app_api_user_watchlist_add_movie', methods: ['POST'])]
    public function addMovieToUserWatchlist(int $userId, int $movieId, EntityManagerInterface $entityManager): Response
    {
        $userRepository = $entityManager->getRepository(User::class);
        $movieRepository = $entityManager->getRepository(Movie::class);
        $watchlistRepository = $entityManager->getRepository(Watchlist::class);

        $user = $userRepository->find($userId);
        $movie = $movieRepository->find($movieId);
        $watchlist = $watchlistRepository->findOneBy(['user' => $userId]);

        if (!$user || !$movie || !$watchlist) {
            return $this->json(['message' => 'User, movie or watchlist not found'], 404);
        }

        // Add the movie to the watchlist
        $watchlist->addMovie($movie);

        $entityManager->flush();

        return $this->json(['message' => 'Movie added to watchlist successfully']);
    }

}


